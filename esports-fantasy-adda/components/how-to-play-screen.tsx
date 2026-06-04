"use client"

import { ArrowLeft, Target, Users, Wallet, Trophy, Star, CheckCircle2, Zap } from "lucide-react"

interface HowToPlayScreenProps {
  onBack: () => void
}

const steps = [
  {
    id: 1,
    icon: Users,
    title: "Join a Contest",
    description: "Browse live contests and choose one based on entry fee and prize pool. Each contest has limited spots, so join quickly!",
    color: "from-purple-500 to-violet-500"
  },
  {
    id: 2,
    icon: Target,
    title: "Select Your Players",
    description: "Pick 4 players from the available roster. Choose wisely based on player form, stats, and match conditions.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    icon: Star,
    title: "Choose Your MVP",
    description: "Select one player as your MVP (Most Valuable Player). Your MVP earns 2x points for their performance.",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 4,
    icon: Zap,
    title: "Pick a Team",
    description: "Choose one team you think will win the match. Bonus points if your selected team wins!",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: 5,
    icon: Trophy,
    title: "Win Prizes",
    description: "Once the match ends, points are calculated based on player performance. Top scorers win from the prize pool!",
    color: "from-pink-500 to-rose-500"
  }
]

const walletInfo = [
  {
    title: "Add Money",
    description: "Add funds via UPI to participate in contests. Minimum deposit is ₹50."
  },
  {
    title: "Entry Fees",
    description: "Pay the entry fee from your wallet balance to join any contest."
  },
  {
    title: "Winnings",
    description: "Winnings are credited instantly to your wallet after results are declared."
  },
  {
    title: "Withdrawals",
    description: "Withdraw winnings to your UPI ID anytime. Processing takes 24-48 hours."
  }
]

export function HowToPlayScreen({ onBack }: HowToPlayScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-72 h-72 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-200 active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">How to Play</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-8">
        {/* Intro card */}
        <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-2">Welcome to Fantasy Adda!</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {"India's first skill-based esports fantasy platform. Create your dream team, compete with others, and win real prizes!"}
          </p>
        </div>

        {/* Steps section */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-foreground mb-4">How Contests Work</h3>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="bg-card/80 border border-border rounded-xl p-4 relative overflow-hidden"
              >
                {/* Step number badge */}
                <div className="absolute top-3 right-3 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">{step.id}</span>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 pr-6">
                    <h4 className="text-sm font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[1.875rem] top-[4.25rem] w-0.5 h-4 bg-gradient-to-b from-border to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wallet section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-semibold text-foreground">Wallet & Payments</h3>
          </div>
          
          <div className="bg-card/80 border border-border rounded-xl p-4 space-y-4">
            {walletInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Winnings section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold text-foreground">Winning Process</h3>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-amber-400">1</span>
                </div>
                <p className="text-sm text-muted-foreground">Points are calculated based on real match player performance</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-amber-400">2</span>
                </div>
                <p className="text-sm text-muted-foreground">Leaderboard is updated in real-time during the match</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-amber-400">3</span>
                </div>
                <p className="text-sm text-muted-foreground">Top players share the prize pool based on final rankings</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-amber-400">4</span>
                </div>
                <p className="text-sm text-muted-foreground">Winnings are credited instantly to your wallet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips section */}
        <div className="bg-card/80 border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Pro Tips</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Star className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Choose your MVP wisely - they earn double points!</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Check player recent form before selecting</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Join contests early as spots fill up quickly</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Start with lower entry contests to learn the game</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
