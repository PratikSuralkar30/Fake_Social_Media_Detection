"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import ResultDisplay from "../../components/ResultDisplay";
import { ArrowLeft, Camera, User, Settings, BarChart2, Link2, FileText, Loader2, RotateCcw, Search, Ratio } from "lucide-react";

const initialForm = {
  username: "", followers: "", following: "", posts: "",
  profilePic: "1", verified: "0", accountAge: "",
  avgLikes: "", avgComments: "", postsPerWeek: "",
  avgHashtags: "", postsWithLinks: "", linksInBio: "", bio: "",
};

export default function InstagramAnalyzePage() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const ratio = form.followers && form.following
    ? (parseFloat(form.followers) / Math.max(parseFloat(form.following), 1)).toFixed(2)
    : "—";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      Followers: parseFloat(form.followers) || 0,
      Following: parseFloat(form.following) || 0,
      Posts: parseFloat(form.posts) || 0,
      Profile_Pic: parseInt(form.profilePic),
      Verified: parseInt(form.verified),
      Account_Age: parseFloat(form.accountAge) || 0,
      Avg_Likes: parseFloat(form.avgLikes) || 0,
      Avg_Comments: parseFloat(form.avgComments) || 0,
      Posts_Per_Week: parseFloat(form.postsPerWeek) || 0,
      Avg_Hashtags: parseFloat(form.avgHashtags) || 0,
      Posts_With_Links: parseFloat(form.postsWithLinks) || 0,
      Links_In_Bio: parseFloat(form.linksInBio) || 0,
    };

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Prediction failed");
      }
      setResult(await res.json());
    } catch (err) {
      setError(err.message || "Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-600/40 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all";
  const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";
  const sectionTitle = (Icon, title) => (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700/50">
      <Icon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">{title}</h3>
    </div>
  );

  return (
    <div className="relative z-10 min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Instagram Account Analysis</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Enter profile details to detect authenticity</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="glass-card rounded-2xl p-6">
            {sectionTitle(User, "Basic Info")}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Username</label>
                <input id="username" type="text" placeholder="@username" value={form.username} onChange={set("username")} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Followers</label>
                <input id="followers" type="number" min="0" placeholder="e.g. 5400" value={form.followers} onChange={set("followers")} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Following</label>
                <input id="following" type="number" min="0" placeholder="e.g. 620" value={form.following} onChange={set("following")} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Total Posts</label>
                <input id="posts" type="number" min="0" placeholder="e.g. 840" value={form.posts} onChange={set("posts")} className={inputCls} required />
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="glass-card rounded-2xl p-6">
            {sectionTitle(Settings, "Account Details")}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Has Profile Picture</label>
                <select id="profile-pic" value={form.profilePic} onChange={set("profilePic")} className={inputCls + " pr-10"}>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Is Verified</label>
                <select id="verified" value={form.verified} onChange={set("verified")} className={inputCls + " pr-10"}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Account Age (years)</label>
                <input id="account-age" type="number" min="0" step="0.1" placeholder="e.g. 5.2" value={form.accountAge} onChange={set("accountAge")} className={inputCls} required />
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="glass-card rounded-2xl p-6">
            {sectionTitle(BarChart2, "Engagement Metrics")}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Avg Likes/Post</label>
                <input id="avg-likes" type="number" min="0" placeholder="e.g. 620" value={form.avgLikes} onChange={set("avgLikes")} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Avg Comments/Post</label>
                <input id="avg-comments" type="number" min="0" placeholder="e.g. 45" value={form.avgComments} onChange={set("avgComments")} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Posts Per Week</label>
                <input id="posts-per-week" type="number" min="0" step="0.1" placeholder="e.g. 4.0" value={form.postsPerWeek} onChange={set("postsPerWeek")} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Avg Hashtags/Post</label>
                <input id="avg-hashtags" type="number" min="0" step="0.1" placeholder="e.g. 4.0" value={form.avgHashtags} onChange={set("avgHashtags")} className={inputCls} required />
              </div>
            </div>
          </div>

          {/* Content Analysis */}
          <div className="glass-card rounded-2xl p-6">
            {sectionTitle(Link2, "Content Analysis")}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Posts with External Links</label>
                <input id="posts-with-links" type="number" min="0" placeholder="e.g. 1" value={form.postsWithLinks} onChange={set("postsWithLinks")} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>External Links in Bio</label>
                <input id="links-in-bio" type="number" min="0" placeholder="e.g. 1" value={form.linksInBio} onChange={set("linksInBio")} className={inputCls} required />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="glass-card rounded-2xl p-6">
            {sectionTitle(FileText, "Bio / Description")}
            <textarea id="bio" rows={3} placeholder="Enter account bio or description (optional)..." value={form.bio} onChange={set("bio")} className={inputCls + " resize-none"} />
          </div>

          {/* Calculated Metrics */}
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ratio className="h-4 w-4 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Follower : Following Ratio</span>
            </div>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400 tabular-nums">{ratio}</span>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button type="button" onClick={() => { setForm(initialForm); setResult(null); setError(""); }} className="flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              <RotateCcw className="h-4 w-4" /> Reset Form
            </button>
            <button type="submit" disabled={loading} className="btn-glow flex items-center justify-center gap-2 rounded-xl px-8 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</> : <><Search className="h-4 w-4" /> Analyze Profile</>}
            </button>
          </div>
        </form>

        {/* Results */}
        <ResultDisplay result={result} />
      </main>
    </div>
  );
}
