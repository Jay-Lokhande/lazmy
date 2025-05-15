"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MouseTrailEffectProps {
  mousePosition: { x: number; y: number }
  color: string
}

interface TrailDot {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export function MouseTrailEffect({ mousePosition, color }: MouseTrailEffectProps) {
  const [trailDots, setTrailDots] = useState<TrailDot[]>([])
  const maxDots = 15

  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return

    // Add a new dot to the trail
    const newDot = {
      id: Date.now(),
      x: mousePosition.x,
      y: mousePosition.y,
      size: Math.random() * 10 + 5,
      delay: 0,
    }

    // Update trail dots
    setTrailDots((prevDots) => {
      const updatedDots = [...prevDots, newDot]
      // Keep only the most recent dots
      if (updatedDots.length > maxDots) {
        return updatedDots.slice(updatedDots.length - maxDots)
      }
      return updatedDots
    })

    // Clean up old dots
    const cleanupInterval = setInterval(() => {
      setTrailDots((prevDots) => prevDots.filter((dot) => Date.now() - dot.id < 1000))
    }, 1000)

    return () => clearInterval(cleanupInterval)
  }, [mousePosition])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {trailDots.map((dot, index) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            backgroundColor: color,
            x: -dot.size / 2,
            y: -dot.size / 2,
          }}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
