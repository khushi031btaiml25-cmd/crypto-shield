"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  delay?: number
}

export function FeatureCard({ title, description, icon, href, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href}>
        <motion.div
          className="group relative p-6 rounded-2xl bg-card/80 border border-border/60 overflow-hidden h-full shadow-lg shadow-black/10"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Icon */}
          <motion.div
            className="relative z-10 mb-4 inline-flex p-3 rounded-xl bg-primary/20 text-primary border border-primary/20"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {description}
            </p>
            
            {/* Arrow link */}
            <motion.div
              className="flex items-center gap-2 text-primary font-medium text-sm"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              Get Started
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.div>
          </div>

          {/* Border glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/40 transition-colors duration-300"
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
