import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import PaymentClient from "@/components/payment/PaymentClient";

export const metadata = {
  title: "Payment",
  robots: { index: false, follow: false },
};

export default async function PaymentPage({ params }) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/login?redirect=/payment/${id}`);
  }

  return <PaymentClient classId={id} user={session.user} />;
}