"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Gamepad2 } from "lucide-react"

interface SplashScreenProps {
  onContinue: () => void
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-700/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col items-center justify-center px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Gaming icon with glow effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500/40 rounded-full blur-xl animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
            <Gamepad2 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Logo text */}
        <div className="text-center mb-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              FANTASY
            </span>
          </h1>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight -mt-2">
            <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-violet-500 bg-clip-text text-transparent">
              ADDA
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-muted-foreground text-lg tracking-[0.3em] font-medium mb-12">
          PREDICT. COMPETE. WIN.
        </p>

        {/* Decorative line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-16" />
      </div>

      {/* Bottom CTA section */}
      <div className={`px-6 pb-12 relative z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Button
          onClick={onContinue}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          LOGIN / SIGN UP
        </Button>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-purple-600/10 to-transparent pointer-events-none" />
    </div>
  )
}
