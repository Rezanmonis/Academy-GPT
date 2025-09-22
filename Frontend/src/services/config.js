// Centralized configuration for API base URL
// Fallback to hardcoded backend if env is absent to avoid using frontend origin
export const BASE_URL = (
  import.meta?.env?.VITE_BASE_URL || "https://api.academygpt.net"
).replace(/\/+$/, "");

export const buildUrl = (endpoint = "") => {
  const sanitizedEndpoint = String(endpoint).replace(/^\/+/, "");
  return `${BASE_URL}/${sanitizedEndpoint}`;
};


