"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { DollarSign, TrendingUp, Users, Shield } from "lucide-react"

const stats = [
  {
    label: "Lost to Crypto Scams in 2025",
    value: 4.6,
    prefix: "$",
    suffix: "B",
    icon: DollarSign,
    color: "text-red-400",
    bgColor: "bg-red-500/15",
    borderColor: "border-red-500/40",
    glowColor: "shadow-red-500/20",
  },
  {
    label: "Increase in Phishing Attacks",
    value: 300,
    prefix: "",
    suffix: "%",
    icon: TrendingUp,
    color: "text-amber-400",
    bgColor: "bg-amber-500/15",
    borderColor: "border-amber-500/40",
    glowColor: "shadow-amber-500/20",
  },
  {
    label: "Crypto Users Fall for Scams",
    value: 2,
    prefix: "",
    suffix: " in 4",
    icon: Users,
    color: "text-orange-400",
    bgColor: "bg-orange-500/15",
    borderColor: "border-orange-500/40",
    glowColor: "shadow-orange-500/20",
  },
  {
    label: "Real-Time Protection",
    value: 24,
    prefix: "",
    suffix: "/7",
    icon: Shield,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/15",
    borderColor: "border-emerald-500/40",
    glowColor: "shadow-emerald-500/20",
  },
]

function AnimatedCounter({ 
  value, 
  prefix = "", 
  suffix = "",
  duration = 2,
  inView = false
}: { 
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  inView?: boolean
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!inView || hasAnimated) return

    const startTime = Date.now()
    const endValue = value

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = endValue * easeOutQuart

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setHasAnimated(true)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 200)

    return () => clearTimeout(timer)
  }, [value, duration, hasAnimated, inView])

  const formatNumber = (num: number) => {
    if (num < 10 && num > 0 && value < 10) {
      return num.toFixed(1)
    }
    return Math.round(num).toString()
  }

  return (
    <span>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

export function ThreatStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              className={`relative p-6 md:p-8 rounded-2xl bg-card/80 border-2 ${stat.borderColor} backdrop-blur-sm overflow-hidden group cursor-pointer shadow-lg ${stat.glowColor}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.25 } 
              }}
            >
              {/* Background glow on hover */}
              <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none rounded-2xl" />
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 mx-auto rounded-2xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`h-7 w-7 ${stat.color}`} />
                </motion.div>

                {/* Value */}
                <div 
                  className={`text-4xl md:text-5xl font-black ${stat.color} mb-2`} 
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                >
                  <AnimatedCounter 
                    value={stat.value} 
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                </div>

                {/* Label */}
                <p className="text-sm md:text-base font-medium text-foreground/80">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
