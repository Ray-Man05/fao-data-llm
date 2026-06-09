from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import upload
from config import settings

app = FastAPI(title="Agricultural Data Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.server.allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)


@app.get("/health")
def health():
    return {"status": "ok"}
