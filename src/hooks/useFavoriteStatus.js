"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export function useFavoriteStatus(classId) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);   
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
        const fav = (data?.data || []).find((f) => f.classId === classId);
        if (!cancelled) {
          setIsFavorite(!!fav);
          setFavoriteId(fav?._id || null);              
        }
      } catch (err) {
        if (!cancelled) {
          setIsFavorite(false);
          setFavoriteId(null);                        
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [classId, user, isPending]);

  return { isFavorite, setIsFavorite, favoriteId, setFavoriteId, loading };
                                       
}