"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentSuccessScreenProps {
  amount: number
  onContinue: () => void
}

export function PaymentSuccessScreen({ amount, onContinue }: PaymentSuccessScreenProps) {
  const [showContent, setShowContent] = useState(false)
  const [showAmount, setShowAmount] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 300)
    const amountTimer = setTimeout(() => setShowAmount(true), 600)
    const buttonTimer = setTimeout(() => setShowButton(true), 900)
    
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(amountTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects - success themed */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0.6s" }} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className={`text-center transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Success icon with animated rings */}
          <div className="relative mb-8">
            <div className="w-28 h-28 mx-auto relative">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-emerald-500/30 animate-ping" style={{ animationDelay: "0.15s" }} />
              <div className="absolute inset-4 rounded-full border-2 border-emerald-500/20 animate-ping" style={{ animationDelay: "0.3s" }} />
              
              {/* Icon container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Success badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Payment Successful</span>
          </div>

          {/* Success text */}
          <h1 className="text-2xl font-bold text-foreground mb-2">Wallet Credited!</h1>
          <p className="text-muted-foreground mb-6">
            Your payment has been verified successfully
          </p>

          {/* Amount card */}
          <div className={`transition-all duration-700 delay-300 ${showAmount ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="bg-gradient-to-br from-card/90 to-card/70 border border-emerald-500/20 rounded-2xl px-8 py-6 mb-8 inline-block backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
              <p className="text-sm text-muted-foreground mb-1">Amount Added</p>
              <p className="text-4xl font-bold text-emerald-400 relative z-10">
                +₹{amount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Note */}
          <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
            Amount has been added to your wallet. You can now join contests and start winning!
          </p>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className={`relative z-20 p-4 pb-8 transition-all duration-700 ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <Button
          onClick={onContinue}
          className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 active:scale-[0.98]"
        >
          GO TO WALLET
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
