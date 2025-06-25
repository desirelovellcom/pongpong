"use client"

import { Button } from "@/components/ui/button"
import { Play, Settings, Palette, Info } from "lucide-react"

interface MainMenuProps {
  onNavigate: (screen: "game" | "customize" | "settings" | "about") => void
}

export default function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="text-center mb-12">
        <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400 bg-clip-text text-transparent animate-pulse">
          PongPong
        </h1>
        <p className="text-xl text-gray-400">Classic Pong with Modern Style</p>
      </div>

      <div className="flex flex-col gap-6 w-80">
        <Button
          onClick={() => onNavigate("game")}
          className="h-16 text-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 border-2 border-cyan-400 shadow-lg shadow-cyan-500/25"
        >
          <Play className="mr-3 h-6 w-6" />
          Start Game
        </Button>

        <Button
          onClick={() => onNavigate("customize")}
          variant="outline"
          className="h-16 text-xl bg-black text-pink-400 border-2 border-pink-400 hover:bg-pink-400 hover:text-black shadow-lg shadow-pink-500/25"
        >
          <Palette className="mr-3 h-6 w-6" />
          Customize
        </Button>

        <Button
          onClick={() => onNavigate("settings")}
          variant="outline"
          className="h-16 text-xl bg-black text-amber-400 border-2 border-amber-400 hover:bg-amber-400 hover:text-black shadow-lg shadow-amber-500/25"
        >
          <Settings className="mr-3 h-6 w-6" />
          Settings
        </Button>

        <Button
          onClick={() => onNavigate("about")}
          variant="outline"
          className="h-16 text-xl bg-black text-gray-400 border-2 border-gray-400 hover:bg-gray-400 hover:text-black shadow-lg shadow-gray-500/25"
        >
          <Info className="mr-3 h-6 w-6" />
          About
        </Button>
      </div>

      <div className="mt-12 text-center text-gray-500">
        <p>Use W/S and ↑/↓ keys or touch controls</p>
        <p className="text-sm mt-2">Open Source • MIT License</p>
      </div>
    </div>
  )
}
