"use client"

import { motion } from "framer-motion"
import { Play, Camera, GitCompare, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useNavigate } from "react-router-dom"
import { memo } from "react"

const HeroSection = memo(() => {
  const navigate = useNavigate()

  return (
    <section className="container mx-auto py-16 md:py-24 px-4 flex justify-center">
      <div className="flex flex-col gap-12 items-center max-w-6xl w-full">
        <div className="space-y-8 max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Badge variant="outline" className="px-4 py-1.5 border-emerald-500 text-emerald-400 font-medium">
              Version 1.0 Released
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center"
          >
            WebLenses – Version Control for{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              UI Testing
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 text-center"
          >
            WebLenses records UI changes as commits, allowing testers to track DOM modifications, analyze differences,
            and restore states.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 relative group h-12"
              onClick={() => navigate("/mind")}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>SnapMap</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="absolute -inset-[3px] bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group relative overflow-hidden h-12 border-emerald-500/30 hover:border-emerald-500/60 transition-colors duration-300"
              onClick={() => navigate("/diff")}
            >
              <span className="relative z-10 flex items-center gap-2">
                <GitCompare className="w-4 h-4" />
                <span>DiffArchieve</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="absolute -inset-[3px] bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></span>
              </span>
            </Button>
          </motion.div>

          {/* Demo Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center pt-4"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 group"
              onClick={() => navigate("/demo")}
            >
              <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {[
            { title: "DOM Tracking", description: "Record all DOM changes in real-time" },
            { title: "Visual Diff", description: "Compare UI states with visual highlighting" },
            { title: "Time Travel", description: "Restore any previous UI state instantly" },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors duration-300"
            >
              <h3 className="text-lg font-semibold mb-2 text-emerald-400">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

export default HeroSection

