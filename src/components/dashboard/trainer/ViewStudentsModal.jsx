"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ViewStudentsModal({ cls, onClose }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${API}/api/classes/${cls._id}/students`, {
          credentials: "include",
        });
        const data = await res.json();
        setStudents(data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [cls._id]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">
          Enrolled Students
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {cls.className || cls.name}
        </p>

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No students enrolled yet
          </p>
        ) : (
          <div className="space-y-2">
            {students.map((s) => (
              <div
                key={s._id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <img
                  src={s.userImage || "/default-avatar.png"}
                  alt={s.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm text-gray-800">
                    {s.userName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{s.userEmail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 rounded-lg border hover:bg-gray-50 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}