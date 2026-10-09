"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "@/lib/toast";
import PaymentHeader from "./PaymentHeader";
import PaymentSummary from "./PaymentSummary";
import PaymentButton from "./PaymentButton";
import PaymentSkeleton from "./PaymentSkeleton";

export default function PaymentClient({ classId, user }) {
  const router = useRouter();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchClass() {
      try {
        const data = await api.classes.get(classId);
        if (!cancelled) setCls(data.data);
      } catch (err) {
        if (!cancelled) {
          toast.error("Failed to load class");
          router.push("/classes");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchClass();
    return () => {
      cancelled = true;
    };
  }, [classId, router]);

  // ⭐ STRIPE CHECKOUT
  async function handlePayment() {
    setPaying(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ classId }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        // ✅ data.message ও handle করো
        throw new Error(
          data.message || data.error || "Failed to create checkout session"
        );
      }

      // ⭐ Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.message || "Payment failed");
      setPaying(false);
    }
  }

  if (loading) return <PaymentSkeleton />;
  if (!cls) return null;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PaymentHeader />
        <PaymentSummary cls={cls} />
        <PaymentButton
          price={cls.price}
          paying={paying}
          onPay={handlePayment}
        />

        {user && (
          <p className="text-center text-[11px] text-stone-400 mt-6">
            Booking as{" "}
            <span className="font-semibold text-stone-600 dark:text-stone-300">
              {user.email}
            </span>
          </p>
        )}

        <div className="mt-8 p-5 rounded-2xl bg-orange-500/5 border border-orange-500/20">
          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
            <strong className="text-orange-600 dark:text-orange-400">
              Secure Payment:
            </strong>{" "}
            You'll be redirected to{" "}
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              Stripe Checkout
            </span>{" "}
            to complete your payment. Test card:{" "}
            <code className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[10px] font-mono">
              4242 4242 4242 4242
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}