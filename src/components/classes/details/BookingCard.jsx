"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineHeart,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineArrowPath,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useBookingStatus } from "@/hooks/useBookingStatus";
import { useFavoriteStatus } from "@/hooks/useFavoriteStatus";
import ButtonLoader from "@/components/ui/ButtonLoader";

const INCLUDED = [
  "Full class access",
  "Expert trainer guidance",
  "Community support",
  "Progress tracking",
];

const TRUST = [
  { icon: HiOutlineShieldCheck, text: "Secure booking" },
  { icon: HiOutlineArrowPath, text: "Cancel anytime" },
  { icon: HiOutlineCalendarDays, text: "Flexible schedule" },
];

export default function BookingCard({ cls }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const { isBooked, setIsBooked, loading: checkingBooking } = useBookingStatus(cls._id);
 const {
  isFavorite,
  setIsFavorite,
  favoriteId,
  loading: checkingFavorite,
} = useFavoriteStatus(cls._id);

  const [booking, setBooking] = useState(false);
  const [favoriting, setFavoriting] = useState(false);

  const checking = checkingBooking || checkingFavorite;

  async function handleBook() {
  if (!user) {
    toast.error("Please login to book this class");
    router.push(`/login?redirect=/classes/${cls._id}`);
    return;
  }

  if (isBooked) {
    toast.error("You have already booked this class");
    return;
  }

  // ⭐ Redirect to payment page
  router.push(`/payment/${cls._id}`);
}



async function handleFavorite() {
  if (!user) {
    toast.error("Please login to save favorites");
    router.push(`/login?redirect=/classes/${cls._id}`);
    return;
  }

  setFavoriting(true);
  try {
    if (isFavorite && favoriteId) {
      await api.favorites.remove(favoriteId);
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      await api.favorites.add(cls);
      setIsFavorite(true);
      toast.success("Successfully added to your favorites!");
    }
  } catch (err) {
    toast.error(err.message || "Action failed");
  } finally {
    setFavoriting(false);
  }
}
  

  return (
    // ⭐ lg:sticky — only on desktop, no jump on mobile
    <div className="lg:sticky lg:top-24 space-y-4">

      {/* Main Booking Card */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xl shadow-stone-900/5 dark:shadow-black/20">

        {/* Price Section */}
        <div className="px-6 pt-6 pb-5 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
                ${cls.price}
              </span>
              <span className="text-sm text-stone-500 dark:text-stone-400 font-medium">
                / session
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-3">

          {/* Book Button */}
          {isPending || checking ? (
            <button
              disabled
              className="w-full py-4 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-500 font-bold text-sm flex items-center justify-center"
            >
              <ButtonLoader text="Checking" color="stone" />
            </button>
          ) : isBooked ? (
            <button
              onClick={() => toast.error("You have already booked this class")}
              className="w-full py-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm
                border border-emerald-500/30 hover:bg-emerald-500/20
                flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <HiOutlineCheckCircle className="h-5 w-5" />
              Already Booked
            </button>
          ) : (
            <button
              onClick={handleBook}
              disabled={booking}
              className="group w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm
                hover:from-orange-600 hover:to-orange-700
                shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50
                hover:-translate-y-0.5 active:translate-y-0
                transition-all duration-300 flex items-center justify-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {booking ? (
                <ButtonLoader text="Booking" color="white" />
              ) : (
                <>
                  <HiOutlineBolt className="h-5 w-5" />
                  Book Now
                </>
              )}
            </button>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            disabled={favoriting || checking}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm border
              transition-all duration-300 flex items-center justify-center gap-2
              disabled:opacity-60 disabled:cursor-not-allowed
              hover:-translate-y-0.5 active:translate-y-0
              ${
                isFavorite
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
                  : "bg-transparent text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
          >
            {favoriting ? (
              <ButtonLoader
                text={isFavorite ? "Removing" : "Saving"}
                color={isFavorite ? "orange" : "stone"}
              />
            ) : (
              <>
                <HiOutlineHeart className={`h-5 w-5 ${isFavorite ? "fill-rose-500" : ""}`} />
                {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
              </>
            )}
          </button>
        </div>

        {/* Included List */}
        <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-stone-800">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">
            Whats included
          </p>
          <ul className="space-y-2.5">
            {INCLUDED.map((text) => (
              <li
                key={text}
                className="flex items-center gap-2.5 text-xs text-stone-600 dark:text-stone-400"
              >
                <HiOutlineCheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="rounded-3xl bg-stone-100 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 p-5">
        <div className="grid grid-cols-3 gap-3">
          {TRUST.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="text-center">
                <Icon className="h-5 w-5 text-stone-500 dark:text-stone-400 mx-auto mb-1.5" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 leading-tight">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Note */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
        <HiOutlineLockClosed className="h-3.5 w-3.5" />
        Your payment is secure and encrypted
      </div>
    </div>
  );
}