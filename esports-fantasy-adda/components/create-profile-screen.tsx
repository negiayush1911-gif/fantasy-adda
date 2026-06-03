"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Sparkles, Check, Camera } from "lucide-react"

interface CreateProfileScreenProps {
  onComplete: (name: string, avatar: string) => void
}

const avatarOptions = [
  { id: "default", color: "from-purple-500 to-violet-600" },
  { id: "blue", color: "from-blue-500 to-cyan-500" },
  { id: "green", color: "from-emerald-500 to-teal-500" },
  { id: "orange", color: "from-orange-500 to-amber-500" },
  { id: "pink", color: "from-pink-500 to-rose-500" },
  { id: "red", color: "from-red-500 to-rose-600" },
]

export function CreateProfileScreen({ onComplete }: CreateProfileScreenProps) {
  const [showWelcome, setShowWelcome] = useState(true)
  const [name, setName] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("default")
  const [isLoading, setIsLoading] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Welcome animation sequence
    const timer1 = setTimeout(() => setAnimateIn(true), 100)
    const timer2 = setTimeout(() => setShowWelcome(false), 2500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleContinue = async () => {
    if (name.trim().length < 2) return
    
    setIsLoading(true)
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1200))
    onComplete(name.trim(), selectedAvatar)
  }

  const selectedAvatarColor = avatarOptions.find(a => a.id === selectedAvatar)?.color || avatarOptions[0].color

  // Welcome animation screen
  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Welcome content */}
        <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Sparkle icon with glow */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-purple-500/40 rounded-full blur-xl animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Welcome text */}
          <h1 className="text-3xl font-black text-foreground mb-2 tracking-tight">
            Welcome to
          </h1>
          <div className="flex flex-col items-center mb-4">
            <span className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              FANTASY ADDA
            </span>
          </div>
          <p className="text-muted-foreground text-center max-w-xs">
            {"Let's set up your profile to get started"}
          </p>
          
          {/* Loading dots */}
          <div className="flex gap-1.5 mt-8">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Profile card with glow */}
        <div className="relative mb-8">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent rounded-3xl blur-xl" />
          
          {/* Card */}
          <div className="relative bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-2xl shadow-purple-500/10">
            {/* Avatar preview */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer glow ring */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${selectedAvatarColor} rounded-full blur-md opacity-60 animate-pulse`} />
                
                {/* Avatar circle */}
                <div className={`relative w-24 h-24 bg-gradient-to-br ${selectedAvatarColor} rounded-full flex items-center justify-center shadow-xl`}>
                  {name ? (
                    <span className="text-3xl font-bold text-white uppercase">
                      {name.charAt(0)}
                    </span>
                  ) : (
                    <User className="w-10 h-10 text-white/80" />
                  )}
                </div>
                
                {/* Camera badge */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-card border-2 border-purple-500 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Complete Your Profile
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This name will be visible in contests and leaderboards.
              </p>
            </div>

            {/* Name input */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-muted-foreground">
                Display Name
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 20))}
                  className="h-14 bg-secondary/80 border-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-muted-foreground/50 text-lg font-medium pl-4 pr-12"
                />
                {name.length >= 2 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground/60 text-right">
                {name.length}/20 characters
              </p>
            </div>

            {/* Avatar selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">
                Choose Avatar Color
              </label>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`relative w-12 h-12 rounded-full transition-all duration-300 ${
                      selectedAvatar === avatar.id 
                        ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-background' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${avatar.color} rounded-full`} />
                    {selectedAvatar === avatar.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Continue button */}
        <div className="pb-8">
          <Button
            onClick={handleContinue}
            disabled={name.trim().length < 2 || isLoading}
            className="w-full h-14 text-base font-bold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:from-purple-600/50 disabled:to-violet-600/50 disabled:opacity-50 border-0 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:shadow-none relative overflow-hidden group"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating Profile...</span>
              </div>
            ) : (
              <>
                <span className="relative z-10">CONTINUE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground/60 text-center mt-4">
            You can change this later in settings
          </p>
        </div>
      </main>
    </div>
  )
}
