import Markdown from "react-markdown";

export default function AnalysisResult({ result, error }) {
  if (error) return (
    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
      {error}
    </p>
  );

  if (!result) return null;

  return (
    <div className="prose prose-sm max-w-none bg-white border border-border rounded-md px-6 py-5
      text-foreground leading-relaxed">
      <Markdown>{result.analysis}</Markdown>
    </div>
  );
}