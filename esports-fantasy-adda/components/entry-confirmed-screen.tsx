"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Player } from "./select-players-screen"
import type { Team } from "./team-selection-screen"

interface EntryConfirmedScreenProps {
  players: Player[]
  mvp: Player
  team: Team
  entryFee: number
  contestName: string
  onGoToContests: () => void
}

export function EntryConfirmedScreen({ players, mvp, team, entryFee, contestName, onGoToContests }: EntryConfirmedScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Success icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-2">Entry Confirmed!</h1>
        <p className="text-sm text-muted-foreground mb-8 text-center">
          You have successfully joined the contest.
        </p>

        {/* Contest details */}
        <div className="w-full bg-card/50 border border-border rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Entry Fee</p>
              <p className="text-lg font-bold text-purple-400">₹{entryFee}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Contest</p>
              <p className="text-sm font-semibold text-foreground">{contestName}</p>
            </div>
          </div>
        </div>

        {/* Team preview */}
        <div className="w-full mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Your Team</h2>
          <div className="flex justify-center gap-3 mb-4">
            {players.map((player) => (
              <div key={player.id} className="flex flex-col items-center">
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                  mvp.id === player.id
                    ? "bg-purple-600/30 border-2 border-purple-500"
                    : "bg-secondary border border-border"
                }`}>
                  <span className="text-sm font-bold text-purple-400">{player.name.charAt(0)}</span>
                  {mvp.id === player.id && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-purple-600 text-[8px] font-bold text-white rounded-full">
                      MVP
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-medium text-foreground mt-1.5">{player.name}</p>
              </div>
            ))}
          </div>
          
          {/* Team badge */}
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center border border-border">
              <span className="text-[10px] font-bold text-purple-400">{team.shortName}</span>
            </div>
            <p className="text-xs text-muted-foreground">Team {team.name}</p>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 relative z-10">
        <Button
          onClick={onGoToContests}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40"
        >
          GO TO MY CONTESTS
        </Button>
      </div>
    </div>
  )
}
