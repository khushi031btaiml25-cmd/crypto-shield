"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"
import { AnimatedButton } from "./animated-button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/website-check", label: "Website Check" },
  { href: "/message-scan", label: "Message Scan" },
  { href: "/learn", label: "Learn" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="text-xl font-black text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
              CryptoShield
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-primary bg-primary/20"
                      : "text-foreground/90 hover:text-white hover:bg-primary/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <AnimatedButton variant="primary" size="sm">
              Get Protected
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold ${
                  pathname === link.href
                    ? "text-primary bg-primary/20"
                    : "text-foreground/90 hover:text-white hover:bg-primary/20"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}
