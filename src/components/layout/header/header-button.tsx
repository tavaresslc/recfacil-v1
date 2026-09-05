import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface HeaderButtonProps {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function HeaderButton({
  icon,
  label,
  href,
  onClick,
  disabled,
  loading,
}: HeaderButtonProps) {
  const content = (
    <span className="flex items-center gap-2">
      {loading ? <Loader2 className="size-5 animate-spin" /> : icon}
      <span className="text-base sm:text-lg hidden sm:inline whitespace-nowrap">
        {loading ? "Salvando..." : label}
      </span>
    </span>
  );

  if (href) {
    return (
      <Button variant="outline" size="sm" className="gap-2 p-2 sm:p-4">
        <Link to={href} draggable={false}>
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant={label === "Salvar" ? "default" : "outline"}
      size="sm"
      className={
        "gap-2 p-2 sm:p-4" +
        (label === "Salvar"
          ? " bg-linear-to-br from-blue-600 to-purple-600 text-gray-50 hover:from-blue-700 hover:to-purple-700"
          : "")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Button>
  );
}
