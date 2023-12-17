interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  register?: any;
  error?: string | null;
}

export default function FormField({
  label,
  name,
  type,
  placeholder,
  error,
}: Props) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-semibold text-slate-200"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`flex w-full items-center justify-between rounded border ${
          error ? "border-red-500" : "border-slate-600"
        } bg-slate-800 p-3 text-start text-slate-50 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500`}
      />
      {error ? (
        <span className="mt-1 text-xs text-red-500">{error}</span>
      ) : null}
    </div>
  );
}
