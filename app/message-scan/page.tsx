"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, ArrowLeft, Upload, ImageIcon, X, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { AnimatedTextarea } from "@/components/animated-textarea"
import { AnimatedButton } from "@/components/animated-button"
import { ScanningAnimation } from "@/components/scanning-animation"
import { MessageAnalysisResult } from "@/components/message-analysis-result"

type ScanState = "idle" | "scanning" | "result"
type InputMode = "text" | "image"

interface FlaggedPhrase {
  phrase: string
  reason: string
  severity: "high" | "medium" | "low"
}

interface ScanResult {
  isScam: boolean
  confidence: number
  flaggedPhrases: FlaggedPhrase[]
  summary: string
}

// Mock scan function - in production, this would call an NLP API
function mockScan(message: string): Promise<ScanResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const scamPhrases: FlaggedPhrase[] = [
        { phrase: "guaranteed returns", reason: "No legitimate investment can guarantee returns. This is a classic scam indicator.", severity: "high" },
        { phrase: "double your money", reason: "Promises to multiply your money quickly are almost always scams.", severity: "high" },
        { phrase: "limited time offer", reason: "Creating urgency is a manipulation tactic to prevent careful consideration.", severity: "medium" },
        { phrase: "act now", reason: "Pressure tactics to make quick decisions often indicate fraudulent schemes.", severity: "medium" },
        { phrase: "exclusive opportunity", reason: "Claims of exclusivity are used to make victims feel special and lower their guard.", severity: "low" },
        { phrase: "risk-free", reason: "All investments carry risk. Claims of no risk are misleading.", severity: "high" },
      ]

      const lowerMessage = message.toLowerCase()
      const foundPhrases = scamPhrases.filter(p => lowerMessage.includes(p.phrase.toLowerCase()))
      
      const isScam = foundPhrases.length > 0 || Math.random() > 0.6
      const confidence = isScam 
        ? Math.min(95, 60 + foundPhrases.length * 10) 
        : Math.floor(Math.random() * 20) + 75

      const scamSummaries = [
        "This message contains multiple red flags commonly associated with cryptocurrency scams. The use of urgency tactics and unrealistic promises suggests this is likely a fraudulent scheme designed to steal your money.",
        "Our analysis detected patterns consistent with advance-fee fraud. The message attempts to create false urgency and uses manipulative language to pressure you into quick action.",
        "This appears to be a potential phishing attempt. The message uses social engineering tactics to build trust before asking for personal information or funds.",
      ]

      const safeSummaries = [
        "This message appears to be legitimate based on our analysis. We did not detect common scam patterns or manipulative language. However, always exercise caution with financial matters.",
        "No significant red flags were detected in this message. The language and content appear normal, but remain vigilant and verify any requests through official channels.",
      ]

      resolve({
        isScam,
        confidence,
        flaggedPhrases: isScam ? (foundPhrases.length > 0 ? foundPhrases : scamPhrases.slice(0, 2)) : [],
        summary: isScam 
          ? scamSummaries[Math.floor(Math.random() * scamSummaries.length)]
          : safeSummaries[Math.floor(Math.random() * safeSummaries.length)]
      })
    }, 3500)
  })
}

export default function MessageScanPage() {
  const [message, setMessage] = useState("")
  const [state, setState] = useState<ScanState>("idle")
  const [result, setResult] = useState<ScanResult | null>(null)
  const [inputMode, setInputMode] = useState<InputMode>("text")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [imageFileName, setImageFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleScan = async () => {
    if (inputMode === "text" && !message.trim()) return
    if (inputMode === "image" && !uploadedImage) return
    
    setState("scanning")
    // For image mode, we'd normally send to OCR + analysis API
    // For demo, we'll use a mock message
    const textToAnalyze = inputMode === "image" 
      ? "URGENT: Your wallet has been compromised! Send 0.5 ETH to secure your funds immediately. Limited time before your assets are frozen!"
      : message
    
    const scanResult = await mockScan(textToAnalyze)
    setResult(scanResult)
    setState("result")
  }

  const handleReset = () => {
    setMessage("")
    setState("idle")
    setResult(null)
    setUploadedImage(null)
    setImageFileName("")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    setImageFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const exampleMessages = [
    "URGENT: Your crypto wallet has been compromised! Click here immediately to secure your funds before they are stolen!",
    "Congratulations! You have been selected for our exclusive crypto investment program. Guaranteed 500% returns in 30 days. Act now - limited spots available!",
    "Hey, I found this amazing new DeFi protocol that can double your money in a week. It is completely risk-free! Want me to send you the link?",
  ]

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
                <MessageSquare className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h1 
                  className="text-3xl text-foreground tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Message Scanner
                </h1>
                <p className="text-foreground/70">Analyze suspicious messages for scam patterns</p>
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
                  {/* Input Mode Toggle */}
                  <div className="flex items-center gap-2 p-1 rounded-xl bg-muted/30 border border-border/60">
                    <button
                      onClick={() => setInputMode("text")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        inputMode === "text"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      Paste Text
                    </button>
                    <button
                      onClick={() => setInputMode("image")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        inputMode === "image"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <ImageIcon className="h-4 w-4" />
                      Upload Image
                    </button>
                  </div>

                  {/* Text Input Mode */}
                  <AnimatePresence mode="wait">
                    {inputMode === "text" && (
                      <motion.div
                        key="text-input"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <AnimatedTextarea
                          placeholder="Paste the suspicious message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="min-h-[180px]"
                        />

                        {/* Example messages */}
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-foreground/70">Try an example:</p>
                          {exampleMessages.map((example, index) => (
                            <motion.button
                              key={index}
                              className="w-full text-left p-3 rounded-xl bg-muted/30 hover:bg-muted/60 text-sm text-foreground/70 hover:text-foreground transition-colors border border-border/40 hover:border-border"
                              onClick={() => setMessage(example)}
                              whileHover={{ scale: 1.01, x: 5 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              {example.slice(0, 100)}...
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Image Upload Mode */}
                    {inputMode === "image" && (
                      <motion.div
                        key="image-input"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        {!uploadedImage ? (
                          <motion.label
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border/60 rounded-2xl cursor-pointer bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <motion.div
                                className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <ImageIcon className="h-7 w-7 text-primary" />
                              </motion.div>
                              <p className="mb-2 text-sm text-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-foreground/60">PNG, JPG, or screenshot (MAX. 10MB)</p>
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </motion.label>
                        ) : (
                          <motion.div
                            className="relative rounded-2xl overflow-hidden border border-border/60 bg-muted/20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            <div className="relative aspect-video">
                              <Image
                                src={uploadedImage}
                                alt="Uploaded screenshot"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="absolute top-3 right-3">
                              <motion.button
                                onClick={removeImage}
                                className="p-2 rounded-full bg-background/90 border border-border/60 text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="h-4 w-4" />
                              </motion.button>
                            </div>
                            <div className="p-3 bg-muted/30 border-t border-border/60">
                              <p className="text-sm text-foreground/70 truncate">{imageFileName}</p>
                            </div>
                          </motion.div>
                        )}

                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                          <p className="text-sm text-foreground/80">
                            <span className="font-semibold text-primary">Tip:</span> Upload screenshots of suspicious DMs, emails, or social media posts. Our AI will extract and analyze the text for scam patterns.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatedButton
                    onClick={handleScan}
                    disabled={inputMode === "text" ? !message.trim() : !uploadedImage}
                    className="w-full"
                    size="lg"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Analyze {inputMode === "image" ? "Screenshot" : "Message"}
                  </AnimatedButton>
                </motion.div>
              )}

              {state === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ScanningAnimation 
                    type="alert" 
                    text={inputMode === "image" ? "Extracting text and analyzing for scam patterns..." : "Analyzing message for scam patterns..."} 
                  />
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
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                    <p className="text-sm text-foreground/70 mb-2">
                      {inputMode === "image" ? "Analyzed Screenshot" : "Analyzed Message"}
                    </p>
                    {inputMode === "image" && uploadedImage ? (
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={uploadedImage}
                          alt="Analyzed screenshot"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-foreground/90 line-clamp-3">{message}</p>
                    )}
                  </div>

                  <MessageAnalysisResult {...result} />

                  <AnimatedButton
                    onClick={handleReset}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Scan Another {inputMode === "image" ? "Screenshot" : "Message"}
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
