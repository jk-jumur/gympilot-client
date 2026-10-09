"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import {
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ApplicationDetailsModal({
  application,
  onClose,
  onAction,
}) {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAction = async (action) => {
    if (action === "reject" && !feedback.trim()) {
      toast.error("Please provide feedback before rejecting");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `${API}/api/trainer-applications/${application._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ action, feedback: feedback.trim() }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      toast.success(
        action === "approve"
          ? "Trainer approved successfully!"
          : "Application rejected"
      );

      onAction({
        ...application,
        status: action === "approve" ? "approved" : "rejected",
        feedback: feedback.trim(),
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-100 mb-1">
            Trainer Application
          </p>
          <h2 className="text-xl font-bold">Application Details</h2>
        </div>

        {/* Applicant Info */}
        <div className="p-6 space-y-5">
          {/* Applicant Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <img
              src={application.userImage || "/default-avatar.png"}
              alt={application.userName}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
              <p className="font-bold text-gray-800">
                {application.userName || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">{application.userEmail}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <div className="flex items-center gap-2 mb-1">
                <HiOutlineBriefcase className="h-4 w-4 text-indigo-600" />
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Experience
                </p>
              </div>
              <p className="text-lg font-bold text-gray-800">
                {application.experience} years
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-2 mb-1">
                <HiOutlineSparkles className="h-4 w-4 text-emerald-600" />
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Specialty
                </p>
              </div>
              <p className="text-lg font-bold text-gray-800">
                {application.specialty}
              </p>
            </div>
          </div>

          {/* Applied Time */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <HiOutlineCalendarDays className="h-4 w-4" />
            <span>
              Applied on{" "}
              {new Date(
                application.appliedAt || application.createdAt
              ).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin Feedback
              <span className="text-xs font-normal text-gray-400 ml-2">
                (required for reject)
              </span>
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Write your feedback for the applicant..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => handleAction("reject")}
              disabled={submitting}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 hover:border-red-300 disabled:opacity-50 transition-all"
            >
              <HiOutlineXCircle className="h-5 w-5" />
              Reject
            </button>
            <button
              onClick={() => handleAction("approve")}
              disabled={submitting}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:opacity-50 transition-all"
            >
              <HiOutlineCheckCircle className="h-5 w-5" />
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}