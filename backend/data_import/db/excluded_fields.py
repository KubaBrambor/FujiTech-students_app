from typing import ClassVar


class SchoolFieldExclusions:
    """
    Fields from API response class that should be excluded during school data decomposition.
    """

    TYP: str = "typ"
    ETAPY_EDUKACJI: str = "etapy_edukacji"
    MIEJSCOWOSC: str = "miejscowosc"
    ULICA: str = "ulica"

    ALL: ClassVar[list[str]] = [
        TYP,
        ETAPY_EDUKACJI,
        MIEJSCOWOSC,
        ULICA,
    ]
