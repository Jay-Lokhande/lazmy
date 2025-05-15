"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eraser, Download, Trash2 } from "lucide-react"

interface InteractiveCanvasProps {
  color: string
}

export function InteractiveCanvas({ color }: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(5)
  const [isEraser, setIsEraser] = useState(false)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [currentColor, setCurrentColor] = useState(color)

  // Update color when prop changes
  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    canvas.style.width = `${canvas.offsetWidth}px`
    canvas.style.height = `${canvas.offsetHeight}px`

    // Get context
    const context = canvas.getContext("2d")
    if (!context) return

    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = currentColor
    context.lineWidth = brushSize
    contextRef.current = context

    // Fill with black background
    context.fillStyle = "rgba(0, 0, 0, 0.7)"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Start drawing
  const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    const { offsetX, offsetY } = getNativeEventCoordinates(nativeEvent)

    if (contextRef.current) {
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }
  }

  // Draw
  const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return

    const { offsetX, offsetY } = getNativeEventCoordinates(nativeEvent)

    if (contextRef.current) {
      contextRef.current.strokeStyle = isEraser ? "rgba(0, 0, 0, 0.7)" : currentColor
      contextRef.current.lineWidth = brushSize
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }

  // Stop drawing
  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath()
      setIsDrawing(false)
    }
  }

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas || !contextRef.current) return

    contextRef.current.fillStyle = "rgba(0, 0, 0, 0.7)"
    contextRef.current.fillRect(0, 0, canvas.width / 2, canvas.height / 2)
  }

  // Download canvas
  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = image
    link.download = "lazmy-art-creation.png"
    link.click()
  }

  // Helper to get coordinates from mouse or touch event
  const getNativeEventCoordinates = (event: any) => {
    let offsetX, offsetY

    if (event.touches) {
      // Touch event
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return { offsetX: 0, offsetY: 0 }

      offsetX = event.touches[0].clientX - rect.left
      offsetY = event.touches[0].clientY - rect.top
    } else {
      // Mouse event
      offsetX = event.offsetX
      offsetY = event.offsetY
    }

    return { offsetX, offsetY }
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    startDrawing(e)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    draw(e)
  }

  const handleTouchEnd = () => {
    stopDrawing()
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
            className="w-24"
          />
          <div
            className="w-6 h-6 rounded-full"
            style={{
              backgroundColor: isEraser ? "black" : currentColor,
              width: `${brushSize}px`,
              height: `${brushSize}px`,
              border: "1px solid white",
            }}
          />
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${isEraser ? "bg-white text-black" : "bg-gray-800"}`}
            onClick={() => setIsEraser(!isEraser)}
          >
            <Eraser size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-800"
            onClick={clearCanvas}
          >
            <Trash2 size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full"
            style={{ backgroundColor: currentColor }}
            onClick={downloadCanvas}
          >
            <Download size={16} className="text-black" />
          </motion.button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full border border-gray-700 rounded-md cursor-crosshair touch-none"
      />
    </div>
  )
}
