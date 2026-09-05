import { ChevronRight, MapPin } from "lucide-react";
import type { SearchResult } from "@/types/search-result";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils/avatar";

interface ResultsListProps {
  results: SearchResult[] | null;
  selectedResult: SearchResult | null;
  setSelectedResult: (result: SearchResult | null) => void;
  color: (compatibilidade: number) => string;
}

export function ResultsList({
  results,
  selectedResult,
  setSelectedResult,
  color,
}: ResultsListProps) {
  return (
    <aside
      className={`${selectedResult ? "hidden sm:flex" : "flex"} flex-col h-full w-full sm:w-1/3 sm:max-w-sm shrink-0 bg-white shadow-md sm:border-r border-gray-200 overflow-hidden`}
    >
      <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 select-none">
        <span className="text-sm font-semibold text-gray-700 ">
          {results?.length} resultado{results?.length === 1 ? "" : "s"}
        </span>
        <span className="text-sm text-gray-400">por compatibilidade</span>
      </div>
      {results?.length ? (
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-thin ">
          {results.map((r) => (
            <button
              key={r.id}
              className={`w-full text-left p-4 hover:bg-blue-50 transition-colors flex items-center gap-4 ${selectedResult?.id === r.id ? "bg-indigo-50 border-l-2 border-indigo-500" : ""}`}
              onClick={() => setSelectedResult(r)}
            >
              <Avatar size="lg" className="shrink-0">
                <AvatarImage src={r.picture} />
                <AvatarFallback className="bg-gray-200 text-gray-500">
                  {getInitials(r.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-900 text-sm truncate">
                    {r.name}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${color(r.chunks[0]?.match || 0)}`}
                  >
                    {r.chunks[0]?.match || 0}%
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-0.5">{r.title}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                  <MapPin className="size-3 shrink-0" />
                  <span className="truncate">
                    {r.city}, {r.uf}
                  </span>
                </div>
              </div>
              <ChevronRight className="size-4 text-gray-300 shrink-0" />
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center mt-8">
          Nenhum resultado encontrado.
        </p>
      )}
    </aside>
  );
}
