"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

export default function HeroSection() {
  return (
    <section className="container mx-auto py-16 md:py-24 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="outline" className="px-4 py-1 border-emerald-500 text-emerald-400">
              Version 1.0 Released
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            WebLenses – Version Control for{" "}
            <span className="text-emerald-500">UI Testing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            WebLenses records UI changes as commits, allowing testers to track DOM modifications, analyze differences,
            and restore states.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 relative">
              <span className="relative z-10">Get Started for Free</span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                <span className="absolute -inset-[3px] bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 hover:opacity-30 blur-md transition-opacity duration-300"></span>
              </span>
            </Button>
            <Button size="lg" variant="outline" className="group relative overflow-hidden">
              <Play className="h-4 w-4 mr-2" />
              <span className="relative z-10">Watch Demo</span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </span>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-30"></div>
          <div className="relative bg-black/40 backdrop-blur-xl border border-gray-800 rounded-lg overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.15)]">
            <div className="p-1 border-b border-gray-800">
              <div className="flex items-center gap-1.5 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-xs text-gray-400">WebLenses Extension</div>
              </div>
            </div>
            <div className="p-4">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="WebLenses UI"
                className="w-full h-auto rounded border border-gray-800"
              />
              <div className="mt-4 p-3 bg-gray-900/50 rounded border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <div className="text-xs text-gray-300">Commit #12: Button color changed from blue to green</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <div className="text-xs text-gray-300">Commit #11: Text content updated in hero section</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}