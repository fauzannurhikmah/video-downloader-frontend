'use client'

import { Download, GitBranch } from 'lucide-react'

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-black/50 border-b border-white/10 backdrop-blur-lg">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25">
                        <Download className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            VideoHub
                        </span>
                        <p className="text-xs text-gray-500">Download Videos Anywhere</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-gray-300 hover:text-white transition font-medium">
                        Features
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition font-medium">
                        About
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition font-medium">
                        Contact
                    </a>
                </div>

                <a
                    href="https://github.com/fauzannurhikmah/video-downloader"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                    <GitBranch className="w-4 h-4" />
                    <span className="hidden sm:inline">GitHub</span>
                </a>
            </nav>
        </header>
    )
}