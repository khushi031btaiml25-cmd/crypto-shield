"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const AnimatedTextarea = React.forwardRef<HTMLTextAreaElement, AnimatedTextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    return (
      <div className="relative w-full">
        <motion.div
          className={cn(
            "relative rounded-xl border-2 bg-card transition-colors",
            isFocused ? "border-primary" : "border-input",
            error && "border-destructive"
          )}
          animate={{
            boxShadow: isFocused 
              ? "0 0 0 4px oklch(0.7 0.18 250 / 0.2)" 
              : "0 0 0 0px oklch(0.7 0.18 250 / 0)"
          }}
          transition={{ duration: 0.2 }}
        >
          <textarea
            ref={ref}
            className={cn(
              "flex min-h-[120px] w-full bg-transparent px-4 py-3 text-base outline-none placeholder:text-muted-foreground resize-none",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
            {...props}
          />
          {label && (
            <motion.label
              className="absolute left-4 top-3 pointer-events-none text-muted-foreground bg-card px-1"
              initial={false}
              animate={{
                y: isFocused || hasValue ? -24 : 0,
                scale: isFocused || hasValue ? 0.85 : 1,
                color: isFocused ? "oklch(0.7 0.18 250)" : "oklch(0.65 0.02 260)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {label}
            </motion.label>
          )}
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.p
              className="mt-2 text-sm text-destructive"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedTextarea.displayName = "AnimatedTextarea"
