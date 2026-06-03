"use client"

import { useState } from "react"
import { ArrowLeft, Search, Plus, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface Player {
  id: number
  name: string
  team: string
  teamShort: string
}

interface SelectPlayersScreenProps {
  onBack: () => void
  onNext: (players: Player[]) => void
}

const allPlayers: Player[] = [
  { id: 1, name: "Jonathan", team: "GodLike", teamShort: "GL" },
  { id: 2, name: "Admino", team: "GodLike", teamShort: "GL" },
  { id: 3, name: "Jelly", team: "GodLike", teamShort: "GL" },
  { id: 4, name: "Goblin", team: "Soul", teamShort: "SOUL" },
  { id: 5, name: "Nakul", team: "Soul", teamShort: "SOUL" },
  { id: 6, name: "Hector", team: "Soul", teamShort: "SOUL" },
  { id: 7, name: "Scout", team: "Xspark", teamShort: "XS" },
  { id: 8, name: "NinjaBoi", team: "GodLike", teamShort: "GL" },
  { id: 9, name: "Punk", team: "GodLike", teamShort: "GL" },
  { id: 10, name: "Mavi", team: "OR Esports", teamShort: "OR" },
  { id: 11, name: "Clutchgod", team: "GodLike", teamShort: "GL" },
  { id: 12, name: "Gill", team: "Xspark", teamShort: "XS" },
]

const teams = ["ALL", "GODLIKE", "SOUL", "XSPARK", "OR"]

export function SelectPlayersScreen({ onBack, onNext }: SelectPlayersScreenProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTeam, setActiveTeam] = useState("ALL")

  const filteredPlayers = allPlayers.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTeam = activeTeam === "ALL" || player.team.toUpperCase() === activeTeam
    return matchesSearch && matchesTeam
  })

  const togglePlayer = (player: Player) => {
    if (selectedPlayers.find((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id))
    } else if (selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  const isSelected = (playerId: number) => selectedPlayers.some((p) => p.id === playerId)

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
              <h1 className="text-lg font-semibold text-foreground">Select 4 Players</h1>
              <p className="text-xs text-muted-foreground">from 16 Teams</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Selected</p>
            <p className="text-lg font-bold text-purple-400">{selectedPlayers.length}/4</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search player..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-secondary border-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Team filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => setActiveTeam(team)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTeam === team
                  ? "bg-purple-600 text-white"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      </header>

      {/* Player grid */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-28">
        <div className="grid grid-cols-4 gap-3">
          {filteredPlayers.map((player) => (
            <button
              key={player.id}
              onClick={() => togglePlayer(player)}
              disabled={!isSelected(player.id) && selectedPlayers.length >= 4}
              className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                isSelected(player.id)
                  ? "bg-purple-600/20 border-purple-500"
                  : "bg-card/60 border-border hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {/* Player avatar */}
              <div className="relative w-12 h-12 rounded-full bg-secondary mb-2 flex items-center justify-center overflow-hidden">
                <span className="text-lg font-bold text-purple-400">
                  {player.name.charAt(0)}
                </span>
                {/* Selection indicator */}
                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  isSelected(player.id)
                    ? "bg-purple-500 scale-100"
                    : "bg-secondary border border-border scale-100"
                }`}>
                  {isSelected(player.id) ? (
                    <Check className="w-3 h-3 text-white" />
                  ) : (
                    <Plus className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
              </div>
              <p className="text-xs font-medium text-foreground text-center truncate w-full">{player.name}</p>
              <p className="text-[10px] text-muted-foreground">{player.teamShort}</p>
            </button>
          ))}
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-background/95 backdrop-blur-lg border-t border-border">
        <Button
          onClick={() => onNext(selectedPlayers)}
          disabled={selectedPlayers.length !== 4}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:from-purple-600/50 disabled:to-violet-600/50 disabled:opacity-50 border-0 rounded-xl shadow-lg shadow-purple-500/25 disabled:shadow-none transition-all duration-300"
        >
          NEXT
        </Button>
      </div>
    </div>
  )
}
