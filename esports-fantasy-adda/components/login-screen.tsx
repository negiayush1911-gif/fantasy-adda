"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface LoginScreenProps {
  onBack: () => void
  onContinue: () => void
}

export function LoginScreen({ onBack, onContinue }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isAdult, setIsAdult] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const isGetOtpEnabled = phoneNumber.length === 10
  const isContinueEnabled = isAdult && acceptedTerms && (otpSent ? otp.length === 6 : false)

  const handleGetOtp = () => {
    if (isGetOtpEnabled) {
      setOtpSent(true)
    }
  }

  const handleContinue = () => {
    if (isContinueEnabled) {
      onContinue()
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header with back button */}
      <header className="relative z-10 p-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 relative z-10">
        {/* Welcome text */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Login to continue</p>
        </div>

        {/* Phone number input */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <div className="flex items-center gap-2 bg-secondary border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all">
              <span className="pl-4 text-muted-foreground font-medium">+91</span>
              <div className="w-px h-6 bg-border" />
              <Input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Get OTP Button */}
          <Button
            onClick={handleGetOtp}
            disabled={!isGetOtpEnabled}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:from-purple-600/50 disabled:to-violet-600/50 disabled:opacity-50 border-0 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 disabled:shadow-none"
          >
            GET OTP
          </Button>

          {/* OTP Input - shown after Get OTP */}
          {otpSent && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="h-12 bg-secondary border-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-muted-foreground/60 text-center text-lg tracking-[0.5em]"
              />
            </div>
          )}
        </div>

        {/* Important section */}
        <div className="bg-card/50 border border-border rounded-xl p-5 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Important</h3>
          
          <div className="space-y-4">
            {/* Age confirmation checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="age"
                checked={isAdult}
                onCheckedChange={(checked) => setIsAdult(checked === true)}
                className="mt-0.5 border-purple-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label htmlFor="age" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                I am 18+ years of age
              </label>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                className="mt-0.5 border-purple-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link href="#" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
        </div>

        {/* Age disclaimer */}
        <p className="text-xs text-muted-foreground/70 text-center mb-6">
          By continuing, you confirm that you are 18+ and agree to our Terms & Conditions.
        </p>

        {/* Continue button */}
        <Button
          onClick={handleContinue}
          disabled={!isContinueEnabled}
          className="w-full h-12 text-base font-semibold bg-secondary hover:bg-secondary/80 disabled:bg-secondary/50 disabled:opacity-50 text-foreground border border-border rounded-xl transition-all duration-300"
        >
          CONTINUE
        </Button>
      </main>

      {/* Bottom safe area */}
      <div className="h-8" />
    </div>
  )
}
