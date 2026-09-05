import { AlertCircle, Check } from "lucide-react";
import { InputGroupAddon } from "@/components/ui/input-group";

interface StatusIconProps {
  touched: boolean;
  error?: string | null;
  value: string;
  optional?: boolean;
}

export function StatusIcon({ error, value, optional = false }: StatusIconProps) {
  //if (!touched) return null;

  if (error) {
    return (
      <InputGroupAddon align="inline-end">
        <AlertCircle className="size-4 text-red-500" />
      </InputGroupAddon>
    );
  }

  if (value || !optional) {
    return (
      <InputGroupAddon align="inline-end">
        <Check className="size-4 text-emerald-500" />
      </InputGroupAddon>
    );
  }

  return null;
}