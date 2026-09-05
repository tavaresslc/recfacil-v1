import { type SubmitEvent, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { SearchResult } from "@/types/search-result";
import { SEARCH_FORM_LIMIT } from "@/constants/env";

interface SearchFormProps {
  isLoading: boolean;
  onSearch: (query: string) => void;
  results: SearchResult[] | null;
}

export function SearchForm({ isLoading, onSearch, results }: SearchFormProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch(query.trim());
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={`flex flex-col md:min-w-lg items-center justify-center gap-2 px-4 ${!results ? "flex-1" : ""}`}
    >
      <div
        className={`transition-all duration-300 ease-out px-2 ${!results ? "opacity-100 mb-4 sm:mb-6 text-center" : "opacity-0"}`}
      >
        {!results && (
          <>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              Encontre o profissional ideal
            </h1>

            <p className="text-sm md:text-base text-gray-500 mt-1">
              Descreva o perfil que você procura e nossa IA faz o match
            </p>
          </>
        )}
      </div>

      <InputGroup className="w-full max-w-lg md:py-6 md:px-2 gap-2 text-sm md:text-base">
        <InputGroupInput
          name="query"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: desenvolvedor full stack sênior"
          maxLength={SEARCH_FORM_LIMIT}
          disabled={isLoading}
          className="text-sm md:text-base"
        />

        <InputGroupAddon>
          <Search className="size-4 md:size-5" />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">
          <span className="text-xs md:text-sm text-gray-500">
            {query.length} / {SEARCH_FORM_LIMIT}
          </span>
        </InputGroupAddon>
      </InputGroup>

      <Button
        type="submit"
        disabled={!query.trim() || isLoading}
        suppressHydrationWarning
        className="w-full max-w-lg bg-linear-to-br from-blue-600 to-purple-600 md:py-5"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 md:size-5 mr-0.5 md:mr-1 animate-spin" />
            <span className="text-sm md:text-base">Buscando...</span>
          </>
        ) : (
          <>
            <Search className="size-4 md:size-5 mr-0.5 md:mr-1" />
            <span className="text-sm md:text-base">Buscar</span>
          </>
        )}
      </Button>
    </form>
  );
}
