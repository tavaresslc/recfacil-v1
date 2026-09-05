import { useEffect, useState } from "react";

interface IbgeCity {
  id: number;
  nome: string;
}

interface UseCitiesByUfResult {
  cities: string[];
  loading: boolean;
  error: string | null;
}

/**
 * Busca os municípios de um estado (UF) na API do IBGE.
 * Retorna a lista de nomes já ordenada alfabeticamente.
 */
export function useCitiesByUf(uf: string): UseCitiesByUfResult {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uf) {
      return;
    }

    const controller = new AbortController();

    async function fetchCities() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Falha ao buscar cidades");

        const data: IbgeCity[] = await res.json();
        const names = data.map((city) => city.nome).sort((a, b) => a.localeCompare(b, "pt-BR"));
        setCities(names);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Não foi possível carregar as cidades");
        setCities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
    return () => controller.abort();
  }, [uf]);

  return { cities, loading, error };
}