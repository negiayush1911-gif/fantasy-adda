"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Clock, Shield, ChevronDown, ChevronUp, Users, ExternalLink, MessageCircle, HelpCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FaqItem {
  id: string
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    id: "1",
    question: "How long does wallet verification take?",
    answer: "Wallet deposits are usually verified within 5-30 minutes. If your payment is still pending after 30 minutes, please contact our support team with your transaction reference ID."
  },
  {
    id: "2",
    question: "When will withdrawal be processed?",
    answer: "Withdrawals are processed within 24-48 hours on working days. The amount will be credited directly to your linked UPI ID. You will receive a notification once the transfer is complete."
  },
  {
    id: "3",
    question: "What happens if contest slots are not filled?",
    answer: "If a contest does not reach the minimum number of players before the match starts, the contest will be cancelled and your entry fee will be automatically refunded to your wallet within 15 minutes."
  },
  {
    id: "4",
    question: "How are winnings credited?",
    answer: "Winnings are credited to your Fantasy Adda wallet immediately after the match results are declared. You can withdraw your winnings anytime from the Wallet section."
  },
  {
    id: "5",
    question: "What should I do if payment is pending?",
    answer: "If your payment shows as pending for more than 30 minutes, please contact support with your UTR/Reference ID. Do not make duplicate payments. Our team will verify and resolve the issue within 24 hours."
  }
]

interface SupportScreenProps {
  onBack: () => void
}

export function SupportScreen({ onBack }: SupportScreenProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [isContactLoading, setIsContactLoading] = useState(false)
  const [isCommunityLoading, setIsCommunityLoading] = useState(false)

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const handleContactSupport = () => {
    setIsContactLoading(true)
    setTimeout(() => {
      setIsContactLoading(false)
      window.open("mailto:support@fantasyadda.in", "_blank")
    }, 800)
  }

  const handleJoinCommunity = () => {
    setIsCommunityLoading(true)
    setTimeout(() => {
      setIsCommunityLoading(false)
      // Simulated redirect
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-60 left-0 w-72 h-72 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
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
          <div>
            <h1 className="text-lg font-semibold text-foreground">Customer Support</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 relative z-10 overflow-y-auto pb-8">
        {/* Support description card */}
        <div className="bg-gradient-to-br from-card/90 to-card/70 border border-border/50 rounded-2xl p-5 relative overflow-hidden mb-5 backdrop-blur-sm">
          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">Need Help?</h2>
                <p className="text-xs text-muted-foreground">We&apos;re here for you</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Need help regarding wallet, contests, withdrawals, or payments? Our support team is here to help you 24/7.
            </p>
          </div>
        </div>

        {/* Email Support Section */}
        <div className="bg-gradient-to-br from-card/80 to-card/60 border border-border/50 rounded-2xl p-5 relative overflow-hidden mb-5 backdrop-blur-sm">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground mb-1">Email Support</h3>
                <a 
                  href="mailto:support@fantasyadda.in" 
                  className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors"
                >
                  support@fantasyadda.in
                </a>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs text-muted-foreground">Average response time: 5-30 minutes</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleContactSupport}
              disabled={isContactLoading}
              className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 active:scale-[0.98] disabled:opacity-70"
            >
              {isContactLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Opening...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>CONTACT SUPPORT</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 mb-5 py-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-muted-foreground">Secure & Confidential Support</span>
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        </div>

        {/* FAQ Section */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-base font-semibold text-foreground">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className={`bg-card/50 border border-border/50 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                  expandedFaq === item.id ? "border-purple-500/30" : ""
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-4 flex items-center justify-between text-left transition-colors hover:bg-card/70 active:scale-[0.995]"
                >
                  <span className="text-sm font-medium text-foreground pr-4">{item.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    expandedFaq === item.id 
                      ? "bg-purple-500/20 text-purple-400 rotate-0" 
                      : "bg-secondary/50 text-muted-foreground"
                  }`}>
                    {expandedFaq === item.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-out ${
                  expandedFaq === item.id ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-4 pb-4 pt-0">
                    <div className="h-px bg-border/50 mb-3" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-gradient-to-br from-card/80 to-card/60 border border-border/50 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
          {/* Glow effects */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground mb-1">Join Our Community</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Get contest updates, announcements, maintenance alerts, and winner highlights.
                </p>
              </div>
            </div>

            {/* Community stats */}
            <div className="flex items-center gap-4 mb-4 py-3 border-y border-border/30">
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-purple-400">50K+</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Members</p>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-purple-400">24/7</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Active</p>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-purple-400">Daily</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Updates</p>
              </div>
            </div>

            <Button
              onClick={handleJoinCommunity}
              disabled={isCommunityLoading}
              className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-0 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 active:scale-[0.98] disabled:opacity-70"
            >
              {isCommunityLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Joining...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>JOIN COMMUNITY</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Trust footer */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-muted-foreground">Your data is safe with us</span>
          </div>
          <p className="text-[10px] text-muted-foreground/60">
            Fantasy Adda - India&apos;s Trusted Esports Fantasy Platform
          </p>
        </div>
      </main>
    </div>
  )
}
