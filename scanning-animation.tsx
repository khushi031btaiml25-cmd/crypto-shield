"use client"

import { motion } from "framer-motion"
import { Shield, Search, AlertTriangle } from "lucide-react"

interface ScanningAnimationProps {
  type?: "shield" | "search" | "alert"
  text?: string
}

export function ScanningAnimation({ type = "shield", text = "Analyzing..." }: ScanningAnimationProps) {
  const icons = {
    shield: Shield,
    search: Search,
    alert: AlertTriangle
  }
  
  const Icon = icons[type]

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      {/* Main icon with pulse effect */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.6, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.6, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="h-10 w-10" />
        </motion.div>
      </div>

      {/* Scanning bars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-primary"
            animate={{
              height: [12, 28, 12],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Text with dots animation */}
      <motion.p
        className="text-muted-foreground font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  )
}
