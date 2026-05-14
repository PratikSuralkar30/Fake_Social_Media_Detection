"use client";

import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

const historyData = [
  {
    id: 1,
    platform: "Instagram",
    username: "@sarah.designs",
    result: "Real",
    confidence: 96.4,
    timestamp: "2 min ago",
  },
  {
    id: 2,
    platform: "Instagram",
    username: "@bot_farm_2024",
    result: "Fake",
    confidence: 98.2,
    timestamp: "15 min ago",
  },
  {
    id: 3,
    platform: "Instagram",
    username: "@travel.adventures",
    result: "Real",
    confidence: 91.7,
    timestamp: "1 hr ago",
  },
  {
    id: 4,
    platform: "Facebook",
    username: "John Doe",
    result: "Fake",
    confidence: 94.8,
    timestamp: "3 hrs ago",
  },
  {
    id: 5,
    platform: "Twitter",
    username: "@news_updates_x",
    result: "Fake",
    confidence: 88.3,
    timestamp: "5 hrs ago",
  },
];

export default function ScanHistory() {
  return (
    <div className="glass-card rounded-2xl p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white transition-colors">Recent Scans</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">
            Latest analysis results
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 transition-colors">
          <Clock className="h-3.5 w-3.5" />
          <span>Last 24h</span>
        </div>
      </div>

      <div className="space-y-3">
        {historyData.map((scan, index) => (
          <div
            key={scan.id}
            className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border border-slate-200 dark:border-slate-700/30 hover:border-slate-300 dark:hover:border-slate-600/50 transition-all duration-200"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              {/* Result icon */}
              {scan.result === "Real" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20">
                  <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 dark:bg-red-500/20">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white transition-colors">
                  {scan.username}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">{scan.platform}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Confidence */}
              <div className="text-right">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    scan.result === "Real"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {scan.confidence}%
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 transition-colors">{scan.timestamp}</p>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all ${
                  scan.result === "Real"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500/20"
                }`}
              >
                {scan.result}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
