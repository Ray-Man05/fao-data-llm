export default function DataPreview({ columns, preview }) {
  if (!preview || preview.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th key={col} className="px-3 py-2 font-medium text-muted whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {preview.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {columns.map((col) => (
                <td key={col} className="px-3 py-2 text-foreground whitespace-nowrap">
                  {String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}