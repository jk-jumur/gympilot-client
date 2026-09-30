"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export function useBookingStatus(classId) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⭐ Wait for session to load
    if (isPending) return;

    // ⭐ Not logged in → skip API call silently
    if (!user) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function check() {
      try {
        const data = await api.bookings.check(classId);
        if (!cancelled) setIsBooked(!!data.booked);
      } catch (err) {
        // ⭐ Silent fail — user might not be logged in
        if (!cancelled) setIsBooked(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [classId, user, isPending]);

  return { isBooked, setIsBooked, loading };
}