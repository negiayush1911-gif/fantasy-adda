"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Wallet, 
  Trophy, 
  Target, 
  Clock, 
  ChevronRight, 
  Edit3, 
  Check,
  X,
  Shield,
  Star
} from "lucide-react"

interface ProfileScreenProps {
  userName: string
  userAvatar: string
  walletBalance: number
  onBack: () => void
  onUpdateProfile: (name: string, avatar: string) => void
  onOpenWallet: () => void
}

const avatarOptions = [
  { id: "default", color: "from-purple-500 to-violet-600" },
  { id: "blue", color: "from-blue-500 to-cyan-500" },
  { id: "green", color: "from-emerald-500 to-teal-500" },
  { id: "orange", color: "from-orange-500 to-amber-500" },
  { id: "pink", color: "from-pink-500 to-rose-500" },
  { id: "red", color: "from-red-500 to-rose-600" },
]

// Mock data for stats and history
const mockStats = {
  totalContests: 24,
  totalWinnings: 1250,
  activeContests: 2,
  winRate: 42,
}

const mockMatchHistory = [
  { id: 1, name: "BGMI - Match 12", date: "Today", position: 1, winnings: 500, status: "won" },
  { id: 2, name: "BGMI - Match 11", date: "Yesterday", position: 4, winnings: 100, status: "won" },
  { id: 3, name: "BGMI - Match 10", date: "2 days ago", position: 8, winnings: 0, status: "lost" },
  { id: 4, name: "BGMI - Match 9", date: "3 days ago", position: 2, winnings: 300, status: "won" },
  { id: 5, name: "BGMI - Match 8", date: "4 days ago", position: 12, winnings: 0, status: "lost" },
]

export function ProfileScreen({ 
  userName, 
  userAvatar, 
  walletBalance, 
  onBack, 
  onUpdateProfile,
  onOpenWallet 
}: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(userName)
  const [editAvatar, setEditAvatar] = useState(userAvatar)
  const [isSaving, setIsSaving] = useState(false)

  const avatarColor = avatarOptions.find(a => a.id === userAvatar)?.color || avatarOptions[0].color
  const editAvatarColor = avatarOptions.find(a => a.id === editAvatar)?.color || avatarOptions[0].color

  const handleSave = async () => {
    if (editName.trim().length < 2) return
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    onUpdateProfile(editName.trim(), editAvatar)
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditName(userName)
    setEditAvatar(userAvatar)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">My Profile</h1>
        <div className="w-10" />
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 pt-4 pb-8 relative z-10 overflow-y-auto">
        {/* Profile Card */}
        <div className="relative mb-6">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/15 to-transparent rounded-3xl blur-xl" />
          
          <div className="relative bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-5 shadow-xl">
            {/* Edit button */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 transition-colors"
              >
                <Edit3 className="w-4 h-4 text-purple-400" />
              </button>
            ) : (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleCancel}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={editName.trim().length < 2 || isSaving}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                </button>
              </div>
            )}

            {/* Avatar and name */}
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className={`absolute -inset-1.5 bg-gradient-to-r ${isEditing ? editAvatarColor : avatarColor} rounded-full blur-md opacity-50`} />
                <div className={`relative w-20 h-20 bg-gradient-to-br ${isEditing ? editAvatarColor : avatarColor} rounded-full flex items-center justify-center shadow-xl`}>
                  <span className="text-2xl font-bold text-white uppercase">
                    {(isEditing ? editName : userName).charAt(0) || "?"}
                  </span>
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center border-2 border-background">
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Name */}
              {isEditing ? (
                <div className="w-full max-w-xs space-y-3 mt-2">
                  <Input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value.slice(0, 20))}
                    className="h-12 bg-secondary/80 border-border rounded-xl text-center text-lg font-semibold focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter name"
                  />
                  {/* Avatar selection */}
                  <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() => setEditAvatar(avatar.id)}
                        className={`w-9 h-9 rounded-full transition-all duration-200 ${
                          editAvatar === avatar.id 
                            ? 'scale-110 ring-2 ring-white ring-offset-1 ring-offset-background' 
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className={`w-full h-full bg-gradient-to-br ${avatar.color} rounded-full`} />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-1">{userName}</h2>
                  <div className="flex items-center gap-1.5 text-purple-400">
                    <Star className="w-4 h-4 fill-purple-400" />
                    <span className="text-sm font-medium">Pro Player</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Wallet Balance */}
          <button
            onClick={onOpenWallet}
            className="bg-card/80 border border-border rounded-2xl p-4 text-left hover:bg-card transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-emerald-400" />
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">Wallet Balance</p>
            <p className="text-lg font-bold text-foreground">₹{walletBalance.toFixed(0)}</p>
          </button>

          {/* Total Winnings */}
          <div className="bg-card/80 border border-border rounded-2xl p-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">Total Winnings</p>
            <p className="text-lg font-bold text-foreground">₹{mockStats.totalWinnings}</p>
          </div>

          {/* Joined Contests */}
          <div className="bg-card/80 border border-border rounded-2xl p-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">Joined Contests</p>
            <p className="text-lg font-bold text-foreground">{mockStats.totalContests}</p>
          </div>

          {/* Active Contests */}
          <div className="bg-card/80 border border-border rounded-2xl p-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">Active Contests</p>
            <p className="text-lg font-bold text-foreground">{mockStats.activeContests}</p>
          </div>
        </div>

        {/* Win Rate Card */}
        <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
              <p className="text-2xl font-bold text-foreground">{mockStats.winRate}%</p>
            </div>
            <div className="w-16 h-16 relative">
              {/* Circular progress */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-secondary"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${mockStats.winRate * 0.88} 88`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Match History */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-foreground">Match History</h3>
            <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-2">
            {mockMatchHistory.map((match) => (
              <div
                key={match.id}
                className="bg-card/60 border border-border rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    match.status === "won" 
                      ? "bg-emerald-500/20" 
                      : "bg-red-500/20"
                  }`}>
                    <span className={`text-sm font-bold ${
                      match.status === "won" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      #{match.position}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{match.name}</p>
                    <p className="text-xs text-muted-foreground">{match.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  {match.winnings > 0 ? (
                    <p className="text-sm font-semibold text-emerald-400">+₹{match.winnings}</p>
                  ) : (
                    <p className="text-sm font-medium text-muted-foreground">-</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout button */}
        <Button
          variant="outline"
          className="w-full h-12 text-sm font-medium border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl mt-4"
        >
          Log Out
        </Button>
      </main>
    </div>
  )
}
