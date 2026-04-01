"use client"

import { motion } from "framer-motion"
import { Shield, ShieldAlert, ShieldCheck, ShieldX, Info, ChevronRight } from "lucide-react"
import { useState } from "react"

interface TrustScoreDisplayProps {
  score: number
  reasons: string[]
}

const scoreRanges = [
  {
    range: "0-20",
    min: 0,
    max: 20,
    label: "Extremely Dangerous",
    description: "This website shows multiple critical red flags. Do NOT interact with it under any circumstances.",
    color: "bg-red-600",
    textColor: "text-red-400",
    tips: ["Never share personal information", "Do not make any payments", "Report the website immediately"]
  },
  {
    range: "21-40",
    min: 21,
    max: 40,
    label: "High Risk",
    description: "Significant warning signs detected. Proceed with extreme caution or avoid entirely.",
    color: "bg-red-500",
    textColor: "text-red-400",
    tips: ["Verify the website through other sources", "Check for official contact information", "Look for reviews online"]
  },
  {
    range: "41-60",
    min: 41,
    max: 60,
    label: "Moderate Risk",
    description: "Some concerning elements found. Research thoroughly before engaging.",
    color: "bg-yellow-500",
    textColor: "text-yellow-400",
    tips: ["Double-check the URL spelling", "Look for HTTPS security", "Read terms and conditions carefully"]
  },
  {
    range: "61-80",
    min: 61,
    max: 80,
    label: "Low Risk",
    description: "Generally appears legitimate with minor concerns. Standard precautions recommended.",
    color: "bg-green-500",
    textColor: "text-green-400",
    tips: ["Still verify before sharing sensitive data", "Use secure payment methods", "Keep records of transactions"]
  },
  {
    range: "81-100",
    min: 81,
    max: 100,
    label: "Very Safe",
    description: "Website appears trustworthy with strong security indicators and legitimate presence.",
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    tips: ["Normal precautions still apply", "Keep your software updated", "Use strong passwords"]
  }
]

export function TrustScoreDisplay({ score, reasons }: TrustScoreDisplayProps) {
  const [expandedRange, setExpandedRange] = useState<string | null>(null)
  
  const getCurrentRange = (score: number) => {
    return scoreRanges.find(r => score >= r.min && score <= r.max) || scoreRanges[0]
  }

  const getScoreColor = (score: number) => {
    if (score >= 81) return { bg: "bg-emerald-500", text: "text-emerald-400", label: "Very Safe" }
    if (score >= 61) return { bg: "bg-green-500", text: "text-green-400", label: "Low Risk" }
    if (score >= 41) return { bg: "bg-yellow-500", text: "text-yellow-400", label: "Moderate" }
    if (score >= 21) return { bg: "bg-red-500", text: "text-red-400", label: "High Risk" }
    return { bg: "bg-red-600", text: "text-red-400", label: "Dangerous" }
  }

  const getIcon = (score: number) => {
    if (score >= 61) return ShieldCheck
    if (score >= 41) return ShieldAlert
    return ShieldX
  }

  const { bg, text, label } = getScoreColor(score)
  const Icon = getIcon(score)
  const currentRange = getCurrentRange(score)

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Score Circle */}
      <div className="flex flex-col items-center mb-8">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          {/* Background circle */}
          <svg className="w-44 h-44 -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="78"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-muted-foreground/15"
            />
            <motion.circle
              cx="88"
              cy="88"
              r="78"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              className={text}
              strokeDasharray={490}
              initial={{ strokeDashoffset: 490 }}
              animate={{ strokeDashoffset: 490 - (490 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Icon className={`h-9 w-9 ${text}`} />
            </motion.div>
            <motion.span
              className="text-5xl font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {score}
            </motion.span>
            <motion.span
              className={`text-sm font-semibold ${text}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {label}
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Current Score Explanation */}
      <motion.div
        className={`p-5 rounded-2xl border-2 mb-6 ${
          score >= 61 
            ? "bg-green-500/10 border-green-500/30" 
            : score >= 41 
            ? "bg-yellow-500/10 border-yellow-500/30"
            : "bg-red-500/10 border-red-500/30"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl ${bg}`}>
            <Info className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${text}`}>{currentRange.label}</h3>
            <p className="text-foreground/80 text-sm mt-1">{currentRange.description}</p>
            <div className="mt-3 space-y-1.5">
              {currentRange.tips.map((tip, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                >
                  <ChevronRight className={`h-4 w-4 ${text}`} />
                  <span>{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Score Range Legend */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Score Guide
        </h3>
        <div className="space-y-2">
          {scoreRanges.map((range, index) => {
            const isCurrentRange = score >= range.min && score <= range.max
            const isExpanded = expandedRange === range.range
            
            return (
              <motion.div
                key={range.range}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + index * 0.08 }}
              >
                <motion.button
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isCurrentRange 
                      ? `${range.color}/15 border-2 ${range.color.replace('bg-', 'border-')}/50` 
                      : "bg-muted/20 border-border/40 hover:bg-muted/40"
                  }`}
                  onClick={() => setExpandedRange(isExpanded ? null : range.range)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${range.color}`} />
                      <span className={`font-medium ${isCurrentRange ? range.textColor : "text-foreground/80"}`}>
                        {range.range}
                      </span>
                      <span className={`text-sm ${isCurrentRange ? range.textColor : "text-muted-foreground"}`}>
                        {range.label}
                      </span>
                      {isCurrentRange && (
                        <motion.span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${range.color} text-white`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Your Score
                        </motion.span>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className={`h-4 w-4 ${isCurrentRange ? range.textColor : "text-muted-foreground"}`} />
                    </motion.div>
                  </div>
                </motion.button>
                
                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 mt-1 rounded-xl bg-muted/30 border border-border/40">
                    <p className="text-sm text-foreground/80 mb-2">{range.description}</p>
                    <div className="space-y-1">
                      {range.tips.map((tip, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${range.color}`} />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Reasons List */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Analysis Details</h3>
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.1 + index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${bg} ring-2 ring-offset-2 ring-offset-background ${bg.replace('bg-', 'ring-')}/30`} />
            <p className="text-sm text-foreground/80">{reason}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
