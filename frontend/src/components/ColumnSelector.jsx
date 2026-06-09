import * as Select from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";

function StyledSelect({ id, value, onChange, options }) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        id={id}
        className="flex items-center justify-between w-full px-3 py-2 text-sm
          bg-white border border-border rounded-md text-foreground
          hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <Select.Value />
        <Select.Icon className="text-muted">▾</Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-white border border-border rounded-md shadow-md z-50">
          <Select.Viewport className="p-1">
            {options.map((col) => (
              <Select.Item
                key={col}
                value={col}
                className="px-3 py-2 text-sm rounded cursor-pointer text-foreground
                  hover:bg-accent hover:text-white focus:outline-none
                  data-[highlighted]:bg-accent data-[highlighted]:text-white"
              >
                <Select.ItemText>{col}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default function ColumnSelector({
  availableColumns,
  selectedColumns,
  columnCount,
  onColumnCountChange,
  onColumnChange,
  onSubmit,
  loading,
  lang,
  onLangToggle,
}) {
  if (availableColumns.length === 0) return null;

  const max = availableColumns.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Label.Root htmlFor="col-count" className="text-sm font-medium text-muted whitespace-nowrap">
          Number of columns
        </Label.Root>
        <input
          id="col-count"
          type="number"
          min={2}
          max={max}
          value={columnCount}
          onChange={(e) => onColumnCountChange(Number(e.target.value))}
          className="w-20 px-3 py-2 text-sm border border-border rounded-md
            text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {selectedColumns.map((value, index) => (
          <div key={index} className="flex flex-col gap-1">
            <Label.Root className="text-sm font-medium text-muted">
              Column {index + 1}
            </Label.Root>
            <StyledSelect
              value={value}
              onChange={(val) => onColumnChange(index, val)}
              options={availableColumns}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-4 py-2 rounded-md text-sm font-medium text-white
            bg-primary hover:bg-primary-hover
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <button
          onClick={onLangToggle}
          className="px-3 py-2 rounded-md border border-border text-sm
            font-medium text-foreground bg-white hover:border-accent
            transition-colors"
        >
          {lang === "en" ? "🇬🇧 EN" : "🇫🇷 FR"}
        </button>
      </div>
    </div>
  );
}