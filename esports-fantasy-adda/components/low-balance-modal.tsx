"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LowBalanceModalProps {
  currentBalance: number
  requiredAmount: number
  onAddMoney: () => void
  onCancel: () => void
}

export function LowBalanceModal({ currentBalance, requiredAmount, onAddMoney, onCancel }: LowBalanceModalProps) {
  const shortfall = requiredAmount - currentBalance

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border-t border-x border-border rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom duration-300">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          {/* Warning icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-center text-foreground mb-2">
            Insufficient Balance
          </h2>
          <p className="text-sm text-center text-muted-foreground mb-6">
            You need to add more funds to join this contest
          </p>

          {/* Balance breakdown */}
          <div className="bg-secondary/50 border border-border rounded-xl p-4 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Balance</span>
              <span className="text-sm font-medium text-foreground">₹{currentBalance.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Entry Fee</span>
              <span className="text-sm font-medium text-foreground">₹{requiredAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm font-medium text-amber-400">Short by</span>
              <span className="text-sm font-bold text-amber-400">₹{shortfall.toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onAddMoney}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40"
            >
              ADD MONEY
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full h-12 text-base font-medium border-border hover:bg-secondary rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
