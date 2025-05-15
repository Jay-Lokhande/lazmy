"use client"

import { useEffect, useRef } from "react"
import { useColorCycle } from "../hooks/use-color-cycle"

interface CanvasProps {
  mousePosition: { x: number; y: number }
}

export function Canvas({ mousePosition }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentColor, currentColorRGB } = useColorCycle()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class with enhanced animation and interactivity
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      pulseDirection: number
      pulseSpeed: number
      maxSize: number
      minSize: number
      originalX: number
      originalY: number
      force: number
      angle: number
      distance: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 3 + 1
        this.maxSize = this.size + Math.random() * 2
        this.minSize = Math.max(0.5, this.size - Math.random() * 2)
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1
        this.pulseSpeed = Math.random() * 0.1
        this.force = 0
        this.angle = 0
        this.distance = 0
      }

      update(mouseX: number, mouseY: number) {
        // Calculate distance from mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        this.distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate angle to mouse
        this.angle = Math.atan2(dy, dx)

        // Apply force based on mouse proximity (repel)
        if (this.distance < 100) {
          this.force = (100 - this.distance) / 500
          this.x -= Math.cos(this.angle) * this.force
          this.y -= Math.sin(this.angle) * this.force
        }

        // Move particle
        this.x += this.speedX
        this.y += this.speedY

        // Gradually return to original position
        this.x += (this.originalX - this.x) * 0.01
        this.y += (this.originalY - this.y) * 0.01

        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Pulse size
        this.size += this.pulseSpeed * this.pulseDirection
        if (this.size > this.maxSize || this.size < this.minSize) {
          this.pulseDirection *= -1
        }
      }

      draw(color: string) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(70, Math.floor((canvas.width * canvas.height) / 15000))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop with enhanced effects
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get current color from the hook
      const currentParticleColor = currentColor
      const currentConnectionColor = `rgba(${currentColorRGB}, 0.05)`

      // Draw connections between particles with enhanced effects
      ctx.strokeStyle = currentConnectionColor
      ctx.lineWidth = 1
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            // Gradient line based on distance
            const opacity = 1 - distance / 150
            ctx.strokeStyle = `rgba(${currentColorRGB}, ${opacity * 0.1})`
            ctx.lineWidth = opacity * 2

            ctx.beginPath()
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mousePosition.x, mousePosition.y)
        particlesArray[i].draw(currentParticleColor)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [currentColor, currentColorRGB, mousePosition])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
