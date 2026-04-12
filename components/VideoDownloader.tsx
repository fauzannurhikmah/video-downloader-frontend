'use client'

import { useState } from 'react'
import { Download, AlertCircle, CheckCircle, Loader2, Copy, ExternalLink, Timer, Dot } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

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
    }
    error?: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export default function VideoDownloader() {
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const [videoData, setVideoData] = useState<DownloadResponse['data'] | null>(null)
    const [audioData, setAudioData] = useState<DownloadResponse['data'] | null>(null)

    const [downloadType, setDownloadType] = useState<'video' | 'audio'>('video')

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!url.trim()) {
            toast.error('Please enter a valid URL')
            return
        }
        setVideoData(null)
        setAudioData(null)
        setLoading(true)
        try {
            const response = await axios.post<DownloadResponse>(
                `${BACKEND_URL}/api/download`,
                {
                    url: url.trim(),
                    type: downloadType,
                }
            )

            if (response.data.success && response.data.data) {
                const data = response.data.data
                console.log(data);

                if (data.type === 'video') {
                    setVideoData(data)
                } else if (data.type === 'audio') {
                    setAudioData(data)
                }

                toast.success(`${data.type} ready to download!`)
            } else {
                toast.error(response.data.error || 'Failed to process video')
            }
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

            {/* Download Result Card */}
            {currentData && (
                <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl hover:border-white/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10" />

                    <div className="relative p-8 space-y-6">
                        <div className="flex items-start gap-6">
                            {currentData.thumbnail && (
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={currentData.thumbnail}
                                        alt="thumbnail"
                                        className="w-32 h-32 rounded-2xl object-cover ring-2 ring-white/20"
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/20 to-transparent" />
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="flex items-center justify-center size-7 rounded-full bg-gradient-to-r from-green-400 to-emerald-400">
                                            <CheckCircle className="size-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-white truncate">{currentData.title}</h3>

                                        <div className="flex items-baseline gap-2 text-gray-400">
                                            {currentData.duration && (
                                                <p className="text-sm mt-1"> Duration: {currentData.duration} </p>
                                            )}
                                            •
                                            {currentData.filesize && (
                                                <p className="text-sm"> Size: {currentData.filesize} </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={BACKEND_URL + currentData.download_url}
                                        download
                                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download {downloadType === 'video' ? 'Video' : 'Audio'}
                                    </a>
                                    {currentData.audio_url && downloadType === 'video' && (
                                        <a
                                            href={currentData.audio_url}
                                            download
                                            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Audio
                                        </a>
                                    )}
                                </div>

                                <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                                    <button
                                        onClick={() => copyToClipboard(currentData.download_url)}
                                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy Link
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