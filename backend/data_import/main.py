import logging

from ..app.core.database import create_db_and_tables
from .api.exceptions import SchoolsDataError
from .api.fetcher import SchoolsAPIFetcher
from .core.config import APISettings
from .db.decomposer import DatabaseDecomposer

logger = logging.getLogger(__name__)


def configure_logging():
    file_handler = logging.FileHandler("data_import.log")
    stream_handler = logging.StreamHandler()
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[file_handler, stream_handler],
    )


def print_error_message(segment_number: int, current_page: int):
    logger.error(f"""
                 ❌ Error processing segment {segment_number}
                 ⚠️ Process stopped at page {current_page}
                 💡 You can resume the process by starting from this page""")


def main():
    configure_logging()
    logger.info("🛠️ Creating database and tables...")
    create_db_and_tables()

    logger.info("📥 Starting segmented schools data import...")
    api_fetcher = SchoolsAPIFetcher()
    current_page = APISettings.START_PAGE
    total_processed = 0
    segment_number = 1

    while True:
        try:
            logger.info(
                f"🔄 Processing segment {segment_number} (starting from page {current_page})..."
            )
            schools_data, next_page = api_fetcher.fetch_schools_segment(
                start_page=current_page
            )

            if not schools_data:
                logger.info("ℹ️ No more schools to process")  # noqa: RUF001
                break

            logger.info(
                f"⚡ Processing {len(schools_data)} schools from segment {segment_number}..."
            )
            with DatabaseDecomposer() as decomposer:
                decomposer.prune_and_decompose_schools(schools_data)

            total_processed += len(schools_data)
            logger.info(
                f"✅ Successfully processed segment {segment_number} ({len(schools_data)} schools)"
            )
            logger.info(f"📊 Total schools processed so far: {total_processed}")

            if not next_page:
                logger.info("🏁 No more pages to process")
                break

            current_page = next_page
            segment_number += 1

        except SchoolsDataError as e:
            logger.error(f"📛 Schools data error: {e}")
            print_error_message(segment_number, current_page)
            break

        except Exception as e:
            logger.critical(f"🚨 Unhandled, critical error: {e}")
            print_error_message(segment_number, current_page)
            break

    logger.info(f"🎉 Import completed. Total schools processed: {total_processed}")


if __name__ == "__main__":
    main()
