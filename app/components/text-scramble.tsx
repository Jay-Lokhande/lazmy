"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TextScrambleProps {
  text: string
  color: string
}

export function TextScramble({ text, color }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const originalText = useRef(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const chars = "!<>-_\\/[]{}—=+*^?#________"

  const scramble = () => {
    if (isScrambling) return

    setIsScrambling(true)
    let iteration = 0
    const maxIterations = 15

    clearInterval(intervalRef.current as NodeJS.Timeout)

    intervalRef.current = setInterval(() => {
      setDisplayText((prevText) => {
        return originalText.current
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText.current[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      })

      if (iteration >= originalText.current.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout)
        setIsScrambling(false)

        // Schedule next animation after a delay
        timeoutRef.current = setTimeout(() => {
          scramble()
        }, 5000) // Run again after 5 seconds
      }

      iteration += 1 / 3
    }, 30)
  }

  // Start animation on mount and set up repeating cycle
  useEffect(() => {
    // Initial delay before first animation
    timeoutRef.current = setTimeout(() => {
      scramble()
    }, 2000)

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.h2
      className="text-4xl md:text-5xl font-bold tracking-tight cursor-pointer font-mono"
      style={{ color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      onClick={scramble}
      whileHover={{ textShadow: `0 0 15px ${color}80` }}
    >
      {displayText}
    </motion.h2>
  )
}
