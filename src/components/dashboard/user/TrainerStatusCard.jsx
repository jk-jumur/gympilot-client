import Link from "next/link";

export default function TrainerStatusCard({ application }) {
  const status = application?.status?.toLowerCase();

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Trainer Application Status
      </h3>

      {!application && (
        <p className="text-gray-500">
          You haven't applied yet.{" "}
          <Link
            href="/dashboard/apply-trainer"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Apply now
          </Link>
        </p>
      )}

      {status === "pending" && (
        <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
          Pending — Your application is under review
        </span>
      )}

      {status === "approved" && (
        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Approved — You are now a Trainer 🎉
        </span>
      )}

      {status === "rejected" && (
        <div className="space-y-2">
          <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
            Rejected
          </span>
          {application?.feedback && (
            <p className="text-sm text-gray-700 bg-red-50 border border-red-200 p-3 rounded-lg">
              <strong>Admin Feedback:</strong> {application.feedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}