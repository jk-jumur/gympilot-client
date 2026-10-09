"use client";

import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import { HiOutlineCreditCard } from "react-icons/hi2";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await fetch(`${API}/api/payments/transactions`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setTransactions(data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTx();
  }, []);

  const totalRevenue = transactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-56 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
          <p className="text-sm text-gray-500 mt-1">
            All Stripe payments across the platform
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Total Revenue
          </p>
          <p className="text-xl font-bold text-emerald-600">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <HiOutlineCreditCard className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No transactions yet
          </h3>
          <p className="text-sm text-gray-500">
            Payments will appear here once students book classes
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    User Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Amount
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">
                        {t.userEmail}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-emerald-600">
                        ${(t.amount || 0).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {new Date(t.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">
                        {t.transactionId?.slice(0, 24) || "—"}...
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}