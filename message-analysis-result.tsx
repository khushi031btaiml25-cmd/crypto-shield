"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, XCircle, Flag, Info, ChevronRight, Shield, Lightbulb } from "lucide-react"
import { useState } from "react"

interface FlaggedPhrase {
  phrase: string
  reason: string
  severity: "high" | "medium" | "low"
}

interface MessageAnalysisResultProps {
  isScam: boolean
  confidence: number
  flaggedPhrases: FlaggedPhrase[]
  summary: string
}

const confidenceRanges = [
  {
    range: "0-30%",
    min: 0,
    max: 30,
    label: "Low Confidence",
    scamDesc: "Few indicators found. Message may still be risky - stay cautious.",
    safeDesc: "Limited data to assess. Continue with normal precautions.",
    color: "bg-blue-500",
    textColor: "text-blue-400"
  },
  {
    range: "31-60%",
    min: 31,
    max: 60,
    label: "Moderate Confidence",
    scamDesc: "Several warning signs detected. This message warrants careful review.",
    safeDesc: "Message appears mostly legitimate with some uncertain elements.",
    color: "bg-yellow-500",
    textColor: "text-yellow-400"
  },
  {
    range: "61-80%",
    min: 61,
    max: 80,
    label: "High Confidence",
    scamDesc: "Strong indicators of fraudulent content. Exercise extreme caution.",
    safeDesc: "Good indicators of legitimacy. Standard precautions recommended.",
    color: "bg-orange-500",
    textColor: "text-orange-400"
  },
  {
    range: "81-100%",
    min: 81,
    max: 100,
    label: "Very High Confidence",
    scamDesc: "Clear scam patterns identified. Do NOT engage with this message.",
    safeDesc: "Strong signs of authenticity. Message appears trustworthy.",
    color: "bg-red-500",
    textColor: "text-emerald-400"
  }
]

const scamTips = [
  "Never share personal or financial information",
  "Don't click on suspicious links",
  "Verify sender through official channels",
  "Report the message to relevant authorities"
]

const safeTips = [
  "Still verify sender identity independently",
  "Be cautious with any requests for information",
  "Keep records of important communications",
  "Trust your instincts if something feels off"
]

export function MessageAnalysisResult({
  isScam,
  confidence,
  flaggedPhrases,
  summary
}: MessageAnalysisResultProps) {
  const [showTips, setShowTips] = useState(false)
  
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "high":
        return { bg: "bg-red-500/15", border: "border-red-500/40", text: "text-red-400", dot: "bg-red-500" }
      case "medium":
        return { bg: "bg-yellow-500/15", border: "border-yellow-500/40", text: "text-yellow-400", dot: "bg-yellow-500" }
      case "low":
        return { bg: "bg-blue-500/15", border: "border-blue-500/40", text: "text-blue-400", dot: "bg-blue-500" }
      default:
        return { bg: "bg-muted", border: "border-border", text: "text-muted-foreground", dot: "bg-muted-foreground" }
    }
  }

  const getCurrentConfidenceRange = () => {
    return confidenceRanges.find(r => confidence >= r.min && confidence <= r.max) || confidenceRanges[0]
  }

  const currentRange = getCurrentConfidenceRange()

  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Result Header */}
      <motion.div
        className={`p-6 rounded-2xl border-2 ${
          isScam 
            ? "bg-red-500/10 border-red-500/40" 
            : "bg-green-500/10 border-green-500/40"
        }`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className={`p-3 rounded-xl ${isScam ? "bg-red-500" : "bg-green-500"}`}
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
          >
            {isScam ? (
              <XCircle className="h-8 w-8 text-white" />
            ) : (
              <CheckCircle className="h-8 w-8 text-white" />
            )}
          </motion.div>
          <div className="flex-1">
            <motion.h2
              className={`text-2xl font-bold ${isScam ? "text-red-400" : "text-green-400"}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isScam ? "Potential Scam Detected" : "Message Appears Safe"}
            </motion.h2>
            <motion.div
              className="flex items-center gap-2 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-muted-foreground">Confidence:</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${isScam ? "bg-red-500" : "bg-green-500"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
                <span className={`font-bold ${isScam ? "text-red-400" : "text-green-400"}`}>{confidence}%</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Confidence Explanation */}
      <motion.div
        className="p-4 rounded-xl bg-primary/5 border border-primary/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-semibold ${currentRange.textColor}`}>{currentRange.label}</span>
              <span className="text-xs text-muted-foreground">({currentRange.range})</span>
            </div>
            <p className="text-sm text-foreground/80">
              {isScam ? currentRange.scamDesc : currentRange.safeDesc}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Confidence Scale */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Confidence Scale
        </h4>
        <div className="flex gap-1 h-3 rounded-full overflow-hidden">
          {confidenceRanges.map((range, i) => (
            <motion.div
              key={range.range}
              className={`flex-1 ${range.color} ${confidence >= range.min && confidence <= range.max ? "ring-2 ring-white ring-offset-1 ring-offset-background" : "opacity-40"}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>30%</span>
          <span>60%</span>
          <span>80%</span>
          <span>100%</span>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="p-4 rounded-xl bg-muted/30 border border-border/60"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h4 className="text-sm font-semibold text-foreground mb-2">Analysis Summary</h4>
        <p className="text-foreground/80 leading-relaxed">{summary}</p>
      </motion.div>

      {/* Safety Tips Toggle */}
      <motion.button
        className={`w-full p-4 rounded-xl border transition-all ${
          showTips 
            ? "bg-primary/10 border-primary/30" 
            : "bg-muted/20 border-border/40 hover:bg-muted/40"
        }`}
        onClick={() => setShowTips(!showTips)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className={`h-5 w-5 ${showTips ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`font-medium ${showTips ? "text-primary" : "text-foreground"}`}>
              {isScam ? "How to Protect Yourself" : "Safety Reminders"}
            </span>
          </div>
          <motion.div animate={{ rotate: showTips ? 90 : 0 }}>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-2">
              {(isScam ? scamTips : safeTips).map((tip, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full ${isScam ? "bg-red-500" : "bg-green-500"}`} />
                  <span className="text-foreground/80">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flagged Phrases */}
      {flaggedPhrases.length > 0 && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            Flagged Phrases
            <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">
              {flaggedPhrases.length} found
            </span>
          </h3>
          <div className="space-y-3">
            {flaggedPhrases.map((item, index) => {
              const styles = getSeverityStyles(item.severity)
              return (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl border ${styles.bg} ${styles.border}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
                        <p className={`font-medium ${styles.text}`}>&quot;{item.phrase}&quot;</p>
                      </div>
                      <p className="text-sm text-muted-foreground ml-4">{item.reason}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles.bg} ${styles.text} border ${styles.border}`}>
                      {item.severity} risk
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Severity Legend */}
          <motion.div
            className="p-4 rounded-xl bg-muted/20 border border-border/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Severity Levels</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-foreground/70">High - Immediate red flag</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs text-foreground/70">Medium - Concerning pattern</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-foreground/70">Low - Minor warning sign</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
