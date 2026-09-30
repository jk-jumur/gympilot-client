"use client";

import { useState, useEffect } from "react";
import ClassHero from "./ClassHero";
import ClassInfoGrid from "./ClassInfoGrid";
import ClassAbout from "./ClassAbout";
import BookingCard from "./BookingCard";
import ClassSkeleton from "./ClassSkeleton";
import ClassErrorState from "./ClassErrorState";
import { api } from "@/lib/api";

export default function ClassDetailsClient({ id }) {
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchClass() {
      try {
        const data = await api.classes.get(id);
        if (!cancelled) setCls(data.data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load class");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchClass();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <ClassSkeleton />;
  if (error || !cls) return <ClassErrorState message={error} />;

  return (
    <>
      <ClassHero cls={cls} />

      <section className="bg-stone-50 dark:bg-stone-950 py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ⭐ items-start — fixes sticky jumping */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-2 space-y-6">
              <ClassInfoGrid cls={cls} />
              <ClassAbout cls={cls} />
            </div>

            <aside className="lg:col-span-1">
              <BookingCard cls={cls} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}