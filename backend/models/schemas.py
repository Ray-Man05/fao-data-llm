from pydantic import BaseModel
from typing import Any


class ParsedData(BaseModel):
    columns: list[str]
    rows: list[dict[str, Any]]


class AnalysisResponse(BaseModel):
    analysis: str
    data: ParsedData
