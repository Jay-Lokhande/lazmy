"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

interface AnimatedTextProps {
  text: string
  color: string
  delay?: number
  interactive?: boolean
  autoAnimate?: boolean
}

export function AnimatedText({ text, color, delay = 0, interactive = true, autoAnimate = false }: AnimatedTextProps) {
  // Split text into an array of letters
  const letters = Array.from(text)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto animation effect
  useEffect(() => {
    if (!autoAnimate) return

    let currentIndex = -1
    const animateNextLetter = () => {
      currentIndex = (currentIndex + 1) % letters.length
      setHoveredIndex(currentIndex)

      // Clear hover after a short delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setHoveredIndex(null)

        // Schedule next letter animation
        timeoutRef.current = setTimeout(animateNextLetter, 200)
      }, 300)
    }

    // Start the animation sequence after initial delay
    timeoutRef.current = setTimeout(animateNextLetter, 2000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [autoAnimate, letters.length])

  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay * i },
    }),
  }

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.h2
      style={{ color, overflow: "hidden", display: "flex", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-4xl md:text-5xl font-bold tracking-tight flex flex-wrap justify-center"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: "inline-block",
            marginRight: letter === " " ? "0.5em" : "0.05em",
            textShadow: hoveredIndex === index ? `0 0 20px ${color}80` : `0 0 10px ${color}40`,
            color: hoveredIndex === index ? "#fff" : color,
            cursor: interactive ? "pointer" : "default",
          }}
          onMouseEnter={() => interactive && setHoveredIndex(index)}
          onMouseLeave={() => interactive && setHoveredIndex(null)}
          whileHover={
            interactive
              ? {
                  y: -10,
                  scale: 1.2,
                  rotate: Math.random() * 10 - 5,
                  transition: { type: "spring", stiffness: 300 },
                }
              : {}
          }
          animate={
            hoveredIndex === index
              ? {
                  y: -10,
                  scale: 1.2,
                  color: "#fff",
                  textShadow: `0 0 20px ${color}`,
                  rotate: Math.random() * 10 - 5,
                  transition: { type: "spring", stiffness: 300 },
                }
              : {
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  transition: { type: "spring", stiffness: 300 },
                }
          }
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  )
}
