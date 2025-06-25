"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { bool } from "prop-types"

interface GameSettings {
  paddleSpeed: number
  ballSpeed: number
  difficulty: "easy" | "medium" | "hard"
  soundEnabled: bool
  disintegrationMode: boolean
  disintegrationSpeed: "slow" | "medium" | "fast"
  paddleColor: string
  ballGlow: boolean
  theme: "neon" | "retro" | "minimal"
}

interface CustomBall {
  id: string
  name: string
  imageData: string
  isActive: boolean
}

interface GameContextType {
  settings: GameSettings
  updateSettings: (newSettings: Partial<GameSettings>) => void
  customBalls: CustomBall[]
  addCustomBall: (ball: Omit<CustomBall, "id">) => void
  removeCustomBall: (id: string) => void
  setActiveBall: (id: string | null) => void
  activeBall: CustomBall | null
  gameState: "menu" | "playing" | "paused"
  setGameState: (state: "menu" | "playing" | "paused") => void
  score: { player1: number; player2: number }
  updateScore: (player: "player1" | "player2") => void
  resetScore: () => void
}

const defaultSettings: GameSettings = {
  paddleSpeed: 5,
  ballSpeed: 4,
  difficulty: "medium",
  soundEnabled: true,
  disintegrationMode: false,
  disintegrationSpeed: "medium",
  paddleColor: "#00ffff",
  ballGlow: true,
  theme: "neon",
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings)
  const [customBalls, setCustomBalls] = useState<CustomBall[]>([])
  const [activeBall, setActiveBallState] = useState<CustomBall | null>(null)
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused">("menu")
  const [score, setScore] = useState({ player1: 0, player2: 0 })

  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }, [])

  const addCustomBall = useCallback((ball: Omit<CustomBall, "id">) => {
    const newBall = { ...ball, id: Date.now().toString() }
    setCustomBalls((prev) => [...prev, newBall])
  }, [])

  const removeCustomBall = useCallback(
    (id: string) => {
      setCustomBalls((prev) => prev.filter((ball) => ball.id !== id))
      if (activeBall?.id === id) {
        setActiveBallState(null)
      }
    },
    [activeBall],
  )

  const setActiveBall = useCallback(
    (id: string | null) => {
      if (id === null) {
        setActiveBallState(null)
      } else {
        const ball = customBalls.find((b) => b.id === id)
        setActiveBallState(ball || null)
      }
    },
    [customBalls],
  )

  const updateScore = useCallback((player: "player1" | "player2") => {
    setScore((prev) => ({
      ...prev,
      [player]: prev[player] + 1,
    }))
  }, [])

  const resetScore = useCallback(() => {
    setScore({ player1: 0, player2: 0 })
  }, [])

  return (
    <GameContext.Provider
      value={{
        settings,
        updateSettings,
        customBalls,
        addCustomBall,
        removeCustomBall,
        setActiveBall,
        activeBall,
        gameState,
        setGameState,
        score,
        updateScore,
        resetScore,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
