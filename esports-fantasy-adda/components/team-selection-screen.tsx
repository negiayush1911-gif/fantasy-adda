"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Team {
  id: number
  name: string
  shortName: string
  logo: string
}

interface TeamSelectionScreenProps {
  onBack: () => void
  onNext: (team: Team) => void
}

const teams: Team[] = [
  { id: 1, name: "GodLike Esports", shortName: "GL", logo: "GL" },
  { id: 2, name: "Team Soul", shortName: "SOUL", logo: "SOUL" },
  { id: 3, name: "Xspark", shortName: "XS", logo: "XS" },
  { id: 4, name: "Revenant Esports", shortName: "RVT", logo: "RVT" },
  { id: 5, name: "Entity Gaming", shortName: "ENT", logo: "ENT" },
  { id: 6, name: "Global Esports", shortName: "GE", logo: "GE" },
  { id: 7, name: "Blind Esports", shortName: "BLD", logo: "BLD" },
  { id: 8, name: "OR Esports", shortName: "OR", logo: "OR" },
]

export function TeamSelectionScreen({ onBack, onNext }: TeamSelectionScreenProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Select a Team</h1>
            <p className="text-xs text-muted-foreground">(For Position Points)</p>
          </div>
        </div>

        {/* Selected team indicator */}
        {selectedTeam && (
          <div className="mt-3 px-3 py-2 bg-purple-600/20 border border-purple-500/30 rounded-xl">
            <p className="text-xs text-muted-foreground">Selected Team</p>
            <p className="text-sm font-semibold text-purple-400">{selectedTeam.name}</p>
          </div>
        )}
      </header>

      {/* Team list */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-28">
        <div className="bg-card/50 border border-border rounded-2xl overflow-hidden">
          <div className="divide-y divide-border">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Team logo placeholder */}
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                    <span className="text-xs font-bold text-purple-400">{team.logo}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{team.name}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedTeam?.id === team.id
                    ? "border-purple-500 bg-purple-500"
                    : "border-muted-foreground"
                }`}>
                  {selectedTeam?.id === team.id && (
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
            onClick={() => selectedTeam && onNext(selectedTeam)}
            disabled={!selectedTeam}
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:from-purple-600/50 disabled:to-violet-600/50 disabled:opacity-50 border-0 rounded-xl shadow-lg shadow-purple-500/25 disabled:shadow-none transition-all duration-300"
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  )
}

export type { Team }
