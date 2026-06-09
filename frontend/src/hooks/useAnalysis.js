import { useState } from "react";
import { fetchColumns, fetchPreview, fetchAnalysis } from "../api/analysisApi.js";

export function useAnalysis() {
  const [columns, setColumns] = useState([]);
  const [preview, setPreview] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadFile(file) {
    setError(null);
    setColumns([]);
    setPreview([]);
    setResult(null);
    try {
      const [cols, rows] = await Promise.all([
        fetchColumns(file),
        fetchPreview(file),
      ]);
      setColumns(cols);
      setPreview(rows);
      return cols;
    } catch (e) {
      setError(e.message);
    }
  }

  async function runAnalysis(file, selectedColumns, lang) {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await fetchAnalysis(file, selectedColumns, lang);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { columns, preview, result, loading, error, loadFile, runAnalysis };
}