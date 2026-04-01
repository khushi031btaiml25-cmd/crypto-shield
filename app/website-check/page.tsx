"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, ArrowLeft, Link2 } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { AnimatedInput } from "@/components/animated-input"
import { AnimatedButton } from "@/components/animated-button"
import { ScanningAnimation } from "@/components/scanning-animation"
import { TrustScoreDisplay } from "@/components/trust-score-display"

type ScanState = "idle" | "scanning" | "result"

interface ScanResult {
  score: number
  reasons: string[]
}

// Mock scan function - in production, this would call an API
function mockScan(url: string): Promise<ScanResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate random result for demo
      const isScam = Math.random() > 0.5
      const score = isScam ? Math.floor(Math.random() * 40) + 10 : Math.floor(Math.random() * 30) + 70
      
      const scamReasons = [
        "Domain registered only 3 days ago",
        "SSL certificate is self-signed or missing",
        "Website uses suspicious redirect patterns",
        "Contact information is missing or fake",
        "No social media presence or reviews found",
        "URL contains misspelled brand name"
      ]
      
      const safeReasons = [
        "Domain has been registered for over 5 years",
        "Valid SSL certificate from trusted authority",
        "Positive reviews across multiple platforms",
        "Verified business contact information",
        "Active and legitimate social media presence"
      ]
      
      const reasons = isScam 
        ? scamReasons.slice(0, Math.floor(Math.random() * 3) + 2)
        : safeReasons.slice(0, Math.floor(Math.random() * 3) + 2)
      
      resolve({ score, reasons })
    }, 3000)
  })
}

export default function WebsiteCheckPage() {
  const [url, setUrl] = useState("")
  const [state, setState] = useState<ScanState>("idle")
  const [result, setResult] = useState<ScanResult | null>(null)

  const handleScan = async () => {
    if (!url) return
    
    setState("scanning")
    const scanResult = await mockScan(url)
    setResult(scanResult)
    setState("result")
  }

  const handleReset = () => {
    setUrl("")
    setState("idle")
    setResult(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
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
                <Globe className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h1 
                  className="text-3xl text-foreground tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Website Fraud Detection
                </h1>
                <p className="text-foreground/70">Check if a website is safe or a potential scam</p>
              </div>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            className="p-8 rounded-2xl bg-card/80 border border-border/60 shadow-xl shadow-black/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {state === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <AnimatedInput
                    placeholder="Enter website URL (e.g., https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    icon={<Link2 className="h-5 w-5" />}
                  />
                  
                  <AnimatedButton
                    onClick={handleScan}
                    disabled={!url}
                    className="w-full"
                    size="lg"
                  >
                    Scan Website
                  </AnimatedButton>

                  {/* Tips */}
                  <motion.div
                    className="p-4 rounded-xl bg-primary/5 border border-primary/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="font-semibold text-foreground mb-2">Tips for checking websites:</h3>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• Always verify the domain spelling carefully</li>
                      <li>• Look for HTTPS in the URL</li>
                      <li>• Check for contact information and privacy policy</li>
                      <li>• Research the company before making transactions</li>
                    </ul>
                  </motion.div>
                </motion.div>
              )}

              {state === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ScanningAnimation type="search" text={`Analyzing ${url}...`} />
                </motion.div>
              )}

              {state === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-center">
                    <p className="text-sm text-foreground/70">Scanned URL</p>
                    <p className="font-semibold text-foreground break-all">{url}</p>
                  </div>

                  <TrustScoreDisplay score={result.score} reasons={result.reasons} />

                  <AnimatedButton
                    onClick={handleReset}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Scan Another Website
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
