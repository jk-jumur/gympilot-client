"use client";

import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import FavoriteClassCard from "./FavoriteClassCard";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function FavoriteClasses() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(
          `${API}/api/favorites`,                                     // ✅ FIXED
          { credentials: "include" }
        );
        const data = await res.json();
        setFavorites(data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      const res = await fetch(
        `${API}/api/favorites/${id}`,                                 // ✅ FIXED
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to remove");
      toast.success("Removed from favorites");
      setFavorites((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Favorite Classes</h1>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
          No favorite classes yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((fav) => (
            <FavoriteClassCard
              key={fav._id}
              favorite={fav}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}