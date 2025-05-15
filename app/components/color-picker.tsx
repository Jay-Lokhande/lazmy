"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RefreshCw } from "lucide-react"

interface ColorPickerProps {
  currentColor: string
  onColorChange: (color: string) => void
  onReset: () => void
  isCustomColor: boolean
}

export function ColorPicker({ currentColor, onColorChange, onReset, isCustomColor }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(currentColor)

  // Predefined artistic colors
  const colorOptions = [
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

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    onColorChange(color)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-16 right-4 z-50 bg-black/80 p-4 rounded-lg border border-gray-700 shadow-lg"
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Choose a color</h3>
          {isCustomColor && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 rounded-full bg-gray-700"
              onClick={onReset}
              title="Reset to color cycle"
            >
              <RefreshCw size={14} />
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {colorOptions.map((color) => (
            <motion.button
              key={color}
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>

        <div className="mt-2">
          <label htmlFor="custom-color" className="text-xs text-gray-400 block mb-1">
            Custom color:
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              id="custom-color"
              value={selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <input
              type="text"
              value={selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="flex-1 bg-black border border-gray-700 rounded px-2 text-sm"
              placeholder="#RRGGBB"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
