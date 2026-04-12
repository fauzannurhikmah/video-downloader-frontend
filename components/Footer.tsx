'use client'

import { GitBranch, Bird, Mail } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            VideoHub
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Download videos from your favorite platforms with ease. Fast, secure, and completely free.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                                <GitBranch className="w-4 h-4 text-gray-300" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                                <Bird className="w-4 h-4 text-gray-300" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                                <Mail className="w-4 h-4 text-gray-300" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">API Docs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Changelog</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">DMCA</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">GitHub</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Community</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            &copy; {currentYear} VideoHub. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-500">
                            Made with ❤️ by the VideoHub team
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}