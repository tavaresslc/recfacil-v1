import { useState } from "react";
import { ResultDetails } from "./results-details";
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
      <ResultDetails
        result={selectedResult}
        color={getMatchColor}
        onBack={() => setSelectedResult(null)}
      />
    </div>
  );
}