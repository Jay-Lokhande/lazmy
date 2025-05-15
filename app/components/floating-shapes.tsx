"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingShapesProps {
  color: string
}

interface Shape {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "circle" | "square" | "triangle" | "star" | "brush"
  rotation: number
}

export function FloatingShapes({ color }: FloatingShapesProps) {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    // Generate random shapes
    const shapeTypes = ["circle", "square", "triangle", "star", "brush"]
    const newShapes: Shape[] = []

    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 10,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)] as any,
        rotation: Math.random() * 360,
      })
    }

    setShapes(newShapes)
  }, [])

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <circle
            cx={shape.size / 2}
            cy={shape.size / 2}
            r={shape.size / 2}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        )
      case "square":
        return <rect x="0" y="0" width={shape.size} height={shape.size} fill="none" stroke={color} strokeWidth="1" />
      case "triangle":
        return (
          <polygon
            points={`${shape.size / 2},0 ${shape.size},${shape.size} 0,${shape.size}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        )
      case "star":
        return (
          <path
            d={`M${shape.size / 2},0 L${shape.size * 0.6},${shape.size * 0.4} L${shape.size},${
              shape.size * 0.5
            } L${shape.size * 0.7},${shape.size * 0.7} L${shape.size * 0.8},${shape.size} L${
              shape.size / 2
            },${shape.size * 0.8} L${shape.size * 0.2},${shape.size} L${shape.size * 0.3},${
              shape.size * 0.7
            } L0,${shape.size * 0.5} L${shape.size * 0.4},${shape.size * 0.4} Z`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        )
      case "brush":
        return (
          <path
            d={`M${shape.size * 0.2},${shape.size * 0.8} 
                C${shape.size * 0.1},${shape.size * 0.6} ${shape.size * 0.3},${shape.size * 0.2} ${
                  shape.size * 0.5
                },${shape.size * 0.3}
                C${shape.size * 0.7},${shape.size * 0.4} ${shape.size * 0.8},${shape.size * 0.6} ${
                  shape.size * 0.7
                },${shape.size * 0.8}
                C${shape.size * 0.6},${shape.size} ${shape.size * 0.3},${shape.size} ${
                  shape.size * 0.2
                },${shape.size * 0.8} Z`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [shape.rotation, shape.rotation + 360, shape.rotation],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg width={shape.size} height={shape.size} viewBox={`0 0 ${shape.size} ${shape.size}`}>
            {renderShape(shape)}
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
