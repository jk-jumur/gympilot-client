"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API = "";

const PIE_COLORS = [
  "#F97316",
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#EF4444",
  "#F59E0B",
  "#EC4899",
];

// 👈 Custom Tooltip component (outside)
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white px-3 py-2 text-xs shadow-lg dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
      <div className="font-bold text-[#171717] dark:text-white">
        {label || payload[0]?.name}
      </div>
      {payload.map((p, i) => (
        <div key={i} className="mt-1 text-[#737373] dark:text-[#A0A0A0]">
          {p.name}:{" "}
          <span className="font-semibold text-[#F97316]">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ChartsSection() {
  const [charts, setCharts] = useState({ bar: [], line: [], pie: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const res = await fetch(`${API}/api/stats/charts`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setCharts(data.data);
        }
      } catch (err) {
        console.error("Charts fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-neutral-800 lg:col-span-2" />
        <div className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-neutral-800" />
        <div className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-neutral-800" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      
      {/* ═══ BAR CHART ═══ */}
      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
            📊 Bookings — Last 6 Months
          </h3>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts.bar}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={1} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E7E5E4"
                vertical={false}
                opacity={0.5}
              />
              <XAxis
                dataKey="month"
                stroke="#A3A3A3"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#A3A3A3"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="bookings"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ═══ LINE CHART ═══ */}
      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
          📈 User Growth
        </h3>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={charts.line}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E7E5E4"
                vertical={false}
                opacity={0.5}
              />
              <XAxis
                dataKey="month"
                stroke="#A3A3A3"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#A3A3A3"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ fill: "#F97316", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7, fill: "#F97316" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ═══ PIE CHART ═══ */}
      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
          🥧 Category Distribution
        </h3>

        <div className="h-[280px] w-full">
          {charts.pie.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-[#A3A3A3] dark:text-[#666666]">
              No categories yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.pie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={50}
                  paddingAngle={4}
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                  style={{ fontSize: "11px", fontWeight: 600 }}
                >
                  {charts.pie.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}