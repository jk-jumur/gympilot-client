export default function StatCard({ icon, label, value, color = "bg-blue-500" }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
      <div className={`${color} p-3 rounded-full`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}