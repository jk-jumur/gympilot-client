"use client";

import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import UpdateClassModal from "./UpdateClassModal";
import ViewStudentsModal from "./ViewStudentsModal";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState(null);
  const [viewingClass, setViewingClass] = useState(null);

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API}/api/classes/trainer/my`, {
        credentials: "include",
      });
      const data = await res.json();
      setClasses(data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    try {
      const res = await fetch(`${API}/api/classes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Class deleted");
      setClasses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-40 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">My Classes</h1>

      {classes.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
          No classes yet. Create your first class!
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-4">Class Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    {c.className || c.name}
                  </td>
                  <td className="p-4 text-gray-600">{c.category || "—"}</td>
                  <td className="p-4 text-gray-600">${c.price}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        (c.status || "").toLowerCase() === "approved"
                          ? "bg-green-100 text-green-700"
                          : (c.status || "").toLowerCase() === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {c.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingClass(c)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      onClick={() => setViewingClass(c)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                    >
                      <FaUsers /> Students
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingClass && (
        <UpdateClassModal
          cls={editingClass}
          onClose={() => setEditingClass(null)}
          onUpdate={(updated) => {
            setClasses((prev) =>
              prev.map((c) => (c._id === updated._id ? updated : c))
            );
            setEditingClass(null);
          }}
        />
      )}

      {viewingClass && (
        <ViewStudentsModal
          cls={viewingClass}
          onClose={() => setViewingClass(null)}
        />
      )}
    </div>
  );
}