const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/sraa-api";
const API_URL = rawApiUrl.replace(/\/+$/, "");

function buildUrl(path) {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, headers = {}, auth = true } = options;
  const token = sessionStorage.getItem("token");

  const response = await fetch(buildUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.message || "Error al comunicarse con el servidor");
  }

  return payload;
}

export { API_URL };

