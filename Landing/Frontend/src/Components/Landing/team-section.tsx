"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Former QA lead with 10+ years of experience in UI testing",
      image: "/placeholder.svg?height=200&width=200",
      social: {
        twitter: "#",
        github: "#",
        linkedin: "#",
      },
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "Full-stack developer specializing in browser extensions and testing tools",
      image: "/placeholder.svg?height=200&width=200",
      social: {
        twitter: "#",
        github: "#",
        linkedin: "#",
      },
    },
    {
      name: "Alex Rodriguez",
      role: "Lead Designer",
      description: "UX/UI expert focused on creating intuitive testing experiences",
      image: "/placeholder.svg?height=200&width=200",
      social: {
        twitter: "#",
        github: "#",
        linkedin: "#",
      },
    },
  ]

  return (
    <section id="team" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-emerald-500 text-emerald-400">
            Our Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team Behind WebLenses</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're a passionate team of developers and testers dedicated to making UI testing easier and more efficient
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-black/40 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden h-48 bg-gradient-to-br from-emerald-900/30 to-blue-900/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 rounded-full border-2 border-emerald-500 object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-emerald-400 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300 text-sm">{member.description}</p>
                    <div className="flex justify-center mt-4 space-x-4">
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href={member.social.github} className="text-gray-400 hover:text-emerald-400 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

