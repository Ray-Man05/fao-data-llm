import pandas as pd
from fastapi import UploadFile, HTTPException
from models.schemas import ParsedData


def _load_dataframe(file: UploadFile) -> pd.DataFrame:
    content_type = file.content_type

    if content_type == "text/csv":
        return pd.read_csv(file.file)
    elif content_type in {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    }:
        return pd.read_excel(file.file)
    else:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type: {content_type}. Must be CSV or Excel.",
        )


def get_column_names(file: UploadFile) -> list[str]:
    df = _load_dataframe(file)
    return list(df.columns)


def get_preview(file: UploadFile, n: int = 5) -> list[dict]:
    df = _load_dataframe(file)
    return df.head(n).fillna("").to_dict(orient="records")


def extract_columns(file: UploadFile, columns: list[str]) -> ParsedData:
    df = _load_dataframe(file)

    for col in columns:
        if col not in df.columns:
            raise HTTPException(
                status_code=422,
                detail=f"Column '{col}' not found. Available: {list(df.columns)}",
            )

    subset = df[columns].dropna()
    return ParsedData(columns=columns, rows=subset.to_dict(orient="records"))
