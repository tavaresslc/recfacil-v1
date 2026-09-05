import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "./form-field";
import type { ReactNode } from "react";

interface SelectFieldProps {
  label: string;
  icon: ReactNode;
  placeholder: string;
  groupLabel: string;
  value: string;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string | null;
  touched: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
}

export function SelectField({
  label,
  icon,
  placeholder,
  groupLabel,
  value,
  options,
  required,
  error,
  onChange,
  onBlur,
  disabled,
}: SelectFieldProps) {
  const showError = !!error;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      showError={showError}
    >
      <Select
        value={value}
        onValueChange={(value) => {
          if (value) onChange(value);
        }}
        disabled={disabled}
      >
        <SelectTrigger
          onBlur={onBlur}
          className={showError ? "border-red-400 ring-1 ring-red-300" : ""}
        >
          <div className="flex items-center gap-2">
            {icon}
            <SelectValue placeholder={placeholder}>
              {options.find((o) => o.value === value)?.label}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent side="bottom" sideOffset={4}>
          <SelectGroup>
            <SelectLabel>{groupLabel}</SelectLabel>
            {options.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormField>
  );
}
