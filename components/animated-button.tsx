"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
}

export function AnimatedButton({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: AnimatedButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost: "text-foreground hover:bg-accent hover:text-accent-foreground"
  }
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg"
  }

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled || isLoading}
      {...props}
    >
      <motion.span
        className="flex items-center gap-2"
        initial={false}
        animate={{ opacity: isLoading ? 0 : 1 }}
      >
        {children}
      </motion.span>
      {isLoading && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Spinner className="h-5 w-5" />
        </motion.span>
      )}
    </motion.button>
  )
}
