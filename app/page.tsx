"use client"

import { useState, useEffect } from "react"
import GameCanvas from "@/components/game-canvas"
import MainMenu from "@/components/main-menu"
import CustomizeMenu from "@/components/customize-menu"
import SettingsMenu from "@/components/settings-menu"
import AboutMenu from "@/components/about-menu"
import { GameProvider } from "@/contexts/game-context"

type Screen = "menu" | "game" | "customize" | "settings" | "about"

export default function PongPongApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu")

  useEffect(() => {
    // Prevent default touch behaviors for better mobile experience
    const preventDefault = (e: TouchEvent) => e.preventDefault()
    document.addEventListener("touchstart", preventDefault, { passive: false })
    document.addEventListener("touchmove", preventDefault, { passive: false })

    return () => {
      document.removeEventListener("touchstart", preventDefault)
      document.removeEventListener("touchmove", preventDefault)
    }
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case "game":
        return <GameCanvas onBack={() => setCurrentScreen("menu")} />
      case "customize":
        return <CustomizeMenu onBack={() => setCurrentScreen("menu")} />
      case "settings":
        return <SettingsMenu onBack={() => setCurrentScreen("menu")} />
      case "about":
        return <AboutMenu onBack={() => setCurrentScreen("menu")} />
      default:
        return <MainMenu onNavigate={setCurrentScreen} />
    }
  }

  return (
    <GameProvider>
      <div className="min-h-screen bg-black text-white overflow-hidden">{renderScreen()}</div>
    </GameProvider>
  )
}
