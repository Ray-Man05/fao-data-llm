console.log("API_BASE:", import.meta.env.VITE_API_BASE);

export async function fetchColumns(file) {
  const form = new FormData();
  form.append("file", file);

  const response = await fetch("/upload/columns", { method: "POST", body: form });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Failed to fetch columns");
  }
  return response.json();
}

export async function fetchPreview(file) {
  const form = new FormData();
  form.append("file", file);

  const response = await fetch("/upload/preview", { method: "POST", body: form });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Failed to fetch preview");
  }
  return response.json();
}

export async function fetchAnalysis(file, columns, lang) {
  const form = new FormData();
  form.append("file", file);
  form.append("columns", JSON.stringify(columns));
  form.append("lang", lang);

  const response = await fetch("/upload/analyze", { method: "POST", body: form });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Failed to fetch analysis");
  }
  return response.json();
}