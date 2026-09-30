"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export function useFavoriteStatus(classId) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⭐ Wait for session
    if (isPending) return;

    // ⭐ Not logged in → skip
    if (!user) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function check() {
      try {
        const data = await api.favorites.getAll();
        const isFav = data.data.some((f) => f.classId === classId);
        if (!cancelled) setIsFavorite(isFav);
      } catch (err) {
        // ⭐ Silent fail
        if (!cancelled) setIsFavorite(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [classId, user, isPending]);

  return { isFavorite, setIsFavorite, loading };
}