import { Field, FieldLabel } from "@/components/ui/field";
import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string | null;
  showError: boolean;
  hint?: string;
  children: ReactNode;
}

export function FormField({
  label,
  required,
  error,
  showError,
  hint,
  children,
}: FormFieldProps) {
  return (
    <Field className="flex flex-col gap-2">
      <FieldLabel>
        {label}
        {required && "*"}
      </FieldLabel>
      {children}
      <div className="h-5">
        {showError && error ? (
          <span className="text-xs text-red-500 block w-full truncate">{error}</span>
        ) : hint ? (
          <span className="text-xs text-gray-400 block w-full truncate">{hint}</span>
        ) : null}
      </div>
    </Field>
  );
}