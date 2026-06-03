"use client"

import { Wallet, Headphones, HelpCircle, Home, Trophy, BarChart3, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Contest {
  id: number
  entryFee: number
  prizePool: number
  spotsLeft: number
  totalSpots: number
}

interface HomeScreenProps {
  onJoinContest: (contest: Contest) => void
  walletBalance: number
  onOpenWallet: () => void
  onOpenSupport: () => void
}

const contests: Contest[] = [
  { id: 1, entryFee: 49, prizePool: 980, spotsLeft: 12, totalSpots: 20 },
  { id: 2, entryFee: 120, prizePool: 2400, spotsLeft: 8, totalSpots: 20 },
]

type TabType = "home" | "contests" | "leaderboard" | "profile"

export function HomeScreen({ onJoinContest, walletBalance, onOpenWallet, onOpenSupport }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              FANTASY
            </span>
            <span className="text-xs font-bold tracking-[0.2em] text-purple-400 -mt-1">
              ADDA
            </span>
          </div>

          {/* Wallet balance */}
          <button 
            onClick={onOpenWallet}
            className="flex items-center gap-2 px-3 py-2 bg-secondary/80 border border-border rounded-xl hover:bg-secondary transition-colors"
          >
            <span className="text-sm font-semibold text-foreground">₹{walletBalance.toFixed(2)}</span>
            <Wallet className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex items-center justify-center gap-8 mt-4 py-3 border-y border-border/50">
          <button 
            onClick={onOpenWallet}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-purple-400 transition-colors"
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs">Wallet</span>
          </button>
          <button 
            onClick={onOpenSupport}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-purple-400 transition-colors"
          >
            <Headphones className="w-5 h-5" />
            <span className="text-xs">Support</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-purple-400 transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs">How to Play</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-24">
        {/* Section title */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Live Contests</h2>

        {/* Contest cards */}
        <div className="space-y-4">
          {contests.map((contest) => (
            <div
              key={contest.id}
              className="bg-card/80 border border-border rounded-2xl p-4 relative overflow-hidden"
            >
              {/* Subtle glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Entry fee and prize pool row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Entry Fee</p>
                    <p className="text-2xl font-bold text-purple-400">₹{contest.entryFee}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Prize Pool</p>
                    <p className="text-2xl font-bold text-foreground">₹{contest.prizePool}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Spots Left</span>
                    <span>{contest.spotsLeft} / {contest.totalSpots}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500"
                      style={{ width: `${((contest.totalSpots - contest.spotsLeft) / contest.totalSpots) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Join button */}
                <Button
                  onClick={() => onJoinContest(contest)}
                  className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40"
                >
                  JOIN NOW
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around py-2 px-2">
          <NavItem icon={Home} label="Home" active />
          <NavItem icon={Trophy} label="My Contests" />
          <NavItem icon={BarChart3} label="Leaderboard" />
          <NavItem icon={User} label="Profile" />
        </div>
      </nav>
    </div>
  )
}

function NavItem({ icon: Icon, label, active = false }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${active ? 'text-purple-400' : 'text-muted-foreground hover:text-foreground'}`}>
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  )
}
