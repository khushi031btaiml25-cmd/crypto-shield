"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, ArrowLeft, Trophy, Coins, AlertTriangle, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { AnimatedButton } from "@/components/animated-button"

interface Investment {
  id: number
  name: string
  description: string
  returns: string
  risk: string
  isScam: boolean
  redFlags: string[]
}

const investments: Investment[] = [
  {
    id: 1,
    name: "CryptoMoon Token",
    description: "Revolutionary AI-powered token that guarantees 1000% returns in 30 days. Early investors only!",
    returns: "1000% in 30 days",
    risk: "Zero risk guaranteed",
    isScam: true,
    redFlags: [
      "Guaranteed returns are impossible in crypto",
      "Extremely high returns in short time",
      "Pressure to invest quickly ('Early investors only')",
      "Claims of 'zero risk' - all investments have risk"
    ]
  },
  {
    id: 2,
    name: "Ethereum Staking Pool",
    description: "Earn rewards by staking ETH with our decentralized validator pool. Average APY 4-6%.",
    returns: "4-6% APY",
    risk: "Smart contract risk, slashing risk",
    isScam: false,
    redFlags: []
  },
  {
    id: 3,
    name: "NFT Flip Master",
    description: "Send us 0.5 ETH and we'll double it by flipping rare NFTs. 100% success rate!",
    returns: "100% guaranteed",
    risk: "None - we handle everything",
    isScam: true,
    redFlags: [
      "Requires sending crypto upfront",
      "Claims 100% success rate",
      "'Double your money' is a classic scam phrase",
      "No transparency about how it works"
    ]
  },
  {
    id: 4,
    name: "Bitcoin Index Fund",
    description: "Diversified exposure to top cryptocurrencies with institutional-grade custody. FDIC insured fiat.",
    returns: "Varies with market",
    risk: "Market volatility, regulatory risk",
    isScam: false,
    redFlags: []
  },
  {
    id: 5,
    name: "Secret Whale Group",
    description: "Join our private telegram group to get insider signals. Members made $500k last month!",
    returns: "$10k-$500k monthly",
    risk: "VIP membership required",
    isScam: true,
    redFlags: [
      "'Insider signals' suggests market manipulation",
      "Unrealistic profit claims",
      "Paid membership for 'secret' information",
      "No verifiable track record"
    ]
  }
]

type GameState = "intro" | "playing" | "result" | "complete"

export default function LearnPage() {
  const [gameState, setGameState] = useState<GameState>("intro")
  const [balance, setBalance] = useState(10000)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastChoice, setLastChoice] = useState<"invest" | "skip" | null>(null)

  const currentInvestment = investments[currentIndex]

  const handleChoice = (choice: "invest" | "skip") => {
    setLastChoice(choice)
    setShowFeedback(true)

    if (choice === "invest" && currentInvestment.isScam) {
      // Lost money on scam
      setBalance(prev => Math.max(0, prev - 2000))
    } else if (choice === "skip" && !currentInvestment.isScam) {
      // Missed opportunity (small penalty)
      setBalance(prev => prev - 500)
    } else if (choice === "invest" && !currentInvestment.isScam) {
      // Good investment
      setBalance(prev => prev + 1000)
      setScore(prev => prev + 1)
    } else {
      // Correctly avoided scam
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    setShowFeedback(false)
    setLastChoice(null)
    
    if (currentIndex < investments.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      setGameState("complete")
    }
  }

  const handleRestart = () => {
    setGameState("intro")
    setBalance(10000)
    setCurrentIndex(0)
    setScore(0)
    setShowFeedback(false)
    setLastChoice(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="p-3 rounded-xl bg-primary/20 border border-primary/30"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Gamepad2 className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h1 
                  className="text-3xl text-foreground tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Scam Detection Training
                </h1>
                <p className="text-foreground/70">Learn to spot crypto scams through interactive practice</p>
              </div>
            </div>
          </motion.div>

          {/* Game Container */}
          <motion.div
            className="p-8 rounded-2xl bg-card/80 border border-border/60 shadow-xl shadow-black/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {/* Intro State */}
              {gameState === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Coins className="h-12 w-12 text-primary" />
                  </motion.div>
                  
                  <div>
                    <h2 
                      className="text-2xl text-foreground mb-2 tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Crypto Investment Simulator
                    </h2>
                    <p className="text-foreground/70 max-w-md mx-auto">
                      You have $10,000 in fake money. Review investment opportunities and decide whether to invest or skip. 
                      Learn to identify red flags and protect your assets!
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 max-w-md mx-auto">
                    <h3 className="font-semibold text-foreground mb-2">How to Play</h3>
                    <ul className="text-sm text-foreground/70 space-y-1 text-left">
                      <li>• Review each investment opportunity carefully</li>
                      <li>• Look for common scam red flags</li>
                      <li>• Choose to Invest or Skip</li>
                      <li>• Learn from the feedback after each choice</li>
                    </ul>
                  </div>

                  <AnimatedButton onClick={() => setGameState("playing")} size="lg">
                    Start Training
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </AnimatedButton>
                </motion.div>
              )}

              {/* Playing State */}
              {gameState === "playing" && (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Stats Bar */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/60">
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-yellow-500" />
                      <span className="font-bold text-foreground">${balance.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-foreground/70">
                      {currentIndex + 1} of {investments.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <span className="font-bold text-foreground">{score} correct</span>
                    </div>
                  </div>

                  {/* Investment Card */}
                  <AnimatePresence mode="wait">
                    {!showFeedback ? (
                      <motion.div
                        key={`investment-${currentIndex}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="p-6 rounded-2xl border-2 border-border/60 bg-gradient-to-br from-card/90 to-muted/20 shadow-lg shadow-black/5"
                      >
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {currentInvestment.name}
                        </h3>
                        <p className="text-foreground/70 mb-6">
                          {currentInvestment.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                            <p className="text-xs text-green-600 mb-1">Promised Returns</p>
                            <p className="font-semibold text-foreground">{currentInvestment.returns}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                            <p className="text-xs text-yellow-600 mb-1">Stated Risk</p>
                            <p className="font-semibold text-foreground">{currentInvestment.risk}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <AnimatedButton
                            onClick={() => handleChoice("invest")}
                            variant="primary"
                            className="flex-1"
                          >
                            Invest $2,000
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => handleChoice("skip")}
                            variant="outline"
                            className="flex-1"
                          >
                            Skip
                          </AnimatedButton>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="feedback"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-6 rounded-2xl border-2 ${
                          (lastChoice === "invest" && currentInvestment.isScam) ||
                          (lastChoice === "skip" && !currentInvestment.isScam)
                            ? "bg-red-500/5 border-red-500/30"
                            : "bg-green-500/5 border-green-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          {(lastChoice === "invest" && currentInvestment.isScam) ||
                          (lastChoice === "skip" && !currentInvestment.isScam) ? (
                            <XCircle className="h-8 w-8 text-red-500" />
                          ) : (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              {currentInvestment.isScam ? "This was a SCAM!" : "This was LEGITIMATE"}
                            </h3>
                            <p className="text-sm text-foreground/70">
                              {lastChoice === "invest" 
                                ? currentInvestment.isScam 
                                  ? "You lost $2,000 to scammers" 
                                  : "Good investment! You earned $1,000"
                                : currentInvestment.isScam
                                  ? "Great job avoiding this scam!"
                                  : "You missed a good opportunity (-$500)"
                              }
                            </p>
                          </div>
                        </div>

                        {currentInvestment.isScam && currentInvestment.redFlags.length > 0 && (
                          <div className="space-y-2 mb-4">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              Red Flags to Remember
                            </h4>
                            {currentInvestment.redFlags.map((flag, i) => (
                              <motion.p
                                key={i}
                                className="text-sm text-foreground/70 pl-6"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                • {flag}
                              </motion.p>
                            ))}
                          </div>
                        )}

                        <AnimatedButton onClick={handleNext} className="w-full">
                          {currentIndex < investments.length - 1 ? "Next Investment" : "See Results"}
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </AnimatedButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Complete State */}
              {gameState === "complete" && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Trophy className="h-12 w-12 text-primary" />
                  </motion.div>

                  <div>
                    <h2 
                      className="text-2xl text-foreground mb-2 tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Training Complete!
                    </h2>
                    <p className="text-foreground/70">
                      {"You've"} completed the scam detection training
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <motion.div
                      className="p-4 rounded-xl bg-primary/10 border border-primary/20"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-3xl font-bold text-primary">{score}/{investments.length}</p>
                      <p className="text-sm text-foreground/70">Correct Choices</p>
                    </motion.div>
                    <motion.div
                      className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-3xl font-bold text-yellow-500">${balance.toLocaleString()}</p>
                      <p className="text-sm text-foreground/70">Final Balance</p>
                    </motion.div>
                  </div>

                  <motion.div
                    className="p-4 rounded-xl bg-primary/5 border border-primary/20 max-w-md mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="font-semibold text-foreground mb-2">Key Takeaways</h3>
                    <ul className="text-sm text-foreground/70 text-left space-y-1">
                      <li>• No legitimate investment guarantees returns</li>
                      <li>• If it sounds too good to be true, it probably is</li>
                      <li>• Urgency and pressure are manipulation tactics</li>
                      <li>• Always verify before sending any crypto</li>
                    </ul>
                  </motion.div>

                  <AnimatedButton onClick={handleRestart} variant="primary" size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Play Again
                  </AnimatedButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
