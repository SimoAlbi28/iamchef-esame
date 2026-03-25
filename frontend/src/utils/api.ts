const DEFAULT_API_BASE_URL = "/api";

export const getApiBaseUrl = (): string => {
  const configuredBaseUrl = (import.meta.env.VITE_BASE_URL ?? "").trim();

  if (
    configuredBaseUrl.length === 0 ||
    configuredBaseUrl === "undefined" ||
    configuredBaseUrl === "null"
  ) {
    return DEFAULT_API_BASE_URL;
  }

  return configuredBaseUrl.replace(/\/+$/, "");
};

/**
 * Helper to get the auth token from localStorage (Zustand persist store).
 */
const getAuthToken = (): string | null => {
  try {
    const stored = sessionStorage.getItem("auth-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed?.state?.token ?? null;
    }
  } catch {
    // ignore parse errors
  }
  return null;
};

export const fetchJson = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string> ?? {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...init, headers });
  const contentType = response.headers.get("content-type") ?? "";
  const rawBody = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  if (!contentType.includes("application/json")) {
    const bodyPreview = rawBody.slice(0, 80).replace(/\s+/g, " ").trim();
    throw new Error(
      `Risposta non JSON ricevuta. Verifica VITE_BASE_URL e l'endpoint chiamato. Anteprima: ${bodyPreview}`,
    );
  }

  try {
    return JSON.parse(rawBody) as T;
  } catch {
    throw new Error("Risposta JSON non valida ricevuta dall'API.");
  }
};
