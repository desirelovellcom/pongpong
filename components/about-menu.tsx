"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Github, Heart, Zap } from "lucide-react"

interface AboutMenuProps {
  onBack: () => void
}

export default function AboutMenu({ onBack }: AboutMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="bg-black text-white border-gray-600 hover:bg-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            PongPong
          </h1>
          <p className="text-xl text-gray-400">Classic Pong with Modern Style</p>
          <p className="text-sm text-gray-500 mt-2">Version 1.0.0</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-900 border-cyan-500">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Classic Pong gameplay with modern neon aesthetics
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  Custom ball image upload with circular cropping
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  Unique disintegration mode for visual effects
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Touch controls for mobile devices
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Customizable paddle colors and themes
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Ambient sound effects and visual glow
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Cross-platform compatibility
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-pink-500">
            <CardHeader>
              <CardTitle className="text-pink-400 flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                PongPong is a modern take on the classic Pong game, featuring beautiful neon graphics, customizable
                elements, and unique gameplay modes.
              </p>
              <p>
                The disintegration feature allows you to upload personal images that gradually break down during
                gameplay, creating a unique and entertaining visual experience.
              </p>
              <p>Built with modern web technologies for maximum compatibility across devices and platforms.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-amber-500">
            <CardHeader>
              <CardTitle className="text-amber-400">Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Desktop</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <span className="text-amber-400">W/S:</span> Left paddle up/down
                    </li>
                    <li>
                      <span className="text-amber-400">↑/↓:</span> Right paddle up/down
                    </li>
                    <li>
                      <span className="text-amber-400">Space:</span> Pause/Resume
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Mobile</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <span className="text-amber-400">Touch:</span> Left/right side of screen
                    </li>
                    <li>
                      <span className="text-amber-400">Drag:</span> Move paddles up/down
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Github className="mr-2 h-5 w-5" />
                Open Source
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>PongPong is open source software released under the MIT License.</p>
              <p>You can modify, distribute, and contribute to the project freely.</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Customization Options:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Replace ball and paddle assets</li>
                  <li>• Modify game physics and rules</li>
                  <li>• Add new themes and visual effects</li>
                  <li>• Create custom disintegration modes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Card className="bg-gray-900 border-gray-600">
            <CardContent className="pt-6">
              <p className="text-gray-400 mb-4">Made with ❤️ for the gaming community</p>
              <p className="text-sm text-gray-500">Compatible with ARM processors • Linux • Windows • Web browsers</p>
              <p className="text-xs text-gray-600 mt-2">Optimized for performance and cross-platform compatibility</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
