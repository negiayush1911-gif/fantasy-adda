"use client"

import { ArrowLeft, Plus, Trophy, ArrowDownLeft, ArrowUpRight, RefreshCw, Shield, Clock, CheckCircle2, AlertCircle, Wallet, ArrowDown, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Transaction {
  id: string
  type: "winning" | "entry" | "deposit" | "withdrawal" | "refund" | "pending_deposit" | "pending_withdrawal"
  status: "completed" | "pending" | "processing"
  title: string
  description: string
  amount: number
  date: string
  timestamp: string
}

interface WalletScreenProps {
  balance: number
  withdrawableBalance: number
  transactions: Transaction[]
  onBack: () => void
  onAddMoney: () => void
  onWithdraw: () => void
}

export function WalletScreen({ balance, withdrawableBalance, transactions, onBack, onAddMoney, onWithdraw }: WalletScreenProps) {
  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "winning":
        return <Trophy className="w-4 h-4" />
      case "entry":
        return <ArrowUpRight className="w-4 h-4" />
      case "deposit":
      case "pending_deposit":
        return <ArrowDownLeft className="w-4 h-4" />
      case "withdrawal":
      case "pending_withdrawal":
        return <ArrowDown className="w-4 h-4" />
      case "refund":
        return <RefreshCw className="w-4 h-4" />
    }
  }

  const getTransactionColor = (transaction: Transaction) => {
    if (transaction.status === "pending" || transaction.status === "processing") {
      return "text-amber-400"
    }
    switch (transaction.type) {
      case "winning":
      case "deposit":
      case "refund":
        return "text-emerald-400"
      case "entry":
      case "withdrawal":
        return "text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getIconBgColor = (transaction: Transaction) => {
    if (transaction.status === "pending" || transaction.status === "processing") {
      return "bg-amber-500/20 text-amber-400"
    }
    switch (transaction.type) {
      case "winning":
        return "bg-amber-500/20 text-amber-400"
      case "entry":
        return "bg-red-500/20 text-red-400"
      case "deposit":
        return "bg-emerald-500/20 text-emerald-400"
      case "withdrawal":
        return "bg-purple-500/20 text-purple-400"
      case "refund":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    if (status === "pending") {
      return (
        <span className="flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
          <Clock className="w-3 h-3" />
          Pending
        </span>
      )
    }
    if (status === "processing") {
      return (
        <span className="flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
          <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          Processing
        </span>
      )
    }
    return null
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
          <h1 className="text-lg font-semibold text-foreground">My Wallet</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto">
        {/* Premium Balance Card */}
        <div className="bg-gradient-to-br from-card/90 to-card/70 border border-border/50 rounded-2xl p-5 relative overflow-hidden mb-4 backdrop-blur-sm">
          {/* Animated glow effects */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-purple-400" />
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                </div>
                <p className="text-4xl font-bold text-foreground tracking-tight">
                  <span className="text-purple-400">₹</span>{balance.toFixed(2)}
                </p>
              </div>
              <Button
                onClick={onAddMoney}
                size="icon"
                className="w-11 h-11 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Withdrawable balance */}
            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-muted-foreground">Withdrawable</span>
              </div>
              <span className="text-sm font-semibold text-emerald-400">₹{withdrawableBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 mb-4 py-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-muted-foreground">Secure Payments • 256-bit Encryption</span>
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            onClick={onAddMoney}
            className="h-14 text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADD MONEY
          </Button>
          <Button
            onClick={onWithdraw}
            variant="outline"
            className="h-14 text-sm font-semibold bg-secondary/50 border-purple-500/30 hover:border-purple-500/50 hover:bg-secondary/80 rounded-xl transition-all duration-300 active:scale-[0.98] text-purple-400 hover:text-purple-300"
          >
            <ArrowDown className="w-4 h-4 mr-2" />
            WITHDRAW
          </Button>
        </div>

        {/* Transactions section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Transaction History</h2>
            <span className="text-xs text-muted-foreground">Recent</span>
          </div>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-card/50 border border-border/50 rounded-xl p-4 flex items-center justify-between backdrop-blur-sm transition-all duration-200 hover:bg-card/70"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBgColor(transaction)} ${transaction.status === "processing" ? "animate-pulse" : ""}`}>
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{transaction.title}</p>
                      {getStatusBadge(transaction.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${getTransactionColor(transaction)}`}>
                  {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* View all link */}
          <button className="w-full mt-4 py-3 text-sm text-purple-400 hover:text-purple-300 transition-colors active:scale-[0.98]">
            View all transactions
          </button>
        </div>

        {/* Help section */}
        <div className="mt-4 p-4 bg-card/30 border border-border/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Having payment issues?</p>
              <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
