"use client"

import { useState } from "react"
import { ArrowLeft, Shield, Info, CheckCircle2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddMoneyScreenProps {
  onBack: () => void
  onSubmit: (amount: number, referenceId: string) => void
}

const quickAmounts = [49, 99, 199, 499]

export function AddMoneyScreen({ onBack, onSubmit }: AddMoneyScreenProps) {
  const [amount, setAmount] = useState<string>("")
  const [referenceId, setReferenceId] = useState("")
  const [showPayment, setShowPayment] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString())
  }

  const handleProceed = () => {
    if (amount && parseInt(amount) > 0) {
      setIsLoading(true)
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false)
        setShowPayment(true)
      }, 800)
    }
  }

  const handleSubmitPayment = () => {
    if (referenceId.trim()) {
      onSubmit(parseInt(amount), referenceId)
    }
  }

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("fantasyadda@ybl")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          <h1 className="text-lg font-semibold text-foreground">
            {showPayment ? "Complete Payment" : "Add Money"}
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-8">
        {!showPayment ? (
          <>
            {/* Amount input section */}
            <div className="bg-gradient-to-br from-card/90 to-card/70 border border-border/50 rounded-2xl p-5 mb-6 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
              
              <div className="relative z-10">
                <label className="text-sm text-muted-foreground mb-3 block">Enter Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-purple-400">₹</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="h-16 pl-10 text-3xl font-bold bg-secondary/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Quick amount buttons */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Quick Select</p>
              <div className="grid grid-cols-4 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => handleAmountSelect(quickAmount)}
                    className={`h-12 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
                      amount === quickAmount.toString()
                        ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25"
                        : "bg-secondary/80 border border-border/50 text-foreground hover:border-purple-500/50 hover:bg-secondary"
                    }`}
                  >
                    ₹{quickAmount}
                  </button>
                ))}
              </div>
            </div>

            {/* Security indicator */}
            <div className="flex items-center justify-center gap-2 mb-6 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400">100% Secure Payment • Verified by RBI</span>
            </div>

            {/* Proceed button */}
            <Button
              onClick={handleProceed}
              disabled={!amount || parseInt(amount) <= 0 || isLoading}
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                `PROCEED TO PAY ₹${amount || "0"}`
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Payment section */}
            <div className="bg-gradient-to-br from-card/90 to-card/70 border border-border/50 rounded-2xl p-5 mb-6 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
                    <p className="text-3xl font-bold text-foreground">
                      <span className="text-purple-400">₹</span>{amount}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                
                <div className="border-t border-border/30 pt-4">
                  <p className="text-sm font-medium text-foreground mb-4">Scan QR Code to pay</p>
                  
                  {/* QR Code placeholder - premium styled */}
                  <div className="relative mx-auto w-52 h-52 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl blur-xl" />
                    <div className="relative bg-white rounded-xl p-3 w-full h-full shadow-lg shadow-purple-500/10">
                      <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIxMjAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjEzMCIgeT0iMzAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTQwIiB5PSI0MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjMwIiB5PSIxMzAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iNDAiIHk9IjE0MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSI5MCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iOTAiIHk9IjUwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjkwIiB5PSI3MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIyMCIgeT0iOTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iNTAiIHk9IjkwIiB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjkwIiB5PSIxMDAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iMTEwIiB5PSI5MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjIwIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIxMzAiIHk9IjkwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjE2MCIgeT0iOTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iOTAiIHk9IjEyMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIwIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIxMzAiIHk9IjEyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSIxNjAiIHk9IjEyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJibGFjayIvPgo8cmVjdCB4PSI5MCIgeT0iMTUwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjEyMCIgeT0iMTUwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjE1MCIgeT0iMTUwIiB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPg==')] bg-contain bg-center bg-no-repeat" />
                    </div>
                  </div>

                  {/* UPI ID with copy */}
                  <div className="bg-secondary/50 rounded-xl p-3 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Or pay to UPI ID</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono text-foreground">fantasyadda@ybl</span>
                      <button
                        onClick={handleCopyUPI}
                        className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reference ID input */}
            <div className="bg-gradient-to-br from-card/90 to-card/70 border border-border/50 rounded-2xl p-5 mb-6 backdrop-blur-sm">
              <label className="text-sm text-muted-foreground mb-3 block">
                After payment, enter Reference ID / UTR
              </label>
              <Input
                type="text"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder="Enter 12-digit UTR number"
                className="h-12 bg-secondary/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20 font-mono transition-all"
              />
              <p className="text-xs text-muted-foreground mt-2">
                UTR can be found in your UPI app payment history
              </p>
            </div>

            {/* Submit button */}
            <Button
              onClick={handleSubmitPayment}
              disabled={!referenceId.trim()}
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
            >
              SUBMIT FOR VERIFICATION
            </Button>

            {/* Info note */}
            <div className="flex items-start gap-3 mt-4 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <Info className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-amber-400 font-medium mb-1">Processing Time</p>
                <p className="text-xs text-muted-foreground">
                  Wallet balance is usually updated within 1-5 minutes after successful verification.{" "}
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    Contact Support
                  </button>
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
