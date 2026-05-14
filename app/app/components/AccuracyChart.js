"use client";

import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useTheme } from "next-themes";

const chartData = [
  { month: "Jan", accuracy: 92.3, scans: 145 },
  { month: "Feb", accuracy: 93.1, scans: 210 },
  { month: "Mar", accuracy: 94.7, scans: 187 },
  { month: "Apr", accuracy: 95.2, scans: 320 },
  { month: "May", accuracy: 96.1, scans: 412 },
  { month: "Jun", accuracy: 96.8, scans: 385 },
  { month: "Jul", accuracy: 97.2, scans: 498 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600/50 px-4 py-3 shadow-2xl">
        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name === "Accuracy" ? "%" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AccuracyChart() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div className="glass-card rounded-2xl p-6 h-[420px] flex items-center justify-center">
      <div className="shimmer h-full w-full rounded-xl" />
    </div>
  );

  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0";
  const tickColor = theme === "dark" ? "#94a3b8" : "#64748b";

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors">
            Detection Accuracy Over Time
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">
            Model performance trend
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span className="text-slate-500 dark:text-slate-400 transition-colors">Accuracy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
            <span className="text-slate-500 dark:text-slate-400 transition-colors">Scans</span>
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              domain={[90, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="accuracy"
              name="Accuracy"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#blueGradient)"
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: theme === "dark" ? "#1e293b" : "#fff" }}
              activeDot={{ r: 6, fill: "#3b82f6", stroke: theme === "dark" ? "#1e293b" : "#fff", strokeWidth: 3 }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="scans"
              name="Scans"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#purpleGradient)"
              dot={{ r: 3, fill: "#8b5cf6", strokeWidth: 2, stroke: theme === "dark" ? "#1e293b" : "#fff" }}
              activeDot={{ r: 5, fill: "#8b5cf6", stroke: theme === "dark" ? "#1e293b" : "#fff", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
