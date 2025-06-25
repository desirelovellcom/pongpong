"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react"
import { useGame } from "@/contexts/game-context"

interface GameCanvasProps {
  onBack: () => void
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  disintegration: number // 0-1, where 1 is fully disintegrated
  hits: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  dy: number
}

export default function GameCanvas({ onBack }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { settings, activeBall, gameState, setGameState, score, updateScore, resetScore } = useGame()

  const [ball, setBall] = useState<Ball>({
    x: 400,
    y: 300,
    dx: 4,
    dy: 4,
    radius: 15,
    disintegration: 0,
    hits: 0,
  })

  const [paddles, setPaddles] = useState<{ left: Paddle; right: Paddle }>({
    left: { x: 20, y: 250, width: 15, height: 100, dy: 0 },
    right: { x: 765, y: 250, width: 15, height: 100, dy: 0 },
  })

  const [keys, setKeys] = useState<Set<string>>(new Set())
  const [touches, setTouches] = useState<{ left: boolean; right: boolean }>({ left: false, right: false })

  // Sound effects
  const playSound = useCallback(
    (type: "paddle" | "wall" | "score" | "disintegrate") => {
      if (!settings.soundEnabled) return

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      switch (type) {
        case "paddle":
          oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
          break
        case "wall":
          oscillator.frequency.setValueAtTime(110, audioContext.currentTime)
          break
        case "score":
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
          break
        case "disintegrate":
          oscillator.frequency.setValueAtTime(80, audioContext.currentTime)
          break
      }

      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    },
    [settings.soundEnabled],
  )

  // Reset ball position
  const resetBall = useCallback(() => {
    setBall({
      x: 400,
      y: 300,
      dx: (Math.random() > 0.5 ? 1 : -1) * settings.ballSpeed,
      dy: (Math.random() - 0.5) * settings.ballSpeed,
      radius: 15,
      disintegration: 0,
      hits: 0,
    })
  }, [settings.ballSpeed])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => new Set(prev).add(e.key.toLowerCase()))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const newKeys = new Set(prev)
        newKeys.delete(e.key.toLowerCase())
        return newKeys
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Handle touch input
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const isLeft = x < canvas.width / 2

    setTouches((prev) => ({ ...prev, [isLeft ? "left" : "right"]: true }))
  }, [])

  const handleTouchEnd = useCallback(() => {
    setTouches({ left: false, right: false })
  }, [])

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update paddle positions
      setPaddles((prev) => {
        const newPaddles = { ...prev }

        // Left paddle controls
        if (keys.has("w") || touches.left) {
          newPaddles.left.y = Math.max(0, newPaddles.left.y - settings.paddleSpeed)
        }
        if (keys.has("s") || touches.left) {
          newPaddles.left.y = Math.min(canvas.height - newPaddles.left.height, newPaddles.left.y + settings.paddleSpeed)
        }

        // Right paddle controls
        if (keys.has("arrowup")) {
          newPaddles.right.y = Math.max(0, newPaddles.right.y - settings.paddleSpeed)
        }
        if (keys.has("arrowdown")) {
          newPaddles.right.y = Math.min(
            canvas.height - newPaddles.right.height,
            newPaddles.right.y + settings.paddleSpeed,
          )
        }

        return newPaddles
      })

      // Update ball position
      setBall((prev) => {
        const newBall = { ...prev }
        newBall.x += newBall.dx
        newBall.y += newBall.dy

        // Wall collisions
        if (newBall.y <= newBall.radius || newBall.y >= canvas.height - newBall.radius) {
          newBall.dy = -newBall.dy
          playSound("wall")
        }

        // Paddle collisions
        const leftPaddle = paddles.left
        const rightPaddle = paddles.right

        // Left paddle collision
        if (
          newBall.x - newBall.radius <= leftPaddle.x + leftPaddle.width &&
          newBall.y >= leftPaddle.y &&
          newBall.y <= leftPaddle.y + leftPaddle.height &&
          newBall.dx < 0
        ) {
          newBall.dx = -newBall.dx
          newBall.hits++
          playSound("paddle")

          // Apply disintegration
          if (settings.disintegrationMode) {
            const disintegrationRate =
              settings.disintegrationSpeed === "fast" ? 0.2 : settings.disintegrationSpeed === "medium" ? 0.1 : 0.05
            newBall.disintegration = Math.min(1, newBall.disintegration + disintegrationRate)

            if (newBall.disintegration >= 1) {
              playSound("disintegrate")
              setTimeout(() => resetBall(), 500)
            }
          }
        }

        // Right paddle collision
        if (
          newBall.x + newBall.radius >= rightPaddle.x &&
          newBall.y >= rightPaddle.y &&
          newBall.y <= rightPaddle.y + rightPaddle.height &&
          newBall.dx > 0
        ) {
          newBall.dx = -newBall.dx
          newBall.hits++
          playSound("paddle")

          // Apply disintegration
          if (settings.disintegrationMode) {
            const disintegrationRate =
              settings.disintegrationSpeed === "fast" ? 0.2 : settings.disintegrationSpeed === "medium" ? 0.1 : 0.05
            newBall.disintegration = Math.min(1, newBall.disintegration + disintegrationRate)

            if (newBall.disintegration >= 1) {
              playSound("disintegrate")
              setTimeout(() => resetBall(), 500)
            }
          }
        }

        // Score detection
        if (newBall.x < 0) {
          updateScore("player2")
          playSound("score")
          setTimeout(() => resetBall(), 1000)
        } else if (newBall.x > canvas.width) {
          updateScore("player1")
          playSound("score")
          setTimeout(() => resetBall(), 1000)
        }

        return newBall
      })

      // Draw paddles with glow effect
      ctx.shadowBlur = 20
      ctx.shadowColor = settings.paddleColor
      ctx.fillStyle = settings.paddleColor
      ctx.fillRect(paddles.left.x, paddles.left.y, paddles.left.width, paddles.left.height)
      ctx.fillRect(paddles.right.x, paddles.right.y, paddles.right.width, paddles.right.height)

      // Draw ball
      ctx.shadowBlur = settings.ballGlow ? 30 : 0
      ctx.shadowColor = "#ffffff"

      if (activeBall && ball.disintegration < 1) {
        // Draw custom ball image
        const img = new Image()
        img.onload = () => {
          ctx.save()
          ctx.globalAlpha = 1 - ball.disintegration
          ctx.beginPath()
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
          ctx.clip()
          ctx.drawImage(img, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2)
          ctx.restore()
        }
        img.src = activeBall.imageData
      } else if (ball.disintegration < 1) {
        // Draw default glowing ball
        ctx.fillStyle = "#ffffff"
        ctx.globalAlpha = 1 - ball.disintegration
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw center line
      ctx.shadowBlur = 0
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.setLineDash([10, 10])
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw score
      ctx.fillStyle = "#ffffff"
      ctx.font = "48px Arial"
      ctx.textAlign = "center"
      ctx.fillText(score.player1.toString(), canvas.width / 4, 60)
      ctx.fillText(score.player2.toString(), (canvas.width * 3) / 4, 60)

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState, keys, touches, paddles, ball, settings, activeBall, score, playSound, resetBall, updateScore])

  const togglePause = () => {
    setGameState(gameState === "playing" ? "paused" : "playing")
  }

  const handleRestart = () => {
    resetScore()
    resetBall()
    setGameState("playing")
  }

  useEffect(() => {
    setGameState("playing")
    resetBall()
  }, [setGameState, resetBall])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex gap-4">
        <Button onClick={onBack} variant="outline" className="bg-black text-white border-gray-600 hover:bg-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={togglePause}
          variant="outline"
          className="bg-black text-white border-gray-600 hover:bg-gray-800"
        >
          {gameState === "playing" ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {gameState === "playing" ? "Pause" : "Resume"}
        </Button>

        <Button
          onClick={handleRestart}
          variant="outline"
          className="bg-black text-white border-gray-600 hover:bg-gray-800"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-gray-800 rounded-lg shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      <div className="mt-4 text-center text-gray-400">
        <p>Left: W/S keys or touch left side | Right: ↑/↓ keys or touch right side</p>
        {settings.disintegrationMode && (
          <p className="text-amber-400 mt-2">Disintegration Mode: Ball degrades with each hit!</p>
        )}
      </div>

      {gameState === "paused" && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Game Paused</h2>
            <Button onClick={togglePause} className="bg-cyan-500 hover:bg-cyan-600">
              Resume Game
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
