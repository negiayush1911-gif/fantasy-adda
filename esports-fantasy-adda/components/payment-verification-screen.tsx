"use client"

import { useEffect, useState } from "react"
import { Clock, Shield, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentVerificationScreenProps {
  amount: number
  onVerificationComplete: () => void
}

export function PaymentVerificationScreen({ amount, onVerificationComplete }: PaymentVerificationScreenProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"verifying" | "processing" | "success">("verifying")

  useEffect(() => {
    // Simulate verification process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Change status at different progress points
    const processingTimer = setTimeout(() => setStatus("processing"), 2500)
    const successTimer = setTimeout(() => {
      setStatus("success")
      onVerificationComplete()
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(processingTimer)
      clearTimeout(successTimer)
    }
  }, [onVerificationComplete])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="text-center w-full max-w-sm">
          {/* Animated verification indicator */}
          <div className="relative mb-8">
            <div className="w-28 h-28 mx-auto relative">
              {/* Rotating ring */}
              <svg className="w-full h-full animate-spin" style={{ animationDuration: "3s" }}>
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.1)"
                  strokeWidth="4"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (progress / 100) * 314}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-8 h-8 text-amber-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm font-medium text-amber-400">
              {status === "verifying" && "Verifying Payment"}
              {status === "processing" && "Processing"}
              {status === "success" && "Verified!"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2">Payment Under Verification</h1>
          <p className="text-muted-foreground mb-6">
            Your payment of <span className="text-purple-400 font-semibold">₹{amount}</span> is being verified
          </p>

          {/* Progress bar */}
          <div className="w-full bg-secondary/50 rounded-full h-2 mb-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Info card */}
          <div className="bg-card/50 border border-border/50 rounded-2xl p-5 mb-6 backdrop-blur-sm text-left">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-foreground font-medium mb-1">Please wait</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Wallet balance is usually updated within 1-5 minutes after successful verification. Do not close this screen.
                </p>
              </div>
            </div>
          </div>

          {/* Security indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Secured by 256-bit encryption</span>
          </div>
        </div>
      </main>
    </div>
  )
}
