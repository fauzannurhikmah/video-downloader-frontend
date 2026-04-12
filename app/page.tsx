'use client'

import { useState } from 'react'
import { Download, Sparkles, Zap, Smartphone, Shield } from 'lucide-react'
import VideoDownloader from '@/components/VideoDownloader'
import PlatformShowcase from '@/components/PlatformShowcase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black">
      <Header />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Powered by Advanced Video Technology</span>
            </div>

            <h1 className="text-6xl sm:text-7xl font-black tracking-tight">
              <span className="block text-white mb-2">Download Videos</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                from Anywhere
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The ultimate tool for downloading videos from YouTube, TikTok, Instagram, Facebook, Twitter and 50+ more platforms. Fast, reliable, and completely free.
            </p>

            {/* Features Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {[
                { icon: Zap, text: 'Lightning Fast', color: 'text-yellow-400' },
                { icon: Shield, text: 'Secure & Safe', color: 'text-green-400' },
                { icon: Smartphone, text: 'All Devices', color: 'text-blue-400' },
              ].map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    <Icon className={`w-4 h-4 ${feature.color}`} />
                    <span className="text-sm text-gray-300">{feature.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Downloader Card */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <VideoDownloader />
        </section>

        {/* Platforms Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Supported Platforms</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Download from 50+ popular platforms. If your platform isn't listed, we're constantly adding more.
            </p>
          </div>
          <PlatformShowcase />
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: '10M+', label: 'Videos Downloaded' },
              { number: '50+', label: 'Supported Platforms' },
              { number: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all" />
                <div className="relative">
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}