"use client"

import { useState, useCallback } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { LoginScreen } from "@/components/login-screen"
import { HomeScreen } from "@/components/home-screen"
import { SelectPlayersScreen, type Player } from "@/components/select-players-screen"
import { MvpSelectionScreen } from "@/components/mvp-selection-screen"
import { TeamSelectionScreen, type Team } from "@/components/team-selection-screen"
import { ReviewConfirmScreen } from "@/components/review-confirm-screen"
import { EntryConfirmedScreen } from "@/components/entry-confirmed-screen"
import { WalletScreen, type Transaction } from "@/components/wallet-screen"
import { AddMoneyScreen } from "@/components/add-money-screen"
import { PaymentVerificationScreen } from "@/components/payment-verification-screen"
import { PaymentSuccessScreen } from "@/components/payment-success-screen"
import { WithdrawScreen } from "@/components/withdraw-screen"
import { WithdrawalSuccessScreen } from "@/components/withdrawal-success-screen"
import { LowBalanceModal } from "@/components/low-balance-modal"
import { SupportScreen } from "@/components/support-screen"

type Screen = 
  | "splash" 
  | "login" 
  | "home" 
  | "selectPlayers" 
  | "selectMvp" 
  | "selectTeam" 
  | "reviewConfirm"
  | "entryConfirmed"
  | "wallet"
  | "addMoney"
  | "paymentVerification"
  | "paymentSuccess"
  | "withdraw"
  | "withdrawalSuccess"
  | "support"

interface Contest {
  id: number
  entryFee: number
  prizePool: number
  spotsLeft: number
  totalSpots: number
}

// Format timestamp
const formatTimestamp = (date: Date) => {
  return date.toLocaleDateString("en-IN", { 
    day: "2-digit", 
    month: "short", 
    hour: "2-digit", 
    minute: "2-digit",
    hour12: true
  })
}

// Initial dummy transactions with realistic data
const initialTransactions: Transaction[] = [
  {
    id: "1",
    type: "winning",
    status: "completed",
    title: "Contest Winnings",
    description: "BGMI Match 1 - 1st Place",
    amount: 100,
    date: "2024-05-20",
    timestamp: "20 May, 11:30 PM"
  },
  {
    id: "2",
    type: "entry",
    status: "completed",
    title: "Contest Entry",
    description: "BGMI Match 1",
    amount: -49,
    date: "2024-05-20",
    timestamp: "20 May, 08:15 PM"
  },
  {
    id: "3",
    type: "deposit",
    status: "completed",
    title: "Wallet Deposit",
    description: "Via UPI",
    amount: 300,
    date: "2024-05-20",
    timestamp: "20 May, 07:45 PM"
  },
  {
    id: "4",
    type: "refund",
    status: "completed",
    title: "Refund Completed",
    description: "Match cancelled - Full refund",
    amount: 49,
    date: "2024-05-19",
    timestamp: "19 May, 06:30 PM"
  },
  {
    id: "5",
    type: "deposit",
    status: "completed",
    title: "Wallet Deposit",
    description: "Via UPI",
    amount: 200,
    date: "2024-05-19",
    timestamp: "19 May, 10:20 AM"
  }
]

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash")
  const [walletBalance, setWalletBalance] = useState(350.00)
  const [withdrawableBalance, setWithdrawableBalance] = useState(250.00)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [lastAddedAmount, setLastAddedAmount] = useState(0)
  const [lastWithdrawalAmount, setLastWithdrawalAmount] = useState(0)
  const [lastWithdrawalUpi, setLastWithdrawalUpi] = useState("")
  
  // Contest flow state
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [selectedMvp, setSelectedMvp] = useState<Player | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  
  // Low balance modal state
  const [showLowBalanceModal, setShowLowBalanceModal] = useState(false)
  const [pendingContest, setPendingContest] = useState<Contest | null>(null)

  // Navigation handlers
  const handleSplashContinue = () => setCurrentScreen("login")
  const handleLoginBack = () => setCurrentScreen("splash")
  const handleLoginContinue = () => setCurrentScreen("home")

  const handleJoinContest = (contest: Contest) => {
    if (walletBalance < contest.entryFee) {
      setPendingContest(contest)
      setShowLowBalanceModal(true)
      return
    }
    
    setSelectedContest(contest)
    setSelectedPlayers([])
    setSelectedMvp(null)
    setSelectedTeam(null)
    setCurrentScreen("selectPlayers")
  }

  const handlePlayersBack = () => setCurrentScreen("home")
  const handlePlayersNext = (players: Player[]) => {
    setSelectedPlayers(players)
    setCurrentScreen("selectMvp")
  }

  const handleMvpBack = () => setCurrentScreen("selectPlayers")
  const handleMvpNext = (mvp: Player) => {
    setSelectedMvp(mvp)
    setCurrentScreen("selectTeam")
  }

  const handleTeamBack = () => setCurrentScreen("selectMvp")
  const handleTeamNext = (team: Team) => {
    setSelectedTeam(team)
    setCurrentScreen("reviewConfirm")
  }

  const handleReviewBack = () => setCurrentScreen("selectTeam")
  const handleConfirm = () => {
    if (selectedContest) {
      // Deduct entry fee
      setWalletBalance((prev) => prev - selectedContest.entryFee)
      
      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "entry",
        status: "completed",
        title: "Contest Entry",
        description: "BGMI - Match 1",
        amount: -selectedContest.entryFee,
        date: new Date().toISOString(),
        timestamp: formatTimestamp(new Date())
      }
      setTransactions((prev) => [newTransaction, ...prev])
    }
    setCurrentScreen("entryConfirmed")
  }

  const handleGoToContests = () => {
    setSelectedContest(null)
    setSelectedPlayers([])
    setSelectedMvp(null)
    setSelectedTeam(null)
    setCurrentScreen("home")
  }

  // Wallet handlers
  const handleOpenWallet = () => setCurrentScreen("wallet")
  const handleWalletBack = () => setCurrentScreen("home")
  const handleOpenAddMoney = () => setCurrentScreen("addMoney")
  const handleAddMoneyBack = () => setCurrentScreen("wallet")
  const handleOpenWithdraw = () => setCurrentScreen("withdraw")
  const handleWithdrawBack = () => setCurrentScreen("wallet")
  
  const handlePaymentSubmit = (amount: number, referenceId: string) => {
    setLastAddedAmount(amount)
    
    // Add pending transaction first
    const pendingTransaction: Transaction = {
      id: Date.now().toString(),
      type: "pending_deposit",
      status: "processing",
      title: "Verification Pending",
      description: `UTR: ${referenceId}`,
      amount: amount,
      date: new Date().toISOString(),
      timestamp: formatTimestamp(new Date())
    }
    setTransactions((prev) => [pendingTransaction, ...prev])
    
    setCurrentScreen("paymentVerification")
  }

  const handleVerificationComplete = useCallback(() => {
    // Update the pending transaction to completed
    setTransactions((prev) => {
      const updated = [...prev]
      const pendingIndex = updated.findIndex(t => t.status === "processing" && t.type === "pending_deposit")
      if (pendingIndex !== -1) {
        updated[pendingIndex] = {
          ...updated[pendingIndex],
          type: "deposit",
          status: "completed",
          title: "Wallet Deposit",
          description: "Via UPI - Verified"
        }
      }
      return updated
    })
    
    // Add money to wallet
    setWalletBalance((prev) => prev + lastAddedAmount)
    setWithdrawableBalance((prev) => prev + lastAddedAmount)
    
    setCurrentScreen("paymentSuccess")
  }, [lastAddedAmount])
  
  const handlePaymentSuccessContinue = () => setCurrentScreen("wallet")

  const handleWithdrawSubmit = (amount: number, upiId: string) => {
    setLastWithdrawalAmount(amount)
    setLastWithdrawalUpi(upiId)
    
    // Deduct from balance
    setWalletBalance((prev) => prev - amount)
    setWithdrawableBalance((prev) => prev - amount)
    
    // Add pending withdrawal transaction
    const withdrawalTransaction: Transaction = {
      id: Date.now().toString(),
      type: "pending_withdrawal",
      status: "pending",
      title: "Withdrawal Processing",
      description: `To: ${upiId}`,
      amount: -amount,
      date: new Date().toISOString(),
      timestamp: formatTimestamp(new Date())
    }
    setTransactions((prev) => [withdrawalTransaction, ...prev])
    
    setCurrentScreen("withdrawalSuccess")
  }

  const handleWithdrawalSuccessContinue = () => setCurrentScreen("wallet")
  
  // Support handlers
  const handleOpenSupport = () => setCurrentScreen("support")
  const handleSupportBack = () => setCurrentScreen("home")
  
  // Low balance modal handlers
  const handleLowBalanceAddMoney = () => {
    setShowLowBalanceModal(false)
    setCurrentScreen("addMoney")
  }
  
  const handleLowBalanceCancel = () => {
    setShowLowBalanceModal(false)
    setPendingContest(null)
  }

  // Render screens
  if (currentScreen === "splash") {
    return <SplashScreen onContinue={handleSplashContinue} />
  }

  if (currentScreen === "login") {
    return <LoginScreen onBack={handleLoginBack} onContinue={handleLoginContinue} />
  }

  if (currentScreen === "home") {
    return (
      <>
        <HomeScreen 
          onJoinContest={handleJoinContest} 
          walletBalance={walletBalance}
          onOpenWallet={handleOpenWallet}
          onOpenSupport={handleOpenSupport}
        />
        {showLowBalanceModal && pendingContest && (
          <LowBalanceModal
            currentBalance={walletBalance}
            requiredAmount={pendingContest.entryFee}
            onAddMoney={handleLowBalanceAddMoney}
            onCancel={handleLowBalanceCancel}
          />
        )}
      </>
    )
  }

  if (currentScreen === "wallet") {
    return (
      <WalletScreen
        balance={walletBalance}
        withdrawableBalance={withdrawableBalance}
        transactions={transactions}
        onBack={handleWalletBack}
        onAddMoney={handleOpenAddMoney}
        onWithdraw={handleOpenWithdraw}
      />
    )
  }

  if (currentScreen === "addMoney") {
    return (
      <AddMoneyScreen
        onBack={handleAddMoneyBack}
        onSubmit={handlePaymentSubmit}
      />
    )
  }

  if (currentScreen === "paymentVerification") {
    return (
      <PaymentVerificationScreen
        amount={lastAddedAmount}
        onVerificationComplete={handleVerificationComplete}
      />
    )
  }

  if (currentScreen === "paymentSuccess") {
    return (
      <PaymentSuccessScreen
        amount={lastAddedAmount}
        onContinue={handlePaymentSuccessContinue}
      />
    )
  }

  if (currentScreen === "withdraw") {
    return (
      <WithdrawScreen
        withdrawableBalance={withdrawableBalance}
        onBack={handleWithdrawBack}
        onSubmit={handleWithdrawSubmit}
      />
    )
  }

  if (currentScreen === "withdrawalSuccess") {
    return (
      <WithdrawalSuccessScreen
        amount={lastWithdrawalAmount}
        upiId={lastWithdrawalUpi}
        onContinue={handleWithdrawalSuccessContinue}
      />
    )
  }

  if (currentScreen === "support") {
    return <SupportScreen onBack={handleSupportBack} />
  }

  if (currentScreen === "selectPlayers") {
    return <SelectPlayersScreen onBack={handlePlayersBack} onNext={handlePlayersNext} />
  }

  if (currentScreen === "selectMvp" && selectedPlayers.length === 4) {
    return <MvpSelectionScreen players={selectedPlayers} onBack={handleMvpBack} onNext={handleMvpNext} />
  }

  if (currentScreen === "selectTeam") {
    return <TeamSelectionScreen onBack={handleTeamBack} onNext={handleTeamNext} />
  }

  if (currentScreen === "reviewConfirm" && selectedMvp && selectedTeam && selectedContest) {
    return (
      <ReviewConfirmScreen
        players={selectedPlayers}
        mvp={selectedMvp}
        team={selectedTeam}
        entryFee={selectedContest.entryFee}
        onBack={handleReviewBack}
        onConfirm={handleConfirm}
      />
    )
  }

  if (currentScreen === "entryConfirmed" && selectedMvp && selectedTeam && selectedContest) {
    return (
      <EntryConfirmedScreen
        players={selectedPlayers}
        mvp={selectedMvp}
        team={selectedTeam}
        entryFee={selectedContest.entryFee}
        contestName="BGMI - Match 1"
        onGoToContests={handleGoToContests}
      />
    )
  }

  // Fallback
  return <SplashScreen onContinue={handleSplashContinue} />
}
