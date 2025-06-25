"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Trash2, Circle } from "lucide-react"
import { useGame } from "@/contexts/game-context"

interface CustomizeMenuProps {
  onBack: () => void
}

export default function CustomizeMenu({ onBack }: CustomizeMenuProps) {
  const { customBalls, addCustomBall, removeCustomBall, setActiveBall, activeBall } = useGame()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [ballName, setBallName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const cropToCircle = (imageData: string): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        const size = Math.min(img.width, img.height)
        canvas.width = size
        canvas.height = size

        if (ctx) {
          // Create circular clipping path
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
          ctx.clip()

          // Draw image centered
          const offsetX = (img.width - size) / 2
          const offsetY = (img.height - size) / 2
          ctx.drawImage(img, -offsetX, -offsetY)
        }

        resolve(canvas.toDataURL())
      }

      img.src = imageData
    })
  }

  const handleSaveBall = async () => {
    if (selectedImage && ballName.trim()) {
      const croppedImage = await cropToCircle(selectedImage)
      addCustomBall({
        name: ballName.trim(),
        imageData: croppedImage,
        isActive: false,
      })
      setSelectedImage(null)
      setBallName("")
    }
  }

  const handleActivateBall = (ballId: string) => {
    setActiveBall(ballId)
  }

  const handleDeactivateBall = () => {
    setActiveBall(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="bg-black text-white border-gray-600 hover:bg-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
          Customize Your Ball
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gray-900 border-pink-500">
            <CardHeader>
              <CardTitle className="text-pink-400">Upload Custom Ball Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected"
                      className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-pink-400"
                    />
                    <p className="text-gray-400">Image selected and cropped to circle</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 mx-auto text-gray-400" />
                    <p className="text-gray-400">Click to upload an image</p>
                    <p className="text-sm text-gray-500">Preferably a face or headshot</p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <Button onClick={() => fileInputRef.current?.click()} className="mt-4 bg-pink-500 hover:bg-pink-600">
                  Choose Image
                </Button>
              </div>

              {selectedImage && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter ball name..."
                    value={ballName}
                    onChange={(e) => setBallName(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />

                  <Button
                    onClick={handleSaveBall}
                    disabled={!ballName.trim()}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600"
                  >
                    Save Custom Ball
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Balls Section */}
          <Card className="bg-gray-900 border-pink-500">
            <CardHeader>
              <CardTitle className="text-pink-400">Your Custom Balls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Default Ball Option */}
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Circle className="w-8 h-8 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Default Ball</h3>
                      <p className="text-sm text-gray-400">Classic glowing sphere</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleDeactivateBall}
                    variant={!activeBall ? "default" : "outline"}
                    className={
                      !activeBall
                        ? "bg-cyan-500 hover:bg-cyan-600"
                        : "bg-black text-white border-gray-600 hover:bg-gray-800"
                    }
                  >
                    {!activeBall ? "Active" : "Use"}
                  </Button>
                </div>

                {customBalls.map((ball) => (
                  <div key={ball.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={ball.imageData || "/placeholder.svg"}
                        alt={ball.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-pink-400"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{ball.name}</h3>
                        <p className="text-sm text-gray-400">Custom image ball</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleActivateBall(ball.id)}
                        variant={activeBall?.id === ball.id ? "default" : "outline"}
                        className={
                          activeBall?.id === ball.id
                            ? "bg-cyan-500 hover:bg-cyan-600"
                            : "bg-black text-white border-gray-600 hover:bg-gray-800"
                        }
                      >
                        {activeBall?.id === ball.id ? "Active" : "Use"}
                      </Button>
                      <Button
                        onClick={() => removeCustomBall(ball.id)}
                        variant="outline"
                        size="sm"
                        className="bg-black text-red-400 border-red-400 hover:bg-red-400 hover:text-black"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {customBalls.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p>No custom balls yet.</p>
                    <p className="text-sm">Upload an image to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-amber-500">
          <h3 className="text-xl font-semibold text-amber-400 mb-4">Tips for Best Results</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Use square images for best circular cropping</li>
            <li>• Face photos work great for the disintegration effect</li>
            <li>• High contrast images show up better during gameplay</li>
            <li>• Images are automatically resized and optimized</li>
            <li>• You can store up to unlimited custom balls</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
