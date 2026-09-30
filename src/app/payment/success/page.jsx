import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import PaymentSuccess from "@/components/payment/PaymentSuccess";

export const metadata = {
  title: "Payment Success",
  robots: { index: false, follow: false },
};

export default async function PaymentSuccessPage({ searchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const params = await searchParams;
  const sessionId = params.session_id;
  const cookie = (await headers()).get("cookie") || "";

  if (!sessionId) {
    redirect("/dashboard/booked-classes");
  }

  let verified = false;
  let bookingData = null;

  try {
    const verifyRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify/${sessionId}`,
      { headers: { cookie } }
    );
    const verifyData = await verifyRes.json();

    if (verifyData.success && verifyData.paid) {
      verified = true;
      bookingData = verifyData.session;

      // ⭐ Confirm booking (fallback)
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/confirm/${sessionId}`,
        { method: "POST", headers: { cookie } }
      );
    }
  } catch (err) {
    console.error("Verify error:", err);
  }

  if (!verified) {
    redirect("/dashboard/booked-classes");
  }

  return <PaymentSuccess cls={bookingData?.metadata} />;
}