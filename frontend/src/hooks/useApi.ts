import { useEffect, useState } from "react";
import { fetchJson, getApiBaseUrl } from "../utils/api";

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
}

function useApi<T = any>(url: string): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchJson<unknown>(url)

        if (!cancelled) {
          if (Array.isArray(result)) {
            setData(result as unknown as T)
          } else if (result && typeof result === 'object' && 'results' in result) {
            // @ts-ignore - we check at runtime
            setData(result.results)
          } else {
            setData(result as T)
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    if (url.length>0) fetchData();

    return () => {
      cancelled = true
    }
  }, [url]);

  return { data, loading, error }
}

/**
 * Costruisce l'URL per la ricerca ingredienti (backend proxy, no apiKey).
 */
export const getIngredientURL = (query: string) => {
  const ENDPOINT = "/ingredients/search";
  const RESULT_NUM = 10;
  return `${getApiBaseUrl()}${ENDPOINT}?query=${query}&number=${RESULT_NUM}`;
}

/**
 * Costruisce l'URL per la ricerca ricette (backend proxy, no apiKey).
 */
export const getRecipesURL = (ingredients: string) => {
  const ENDPOINT = "/recipes/findByIngredients";
  const RESULT_NUM = 10;
  return `${getApiBaseUrl()}${ENDPOINT}?ingredients=${ingredients}&number=${RESULT_NUM}`;
}

export default useApi
