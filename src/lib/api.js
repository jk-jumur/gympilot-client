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
  if (!res.ok || !data.success) {
    throw new Error(data.message || data.error || "API request failed");
  }
  return data;
}

// ═══════════════════════════════════════════════════════
// API Endpoints 
// ═══════════════════════════════════════════════════════
export const api = {
  classes: {
    get: (id) => apiFetch(`/api/classes/${id}`),
    getAll: (params) =>
      apiFetch(`/api/classes?${new URLSearchParams(params)}`),
    featured: () => apiFetch(`/api/classes/featured`),
  },

  bookings: {
    check: (classId) => apiFetch(`/api/bookings/check/${classId}`),
    getAll: () => apiFetch(`/api/bookings`),
    create: (data) =>
      apiFetch(`/api/bookings`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  favorites: {
    getAll: () => apiFetch(`/api/favorites`),
    add: (cls) =>
      apiFetch(`/api/favorites`, {
        method: "POST",
        body: JSON.stringify({
          classId: cls._id,
          className: cls.className,
          trainerName: cls.trainerName,
          price: cls.price,
          image: cls.image,
        }),
      }),
    remove: (id) =>
      apiFetch(`/api/favorites/${id}`, { method: "DELETE" }),
  },

  applications: {
    getMy: () => apiFetch(`/api/trainer-applications/me`),
    create: (data) =>
      apiFetch(`/api/trainer-applications`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};