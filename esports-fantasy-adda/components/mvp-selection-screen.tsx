"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Player } from "./select-players-screen"

interface MvpSelectionScreenProps {
  players: Player[]
  onBack: () => void
  onNext: (mvp: Player) => void
}

export function MvpSelectionScreen({ players, onBack, onNext }: MvpSelectionScreenProps) {
  const [selectedMvp, setSelectedMvp] = useState<Player | null>(null)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Choose Your MVP</h1>
              <p className="text-xs text-muted-foreground">(2X Points)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Selected</p>
            <p className="text-lg font-bold text-purple-400">4/4</p>
          </div>
        </div>

        {/* Selected players preview */}
        <div className="flex justify-center gap-4 py-4">
          {players.map((player) => (
            <div key={player.id} className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                selectedMvp?.id === player.id
                  ? "bg-purple-600/30 border-purple-500"
                  : "bg-secondary border-border"
              }`}>
                <span className="text-lg font-bold text-purple-400">{player.name.charAt(0)}</span>
              </div>
              <p className="text-xs font-medium text-foreground mt-1">{player.name}</p>
              <p className="text-[10px] text-muted-foreground">{player.teamShort}</p>
            </div>
          ))}
        </div>
      </header>

      {/* MVP selection list */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-28">
        <div className="bg-card/50 border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Select MVP</h2>
            <p className="text-xs text-muted-foreground">(Points will be doubled)</p>
          </div>

          <div className="divide-y divide-border">
            {players.map((player) => (
              <button
                key={player.id}
                onClick={() => setSelectedMvp(player)}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-400">{player.name.charAt(0)}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.team}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedMvp?.id === player.id
                    ? "border-purple-500 bg-purple-500"
                    : "border-muted-foreground"
                }`}>
                  {selectedMvp?.id === player.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold border-border hover:bg-secondary rounded-xl"
          >
            PREVIOUS
          </Button>
          <Button
            onClick={() => selectedMvp && onNext(selectedMvp)}
            disabled={!selectedMvp}
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:from-purple-600/50 disabled:to-violet-600/50 disabled:opacity-50 border-0 rounded-xl shadow-lg shadow-purple-500/25 disabled:shadow-none transition-all duration-300"
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  )
}
