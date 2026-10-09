"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "@/lib/toast";

const SPECIALTIES = [
  "Yoga",
  "Weights",
  "Cardio",
  "CrossFit",
  "Zumba",
  "Pilates",
];

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ApplyTrainerForm() {
  const [form, setForm] = useState({ experience: "", specialty: "" });
  const [submitting, setSubmitting] = useState(false);
  const [existing, setExisting] = useState(null);
  const [checking, setChecking] = useState(true);

  //  Already applied 
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(
          `${API}/api/trainer-applications/me`, 
          { credentials: "include" }
        );
        const data = await res.json();
        setExisting(data?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    };
    check();
  }, []);

  // new application submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.experience || !form.specialty) {
      toast.error("Please fill all fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        `${API}/api/trainer-applications`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            experience: Number(form.experience),
            specialty: form.specialty,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to apply");

      toast.success("Application submitted! Status: Pending");
      setExisting(data.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="p-6 max-w-xl space-y-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  //  Already applied — status
  if (existing) {
    const status = existing.status?.toLowerCase();
    return (
      <div className="p-6 max-w-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Trainer Application
        </h1>
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-medium">{existing.experience} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Specialty</p>
            <p className="font-medium">{existing.specialty}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {existing.status}
            </span>
          </div>
          {status === "rejected" && existing.feedback && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <strong className="text-sm">Admin Feedback:</strong>
              <p className="text-sm text-gray-700">{existing.feedback}</p>
            </div>
          )}
          <Link
            href="/dashboard"
            className="inline-block text-blue-600 underline text-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  //  Form
  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Apply as Trainer
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border shadow-sm p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience (years)
          </label>
          <input
            type="number"
            min="0"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialty
          </label>
          <select
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select specialty</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}