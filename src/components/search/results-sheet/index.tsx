import { useState } from "react";
import { ResultsList } from "./results-list";
import type { SearchResult } from "@/types/search-result";
import { getMatchColor } from "@/lib/utils/match";

interface ResultsSheetProps {
  results: SearchResult[] | null;
}

export function ResultsSheet({ results }: ResultsSheetProps) {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null,
  );

  return (
    <div
      className={`flex h-full min-h-0 w-full bg-gray-50 flex-1 border-t border-gray-200 overflow-hidden transition-all duration-300 ease-out ${results ? "opacity-100 h-2/3" : "opacity-0 h-0"}`}
    >
      <ResultsList
        results={results}
        selectedResult={selectedResult}
        setSelectedResult={setSelectedResult}
        color={getMatchColor}
      />

      <div
        className={`${selectedResult ? "flex" : "hidden sm:flex"} flex-1 w-full flex-col items-center justify-center text-center px-8 select-none`}
      >
        <p className="text-gray-500 text-sm mt-2 max-w-xs">
          {selectedResult
            ? `Em breve: converse com a IA sobre ${selectedResult.name}.`
            : "Selecione um profissional na lista para ver mais detalhes."}
        </p>
      </div>
    </div>
  );
}
