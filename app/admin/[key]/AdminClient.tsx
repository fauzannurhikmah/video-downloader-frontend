"use client";

import { useState } from "react";
import { Upload, AlertCircle, CheckCircle, Loader2, Copy, ExternalLink, Timer, Dot, MonitorPlay, Music, Globe, MessageCircle, Bird, Play } from 'lucide-react'
import toast from "react-hot-toast";

type Platform =
    | "youtube"
    | "tiktok"
    | "facebook"
    | "instagram"
    | "twitter"
    | "twitch";

export default function AdminPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [platform, setPlatform] = useState<Platform>("youtube");

    const handleUpload = async (): Promise<void> => {
        if (!file) {
            toast.error("Select cookies file first");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("platform", platform);

        try {
            const res = await fetch("/api/admin/upload-cookies", {
                method: "POST",
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
                },
                body: formData,
            });

            const data: { detail?: string } = await res.json();

            if (res.ok) {
                toast.success(`${platform} cookies updated 🚀`);
                setFile(null);
            } else {
                toast.error(data.detail || "Upload failed");
            }
        } catch (err) {
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const selected = e.target.files?.[0] || null;

        if (selected && !selected.name.endsWith(".txt")) {
            toast.error("Only .txt allowed");
            return;
        }

        setFile(selected);
    };

    const platforms = [
        { key: "youtube", icon: MonitorPlay, label: "YouTube" },
        { key: "tiktok", icon: Music, label: "TikTok" },
        { key: "facebook", icon: Globe, label: "Facebook" },
        { key: "instagram", icon: MessageCircle, label: "Instagram" },
        { key: "twitter", icon: Bird, label: "Twitter/X" },
        { key: "twitch", icon: Play, label: "Twitch" },
    ];

    return (
        <div className="w-full flex items-center justify-center p-6 min-h-screen bg-black">

            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>


            <div className="w-full max-w-xl space-y-6">

                {/* CARD */}
                <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl hover:border-white/40 transition-all duration-300">

                    {/* Glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative space-y-6">

                        {/* TITLE */}
                        <div>
                            <h2 className="text-3xl font-bold mb-1">Upload Cookies</h2>
                            <p className="text-gray-400">
                                Manage platform session cookies
                            </p>
                        </div>

                        {/* PLATFORM SELECTOR */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Platform</label>

                            <div className="grid grid-cols-2 gap-3">
                                {platforms.map((p) => {
                                    const Icon = p.icon;

                                    return (
                                        <label
                                            key={p.key}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all border ${platform === p.key
                                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg shadow-blue-500/25"
                                                : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="platform"
                                                value={p.key}
                                                checked={platform === p.key}
                                                onChange={() =>
                                                    setPlatform(p.key as Platform)
                                                }
                                                className="hidden"
                                            />

                                            <Icon className="w-4 h-4" />
                                            <span className="text-sm font-semibold">
                                                {p.label}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* UPLOAD BOX */}
                        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-blue-500/50 transition-all bg-white/5">

                            <input
                                type="file"
                                accept=".txt"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <Upload className="w-6 h-6 text-gray-400 mb-2" />

                            <span className="text-gray-400 text-sm">
                                {file ? file.name : "Upload cookies.txt"}
                            </span>
                        </label>

                        {/* BUTTON */}
                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Upload Cookies
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}