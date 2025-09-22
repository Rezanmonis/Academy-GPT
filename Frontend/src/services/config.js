// Centralized configuration for API base URL
export const BASE_URL = (import.meta?.env?.VITE_BASE_URL || import.meta?.env?.VITE_BASE_UR || "").replace(/\/+$/, "");

export const buildUrl = (endpoint = "") => {
  const sanitizedEndpoint = String(endpoint).replace(/^\/+/, "");
  return `${BASE_URL}/${sanitizedEndpoint}`;
};


