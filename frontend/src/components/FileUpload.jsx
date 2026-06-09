export default function FileUpload({ onFileSelected }) {
  function handleChange(e) {
    const file = e.target.files[0];
    if (file) onFileSelected(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted" htmlFor="file-input">
        Upload CSV or Excel file
      </label>
      <input
        id="file-input"
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleChange}
        className="block w-full text-sm text-muted
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-medium
          file:bg-primary file:text-white
          hover:file:bg-primary-hover
          cursor-pointer"
      />
    </div>
  );
}