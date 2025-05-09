from typing import cast

from pydantic import ConfigDict, model_validator
from sqlmodel import SQLModel

from ...app.models.schools import (
    EtapEdukacjiBase,
    StatusPublicznoprawnyBase,
    SzkolaExtendedData,
    TypSzkolyBase,
)
from ..utils.convert_to_camel import custom_camel
from .types import SchoolDict


class GeolocationAPIResponse(SQLModel):
    latitude: float
    longitude: float


class SzkolaAPIResponse(SzkolaExtendedData):
    model_config: ConfigDict = ConfigDict(alias_generator=custom_camel)  # pyright: ignore[reportIncompatibleVariableOverride]
    geolokalizacja: GeolocationAPIResponse
    typ: TypSzkolyBase
    status_publiczno_prawny: StatusPublicznoprawnyBase
    etapy_edukacji: list[EtapEdukacjiBase]
    wojewodztwo: str
    wojewodztwo_kod_TERYT: str
    powiat: str
    powiat_kod_TERYT: str
    gmina: str
    gmina_kod_TERYT: str
    miejscowosc: str
    miejscowosc_kod_TERYT: str
    ulica: str | None
    ulica_kod_TERYT: str | None

    @model_validator(mode="before")
    @classmethod
    def empty_str_to_none[T](cls, data: T) -> T:
        """Convert empty strings to None for all fields."""
        if not isinstance(data, dict):
            raise ValueError(f"Expected data to be a dictionary, but got {data}")

        # Convert empty strings to None for all fields
        for field_name, field_value in list(cast(SchoolDict, data).items()):
            if field_value == "":
                data[field_name] = None

        return cast(T, data)
