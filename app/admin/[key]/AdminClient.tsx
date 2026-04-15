"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Loader2, MonitorPlay, Music, Globe, MessageCircle, Bird, Play, CheckCircle, ChevronDown, X } from 'lucide-react'
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
    const [dragging, setDragging] = useState(false);

    // State buat custom dropdown
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const platforms = [
        { key: "youtube", icon: MonitorPlay, label: "YouTube" },
        { key: "tiktok", icon: Music, label: "TikTok" },
        { key: "facebook", icon: Globe, label: "Facebook" },
        { key: "instagram", icon: MessageCircle, label: "Instagram" },
        { key: "twitter", icon: Bird, label: "Twitter/X" },
        { key: "twitch", icon: Play, label: "Twitch" },
    ];

    // Cari platform yang lagi kepilih buat ditampilin di button
    const selectedPlatform = platforms.find(p => p.key === platform) || platforms[0];
    const SelectedIcon = selectedPlatform.icon;

    // Handle klik di luar buat nutup dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
            const res = await fetch(`/api/upload-cookies`, { method: "POST", body: formData });
            const data = await res.json();
            if (res.ok) {
                toast.success(`${platform} cookies updated`);
                setFile(null);
            } else {
                toast.error(data.detail || "Upload failed");
            }
        } catch (error) {
            toast.error("Network Error");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const selected = e.target.files?.[0] || null;
        if (selected && !selected.name.endsWith(".txt")) {
            toast.error("Only .txt allowed");
            return;
        }
        setFile(selected);
    };

    return (
        <div className="w-full flex items-center justify-center p-6 min-h-screen bg-black text-white">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="w-full max-w-xl space-y-6 relative">
                <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-300">
                    <div className="relative space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-1">Upload Cookies</h2>
                            <p className="text-gray-400">Manage platform session cookies</p>
                        </div>

                        {/* CUSTOM PLATFORM SELECTOR */}
                        <div className="space-y-2" ref={dropdownRef}>
                            <label className="text-sm text-gray-300">Target Platform</label>
                            <div className="relative">
                                {/* Trigger Button */}
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 hover:border-blue-500/50 transition-all text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <SelectedIcon className="w-5 h-5 text-blue-400" />
                                        <span className="font-medium">{selectedPlatform.label}</span>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="max-h-60 overflow-y-auto py-1">
                                            {platforms.map((p) => {
                                                const Icon = p.icon;
                                                return (
                                                    <button
                                                        key={p.key}
                                                        type="button"
                                                        onClick={() => {
                                                            setPlatform(p.key as Platform);
                                                            setIsOpen(false);
                                                        }}
                                                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${platform === p.key ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300'}`}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                        <span className="font-medium">{p.label}</span>
                                                        {platform === p.key && <CheckCircle className="w-4 h-4 ml-auto" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* UPLOAD BOX - REVISED UI/UX */}
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Cookies File (.txt)</label>

                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragging(false);
                                    const f = e.dataTransfer.files?.[0];
                                    if (f?.name.endsWith(".txt")) setFile(f);
                                    else toast.error("Only .txt allowed");
                                }}
                                className={`relative group flex flex-col items-center justify-center w-full min-h-[180px] border-2 border-dashed rounded-2xl transition-all duration-300 
            ${file
                                        ? "border-green-500/50 bg-green-500/5 shadow-[insent_0_2px_20px_rgba(34,197,94,0.1)]"
                                        : dragging
                                            ? "border-blue-500 bg-blue-500/10 scale-[1.01] shadow-lg shadow-blue-500/20"
                                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20"
                                    }`}
                            >
                                <input
                                    type="file"
                                    accept=".txt"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={handleFileChange}
                                />

                                {!file ? (
                                    <div className="flex flex-col items-center p-6 text-center">
                                        <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-300">
                                            <Upload className={`w-8 h-8 ${dragging ? "text-blue-400 animate-bounce" : "text-gray-400"}`} />
                                        </div>
                                        <p className="text-sm font-medium text-gray-200">
                                            {dragging ? "Drop it here!" : "Click or drag cookies file"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Maximum size: 2MB (.txt only)</p>
                                    </div>
                                ) : (
                                    <div className="w-full p-4 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                                        {/* File Icon Card */}
                                        <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                                            <CheckCircle className="w-6 h-6 text-green-400" />
                                        </div>

                                        {/* File Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-green-400 truncate leading-none mb-1">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                                {(file.size / 1024).toFixed(1)} KB • Ready to upload
                                            </p>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFile(null);
                                            }}
                                            className="z-20 p-2 hover:bg-red-500/10 hover:text-red-400 text-gray-500 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 disabled:grayscale disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Upload className="w-5 h-5" /> Upload Cookies</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}