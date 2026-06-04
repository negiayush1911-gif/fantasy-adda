"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Trophy, Zap, IndianRupee, LogIn } from "lucide-react"
import Image from "next/image"

interface SplashScreenProps {
  onContinue: () => void
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#050508]">
      {/* Premium dark background with subtle gradients */}
      <div className="absolute inset-0">
        {/* Top purple glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
        {/* Side ambient glows */}
        <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-violet-700/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -right-20 w-[250px] h-[250px] bg-purple-800/20 rounded-full blur-[100px]" />
        {/* Bottom center glow for button area */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-600/15 rounded-full blur-[80px]" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-purple-400/60 rounded-full animate-pulse" />
        <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 bg-violet-400/50 rounded-full animate-pulse delay-300" />
        <div className="absolute top-[60%] left-[20%] w-1 h-1 bg-purple-300/40 rounded-full animate-pulse delay-700" />
        <div className="absolute top-[50%] right-[25%] w-1 h-1 bg-violet-300/50 rounded-full animate-pulse delay-500" />
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Top Badge - India's Skill-Based Platform - Hidden on mobile for cleaner look */}
        <div className={`absolute top-4 right-4 hidden sm:block transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-md" />
            <div className="relative bg-[#0d0d15]/80 backdrop-blur-sm border border-purple-500/30 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-wide leading-tight">
                  {"India's"}<br />
                  <span className="text-purple-400">Skill-Based</span><br />
                  Esports Platform
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FA Logo */}
        <div className={`flex justify-center pt-6 sm:pt-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="relative">
            {/* Logo glow effect */}
            <div className="absolute inset-0 bg-purple-500/40 blur-2xl scale-150" />
            <svg 
              viewBox="0 0 120 100" 
              className="w-16 h-14 sm:w-24 sm:h-20 relative z-10"
              fill="none"
            >
              {/* FA Stylized Logo */}
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* F letter */}
              <path 
                d="M20 20 L20 80 L30 80 L30 55 L50 55 L50 45 L30 45 L30 30 L55 30 L55 20 Z" 
                fill="url(#logoGradient)"
                filter="url(#glow)"
              />
              {/* A letter */}
              <path 
                d="M60 80 L75 20 L85 20 L100 80 L88 80 L85 68 L75 68 L72 80 Z M77 58 L83 58 L80 40 Z" 
                fill="url(#logoGradient)"
                filter="url(#glow)"
              />
              {/* Decorative wing accent */}
              <path 
                d="M55 15 L60 5 L65 15 L75 5 L70 18" 
                stroke="url(#logoGradient)"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
              />
            </svg>
          </div>
        </div>

        {/* Hero Character Section */}
        <div className={`relative flex items-center justify-center -mt-2 sm:-mt-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative w-full max-w-[200px] sm:max-w-[280px] h-[200px] sm:h-[280px]">
            {/* Character glow backdrop */}
            <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 via-transparent to-transparent rounded-full scale-125" />
            <Image
              src="/images/esports-soldier.png"
              alt="Esports Character"
              fill
              className="object-contain object-center drop-shadow-[0_0_40px_rgba(139,92,246,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Brand Name & Tagline Section */}
        <div className={`text-center px-4 sm:px-6 -mt-4 sm:-mt-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Fantasy Adda */}
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
            <span className="text-white">FANTASY </span>
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              ADDA
            </span>
          </h1>

          {/* Small tagline */}
          <p className="text-white/60 text-xs sm:text-sm tracking-wide mb-2 sm:mb-3">
            Where Fantasy Meets Esports
          </p>

          {/* Glowing purple divider */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-purple-500" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-purple-500/60 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-purple-500/50 to-purple-500" />
          </div>

          {/* Big headline */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              <span className="text-white/90">{"INDIA'S "}</span>
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                1<span className="text-[0.6em] align-super">ST</span>
              </span>
            </h2>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight bg-gradient-to-r from-zinc-300 via-white to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              SKILL-BASED
            </h2>
            <h2 className="text-base sm:text-xl font-bold text-purple-400 tracking-wider">
              ESPORTS FANTASY ARENA
            </h2>
          </div>
        </div>

        {/* Login/Signup Button */}
        <div className={`px-4 sm:px-6 pb-4 sm:pb-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button
            onClick={onContinue}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 hover:from-purple-500 hover:via-violet-500 hover:to-purple-500 border border-purple-400/30 rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span>LOGIN / SIGNUP</span>
          </Button>
          <p className="text-center text-white/40 text-[10px] sm:text-xs mt-1.5 sm:mt-2">Join the Arena</p>
        </div>

        {/* Trust Badges */}
        <div className={`px-3 sm:px-4 pb-6 sm:pb-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="grid grid-cols-4 gap-1 sm:gap-2">
            {/* 100% Secure */}
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-1">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-semibold text-white/80 leading-tight">100% SECURE</span>
              <span className="text-[7px] sm:text-[8px] text-white/40 leading-tight hidden sm:block">Safe & Trusted</span>
            </div>

            {/* Fair Play */}
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-1">
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-semibold text-white/80 leading-tight">FAIR PLAY</span>
              <span className="text-[7px] sm:text-[8px] text-white/40 leading-tight hidden sm:block">Skill Matters</span>
            </div>

            {/* Instant Action */}
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-1">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-semibold text-white/80 leading-tight">INSTANT ACTION</span>
              <span className="text-[7px] sm:text-[8px] text-white/40 leading-tight hidden sm:block">Fast Contests</span>
            </div>

            {/* Instant Withdrawal */}
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-1">
                <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-semibold text-white/80 leading-tight">FAST PAYOUT</span>
              <span className="text-[7px] sm:text-[8px] text-white/40 leading-tight hidden sm:block">No Delays</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
