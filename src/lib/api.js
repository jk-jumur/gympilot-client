const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ═══════════════════════════════════════════════════════
// Generic fetch wrapper
// ═══════════════════════════════════════════════════════
export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    ...options,
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || "API request failed");
  }
  return data;
}

// ═══════════════════════════════════════════════════════
// API Endpoints
// ═══════════════════════════════════════════════════════
export const api = {
  classes: {
    get: (id) => apiFetch(`/api/classes/${id}`),
    getAll: (params) => apiFetch(`/api/classes?${new URLSearchParams(params)}`),
    featured: () => apiFetch("/api/classes/featured"),
  },
  bookings: {
    check: (classId) => apiFetch(`/api/bookings/check/${classId}`),
    create: (classId) =>
      apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({ classId }),
      }),
  },
  favorites: {
    getAll: () => apiFetch("/api/favorites"),
    add: (classId) =>
      apiFetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ classId }),
      }),
    remove: (classId) =>
      apiFetch(`/api/favorites/${classId}`, { method: "DELETE" }),
  },
};


