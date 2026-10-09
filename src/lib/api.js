const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ═══════════════════════════════════════════════════════
// Generic fetch wrapper
// ═══════════════════════════════════════════════════════
export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  const data = await res.json();

  // ✅ Backend uses `error` field — check it first
  if (!res.ok || !data.success) {
    throw new Error(data.error || data.message || "API request failed");
  }

  return data;
}

// ═══════════════════════════════════════════════════════
// API Endpoints — Grouped by resource
// ═══════════════════════════════════════════════════════
export const api = {
  // ──────────────────────────────────────────────────────
  // CLASSES
  // ──────────────────────────────────────────────────────
  classes: {
    // Public
    getAll: (params = {}) =>
      apiFetch(`/api/classes?${new URLSearchParams(params)}`),
    get: (id) => apiFetch(`/api/classes/${id}`),
    featured: () => apiFetch(`/api/classes/featured`),

    // Trainer only
    trainerMy: () => apiFetch(`/api/classes/trainer/my`),

    create: (data) =>
      apiFetch(`/api/classes`, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      apiFetch(`/api/classes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      apiFetch(`/api/classes/${id}`, { method: "DELETE" }),

    students: (id) => apiFetch(`/api/classes/${id}/students`),
  },

  // ──────────────────────────────────────────────────────
  // BOOKINGS
  // ──────────────────────────────────────────────────────
  bookings: {
    getAll: () => apiFetch(`/api/bookings`),
    check: (classId) => apiFetch(`/api/bookings/check/${classId}`),
    create: (data) =>
      apiFetch(`/api/bookings`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  // ──────────────────────────────────────────────────────
  // FAVORITES
  // ──────────────────────────────────────────────────────
  favorites: {
    getAll: () => apiFetch(`/api/favorites`),

    add: (cls) =>
      apiFetch(`/api/favorites`, {
        method: "POST",
        body: JSON.stringify({
          classId: cls._id,
          className: cls.className || cls.name,
          trainerName: cls.trainerName || cls.trainer,
          price: cls.price,
          image: cls.image,
        }),
      }),

    remove: (id) =>
      apiFetch(`/api/favorites/${id}`, { method: "DELETE" }),
  },

  // ──────────────────────────────────────────────────────
  // TRAINER APPLICATIONS
  // ──────────────────────────────────────────────────────
  applications: {
    getMy: () => apiFetch(`/api/trainer-applications/me`),
    create: (data) =>
      apiFetch(`/api/trainer-applications`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  // ──────────────────────────────────────────────────────
  // FORUM
  // ──────────────────────────────────────────────────────
  forum: {
    getAll: (params = {}) =>
      apiFetch(`/api/forum?${new URLSearchParams(params)}`),
    get: (id) => apiFetch(`/api/forum/${id}`),
    my: () => apiFetch(`/api/forum/my`),

    create: (data) =>
      apiFetch(`/api/forum`, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    remove: (id) =>
      apiFetch(`/api/forum/${id}`, { method: "DELETE" }),

    // Optional — if backend supports
    like: (id) =>
      apiFetch(`/api/forum/${id}/like`, { method: "POST" }),
    dislike: (id) =>
      apiFetch(`/api/forum/${id}/dislike`, { method: "POST" }),

    comment: (postId, data) =>
      apiFetch(`/api/forum/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    deleteComment: (postId, commentId) =>
      apiFetch(`/api/forum/${postId}/comments/${commentId}`, {
        method: "DELETE",
      }),

    editComment: (postId, commentId, data) =>
      apiFetch(`/api/forum/${postId}/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },

  // ──────────────────────────────────────────────────────
  // PAYMENTS (Stripe)
  // ──────────────────────────────────────────────────────
  payments: {
    createCheckout: (classId) =>
      apiFetch(`/api/payments/create-checkout-session`, {
        method: "POST",
        body: JSON.stringify({ classId }),
      }),
    verify: (sessionId) => apiFetch(`/api/payments/verify/${sessionId}`),
  },

  // ──────────────────────────────────────────────────────
  // USERS (Admin)
  // ──────────────────────────────────────────────────────
  users: {
    getAll: () => apiFetch(`/api/users`),
    block: (id) =>
      apiFetch(`/api/users/${id}/block`, { method: "PATCH" }),
    unblock: (id) =>
      apiFetch(`/api/users/${id}/unblock`, { method: "PATCH" }),
    makeAdmin: (id) =>
      apiFetch(`/api/users/${id}/make-admin`, { method: "PATCH" }),
  },
};