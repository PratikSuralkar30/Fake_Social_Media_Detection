"use client";

import { CheckCircle2, AlertTriangle, ShieldCheck, ShieldAlert, TrendingUp, TrendingDown } from "lucide-react";

export default function ResultDisplay({ result }) {
  if (!result) return null;

  const isReal = result.prediction === "Real";
  const confidence = result.confidence_score;

  return (
    <div className="animate-fade-in mt-8">
      <div
        className={`rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
          isReal
            ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-transparent dark:from-emerald-500/10 dark:via-emerald-500/5"
            : "border-red-500/30 bg-gradient-to-br from-red-500/5 via-red-500/10 to-transparent dark:from-red-500/10 dark:via-red-500/5"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
              isReal
                ? "bg-emerald-500/15 ring-1 ring-emerald-500/30"
                : "bg-red-500/15 ring-1 ring-red-500/30"
            }`}
          >
            {isReal ? (
              <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <ShieldAlert className="h-7 w-7 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <h3
              className={`text-xl font-bold transition-colors ${
                isReal ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {isReal ? "Appears to be Genuine" : "Highly Suspicious"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">
              {isReal
                ? "This account shows characteristics of a real user profile."
                : "This account exhibits patterns commonly associated with fake profiles."}
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
              Confidence Score
            </span>
            <div className="flex items-center gap-2">
              {isReal ? (
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-2xl font-bold tabular-nums transition-colors ${
                  isReal ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {confidence}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700/50 overflow-hidden transition-colors">
            <div
              className={`h-full rounded-full progress-animate ${
                isReal
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-500 dark:to-emerald-400"
                  : "bg-gradient-to-r from-red-600 to-red-400 dark:from-red-500 dark:to-red-400"
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-[11px] text-slate-400 dark:text-slate-500 transition-colors">
            <span>0%</span>
            <span>Threshold: 50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Verdict Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800/40 p-4 text-center transition-colors">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 transition-colors">Prediction</p>
            <p
              className={`text-lg font-bold transition-colors ${
                isReal ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {result.prediction}
            </p>
          </div>
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800/40 p-4 text-center transition-colors">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 transition-colors">Risk Level</p>
            <p
              className={`text-lg font-bold transition-colors ${
                isReal ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {isReal ? "Low" : "High"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800/40 p-4 text-center transition-colors">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 transition-colors">Action</p>
            <p
              className={`text-lg font-bold transition-colors ${
                isReal ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
              }`}
            >
              {isReal ? "Safe" : "Review"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
