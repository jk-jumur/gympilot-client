import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function FavoriteClassCard({ favorite, onRemove }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col hover:shadow-md transition">
      <img
        src={favorite.image || "/placeholder.jpg"}
        alt={favorite.className}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {favorite.className}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            by {favorite.trainerName}
          </p>
          <p className="text-blue-600 font-bold mt-2">${favorite.price}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/classes/${favorite.classId}`}
            className="flex-1 text-center px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            View
          </Link>
          <button
            onClick={() => onRemove(favorite._id)}
            className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-1 transition"
          >
            <FaTrash size={12} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}