"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import ScanHistory from "./components/ScanHistory";
import { Camera, Globe, Hash, ArrowRight, Shield, Activity, Users, BarChart3, Scan, Zap, Lock } from "lucide-react";
import { useAuth } from "./context/AuthContext";

const AccuracyChart = dynamic(() => import("./components/AccuracyChart"), {
  ssr: false,
  loading: () => (
    <div className="glass-card rounded-2xl p-6 h-[360px] flex items-center justify-center">
      <div className="shimmer h-full w-full rounded-xl" />
    </div>
  ),
});

const platforms = [
  { name: "Instagram", icon: Camera, color: "from-pink-500 to-purple-600", shadow: "shadow-pink-500/20", enabled: true, scans: "1,247", href: "/analyze/instagram" },
  { name: "Facebook", icon: Globe, color: "from-blue-600 to-blue-700", shadow: "shadow-blue-500/20", enabled: false, scans: "—", href: "#" },
  { name: "Twitter", icon: Hash, color: "from-sky-400 to-sky-600", shadow: "shadow-sky-500/20", enabled: false, scans: "—", href: "#" },
];

const stats = [
  { label: "Total Scans", value: "12,847", icon: Scan, trend: "+12.5%", color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-500/10" },
  { label: "Fake Detected", value: "4,231", icon: Shield, trend: "+8.3%", color: "text-red-500 dark:text-red-400", bg: "bg-red-500/10" },
  { label: "Accuracy Rate", value: "97.2%", icon: Activity, trend: "+2.1%", color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Active Users", value: "3,891", icon: Users, trend: "+15.7%", color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-500/10" },
];

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) return null; // Prevent flicker while checking auth

  return (
    <div className="relative z-10 min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{s.trend}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Platform Selection */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Select Platform</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {platforms.map((p) => {
              const card = (
                <div className={`platform-card glass-card rounded-2xl p-6 ${p.enabled ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} ${p.shadow} shadow-lg`}>
                      <p.icon className="h-6 w-6 text-white" />
                    </div>
                    {p.enabled ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full"><Zap className="h-3 w-3" />Active</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-full"><Lock className="h-3 w-3" />Coming Soon</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{p.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{p.enabled ? "AI-powered authenticity detection" : "Coming in a future update"}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{p.scans} scans</span>
                    {p.enabled && <span className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">Analyze <ArrowRight className="h-4 w-4" /></span>}
                  </div>
                </div>
              );
              return p.enabled ? <Link key={p.name} href={p.href} className="group">{card}</Link> : <div key={p.name}>{card}</div>;
            })}
          </div>
        </div>

        {/* Charts & History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AccuracyChart />
          <ScanHistory />
        </div>
      </main>
    </div>
  );
}
