"use client"

import { Home, Trophy, HelpCircle, Headphones, Wallet } from "lucide-react"
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
  onOpenProfile: () => void
  onOpenHowToPlay: () => void
  onOpenMyContests: () => void
  userName: string
  userAvatar: string
}

const contests: Contest[] = [
  { id: 1, entryFee: 49, prizePool: 980, spotsLeft: 12, totalSpots: 20 },
  { id: 2, entryFee: 120, prizePool: 2400, spotsLeft: 8, totalSpots: 20 },
]

const avatarOptions: Record<string, string> = {
  default: "from-purple-500 to-violet-600",
  blue: "from-blue-500 to-cyan-500",
  green: "from-emerald-500 to-teal-500",
  orange: "from-orange-500 to-amber-500",
  pink: "from-pink-500 to-rose-500",
  red: "from-red-500 to-rose-600",
}

type TabType = "home" | "contests" | "howToPlay" | "support"

export function HomeScreen({ 
  onJoinContest, 
  walletBalance, 
  onOpenWallet, 
  onOpenSupport,
  onOpenProfile,
  onOpenHowToPlay,
  onOpenMyContests,
  userName,
  userAvatar
}: HomeScreenProps) {
  const avatarColor = avatarOptions[userAvatar] || avatarOptions.default

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      {/* New Top Navigation */}
      <header className="relative z-10 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          {/* Left: Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${avatarColor} rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity`} />
              <div className={`relative w-9 h-9 bg-gradient-to-br ${avatarColor} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-sm font-bold text-white uppercase">
                  {userName.charAt(0)}
                </span>
              </div>
            </div>
          </button>

          {/* Center: Brand Logo */}
          <div className="flex items-center gap-2">
            {/* FA Logo */}
            <div className="relative">
              <svg 
                viewBox="0 0 32 28" 
                className="w-7 h-6"
                fill="none"
              >
                <defs>
                  <linearGradient id="faLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                {/* F letter */}
                <path d="M4 4h10v3H7v4h6v3H7v8H4V4z" fill="url(#faLogoGradient)" />
                {/* A letter */}
                <path d="M18 22l2-5h6l2 5h-3l-1-3h-3l-1 3h-2zm4-14l5 14h-3l-1-3h-4l3-8 2-3z" fill="url(#faLogoGradient)" />
              </svg>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-base font-black tracking-tight bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                FANTASY
              </span>
              <span className="text-[9px] font-bold tracking-[0.15em] text-purple-400">
                ADDA
              </span>
            </div>
          </div>

          {/* Right: Wallet */}
          <button 
            onClick={onOpenWallet}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary/80 border border-border rounded-xl hover:bg-secondary transition-colors"
          >
            <span className="text-xs font-semibold text-foreground">₹{walletBalance.toFixed(0)}</span>
            <Wallet className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>

        {/* Thin divider line */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-3" />
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-3 relative z-10 overflow-y-auto pb-24">
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

      {/* Bottom navigation - Updated */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around py-2 px-2">
          <NavItem icon={Home} label="Home" active />
          <NavItem icon={Trophy} label="My Contests" onClick={onOpenMyContests} />
          <NavItem icon={HelpCircle} label="How to Play" onClick={onOpenHowToPlay} />
          <NavItem icon={Headphones} label="Support" onClick={onOpenSupport} />
        </div>
      </nav>
    </div>
  )
}

function NavItem({ 
  icon: Icon, 
  label, 
  active = false,
  onClick
}: { 
  icon: React.ElementType
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${active ? 'text-purple-400' : 'text-muted-foreground hover:text-foreground'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  )
}
