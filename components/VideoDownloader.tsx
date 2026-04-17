'use client'

import { useState } from 'react'
import { Download, AlertCircle, CheckCircle, Loader2, Copy, ExternalLink, Timer, Dot, Sparkles, AlignLeft, Hash, HardDrive, ArrowLeft } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import config from '@/config'

interface DownloadResponse {
    success: boolean
    data?: {
        title: string
        type?: 'video' | 'audio'
        filesize: string
        thumbnail: string
        duration: string
        download_url: string
        audio_url?: string
        caption?: string;
        tags?: string[];
    }
    error?: string
}

type AnalyzeResponse = {
    success: boolean
    data: {
        platform: string
        type: 'video' | 'audio'
        has_quality_options: boolean
        qualities: QualityOption[]
        default_quality: number | null
    }
}


type QualityOption = {
    quality: number
    label: string
    filesize: string
}

export default function VideoDownloader() {
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [processingQuality, setProcessingQuality] = useState<number | null>(null);

    const [videoData, setVideoData] = useState<DownloadResponse['data'] | null>(null)
    const [audioData, setAudioData] = useState<DownloadResponse['data'] | null>(null)
    const [qualities, setQualities] = useState<QualityOption[] | null>(null)

    const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video')

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!url.trim()) {
            toast.error('Please enter a valid URL')
            return
        }
        setVideoData(null)
        setAudioData(null)
        setQualities(null)
        setLoading(true)
        try {
            const analyze = await axios.post<AnalyzeResponse>(
                `${config.BACKEND_URL}/api/analyze`,
                {
                    url: url.trim(),
                    type: downloadType,
                }
            )

            const data = analyze.data.data

            if (data.has_quality_options) {
                setQualities(data.qualities)
                return
            }

            // STEP 2: DIRECT DOWNLOAD
            await triggerDownload()
        } catch (error) {
            console.error('Download error:', error)
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                toast.error(error.response.data.error)
            } else {
                toast.error('Failed to fetch video. Make sure the URL is valid.')
            }
        } finally {
            setLoading(false)
        }
    }

    const triggerDownload = async (quality?: number) => {
        if (quality) setProcessingQuality(quality)
        setLoading(true)

        try {
            const response = await axios.post(`${config.BACKEND_URL}/api/download`, {
                url: url.trim(),
                type: downloadType,
                quality
            })

            if (response.data.success && response.data.data) {
                const data = response.data.data
                if (data.type === 'video') setVideoData(data)
                else setAudioData(data)
                toast.success(`${data.type} ready!`)
            } else {
                toast.error(response.data.error || 'Failed to process video')
            }
        } catch (error) {
            toast.error('Failed to process video')
        } finally {
            setLoading(false)
            setProcessingQuality(null)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard!')
    }

    const currentData = downloadType === 'video' ? videoData : audioData

    return (
        <div className="w-full space-y-6">
            {/* Input Card */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl hover:border-white/40 transition-all duration-300">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-1">Download Video</h2>
                        <p className="text-gray-400">Paste any video URL below to get started</p>
                    </div>

                    <form onSubmit={handleDownload} className="space-y-6">
                        {/* URL Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Video URL</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-600 text-white"
                                    disabled={loading}
                                />
                                <div className="absolute right-4 top-4 text-gray-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M12.586 4.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Download Type Tabs */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Download Type</label>
                            <div className="flex gap-3 p-1 bg-white/5 rounded-xl border border-white/10">
                                {(['video', 'audio'] as const).map((type) => (
                                    <label
                                        key={type}
                                        className={`flex-1 px-4 py-3 rounded-lg cursor-pointer font-medium transition-all text-center ${downloadType === type
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type}
                                            checked={downloadType === type}
                                            onChange={(e) => setDownloadType(e.target.value as 'video' | 'audio')}
                                            disabled={loading}
                                            className="hidden"
                                        />
                                        <span className="capitalize text-sm font-semibold">{type === 'video' ? '🎬 Video' : '🎵 Audio'}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !url.trim()}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Download className="w-5 h-5" />
                                    Get Download Link
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {!!qualities && !currentData && (
                <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
                    <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl hover:border-white/30 transition-all duration-300">

                        {/* Header */}
                        <div className="relative flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Select Quality</h3>
                                </div>
                                <p className="text-sm text-gray-400">Multiple resolutions found. Pick one to continue.</p>
                            </div>

                            <button
                                onClick={() => { setQualities([]); setUrl(''); }}
                                className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-white transition-colors uppercase"
                            >
                                Change URL
                            </button>
                        </div>

                        {/* Grid Qualities */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {qualities.map((item) => {
                                const isProcessing = processingQuality === item.quality;
                                const isBest = item.label.toLowerCase().includes('best') || item.quality >= 1080;
                                const isRec = item.label.toLowerCase().includes('recommended');
                                const isFast = item.label.toLowerCase().includes('fast');
                                const cleanResolution = item.label.split(' ')[0];

                                return (
                                    <button
                                        key={item.quality}
                                        onClick={() => triggerDownload(item.quality)}
                                        disabled={loading}
                                        className={`group relative p-[1px] rounded-2xl transition-all duration-300 overflow-hidden w-full
                            ${isProcessing
                                                ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                                                : 'hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                            } ${loading && !isProcessing ? 'opacity-40 grayscale' : ''}`}
                                    >
                                        {/* 1. ANIMASI BORDER (Running Glow) */}
                                        {isProcessing && (
                                            <div className="absolute inset-[-200%] animate-border-spin bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_70%,#3b82f6_100%)]" />
                                        )}

                                        {/* 2. INNER CONTENT */}
                                        <div className={`relative z-10 flex justify-between items-center w-full h-full p-5 rounded-[15px] transition-colors duration-300
                            ${isProcessing
                                                ? 'bg-[#0a0a0a]'
                                                : 'bg-[#121212] border border-white/5 group-hover:border-blue-500/50 group-hover:bg-[#181818]'
                                            }`}>

                                            {/* Konten Teks (Resolution, Badges, & Filesize) */}
                                            <div className="flex flex-col gap-2 text-left">
                                                <span className={`block text-[9px] font-black uppercase tracking-[0.2em] leading-none ${isProcessing ? 'text-blue-400' : 'text-gray-500'}`}>
                                                    Resolution
                                                </span>

                                                <div className="space-y-1.5">
                                                    <h4 className="text-2xl font-black text-white leading-none tracking-tight">
                                                        {cleanResolution}
                                                    </h4>

                                                    {/* Hirarki 2: Badges */}
                                                    {(isBest || isRec || isFast) && (
                                                        <div className="flex flex-wrap gap-1">
                                                            {isBest && <span className="px-1.5 py-0.5 rounded-md bg-blue-500/10 text-[8px] font-black text-blue-400 border border-blue-500/20 uppercase">BEST</span>}
                                                            {isRec && <span className="px-1.5 py-0.5 rounded-md bg-purple-500/10 text-[8px] font-black text-purple-400 border border-purple-500/20 uppercase">REC</span>}
                                                            {isFast && <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-[8px] font-black text-emerald-400 border border-emerald-500/20 uppercase">FAST</span>}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Hirarki 3: Filesize (ESTIMASI SIZE) */}
                                                <div className="flex items-center gap-1.5 mt-0.5 pt-1 border-t border-white/5">
                                                    <HardDrive className={`size-2.5 ${isProcessing ? 'text-blue-400' : 'text-gray-600'}`} />
                                                    <span className="text-[10px] font-bold text-gray-500 tabular-nums">
                                                        {item.filesize}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Icon / Loader */}
                                            <div className="flex-shrink-0 ml-2">
                                                <div className={`size-10 rounded-xl flex items-center justify-center border transition-all duration-300
                                    ${isProcessing
                                                        ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                                        : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-white group-hover:border-blue-500/50 group-hover:bg-blue-600/20'
                                                    }`}>
                                                    {isProcessing ? (
                                                        <div className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <Download className="size-4.5" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {currentData && (
                <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="rounded-[32px] bg-[#0f0f0f] border border-white/5 overflow-hidden shadow-2xl">

                        <div className="p-6 md:p-8 space-y-8">

                            <div className={`flex items-center ${qualities ? "justify-between" : "justify-center"}`}>
                                {/* Cek kalau download_type video dan kita punya data qualities, baru munculin Back */}
                                {downloadType === 'video' && !!qualities && (
                                    <button
                                        onClick={() => setVideoData(null)}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                                    >
                                        <ArrowLeft className="size-3.5 text-gray-400 group-hover:text-white transition-transform group-hover:-translate-x-0.5" />
                                        <span className="text-[10px] font-black text-gray-400 group-hover:text-white uppercase tracking-widest">Back</span>
                                    </button>
                                )}

                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                    <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Ready to Download</span>
                                </div>
                            </div>

                            {/* Header: Status & Title */}
                            <div className="space-y-3 text-center">
                                <h3 className="text-xl font-bold text-white leading-tight px-4 line-clamp-2">
                                    {currentData.title}
                                </h3>
                            </div>
                            {/* Main Content: Split Layout (Kiri Thumbnail, Kanan Info & Action) */}
                            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-white/[0.02] p-5 rounded-3xl border border-white/[0.03]">

                                {/* Kiri: Thumbnail Kecil */}
                                <div className="relative group w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                                    <img
                                        src={currentData.thumbnail}
                                        alt="thumbnail"
                                        className="w-full h-full object-cover rounded-2xl ring-1 ring-white/10 shadow-lg"
                                    />
                                    {currentData.duration && (
                                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[9px] font-bold text-white">
                                            {currentData.duration}
                                        </div>
                                    )}
                                </div>

                                {/* Kanan: Info Video & Download Buttons */}
                                <div className="flex flex-col flex-1 w-full gap-4">
                                    {/* Metadata Ringkas */}
                                    <div className="flex items-center gap-4 text-gray-400">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500">Duration</span>
                                            <span className="text-sm font-semibold text-gray-200">{currentData.duration || '--'}</span>
                                        </div>
                                        <div className="w-px h-6 bg-white/10" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500">Size</span>
                                            <span className="text-sm font-semibold text-gray-200">{currentData.filesize || '--'}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons: Stacked inside the right column */}
                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={config.BACKEND_URL + currentData.download_url}
                                            download
                                            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                                        >
                                            <Download className="size-4" />
                                            Download {downloadType === 'video' ? 'Video' : 'Audio'}
                                        </a>
                                        <button
                                            onClick={() => copyToClipboard(currentData.download_url)}
                                            className="w-full h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-gray-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Copy className="size-3.5" />
                                            Copy Link
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Sisanya Tetap: Deskripsi, Tags & AI Insights */}
                            <div className="pt-2 space-y-6">
                                {/* Description Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <AlignLeft className="size-4" />
                                            <span className="text-[11px] font-black uppercase tracking-widest">Description</span>
                                        </div>

                                        {typeof currentData.caption === "string" && (
                                            <button
                                                onClick={() => copyToClipboard(currentData.caption!)}
                                                className="group-hover:opacity-100 cursor-pointer flex items-center gap-1.5 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-all"
                                            >
                                                <Copy className="size-3" />
                                                COPY
                                            </button>
                                        )}

                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed italic bg-white/[0.01] p-4 rounded-xl border border-white/[0.02]">
                                        {currentData.caption || "No description provided."}
                                    </p>
                                </div>

                                {/* Tags Section */}
                                {currentData.tags && currentData.tags.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between group">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Hash className="size-4" />
                                                <span className="text-[11px] font-black uppercase tracking-widest">Smart Tags</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const hashtagged = currentData.tags?.map(t => `#${t.replace(/\s+/g, '')}`).join(' ');
                                                    if (hashtagged) copyToClipboard(hashtagged);
                                                }}
                                                className="group-hover:opacity-100 cursor-pointer flex items-center gap-1.5 text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-all"
                                            >
                                                <Copy className="size-3" />
                                                COPY
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {currentData.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-medium text-gray-500 hover:text-gray-300 hover:border-white/10 transition-colors cursor-default"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* AI Insights Card */}
                                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 text-center md:text-left">
                                        <div className="size-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/30 flex-shrink-0">
                                            <Sparkles className="size-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">AI Content Insights</h4>
                                            <p className="text-[10px] text-gray-500 font-medium italic">Gemini AI is ready to analyze this media</p>
                                        </div>
                                    </div>
                                    <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition-all shadow-md active:scale-95">
                                        ANALYZE CONTENT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}