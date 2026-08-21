function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export const API_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_URL?.trim() ||
    "http://localhost:5000",
);

export const API_V1_URL = `${API_URL}/api/v1`;
