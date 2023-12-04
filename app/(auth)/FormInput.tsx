import { faCircleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string | null;
}

export default function FormInput({
  label,
  id,
  type,
  placeholder,
  register,
  error,
}: Props) {
  return (
    <div className="mb-5">
      <label
        className="mb-1 block text-sm font-semibold text-slate-200"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="flex w-full items-center justify-between rounded border-2 border-slate-600 bg-slate-800 p-3 text-start text-slate-50 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        {...register}
      />
      {error && (
        <small className="mt-1 flex items-center gap-1 text-sm text-red-300">
          <FontAwesomeIcon icon={faCircleExclamation} />
          <span>{error}</span>
        </small>
      )}
    </div>
  );
}
