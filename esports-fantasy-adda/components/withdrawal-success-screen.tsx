"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, ArrowDown, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WithdrawalSuccessScreenProps {
  amount: number
  upiId: string
  onContinue: () => void
}

export function WithdrawalSuccessScreen({ amount, upiId, onContinue }: WithdrawalSuccessScreenProps) {
  const [showContent, setShowContent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 300)
    const detailsTimer = setTimeout(() => setShowDetails(true), 600)
    const buttonTimer = setTimeout(() => setShowButton(true), 900)
    
    return () => {
      clearTimeout(contentTimer)
      clearTimeout(detailsTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className={`text-center w-full max-w-sm transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Success icon */}
          <div className="relative mb-8">
            <div className="w-28 h-28 mx-auto relative">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-purple-500/30 animate-ping" style={{ animationDelay: "0.15s" }} />
              
              {/* Icon container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-purple-500/40">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Success badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Request Submitted</span>
          </div>

          {/* Success text */}
          <h1 className="text-2xl font-bold text-foreground mb-2">Withdrawal Requested!</h1>
          <p className="text-muted-foreground mb-6">
            Your withdrawal request has been submitted successfully
          </p>

          {/* Amount and details card */}
          <div className={`transition-all duration-700 delay-300 ${showDetails ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="bg-gradient-to-br from-card/90 to-card/70 border border-purple-500/20 rounded-2xl p-5 mb-6 backdrop-blur-sm relative overflow-hidden text-left">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-xl font-bold text-purple-400">-₹{amount.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">UPI ID</span>
                  <span className="text-sm font-mono text-foreground">{upiId}</span>
                </div>
                
                <div className="pt-3 border-t border-border/30">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Processing</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Usually transferred within 5-30 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
            You will receive a notification once the funds are transferred to your account.
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
        </Button>
      </div>
    </div>
  )
}
