"use client"

import { useState } from "react"
import { ArrowLeft, Trophy, Clock, CheckCircle2, XCircle, Calendar } from "lucide-react"
import type { JoinedContest } from "@/app/page"

interface MyContestsScreenProps {
  contests: JoinedContest[]
  onBack: () => void
}

type TabType = "active" | "completed" | "all"

// Mock completed contests for demo
const mockCompletedContests: JoinedContest[] = [
  {
    id: "mock-1",
    contestId: 100,
    contestName: "BGMI - Match 5",
    entryFee: 49,
    prizePool: 980,
    status: "completed",
    result: "won",
    winnings: 200,
    position: 3,
    joinedAt: "Yesterday, 8:00 PM",
    matchTime: "Completed"
  },
  {
    id: "mock-2",
    contestId: 101,
    contestName: "BGMI - Match 4",
    entryFee: 120,
    prizePool: 2400,
    status: "completed",
    result: "won",
    winnings: 500,
    position: 1,
    joinedAt: "2 days ago",
    matchTime: "Completed"
  },
  {
    id: "mock-3",
    contestId: 102,
    contestName: "BGMI - Match 3",
    entryFee: 49,
    prizePool: 980,
    status: "completed",
    result: "lost",
    position: 15,
    joinedAt: "3 days ago",
    matchTime: "Completed"
  }
]

export function MyContestsScreen({ contests, onBack }: MyContestsScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>("active")
  
  // Combine user's joined contests with mock completed ones for demo
  const allContests = [...contests, ...mockCompletedContests]
  const activeContests = allContests.filter(c => c.status === "active" || c.status === "upcoming")
  const completedContests = allContests.filter(c => c.status === "completed")
  
  const displayedContests = activeTab === "active" 
    ? activeContests 
    : activeTab === "completed" 
    ? completedContests 
    : allContests

  const totalWinnings = completedContests
    .filter(c => c.result === "won")
    .reduce((sum, c) => sum + (c.winnings || 0), 0)

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
          <h1 className="text-lg font-semibold text-foreground">My Contests</h1>
        </div>
      </header>

      {/* Stats summary */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card/80 border border-border rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-foreground">{allContests.length}</p>
            <p className="text-[10px] text-muted-foreground">Total</p>
          </div>
          <div className="bg-card/80 border border-border rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-purple-400">{activeContests.length}</p>
            <p className="text-[10px] text-muted-foreground">Active</p>
          </div>
          <div className="bg-card/80 border border-border rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-emerald-400">₹{totalWinnings}</p>
            <p className="text-[10px] text-muted-foreground">Winnings</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-xl">
          <TabButton 
            active={activeTab === "active"} 
            onClick={() => setActiveTab("active")}
            count={activeContests.length}
          >
            Active
          </TabButton>
          <TabButton 
            active={activeTab === "completed"} 
            onClick={() => setActiveTab("completed")}
            count={completedContests.length}
          >
            Completed
          </TabButton>
          <TabButton 
            active={activeTab === "all"} 
            onClick={() => setActiveTab("all")}
            count={allContests.length}
          >
            All
          </TabButton>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-4 py-2 relative z-10 overflow-y-auto pb-8">
        {displayedContests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">No Contests Yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {activeTab === "active" 
                ? "You haven't joined any active contests. Head to Home to join a contest!"
                : activeTab === "completed"
                ? "No completed contests yet. Keep playing to see your history here."
                : "Start joining contests to see them here!"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function TabButton({ 
  children, 
  active, 
  onClick,
  count
}: { 
  children: React.ReactNode
  active: boolean
  onClick: () => void
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        active 
          ? "bg-purple-500/20 text-purple-400" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
        active ? "bg-purple-500/30" : "bg-secondary"
      }`}>
        {count}
      </span>
    </button>
  )
}

function ContestCard({ contest }: { contest: JoinedContest }) {
  const isActive = contest.status === "active" || contest.status === "upcoming"
  const isWon = contest.result === "won"
  
  return (
    <div className="bg-card/80 border border-border rounded-xl p-4 relative overflow-hidden">
      {/* Status badge */}
      <div className="absolute top-3 right-3">
        {isActive ? (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-medium text-purple-400">Active</span>
          </div>
        ) : isWon ? (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/20 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-400">Won</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/20 rounded-full">
            <XCircle className="w-3 h-3 text-red-400" />
            <span className="text-[10px] font-medium text-red-400">Lost</span>
          </div>
        )}
      </div>

      {/* Contest info */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-foreground mb-1 pr-20">{contest.contestName}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{contest.joinedAt}</span>
        </div>
      </div>

      {/* Prize info */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
        <div>
          <p className="text-[10px] text-muted-foreground mb-0.5">Entry Fee</p>
          <p className="text-sm font-semibold text-foreground">₹{contest.entryFee}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground mb-0.5">Prize Pool</p>
          <p className="text-sm font-semibold text-foreground">₹{contest.prizePool}</p>
        </div>
        {contest.status === "completed" && (
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground mb-0.5">Position</p>
            <p className="text-sm font-semibold text-foreground">#{contest.position}</p>
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{contest.matchTime}</span>
        </div>
        
        {contest.status === "completed" && isWon && contest.winnings && (
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-sm font-bold text-emerald-400">+₹{contest.winnings}</span>
          </div>
        )}
        
        {isActive && (
          <button className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">
            View Details
          </button>
        )}
      </div>
    </div>
  )
}
