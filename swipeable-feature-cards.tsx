"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion"
import { Globe, MessageSquare, Gamepad2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimatedButton } from "./animated-button"

const features = [
  {
    title: "Website Fraud Detection",
    description: "Instantly verify if a website is legitimate or a scam. Get detailed trust scores and safety analysis.",
    icon: Globe,
    href: "/website-check",
    gradient: "from-blue-500/30 to-cyan-500/30",
    borderColor: "border-blue-400/50",
    iconBg: "bg-blue-500/30",
    iconColor: "text-blue-300",
    shadowColor: "shadow-blue-500/20",
  },
  {
    title: "Message Scanner",
    description: "Upload suspicious messages and let our AI detect scam patterns, red flags, and manipulative language.",
    icon: MessageSquare,
    href: "/message-scan",
    gradient: "from-emerald-500/30 to-teal-500/30",
    borderColor: "border-emerald-400/50",
    iconBg: "bg-emerald-500/30",
    iconColor: "text-emerald-300",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    title: "Learn & Practice",
    description: "Master scam detection through interactive games. Practice with fake money in a safe environment.",
    icon: Gamepad2,
    href: "/learn",
    gradient: "from-amber-500/30 to-orange-500/30",
    borderColor: "border-amber-400/50",
    iconBg: "bg-amber-500/30",
    iconColor: "text-amber-300",
    shadowColor: "shadow-amber-500/20",
  },
]

export function SwipeableFeatureCards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const rotateY = useTransform(x, [-200, 0, 200], [25, 0, -25])
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95])

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      let newIndex = prev + newDirection
      if (newIndex < 0) newIndex = features.length - 1
      if (newIndex >= features.length) newIndex = 0
      return newIndex
    })
  }

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x)
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1)
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
      z: -200,
    }),
    center: {
      zIndex: 10,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      z: -200,
    }),
  }

  const currentFeature = features[currentIndex]
  const Icon = currentFeature.icon

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={containerRef}>
      {/* Stacked Cards Background with 3D Tile Effect */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
        {features.map((feature, index) => {
          const offset = (index - currentIndex + features.length) % features.length
          if (offset === 0) return null
          
          const stackOffset = offset === 1 ? 1 : offset === 2 ? 2 : offset
          
          return (
            <motion.div
              key={feature.title}
              className={`absolute w-full h-[420px] rounded-3xl bg-gradient-to-br ${feature.gradient} border-2 ${feature.borderColor}`}
              initial={false}
              animate={{
                y: stackOffset * 16,
                scale: 1 - stackOffset * 0.06,
                opacity: 0.4 - stackOffset * 0.1,
                rotateX: -5 - stackOffset * 2,
                z: -stackOffset * 50,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                transformStyle: 'preserve-3d',
                zIndex: features.length - offset,
              }}
            />
          )
        })}
      </div>

      {/* Main Card with 3D Tile Effect */}
      <div className="relative h-[420px]" style={{ perspective: '1200px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              rotateY: { type: "spring", stiffness: 300, damping: 30 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            style={{ 
              x, 
              rotateY, 
              scale,
              transformStyle: 'preserve-3d',
            }}
            className={`absolute w-full h-full p-8 rounded-3xl bg-gradient-to-br ${currentFeature.gradient} border-2 ${currentFeature.borderColor} backdrop-blur-xl cursor-grab active:cursor-grabbing shadow-2xl ${currentFeature.shadowColor}`}
            whileHover={{ 
              rotateX: -2, 
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            {/* Glossy overlay for tile effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
            
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none" style={{ boxShadow: 'inset 0 2px 20px rgba(255,255,255,0.1), inset 0 -2px 20px rgba(0,0,0,0.2)' }} />

            <div className="relative flex flex-col h-full z-10">
              {/* Icon */}
              <motion.div
                className={`w-18 h-18 rounded-2xl ${currentFeature.iconBg} border border-white/20 flex items-center justify-center mb-6 shadow-lg`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                style={{ width: '72px', height: '72px' }}
              >
                <Icon className={`h-9 w-9 ${currentFeature.iconColor}`} />
              </motion.div>

              {/* Content */}
              <motion.h3
                className="text-2xl font-black text-white mb-3 tracking-tight"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {currentFeature.title}
              </motion.h3>

              <motion.p
                className="text-foreground/90 leading-relaxed mb-6 flex-grow text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentFeature.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Link href={currentFeature.href}>
                  <AnimatedButton variant="primary" className="w-full group">
                    <span className="font-semibold">Get Started</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </AnimatedButton>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <motion.button
          onClick={() => paginate(-1)}
          className="p-4 rounded-full bg-card/90 border-2 border-border/80 text-white hover:bg-primary/30 hover:border-primary/60 transition-all shadow-lg"
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous card"
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        {/* Dots */}
        <div className="flex items-center gap-3">
          {features.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`rounded-full transition-all ${
                index === currentIndex 
                  ? "w-10 h-3 bg-primary shadow-lg shadow-primary/50" 
                  : "w-3 h-3 bg-foreground/40 hover:bg-foreground/60"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={() => paginate(1)}
          className="p-4 rounded-full bg-card/90 border-2 border-border/80 text-white hover:bg-primary/30 hover:border-primary/60 transition-all shadow-lg"
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next card"
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Swipe hint */}
      <motion.p
        className="text-center text-sm text-foreground/70 mt-5 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Swipe or click arrows to explore tools
      </motion.p>
    </div>
  )
}
