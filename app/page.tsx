"use client"

import { motion } from "framer-motion"
import { Shield, ChevronDown, Lock, AlertTriangle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { AnimatedButton } from "@/components/animated-button"
import { HorizontalScrollCards } from "@/components/horizontal-scroll-cards"
import { InteractiveSteps } from "@/components/interactive-steps"
import { ThreatStats } from "@/components/threat-stats"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Your Crypto Secured</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-balance">Stop Scams Before</span>
            <br />
            <motion.span
              className="text-primary"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage: "linear-gradient(90deg, oklch(0.75 0.18 250), oklch(0.78 0.16 175), oklch(0.75 0.18 250))",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              They Stop You.
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-foreground/85 max-w-2xl mx-auto mb-10 text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your trusted shield against crypto scams, fake websites, and fraudulent messages. 
            Detect threats instantly with AI-powered analysis.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/website-check">
              <AnimatedButton size="lg" variant="primary">
                <Shield className="h-5 w-5 mr-2" />
                Start Scanning
              </AnimatedButton>
            </Link>
            <Link href="/learn">
              <AnimatedButton size="lg" variant="outline">
                Learn to Detect Scams
              </AnimatedButton>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-foreground/50 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Features Section - Horizontal Scroll Cards */}
      <section className="py-20 px-4 bg-card/30 border-y border-border/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl sm:text-4xl font-black text-foreground mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            >
              Powerful Protection Tools
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Everything you need to stay safe in the digital world
            </p>
          </motion.div>

          <HorizontalScrollCards />
        </div>
      </section>

      {/* How It Works Section - Interactive Steps */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl sm:text-4xl font-black text-foreground mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            >
              How CryptoShield Works
            </h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Three simple steps to protect yourself from scams
            </p>
          </motion.div>

          <InteractiveSteps />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/30 border-y border-border/30">
        <motion.div
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 border-2 border-primary/30 shadow-2xl shadow-primary/10 group hover:border-primary/50 transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Shield className="h-10 w-10 text-primary-foreground" />
          </motion.div>
          <h2 
            className="text-3xl sm:text-4xl font-black text-foreground mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
          >
            Ready to Stay Protected?
          </h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
            Join thousands of users who trust CryptoShield to keep them safe from online scams and fraud.
          </p>
          <Link href="/website-check">
            <AnimatedButton size="lg" variant="primary">
              Get Started Free
            </AnimatedButton>
          </Link>
        </motion.div>
      </section>

      {/* Threat Stats Section - At the End */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 mb-6">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">Stay Alert</span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl font-black text-foreground mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            >
              The Crypto Threat Landscape
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto text-lg">
              The crypto space is full of opportunities, but also dangers. Stay ahead of threats.
            </p>
          </motion.div>

          <ThreatStats />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">CryptoShield</span>
          </div>
          <p className="text-sm text-foreground/70">
            2025 CryptoShield. Protecting you from digital threats.
          </p>
        </div>
      </footer>
    </main>
  )
}
