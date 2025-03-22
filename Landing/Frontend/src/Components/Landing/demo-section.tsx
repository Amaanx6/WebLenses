"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GitCommit, PaintBucket, Type, Eye, EyeOff, Layers } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

import { useNavigate } from "react-router-dom"


interface DemoSectionProps {
  headerText: string
  subheaderText: string
  ctaVisible: boolean
  testimonialCards: { id: number; name: string; role: string; text: string }[]
  glassEffect: string
  animationDuration: string
}

export default function DemoSection({
  headerText,
  subheaderText,
  ctaVisible,
  testimonialCards,
  glassEffect,
  animationDuration,
}: DemoSectionProps) {
  const [backgroundColor, setBackgroundColor] = useState("#1e1e1e")
  const [headingText, setHeadingText] = useState(headerText)
  const [isElementVisible, setIsElementVisible] = useState(true)
  const [commits, setCommits] = useState<{ message: string; timestamp: string }[]>([
    { message: "Initial state", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) },
  ])
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 })

  // Add mouse move handler for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20
    setParallaxOffset({ x, y })
  }

  const addCommit = (message: string) => {
    const now = new Date()
    const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    setCommits([...commits, { message, timestamp }])
  }

  const handleBackgroundChange = () => {
    const colors = ["#1e1e1e", "#0f172a", "#1a2e35", "#1e1b4b", "#312e81"]
    const currentIndex = colors.indexOf(backgroundColor)
    const nextIndex = (currentIndex + 1) % colors.length
    setBackgroundColor(colors[nextIndex])
    addCommit(`Changed background color to ${colors[nextIndex]}`)
  }

  const handleTextChange = () => {
    const texts = ["Interactive Demo", "WebLenses in Action", "Try It Yourself", "See How It Works"]
    const currentIndex = texts.indexOf(headingText)
    const nextIndex = (currentIndex + 1) % texts.length
    setHeadingText(texts[nextIndex])
    addCommit(`Updated heading text to "${texts[nextIndex]}"`)
  }

  const navigate = useNavigate();
  const toggleElementVisibility = () => {
    setIsElementVisible(!isElementVisible)
    addCommit(`${isElementVisible ? "Hidden" : "Shown"} demo element`)
  }

  return (
    <section
      id="demo"
      className="py-16 px-4 relative overflow-hidden bg-gradient-to-b from-transparent to-gray-900/30"
      style={{ backdropFilter: glassEffect }}
      onMouseMove={handleMouseMove}
    >
      {/* Hexagonal Background (unchanged from original) */}
      <HexagonalBackground scrollEffect={false} parallaxOffset={parallaxOffset} />

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: Number(animationDuration) }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-emerald-500 text-emerald-400">
            Live Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{headerText}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{subheaderText}</p>

          {ctaVisible && (
            <Button onClick={() => navigate("/mind")} className="mt-6 bg-emerald-500 hover:bg-emerald-600">
              Get Started
            </Button>
          )}

        </motion.div>

        {/* Centered Interactive Demo Card */}
        <div className="flex justify-center mb-12">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)] w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCommit className="h-5 w-5 text-emerald-400" />
                Interactive Demo
              </CardTitle>
              <CardDescription>Make changes to the UI and see how WebLenses tracks them</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleBackgroundChange} className="flex items-center gap-2">
                  <PaintBucket className="h-4 w-4" />
                  Change Background
                </Button>
                <Button variant="outline" onClick={handleTextChange} className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Modify Text
                </Button>
                <Button variant="outline" onClick={toggleElementVisibility} className="flex items-center gap-2">
                  {isElementVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {isElementVisible ? "Hide Element" : "Show Element"}
                </Button>
              </div>
              <div
                className="p-6 rounded-lg border border-gray-800 transition-colors duration-300"
                style={{ backgroundColor }}
              >
                <h3 className="text-xl font-bold mb-4 transition-all duration-300">{headingText}</h3>
                <AnimatePresence>
                  {isElementVisible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 bg-black/20 backdrop-blur-sm rounded border border-gray-700">
                        <p className="text-gray-300">
                          This is a demo element that can be shown or hidden. WebLenses tracks these DOM changes
                          automatically.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* DOM Tree Visualization Card */}
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-400" />
                DOM Tree Visualization
              </CardTitle>
              <CardDescription>See how WebLenses tracks changes in the DOM structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-900/50 rounded border border-gray-800">
                <div className="flex items-start">
                  <div className="flex flex-col items-center mr-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <div className="w-0.5 h-8 bg-gray-700"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">html</div>
                    <div className="ml-4 mt-1">
                      <div className="flex items-start">
                        <div className="flex flex-col items-center mr-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          <div className="w-0.5 h-8 bg-gray-700"></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">body</div>
                          <div className="ml-4 mt-1">
                            <div className="flex items-start">
                              <div className="flex flex-col items-center mr-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <div className="w-0.5 h-8 bg-gray-700"></div>
                              </div>
                              <div>
                                <div className="text-sm font-medium">div.container</div>
                                <div className="ml-4 mt-1">
                                  <div className="flex items-start">
                                    <div className="flex flex-col items-center mr-2">
                                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium">
                                        h3 <span className="text-yellow-500 text-xs">(modified)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-start mt-2">
                                    <div className="flex flex-col items-center mr-2">
                                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium">
                                        div.element <span className="text-red-500 text-xs">(toggled)</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commit Log Card */}
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCommit className="h-5 w-5 text-emerald-400" />
                Commit Log
              </CardTitle>
              <CardDescription>WebLenses records each UI change as a commit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {commits.map((commit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: Number(animationDuration) }}
                    className="p-3 rounded-md text-sm border bg-gray-900/50 border-gray-800"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">#{commits.length - index}</span>
                      <span className="text-xs text-gray-500">{commit.timestamp}</span>
                    </div>
                    <p className="mt-1">{commit.message}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Card (Full Width) */}
          <div className="md:col-span-2">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-emerald-400" />
                  Testimonials
                </CardTitle>
                <CardDescription>User feedback tracked by WebLenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testimonialCards.map((card) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: Number(animationDuration) }}
                      className="p-3 rounded-md text-sm border bg-gray-900/50 border-gray-800"
                    >
                      <div className="font-medium">{card.name} - {card.role}</div>
                      <p className="mt-1 text-gray-300">{card.text}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Get Started Button */}
        {ctaVisible && (
          <div className="flex justify-center mt-12">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}