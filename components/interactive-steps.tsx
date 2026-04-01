"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Zap, Lock, ArrowRight, CheckCircle2 } from "lucide-react"

const steps = [
  { 
    icon: Globe, 
    title: "Submit", 
    shortDesc: "Paste a URL or message",
    fullDesc: "Simply paste any suspicious URL, message, or content you want to analyze. Our system accepts websites, text messages, emails, and social media content.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/40",
    glowColor: "shadow-blue-500/20",
  },
  { 
    icon: Zap, 
    title: "Analyze", 
    shortDesc: "AI scans for threats",
    fullDesc: "Our advanced AI instantly analyzes the content using pattern recognition, NLP, and machine learning to detect scam indicators, phishing attempts, and red flags.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
    borderColor: "border-amber-500/40",
    glowColor: "shadow-amber-500/20",
  },
  { 
    icon: Lock, 
    title: "Protect", 
    shortDesc: "Get actionable insights",
    fullDesc: "Receive a detailed trust score, risk assessment, and clear recommendations. Know exactly what threats were detected and how to stay safe.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
    borderColor: "border-emerald-500/40",
    glowColor: "shadow-emerald-500/20",
  },
]

export function InteractiveSteps() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleStepClick = (index: number) => {
    if (activeStep === index) {
      setActiveStep(null)
    } else {
      setActiveStep(index)
      if (!completedSteps.includes(index)) {
        setCompletedSteps([...completedSteps, index])
      }
    }
  }

  return (
    <div className="relative">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-start justify-center gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = activeStep === index
          const isCompleted = completedSteps.includes(index)
          
          return (
            <div key={step.title} className="flex items-start">
              {/* Step Card */}
              <motion.div
                className={`relative cursor-pointer transition-all duration-300 ${
                  isActive ? "z-10" : "z-0"
                }`}
                onClick={() => handleStepClick(index)}
                whileHover={{ y: -5 }}
              >
                {/* Step Number Badge */}
                <motion.div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-20 ${
                    isCompleted 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-card border-2 border-border text-foreground"
                  }`}
                  animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
                >
                  {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                </motion.div>

                {/* Card */}
                <motion.div
                  className={`w-56 p-6 rounded-2xl border-2 transition-all duration-300 group ${
                    isActive 
                      ? `${step.bgColor} ${step.borderColor} shadow-xl ${step.glowColor}` 
                      : "bg-card/80 border-border/60 shadow-lg shadow-black/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                  }`}
                  animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                  whileHover={!isActive ? { scale: 1.02, y: -3 } : {}}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive ? step.bgColor : "bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110"
                    }`}
                    animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`h-7 w-7 ${isActive ? step.color : "text-primary"}`} />
                  </motion.div>

                  {/* Title */}
                  <h3 
                    className="text-xl font-bold text-foreground text-center mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-foreground/70 text-center">
                    {step.shortDesc}
                  </p>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-border/50">
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {step.fullDesc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Click hint */}
                <motion.p
                  className="text-xs text-foreground/50 text-center mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 0 : 1 }}
                >
                  Click to learn more
                </motion.p>
              </motion.div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="flex items-center px-2 pt-14"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className="relative"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6 text-primary" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-6 w-6 text-primary blur-sm" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = activeStep === index
          const isCompleted = completedSteps.includes(index)

          return (
            <div key={step.title}>
              <motion.div
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                  isActive 
                    ? `${step.bgColor} ${step.borderColor} shadow-xl ${step.glowColor}` 
                    : "bg-card/80 border-border/60 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                }`}
                onClick={() => handleStepClick(index)}
                whileTap={{ scale: 0.98 }}
                whileHover={!isActive ? { scale: 1.01, y: -2 } : {}}
              >
                <div className="flex items-center gap-4">
                  {/* Step Number */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCompleted 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted border-2 border-border text-foreground"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isActive ? step.bgColor : "bg-primary/10"
                  }`}>
                    <Icon className={`h-6 w-6 ${isActive ? step.color : "text-primary"}`} />
                  </div>

                  {/* Title & Short Desc */}
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-bold text-foreground"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/70">{step.shortDesc}</p>
                  </div>

                  {/* Expand indicator */}
                  <motion.div
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-5 w-5 text-foreground/50" />
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-foreground/80 leading-relaxed mt-4 pt-4 border-t border-border/50">
                        {step.fullDesc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="flex justify-center py-2"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5 text-primary rotate-90" />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress indicator */}
      <motion.div 
        className="mt-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/60">
          <span className="text-sm text-foreground/70">
            {completedSteps.length} of {steps.length} explored
          </span>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  completedSteps.includes(i) ? "bg-primary" : "bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
