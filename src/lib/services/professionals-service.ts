import mock from "@/mocks/search-results.json";
import type { SearchResult } from "@/types/search-result";
import { wait } from "@/lib/utils/async";

const SEARCH_DELAY_MS = 1500;

export async function searchProfessionals(): Promise<SearchResult[]> {
  await wait(SEARCH_DELAY_MS);
  return mock as SearchResult[];
}

export function getProfessionalById(id?: string): SearchResult | undefined {
  return (mock as SearchResult[]).find((item) => item.id === id);
}