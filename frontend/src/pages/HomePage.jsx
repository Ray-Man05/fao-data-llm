import { useState } from "react";
import { useAnalysis } from "../hooks/useAnalysis.js";
import FileUpload from "../components/FileUpload.jsx";
import DataPreview from "../components/DataPreview.jsx";
import ColumnSelector from "../components/ColumnSelector.jsx";
import AnalysisResult from "../components/AnalysisResult.jsx";

const DEFAULT_COLUMN_COUNT = 2;

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [lang, setLang] = useState("en");
  const [columnCount, setColumnCount] = useState(DEFAULT_COLUMN_COUNT);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const { columns, preview, result, loading, error, loadFile, runAnalysis } = useAnalysis();

  async function handleFileSelected(selectedFile) {
    setFile(selectedFile);
    const cols = await loadFile(selectedFile);
    if (cols && cols.length >= 2) {
      setSelectedColumns(cols.slice(0, DEFAULT_COLUMN_COUNT));
    }
  }

  function handleColumnCountChange(count) {
    const clamped = Math.max(2, Math.min(count, columns.length));
    setColumnCount(clamped);
    setSelectedColumns((prev) => {
      if (clamped > prev.length) {
        const additions = columns.slice(prev.length, clamped);
        return [...prev, ...additions];
      }
      return prev.slice(0, clamped);
    });
  }

  function handleColumnChange(index, value) {
    setSelectedColumns((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  function handleSubmit() {
    if (file && selectedColumns.length >= 2) {
      runAnalysis(file, selectedColumns, lang);
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-foreground">Agricultural Data Analyzer</h1>
        <p className="text-sm text-muted">Upload a dataset, select columns, get analysis</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
        <section className="bg-white border border-border rounded-md px-6 py-5 flex flex-col gap-4">
          <FileUpload onFileSelected={handleFileSelected} />
          <DataPreview columns={columns} preview={preview} />
        </section>

        {columns.length > 0 && (
          <section className="bg-white border border-border rounded-md px-6 py-5">
            <ColumnSelector
              availableColumns={columns}
              selectedColumns={selectedColumns}
              columnCount={columnCount}
              onColumnCountChange={handleColumnCountChange}
              onColumnChange={handleColumnChange}
              onSubmit={handleSubmit}
              loading={loading}
              lang={lang}
              onLangToggle={() => setLang((l) => l === "en" ? "fr" : "en")}
            />
          </section>
        )}

        {(result || error) && (
          <section className="bg-white border border-border rounded-md px-6 py-5">
            <AnalysisResult result={result} error={error} />
          </section>
        )}
      </main>
    </div>
  );
}