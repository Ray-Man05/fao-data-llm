Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uv run uvicorn main:app --reload"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"