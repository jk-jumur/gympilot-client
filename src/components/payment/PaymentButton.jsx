"use client";

import {
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import ButtonLoader from "@/components/ui/ButtonLoader";

export default function PaymentButton({ price, onPay, paying }) {
  return (
    <div className="mt-6">
      <button
        onClick={onPay}
        disabled={paying}
        className="w-full py-5 rounded-2xl font-bold text-base
          bg-gradient-to-r from-orange-500 to-orange-600 text-white
          hover:from-orange-600 hover:to-orange-700
          shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50
          hover:-translate-y-0.5 active:translate-y-0
          transition-all duration-300
          flex items-center justify-center gap-3
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {paying ? (
          <ButtonLoader text="Processing payment" color="white" />
        ) : (
          <>
            <HiOutlineLockClosed className="h-5 w-5" />
            Pay ${price}.00 Securely
          </>
        )}
      </button>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 mt-5 text-[11px] text-stone-400">
        <span className="inline-flex items-center gap-1.5">
          <HiOutlineShieldCheck className="h-3.5 w-3.5" />
          SSL Encrypted
        </span>
        <span className="inline-flex items-center gap-1.5">
          <HiOutlineCheckCircle className="h-3.5 w-3.5" />
          Instant confirmation
        </span>
      </div>
    </div>
  );
}