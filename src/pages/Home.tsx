import { useState } from "react";

import { SearchForm } from "@/components/search/search-form";
import { ResultsSheet } from "@/components/search/results-sheet";
import type { SearchResult } from "@/types/search-result";
import { searchProfessionals } from "@/lib/services/professionals-service";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  async function handleSearch(query: string) {
    const lastResults = results;

    setIsLoading(true);
    setResults(null);

    if (query === lastQuery) {
      setTimeout(() => {
        setResults(lastResults);
        setIsLoading(false);
      }, 1500);
      return;
    }

    try {
      console.log("Buscando por:", query);
      const data = await searchProfessionals();

      setResults(data);
    } finally {
      setIsLoading(false);
      setLastQuery(query);
    }
  }

  return (
    <main
      className={`flex flex-col items-center flex-1 min-h-0 w-full gap-4 sm:gap-6 ${!results ? "justify-between" : "pt-4 sm:pt-8"}`}
    >
      <SearchForm
        isLoading={isLoading}
        onSearch={handleSearch}
        results={results}
      />

      <div
        className={`flex border-t border-gray-200 w-full bg-gray-50 items-center justify-center transition-all duration-300 ease-out ${!results ? "opacity-100 flex-1" : "opacity-0 h-0"}`}
      >
        {!results && (
          <div className="flex flex-col items-center justify-center gap-8 px-2 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl w-full">
              {[
                {
                  label: "Busca semântica por IA",
                  desc: "Descreva em linguagem natural",
                },
                {
                  label: "Match inteligente",
                  desc: "Ranking por compatibilidade",
                },
                {
                  label: "Chat sobre o profissional",
                  desc: "Pergunte detalhes específicos",
                },
              ].map((f) => (
                <div
                  key={f.label}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-center"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {f.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {results && <ResultsSheet results={results} />}
    </main>
  );
}
