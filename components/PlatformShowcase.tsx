'use client'

import { MonitorPlay, Music, MessageCircle, Rss, Bird, Globe, Play } from 'lucide-react'

const platforms = [
    {
        name: 'YouTube',
        icon: MonitorPlay,
        color: 'from-red-500 to-red-600',
        textColor: 'text-red-400',
    },
    {
        name: 'TikTok',
        icon: Music,
        color: 'from-black to-gray-800',
        textColor: 'text-pink-400',
    },
    {
        name: 'Instagram',
        icon: MessageCircle,
        color: 'from-purple-500 to-pink-500',
        textColor: 'text-purple-400',
    },
    {
        name: 'Facebook',
        icon: Globe,
        color: 'from-blue-500 to-blue-600',
        textColor: 'text-blue-400',
    },
    {
        name: 'Twitter/X',
        icon: Bird,
        color: 'from-slate-600 to-slate-700',
        textColor: 'text-sky-400',
    },
    {
        name: 'Twitch',
        icon: Play,
        color: 'from-purple-600 to-purple-700',
        textColor: 'text-purple-400',
    },
]

export default function PlatformShowcase() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((platform) => {
                const Icon = platform.icon
                return (
                    <div
                        key={platform.name}
                        className="group relative rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl hover:border-white/40 transition-all duration-300 cursor-pointer hover:scale-105 transform hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all" />

                        <div className="relative space-y-3">
                            <div className={`p-4 rounded-xl bg-gradient-to-br ${platform.color} w-fit shadow-lg group-hover:shadow-2xl transition-all`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                                {platform.name}
                            </h3>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}