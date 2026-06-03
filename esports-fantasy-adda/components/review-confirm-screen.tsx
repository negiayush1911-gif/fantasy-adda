"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Player } from "./select-players-screen"
import type { Team } from "./team-selection-screen"

interface ReviewConfirmScreenProps {
  players: Player[]
  mvp: Player
  team: Team
  entryFee: number
  onBack: () => void
  onConfirm: () => void
}

export function ReviewConfirmScreen({ players, mvp, team, entryFee, onBack, onConfirm }: ReviewConfirmScreenProps) {
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
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Review Your Team</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-36">
        {/* Players section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Your 4 Players</h2>
          <div className="bg-card/50 border border-border rounded-2xl overflow-hidden divide-y divide-border">
            {players.map((player) => (
              <div key={player.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-400">{player.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.team}</p>
                  </div>
                </div>
                {mvp.id === player.id && (
                  <span className="px-2 py-1 bg-purple-600/30 text-purple-400 text-xs font-semibold rounded-full">
                    2X
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected team */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Selected Team</h2>
          <div className="bg-card/50 border border-border rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
              <span className="text-xs font-bold text-purple-400">{team.shortName}</span>
            </div>
            <p className="text-sm font-medium text-foreground">{team.name}</p>
          </div>
        </div>

        {/* Fee summary */}
        <div className="bg-card/50 border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Entry Fee</p>
            <p className="text-sm font-medium text-foreground">₹{entryFee}</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <p className="text-sm font-semibold text-foreground">You Will Pay</p>
            <p className="text-lg font-bold text-purple-400">₹{entryFee}</p>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="flex gap-3 mb-2">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold border-border hover:bg-secondary rounded-xl"
          >
            PREVIOUS
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40"
          >
            CONFIRM & PAY ₹{entryFee}
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Entry fee will be deducted from your wallet
        </p>
      </div>
    </div>
  )
}
