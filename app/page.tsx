"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Twitter, Palette, Brush, PenTool, Layers } from "lucide-react"
import { Canvas } from "./components/canvas"
import { useColorCycle } from "./hooks/use-color-cycle"
import { FloatingShapes } from "./components/floating-shapes"
import { AnimatedText } from "./components/animated-text"
import { MouseTrailEffect } from "./components/mouse-trail-effect"
import { InteractiveCanvas } from "./components/interactive-canvas"
import { ColorPicker } from "./components/color-picker"
import { SoundToggle } from "./components/sound-toggle"
import { TextScramble } from "./components/text-scramble"

export default function ComingSoonPage() {
  const { currentColor, setCustomColor, isUsingCustomColor, resetToColorCycle } = useColorCycle()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [hasAmbientSound, setHasAmbientSound] = useState(false)
  const [hasInteractionSound, setHasInteractionSound] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Initialize audio and detect asset availability
  useEffect(() => {
    let isMounted = true
    const checkAssetsAndSetupAudio = async () => {
      try {
        const [ambientResponse, interactionResponse] = await Promise.all([
          fetch("/ambient-sound.mp3", { method: "HEAD" }),
          fetch("/interaction-sound.mp3", { method: "HEAD" }),
        ])
        if (!isMounted) return
        const ambientOk = ambientResponse.ok
        const interactionOk = interactionResponse.ok
        setHasAmbientSound(ambientOk)
        setHasInteractionSound(interactionOk)
        if (ambientOk) {
          audioRef.current = new Audio("/ambient-sound.mp3")
          audioRef.current.loop = true
          audioRef.current.volume = 0.3
        }
      } catch {
        // ignore
      }
    }
    checkAssetsAndSetupAudio()

    return () => {
      isMounted = false
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Toggle sound
  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play().catch((e: unknown) => console.log("Audio play prevented:", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [soundEnabled])

  // Play sound on interaction
  const playInteractionSound = () => {
    if (!soundEnabled || !hasInteractionSound) return
    const interactionSound = new Audio("/interaction-sound.mp3")
    interactionSound.volume = 0.2
    interactionSound.play().catch((e) => console.log("Audio play prevented:", e))
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* Animated canvas with art elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas mousePosition={mousePosition} />
      </div>

      {/* Mouse trail effect */}
      <MouseTrailEffect mousePosition={mousePosition} color={currentColor} />

      {/* Floating shapes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <FloatingShapes color={currentColor} />
      </div>

      {/* Left side waveform */}
      <div className="absolute left-0 top-0 h-full w-24 md:w-32 z-10">
        <svg
          viewBox="0 0 100 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M20 0V120L40 150V250L10 300V400L30 450V550L5 600V700L25 750V800"
            stroke={currentColor}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M40 0V100L20 150V220L50 280V380L30 450V520L55 580V680L35 750V800"
            stroke={currentColor}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M60 0V80L30 130V200L70 260V360L50 430V500L75 560V660L55 730V800"
            stroke={currentColor}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Interactive controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: currentColor }}
          onClick={() => {
            setShowColorPicker(!showColorPicker)
            playInteractionSound()
          }}
          aria-label="Toggle color picker"
        >
          <Palette className="w-5 h-5 text-black" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: currentColor }}
          onClick={() => {
            setShowDrawingCanvas(!showDrawingCanvas)
            playInteractionSound()
          }}
          aria-label="Toggle drawing canvas"
        >
          <Brush className="w-5 h-5 text-black" />
        </motion.button>

        <SoundToggle enabled={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} color={currentColor} />
      </div>

      {/* Color picker */}
      {showColorPicker && (
        <ColorPicker
          currentColor={currentColor}
          onColorChange={setCustomColor}
          onReset={resetToColorCycle}
          isCustomColor={isUsingCustomColor}
        />
      )}

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-8 px-4">
        {/* Header - Simple version matching the screenshot */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center pt-8"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            style={{ color: currentColor }}
            animate={{
              color: currentColor,
              textShadow: `0 0 15px ${currentColor}40`,
            }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05, textShadow: `0 0 20px ${currentColor}` }}
            onClick={() => {
              playInteractionSound()
              setCustomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
            }}
          >
            lazmy.art
          </motion.h1>
        </motion.header>

        {/* Main content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-12"
        >
          {/* Interactive drawing canvas */}
          {showDrawingCanvas && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-2xl aspect-video relative"
            >
              <InteractiveCanvas color={currentColor} />
            </motion.div>
          )}

          {/* Floating art icons with enhanced animations */}
          <div className="relative w-full h-40">
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute left-1/4 top-1/2 cursor-pointer"
              style={{ color: currentColor }}
              whileHover={{ scale: 1.2, rotate: 15 }}
              onClick={() => {
                playInteractionSound()
                setShowDrawingCanvas(true)
              }}
            >
              <Brush size={32} />
            </motion.div>
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
              className="absolute right-1/4 top-1/3 cursor-pointer"
              style={{ color: currentColor }}
              whileHover={{ scale: 1.2, rotate: -15 }}
              onClick={() => {
                playInteractionSound()
                setShowColorPicker(true)
              }}
            >
              <PenTool size={32} />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 6,
                ease: "easeInOut",
              }}
              className="absolute left-1/3 bottom-0 cursor-pointer"
              style={{ color: currentColor }}
              whileHover={{ scale: 1.2, rotate: 20 }}
              onClick={() => {
                playInteractionSound()
                setCustomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
              }}
            >
              <Palette size={32} />
            </motion.div>
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 7,
                ease: "easeInOut",
              }}
              className="absolute right-1/3 top-0 cursor-pointer"
              style={{ color: currentColor }}
              whileHover={{ scale: 1.2, rotate: -20 }}
              onClick={() => {
                playInteractionSound()
                setSoundEnabled(!soundEnabled)
              }}
            >
              <Layers size={32} />
            </motion.div>
          </div>

          {/* Animated text heading - Matching the screenshot */}
          <div className="py-8">
            <AnimatedText text="WE ARE COOKING" color={currentColor} delay={0.5} autoAnimate={true} />
            <TextScramble text="SOMETHING DELICIOUS" color={currentColor} />
          </div>

          {/* Animated brush strokes */}
          <motion.div
            className="w-full max-w-md h-24 relative my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.div
              className="absolute left-0 right-0 mx-auto w-3/4 h-1 rounded-full cursor-pointer"
              style={{ backgroundColor: currentColor }}
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{
                duration: 2,
                delay: 2,
                ease: "easeOut",
              }}
              whileHover={{ height: "4px", filter: "brightness(1.2)" }}
              onClick={() => {
                playInteractionSound()
                setCustomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
              }}
            />
            <motion.div
              className="absolute left-1/4 right-0 mx-auto w-1/2 h-1 rounded-full mt-4 cursor-pointer"
              style={{ backgroundColor: currentColor }}
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{
                duration: 1.5,
                delay: 2.5,
                ease: "easeOut",
              }}
              whileHover={{ height: "4px", filter: "brightness(1.2)" }}
              onClick={() => {
                playInteractionSound()
                setCustomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
              }}
            />
            <motion.div
              className="absolute left-1/3 right-0 mx-auto w-1/3 h-1 rounded-full mt-8 cursor-pointer"
              style={{ backgroundColor: currentColor }}
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{
                duration: 1,
                delay: 3,
                ease: "easeOut",
              }}
              whileHover={{ height: "4px", filter: "brightness(1.2)" }}
              onClick={() => {
                playInteractionSound()
                setCustomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
              }}
            />
          </motion.div>
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="w-full text-center space-y-4"
        >
          <motion.p
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            Thank you for your patience!
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.8 }}
          >
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                style={{ color: currentColor }}
                onClick={playInteractionSound}
              >
                <span className="sr-only">Instagram</span>
                <Instagram size={24} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: -5 }}>
              <Link
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                style={{ color: currentColor }}
                onClick={playInteractionSound}
              >
                <span className="sr-only">Behance</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 15a3.001 3.001 0 0 0 6 0v-2a3.001 3.001 0 0 0-6 0" />
                  <path d="M2 8h10" />
                  <path d="M16 8h6" />
                  <path d="M19 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                style={{ color: currentColor }}
                onClick={playInteractionSound}
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={24} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.footer>
      </div>
    </div>
  )
}
