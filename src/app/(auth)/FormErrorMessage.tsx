"use client";
import { faCircleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FormErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="mb-5">
      <small className="mt-1 flex items-center gap-1 text-sm text-red-300">
        <FontAwesomeIcon icon={faCircleExclamation} />
        <span>{errorMessage}</span>
      </small>
    </div>
  );
}
