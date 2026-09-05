import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HOME_PATH = "/";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-3 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 border-b border-gray-200 flex-wrap">
      <Logo />
    </header>
  );
}

function Logo() {
  return (
    <Link
      to={HOME_PATH}
      draggable={false}
      className="flex items-center gap-2 select-none cursor-auto"
    >
      <div className="inline-flex items-center justify-center size-8 sm:size-9 rounded-xl bg-linear-to-br from-blue-600 to-purple-600 shrink-0">
        <Sparkles className="size-4 sm:size-5 text-gray-50" />
      </div>
      <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">
        RecFacil
      </span>
    </Link>
  );
}
