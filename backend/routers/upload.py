from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.file_parser import get_column_names, get_preview, extract_columns
from services.llm_service import analyze
from models.schemas import AnalysisResponse
import json

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("/columns", response_model=list[str])
async def list_columns(file: UploadFile = File(...)):
    return get_column_names(file)


@router.post("/preview", response_model=list[dict])
async def preview_file(file: UploadFile = File(...)):
    return get_preview(file)


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_file(
    file: UploadFile = File(...),
    columns: str = Form(...),
    lang: str = Form("en"),
):
    parsed_columns = json.loads(columns)

    if len(parsed_columns) < 2:
        raise HTTPException(status_code=422, detail="At least 2 columns required.")
    if len(parsed_columns) != len(set(parsed_columns)):
        raise HTTPException(
            status_code=422, detail="Duplicate columns are not allowed."
        )
    if lang not in ("en", "fr"):
        raise HTTPException(status_code=422, detail="Supported languages: en, fr.")

    data = extract_columns(file, parsed_columns)
    analysis = await analyze(data, lang)
    return AnalysisResponse(analysis=analysis, data=data)
