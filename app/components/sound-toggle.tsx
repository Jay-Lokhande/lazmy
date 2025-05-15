"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

interface SoundToggleProps {
  enabled: boolean
  onToggle: () => void
  color: string
}

export function SoundToggle({ enabled, onToggle, color }: SoundToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{ backgroundColor: color }}
      onClick={onToggle}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
    >
      {enabled ? <Volume2 className="w-5 h-5 text-black" /> : <VolumeX className="w-5 h-5 text-black" />}
    </motion.button>
  )
}
