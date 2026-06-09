#!/bin/bash
cd backend && uv run uvicorn main:app --reload &
cd frontend && npm run dev &
wait