"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface WaveTextProps {
  text: string
  color: string
  onClick?: () => void
}

export function WaveText({ text, color, onClick }: WaveTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Split text into parts for lazmy.art
  const parts = text.includes(".") ? text.split(".") : [text]

  // Create wave animation
  const startWaveAnimation = () => {
    if (isAnimating) return
    setIsAnimating(true)

    let i = 0
    const interval = setInterval(() => {
      setHoveredIndex(i % (text.length + 5))
      i++

      if (i > text.length + 10) {
        clearInterval(interval)
        setHoveredIndex(null)
        setIsAnimating(false)

        // Schedule next wave animation
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(startWaveAnimation, 8000)
      }
    }, 100)
  }

  // Start animation on mount
  useEffect(() => {
    // Initial delay before first animation
    timeoutRef.current = setTimeout(() => {
      startWaveAnimation()
    }, 1500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="inline-flex items-baseline cursor-pointer"
      onClick={() => {
        startWaveAnimation()
        onClick && onClick()
      }}
    >
      {/* First part (lazmy) */}
      <motion.span
        className="text-5xl md:text-7xl font-bold tracking-tighter inline-flex"
        style={{ color }}
        animate={{
          color: color,
          textShadow: `0 0 15px ${color}40`,
        }}
        transition={{ duration: 1 }}
        initial={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.05 }}
      >
        {parts[0].split("").map((letter, index) => (
          <motion.span
            key={index}
            style={{
              display: "inline-block",
              color: hoveredIndex === index ? "#fff" : color,
              textShadow: hoveredIndex === index ? `0 0 20px ${color}` : `0 0 10px ${color}40`,
            }}
            animate={
              hoveredIndex === index
                ? {
                    y: [-15, 0],
                    scale: [1.2, 1],
                    transition: { duration: 0.3 },
                  }
                : {}
            }
            whileHover={{
              y: -10,
              scale: 1.3,
              color: "#fff",
              textShadow: `0 0 20px ${color}`,
              transition: { type: "spring", stiffness: 500 },
            }}
            onMouseEnter={() => !isAnimating && setHoveredIndex(index)}
            onMouseLeave={() => !isAnimating && setHoveredIndex(null)}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>

      {/* Dot */}
      <motion.span
        className="text-5xl md:text-7xl font-bold text-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.5, rotate: 180 }}
      >
        .
      </motion.span>

      {/* Second part (art) */}
      <motion.span
        className="text-5xl md:text-7xl font-bold tracking-tighter inline-flex"
        style={{ color }}
        animate={{
          color: color,
          textShadow: `0 0 15px ${color}40`,
        }}
        transition={{ duration: 1 }}
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ scale: 1.05 }}
      >
        {parts[1]?.split("").map((letter, index) => (
          <motion.span
            key={index + parts[0].length + 1}
            style={{
              display: "inline-block",
              color: hoveredIndex === index + parts[0].length + 1 ? "#fff" : color,
              textShadow: hoveredIndex === index + parts[0].length + 1 ? `0 0 20px ${color}` : `0 0 10px ${color}40`,
            }}
            animate={
              hoveredIndex === index + parts[0].length + 1
                ? {
                    y: [-15, 0],
                    scale: [1.2, 1],
                    transition: { duration: 0.3 },
                  }
                : {}
            }
            whileHover={{
              y: -10,
              scale: 1.3,
              color: "#fff",
              textShadow: `0 0 20px ${color}`,
              transition: { type: "spring", stiffness: 500 },
            }}
            onMouseEnter={() => !isAnimating && setHoveredIndex(index + parts[0].length + 1)}
            onMouseLeave={() => !isAnimating && setHoveredIndex(null)}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </div>
  )
}
