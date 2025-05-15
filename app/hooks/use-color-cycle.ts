"use client"

import { useState, useEffect } from "react"

// Array of artistic color palettes (hex values)
const colorPalettes = [
  "#00FF7F", // Original neon green
  "#FF1493", // Deep pink
  "#00BFFF", // Deep sky blue
  "#FFD700", // Gold
  "#FF4500", // Orange red
  "#9400D3", // Dark violet
  "#1E90FF", // Dodger blue
  "#32CD32", // Lime green
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
]

export function useColorCycle() {
  const [colorIndex, setColorIndex] = useState(0)
  const [currentColor, setCurrentColor] = useState(colorPalettes[0])
  const [currentColorRGB, setCurrentColorRGB] = useState("0, 255, 127") // Initial RGB for neon green
  const [isUsingCustomColor, setIsUsingCustomColor] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  // Function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    // Remove the # if present
    hex = hex.replace(/^#/, "")

    // Parse the hex values
    const bigint = Number.parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `${r}, ${g}, ${b}`
  }

  // Start color cycling
  const startColorCycle = () => {
    if (intervalId) clearInterval(intervalId)

    const interval = setInterval(() => {
      setColorIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % colorPalettes.length
        const newColor = colorPalettes[newIndex]
        setCurrentColor(newColor)
        setCurrentColorRGB(hexToRgb(newColor))
        return newIndex
      })
    }, 5000) // Change color every 5 seconds

    setIntervalId(interval)
  }

  // Set custom color
  const setCustomColor = (color: string) => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }

    setIsUsingCustomColor(true)
    setCurrentColor(color)
    setCurrentColorRGB(hexToRgb(color))
  }

  // Reset to color cycle
  const resetToColorCycle = () => {
    setIsUsingCustomColor(false)
    startColorCycle()
  }

  // Initialize color cycling
  useEffect(() => {
    if (!isUsingCustomColor) {
      startColorCycle()
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isUsingCustomColor])

  return {
    currentColor,
    currentColorRGB,
    colorIndex,
    setCustomColor,
    isUsingCustomColor,
    resetToColorCycle,
  }
}
