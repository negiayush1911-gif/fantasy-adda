"use client"

import { useState } from "react"
import { ArrowLeft, ArrowDown, Shield, Info, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WithdrawScreenProps {
  withdrawableBalance: number
  onBack: () => void
  onSubmit: (amount: number, upiId: string) => void
}

const quickAmounts = [100, 200, 500, 1000]

export function WithdrawScreen({ withdrawableBalance, onBack, onSubmit }: WithdrawScreenProps) {
  const [amount, setAmount] = useState<string>("")
  const [upiId, setUpiId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ amount?: string; upiId?: string }>({})

  const validateForm = () => {
    const newErrors: { amount?: string; upiId?: string } = {}
    
    const amountNum = parseInt(amount)
    if (!amount || amountNum <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (amountNum < 100) {
      newErrors.amount = "Minimum withdrawal is ₹100"
    } else if (amountNum > withdrawableBalance) {
      newErrors.amount = "Amount exceeds withdrawable balance"
    }

    if (!upiId.trim()) {
      newErrors.upiId = "Please enter your UPI ID"
    } else if (!upiId.includes("@")) {
      newErrors.upiId = "Please enter a valid UPI ID"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAmountSelect = (value: number) => {
    if (value <= withdrawableBalance) {
      setAmount(value.toString())
      setErrors((prev) => ({ ...prev, amount: undefined }))
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true)
      setTimeout(() => {
        onSubmit(parseInt(amount), upiId)
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Withdraw Money</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-8">
        {/* Withdrawable balance card */}
        <div className="bg-gradient-to-br from-card/90 to-card/70 border border-purple-500/20 rounded-2xl p-5 mb-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <p className="text-sm text-muted-foreground">Withdrawable Balance</p>
            </div>
            <p className="text-3xl font-bold text-foreground">
              <span className="text-purple-400">₹</span>{withdrawableBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Amount input */}
        <div className="bg-gradient-to-br from-card/90 to-card/70 border border-border/50 rounded-2xl p-5 mb-4 backdrop-blur-sm">
          <label className="text-sm text-muted-foreground mb-3 block">Enter Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-purple-400">₹</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                setErrors((prev) => ({ ...prev, amount: undefined }))
              }}
              placeholder="0"
              className={`h-16 pl-10 text-3xl font-bold bg-secondary/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20 transition-all ${errors.amount ? "border-red-500/50" : ""}`}
            />
          </div>
          {errors.amount && (
            <div className="flex items-center gap-2 mt-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">{errors.amount}</span>
            </div>
          )}
        </div>

        {/* Quick amount buttons */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">Quick Select</p>
          <div className="grid grid-cols-4 gap-3">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => handleAmountSelect(quickAmount)}
                disabled={quickAmount > withdrawableBalance}
                className={`h-12 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  amount === quickAmount.toString()
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25"
                    : quickAmount > withdrawableBalance
                    ? "bg-secondary/40 border border-border/30 text-muted-foreground cursor-not-allowed"
                    : "bg-secondary/80 border border-border/50 text-foreground hover:border-purple-500/50 hover:bg-secondary"
                }`}
              >
                ₹{quickAmount}
              </button>
            ))}
          </div>
        </div>

        {/* UPI ID input */}
        <div className="bg-gradient-to-br from-card/90 to-card/70 border border-border/50 rounded-2xl p-5 mb-6 backdrop-blur-sm">
          <label className="text-sm text-muted-foreground mb-3 block">Enter UPI ID</label>
          <Input
            type="text"
            value={upiId}
            onChange={(e) => {
              setUpiId(e.target.value)
              setErrors((prev) => ({ ...prev, upiId: undefined }))
            }}
            placeholder="yourname@upi"
            className={`h-12 bg-secondary/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20 font-mono transition-all ${errors.upiId ? "border-red-500/50" : ""}`}
          />
          {errors.upiId && (
            <div className="flex items-center gap-2 mt-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">{errors.upiId}</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Funds will be transferred to this UPI ID
          </p>
        </div>

        {/* Security indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-400">100% Secure Withdrawal • Instant Transfer</span>
        </div>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={!amount || !upiId || isLoading}
          className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <>
              <ArrowDown className="w-5 h-5 mr-2" />
              WITHDRAW ₹{amount || "0"}
            </>
          )}
        </Button>

        {/* Info note */}
        <div className="flex items-start gap-3 mt-4 p-4 bg-card/30 border border-border/30 rounded-xl">
          <Info className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium mb-1">Processing Time</p>
            <p className="text-xs text-muted-foreground">
              Funds are usually transferred within 5-30 minutes depending on bank processing.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
