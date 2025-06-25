"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import { useGame } from "@/contexts/game-context"

interface SettingsMenuProps {
  onBack: () => void
}

export default function SettingsMenu({ onBack }: SettingsMenuProps) {
  const { settings, updateSettings } = useGame()

  const colorOptions = [
    { name: "Cyan", value: "#00ffff" },
    { name: "Pink", value: "#ff00ff" },
    { name: "Amber", value: "#ffbf00" },
    { name: "Green", value: "#00ff00" },
    { name: "Red", value: "#ff0000" },
    { name: "Purple", value: "#8000ff" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="bg-black text-white border-gray-600 hover:bg-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
          Game Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gameplay Settings */}
          <Card className="bg-gray-900 border-amber-500">
            <CardHeader>
              <CardTitle className="text-amber-400">Gameplay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Paddle Speed: {settings.paddleSpeed}
                </label>
                <Slider
                  value={[settings.paddleSpeed]}
                  onValueChange={([value]) => updateSettings({ paddleSpeed: value })}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ball Speed: {settings.ballSpeed}</label>
                <Slider
                  value={[settings.ballSpeed]}
                  onValueChange={([value]) => updateSettings({ ballSpeed: value })}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                <div className="flex space-x-2">
                  {["easy", "medium", "hard"].map((difficulty) => (
                    <Button
                      key={difficulty}
                      onClick={() => updateSettings({ difficulty: difficulty as any })}
                      variant={settings.difficulty === difficulty ? "default" : "outline"}
                      className={
                        settings.difficulty === difficulty
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "bg-black text-white border-gray-600 hover:bg-gray-800"
                      }
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Settings */}
          <Card className="bg-gray-900 border-amber-500">
            <CardHeader>
              <CardTitle className="text-amber-400">Visual & Audio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Sound Effects</label>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Ball Glow Effect</label>
                <Switch
                  checked={settings.ballGlow}
                  onCheckedChange={(checked) => updateSettings({ ballGlow: checked })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Paddle Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color) => (
                    <Button
                      key={color.value}
                      onClick={() => updateSettings({ paddleColor: color.value })}
                      variant="outline"
                      className={`h-12 ${
                        settings.paddleColor === color.value ? "border-2 border-white" : "border-gray-600"
                      }`}
                      style={{ backgroundColor: color.value, color: "black" }}
                    >
                      {color.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                <div className="flex space-x-2">
                  {["neon", "retro", "minimal"].map((theme) => (
                    <Button
                      key={theme}
                      onClick={() => updateSettings({ theme: theme as any })}
                      variant={settings.theme === theme ? "default" : "outline"}
                      className={
                        settings.theme === theme
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "bg-black text-white border-gray-600 hover:bg-gray-800"
                      }
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disintegration Settings */}
          <Card className="bg-gray-900 border-red-500 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-red-400">🧬 Disintegration Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-300">Enable Disintegration Mode</label>
                  <p className="text-xs text-gray-500 mt-1">Ball breaks down with each paddle hit</p>
                </div>
                <Switch
                  checked={settings.disintegrationMode}
                  onCheckedChange={(checked) => updateSettings({ disintegrationMode: checked })}
                />
              </div>

              {settings.disintegrationMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Disintegration Speed</label>
                  <div className="flex space-x-2">
                    {["slow", "medium", "fast"].map((speed) => (
                      <Button
                        key={speed}
                        onClick={() => updateSettings({ disintegrationSpeed: speed as any })}
                        variant={settings.disintegrationSpeed === speed ? "default" : "outline"}
                        className={
                          settings.disintegrationSpeed === speed
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-black text-white border-gray-600 hover:bg-gray-800"
                        }
                      >
                        {speed.charAt(0).toUpperCase() + speed.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {settings.disintegrationSpeed === "slow" && "Ball degrades slowly over many hits"}
                    {settings.disintegrationSpeed === "medium" && "Balanced degradation rate"}
                    {settings.disintegrationSpeed === "fast" && "Ball disintegrates quickly"}
                  </p>
                </div>
              )}

              <div className="p-4 bg-gray-800 rounded-lg border border-red-400">
                <h4 className="text-red-400 font-semibold mb-2">How Disintegration Works:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Each paddle hit reduces the ball's integrity</li>
                  <li>• Custom image balls will fade and pixelate</li>
                  <li>• Ball resets when fully disintegrated</li>
                  <li>• Works best with custom face images</li>
                  <li>• Creates unique visual effects during gameplay</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
