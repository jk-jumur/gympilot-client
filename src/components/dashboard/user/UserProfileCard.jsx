export default function UserProfileCard({ user, role }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row items-center gap-6">
      <img
        src={user?.image || "/default-avatar.png"}
        alt="profile"
        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
      />
      <div className="space-y-1 text-center md:text-left">
        <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {role}
        </span>
      </div>
    </div>
  );
}