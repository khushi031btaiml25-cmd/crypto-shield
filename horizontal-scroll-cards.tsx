"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Globe, MessageSquare, Gamepad2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimatedButton } from "./animated-button"

const features = [
  {
    title: "Website Fraud Detection",
    description: "Instantly verify if a website is legitimate or a scam. Get detailed trust scores and comprehensive safety analysis to protect yourself.",
    icon: Globe,
    href: "/website-check",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/50",
    iconBg: "bg-blue-500/30",
    iconColor: "text-blue-300",
    glowColor: "shadow-blue-500/30",
    hoverBorder: "hover:border-blue-400/80",
  },
  {
    title: "Message Scanner",
    description: "Upload suspicious messages and let our AI detect scam patterns, red flags, and manipulative language used by scammers.",
    icon: MessageSquare,
    href: "/message-scan",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400/50",
    iconBg: "bg-emerald-500/30",
    iconColor: "text-emerald-300",
    glowColor: "shadow-emerald-500/30",
    hoverBorder: "hover:border-emerald-400/80",
  },
  {
    title: "Learn & Practice",
    description: "Master scam detection through interactive games. Practice with fake money in a safe environment and sharpen your skills.",
    icon: Gamepad2,
    href: "/learn",
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-400/50",
    iconBg: "bg-amber-500/30",
    iconColor: "text-amber-300",
    glowColor: "shadow-amber-500/30",
    hoverBorder: "hover:border-amber-400/80",
  },
]

export function HorizontalScrollCards() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
      
      const cardWidth = scrollRef.current.clientWidth * 0.85 + 24
      const newIndex = Math.round(scrollLeft / cardWidth)
      setActiveIndex(Math.min(newIndex, features.length - 1))
    }
  }

  useEffect(() => {
    const scrollEl = scrollRef.current
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScroll)
      checkScroll()
      return () => scrollEl.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.85 + 24
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.85 + 24
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-full">
      {/* Arrow Buttons */}
      <motion.button
        onClick={() => scroll("left")}
        className={`absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-card/95 border-2 border-primary/50 text-white shadow-xl shadow-primary/20 backdrop-blur-sm transition-all ${
          canScrollLeft ? "opacity-100 hover:bg-primary/30 hover:border-primary hover:scale-110" : "opacity-0 pointer-events-none"
        }`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </motion.button>

      <motion.button
        onClick={() => scroll("right")}
        className={`absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-card/95 border-2 border-primary/50 text-white shadow-xl shadow-primary/20 backdrop-blur-sm transition-all ${
          canScrollRight ? "opacity-100 hover:bg-primary/30 hover:border-primary hover:scale-110" : "opacity-0 pointer-events-none"
        }`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </motion.button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-2 md:px-4 -mx-2 md:-mx-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              className="flex-shrink-0 w-[85%] md:w-[500px] lg:w-[600px] snap-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.div
                className={`relative h-[200px] md:h-[220px] p-6 md:p-8 rounded-2xl bg-gradient-to-r ${feature.gradient} border-2 ${feature.borderColor} ${feature.hoverBorder} backdrop-blur-xl overflow-hidden shadow-2xl ${feature.glowColor} cursor-pointer group transition-colors duration-300`}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  transition: { duration: 0.25 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Tile shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none rounded-2xl" />
                
                {/* Hover glow */}
                <div className={`absolute inset-0 ${feature.gradient.replace('from-', 'from-').replace('/20', '/30')} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                
                {/* Inner glow */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ 
                    boxShadow: 'inset 0 1px 30px rgba(255,255,255,0.08), inset 0 -1px 30px rgba(0,0,0,0.15)' 
                  }} 
                />

                <div className="relative flex items-center gap-6 md:gap-8 h-full z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-2xl ${feature.iconBg} border-2 border-white/20 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`h-8 w-8 md:h-10 md:w-10 ${feature.iconColor}`} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}
                    >
                      {feature.title}
                    </h3>

                    <p className="text-foreground/80 leading-relaxed text-sm md:text-base mb-4 line-clamp-2">
                      {feature.description}
                    </p>

                    {/* CTA Button */}
                    <Link href={feature.href}>
                      <AnimatedButton variant="primary" size="sm" className="group/btn">
                        <span className="font-semibold">Get Started</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </AnimatedButton>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {features.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`rounded-full transition-all ${
              index === activeIndex 
                ? "w-10 h-3 bg-primary shadow-lg shadow-primary/50" 
                : "w-3 h-3 bg-foreground/30 hover:bg-foreground/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <motion.p
        className="text-center text-sm text-foreground/60 mt-4 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Swipe or use arrows to explore tools
      </motion.p>
    </div>
  )
}
