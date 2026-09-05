import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FormField } from "./form-field";
import { StatusIcon } from "./status-icon";
import type { ReactNode } from "react";

interface TextFieldProps {
  label: string;
  icon: ReactNode;
  value: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string | null;
  touched: boolean;
  maxLength?: number;
  inputMode?: "text" | "numeric" | "tel" | "email" | "url";
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function TextField({
  label,
  icon,
  value,
  placeholder,
  required,
  optional,
  disabled,
  hint,
  error,
  touched,
  maxLength,
  inputMode,
  onChange,
  onBlur,
}: TextFieldProps) {
  const showError = !!error;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      showError={showError}
      hint={hint}
    >
      <InputGroup>
        <InputGroupAddon>{icon}</InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          inputMode={inputMode}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete="new-password"
          aria-invalid={showError}
          className={
            showError ? "border-red-400 focus-visible:ring-red-300" : ""
          }
        />
        <StatusIcon
          touched={touched}
          error={error}
          value={value}
          optional={optional}
        />
      </InputGroup>
    </FormField>
  );
}
