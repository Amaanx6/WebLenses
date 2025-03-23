"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  Github,
  Twitter,
  MessageSquare,
  Code,
  Layers,
  Eye,
  Brain,
  Users,
  X,
  Undo,
  Redo,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import HexagonalBackground from "../Landing/hexagonal-background";
import HeroSection from "../Landing/hero-section";
import DemoSection from "../Landing/demo-section";
import TeamSection from "../Landing/team-section";

export default function Landing() {
  const [extensionActive, setExtensionActive] = useState(true);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [currentCommitId, setCurrentCommitId] = useState(0);
  const [diffVisible, setDiffVisible] = useState(false);
  const [undoStack, setUndoStack] = useState<number[]>([]);
  const [redoStack, setRedoStack] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState("#121212");
  const [headerText, setHeaderText] = useState("Experience WebLenses in Action");
  const [subheaderText, setSubheaderText] = useState("Interactive demo of version-controlled UI testing");
  const [ctaVisible, setCtaVisible] = useState(true);
  const [featuresVisible, setFeaturesVisible] = useState(true);
  const [testimonialCards, setTestimonialCards] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "QA Lead",
      text: "WebLenses has transformed how our team tracks UI changes during testing.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Frontend Developer",
      text: "The ability to roll back to previous UI states has saved us countless hours of debugging.",
    },
  ]);
  const [glassEffect, setGlassEffect] = useState(50);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setParallaxOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const addCommit = (message: string, aiGenerated = false) => {
    const newCommit = {
      id: commits.length + 1,
      message,
      timestamp: formatTime(new Date()),
      author: aiGenerated ? "AI" : "User",
      aiGenerated,
    };
    setRedoStack([]);
    if (currentCommitId > 0) setUndoStack((prev) => [...prev, currentCommitId]);
    setCommits([...commits, newCommit]);
    setCurrentCommitId(newCommit.id);
    setDiffVisible(true);
    setTimeout(() => setDiffVisible(false), 3000);
  };

  function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevCommit = undoStack[undoStack.length - 1];
      setUndoStack((prev) => prev.slice(0, -1));
      setRedoStack((prev) => [...prev, currentCommitId]);
      setCurrentCommitId(prevCommit);
      addCommit(`Undid to commit #${prevCommit}`, true);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextCommit = redoStack[redoStack.length - 1];
      setRedoStack((prev) => prev.slice(0, -1));
      setUndoStack((prev) => [...prev, currentCommitId]);
      setCurrentCommitId(nextCommit);
      addCommit(`Redid to commit #${nextCommit}`, true);
    }
  };

  const handleBackgroundChange = (color: string) => {
    setBackgroundColor(color);
    addCommit(`Changed background color to ${color}`, false);
  };

  const handleHeaderTextChange = (text: string) => {
    setHeaderText(text);
    addCommit(`Updated header text to "${text}"`, false);
  };

  const handleSubheaderTextChange = (text: string) => {
    setSubheaderText(text);
    addCommit(`Updated subheader text to "${text}"`, false);
  };

  const toggleCtaVisibility = () => {
    setCtaVisible(!ctaVisible);
    addCommit(`${ctaVisible ? "Hidden" : "Shown"} CTA button`, false);
  };

  const toggleFeaturesVisibility = () => {
    setFeaturesVisible(!featuresVisible);
    addCommit(`${featuresVisible ? "Hidden" : "Shown"} features section`, false);
  };

  const addTestimonialCard = () => {
    const newId = testimonialCards.length > 0 ? Math.max(...testimonialCards.map((card) => card.id)) + 1 : 1;
    const newCard = {
      id: newId,
      name: `User ${newId}`,
      role: "New Testimonial",
      text: "This is a new testimonial added through WebLenses.",
    };
    setTestimonialCards([...testimonialCards, newCard]);
    addCommit(`Added new testimonial card`, false);
  };

  const removeTestimonialCard = () => {
    if (testimonialCards.length > 0) {
      const newCards = [...testimonialCards];
      newCards.pop();
      setTestimonialCards(newCards);
      addCommit(`Removed testimonial card`, false);
    }
  };

  const handleGlassEffectChange = (value: number) => {
    setGlassEffect(value);
    addCommit(`Adjusted glassmorphism effect to ${value}%`, false);
  };

  const handleAnimationSpeedChange = (value: number) => {
    setAnimationSpeed(value);
    addCommit(`Changed animation speed to ${value}%`, false);
  };

  const resetAllChanges = () => {
    setBackgroundColor("#121212");
    setHeaderText("Experience WebLenses in Action");
    setSubheaderText("Interactive demo of version-controlled UI testing");
    setCtaVisible(true);
    setFeaturesVisible(true);
    setTestimonialCards([
      {
        id: 1,
        name: "Sarah Johnson",
        role: "QA Lead",
        text: "WebLenses has transformed how our team tracks UI changes during testing.",
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Frontend Developer",
        text: "The ability to roll back to previous UI states has saved us countless hours of debugging.",
      },
    ]);
    setGlassEffect(50);
    setAnimationSpeed(50);
    addCommit("Reset all UI changes", false);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getAnimationDuration = () => (1 - (animationSpeed / 100) * 0.8).toFixed(1);
  const getBackdropBlur = () => `blur(${Math.floor(glassEffect / 5)}px`;

  const featureCards = [
    {
      icon: <Code className="h-6 w-6 text-emerald-400" />,
      title: "Zero Installation ",
      shortDescription: "Works as a Chrome extension—no setup or coding required.",
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 text-sm">
            <li>Start tracking UI changes instantly on any website.</li>
            <li>Lightweight, hassle-free, and seamlessly integrates into your workflow.</li>
            <li>No setup or coding required—just install and go.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Layers className="h-6 w-6 text-emerald-400" />,
      title: "Version Control for UI ",
      shortDescription: "Automatically track UI changes like commits in Git.",
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 text-sm">
            <li>Roll back to any previous state with a single click.</li>
            <li>Maintain a complete history of UI modifications for debugging and testing.</li>
            <li>Track changes automatically, Git-style.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-400" />,
      title: "Team Collaboration ",
      shortDescription: "Share test histories and commit logs effortlessly.",
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 text-sm">
            <li>Keep everyone aligned on UI changes in real time.</li>
            <li>Improve debugging and prevent miscommunication between teams.</li>
            <li>Share effortlessly with your team.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Code className="h-6 w-6 text-emerald-400" />,
      title: "DOM Diff Analysis ",
      shortDescription: "Detect and highlight changes in the DOM structure between commits.",
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 text-sm">
            <li>Identify added, removed, or modified elements instantly.</li>
            <li>Ensure UI consistency and prevent unintended modifications.</li>
            <li>Highlight DOM changes with precision.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Eye className="h-6 w-6 text-emerald-400" />,
      title: "Visual Regression Testing ",
      shortDescription: "Compare screenshots between commits to spot UI shifts.",
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 text-sm">
            <li>Highlight unintended design changes automatically.</li>
            <li>Maintain pixel-perfect consistency across updates and devices.</li>
            <li>Compare screenshots effortlessly.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Brain className="h-6 w-6 text-emerald-400" />,
      title: "AI-Powered Insights",
      shortDescription: "Coming soon: Detect unexpected UI changes using machine learning.",
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 text-sm">
            <li>Get smart alerts for potential design inconsistencies.</li>
            <li>Automate visual testing and anomaly detection with AI.</li>
            <li>Detect unexpected changes intelligently.</li>
          </ul>
        </div>
      ),
      isFuture: true,
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setCarouselIndex((prev) => (prev >= featureCards.length - 3 ? 0 : prev + 3));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCarouselIndex((prev) => (prev === 0 ? featureCards.length - 3 : prev - 3));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor }}
    >
      <HexagonalBackground scrollEffect={true} parallaxOffset={parallaxOffset} />

      <AnimatePresence>
        {diffVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm"
          >
            New Commit Added
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-50 flex gap-2"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={handleUndo}
          disabled={undoStack.length === 0}
          className="bg-black/50 backdrop-blur-md border-gray-800 hover:bg-gray-900/50"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRedo}
          disabled={redoStack.length === 0}
          className="bg-black/50 backdrop-blur-md border-gray-800 hover:bg-gray-900/50"
        >
          <Redo className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-black/50 backdrop-blur-md border-gray-800 hover:bg-gray-900/50"
        >
          <Layers className="h-4 w-4" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-80 bg-black/80 backdrop-blur-xl border-l border-gray-800 z-50 p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">UI Controls</h3>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm">Background Color</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => handleBackgroundChange(e.target.value)}
                  className="w-full h-10"
                />
              </div>
              <div>
                <label className="text-sm">Header Text</label>
                <input
                  type="text"
                  value={headerText}
                  onChange={(e) => handleHeaderTextChange(e.target.value)}
                  className="w-full p-2 bg-gray-900 border border-gray-800 rounded"
                />
              </div>
              <div>
                <label className="text-sm">Subheader Text</label>
                <input
                  type="text"
                  value={subheaderText}
                  onChange={(e) => handleSubheaderTextChange(e.target.value)}
                  className="w-full p-2 bg-gray-900 border border-gray-800 rounded"
                />
              </div>
              <Button onClick={toggleCtaVisibility}>{ctaVisible ? "Hide" : "Show"} CTA</Button>
              <Button onClick={toggleFeaturesVisibility}>{featuresVisible ? "Hide" : "Show"} Features</Button>
              <Button onClick={addTestimonialCard}>Add Testimonial</Button>
              <Button onClick={removeTestimonialCard} disabled={testimonialCards.length === 0}>
                Remove Testimonial
              </Button>
              <div>
                <label className="text-sm">Glass Effect ({glassEffect}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={glassEffect}
                  onChange={(e) => handleGlassEffectChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm">Animation Speed ({animationSpeed}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={animationSpeed}
                  onChange={(e) => handleAnimationSpeedChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <Button onClick={resetAllChanges}>Reset All</Button>
              <p className="text-xs text-gray-400">Extension: {extensionActive ? "Active" : "Inactive"}</p>
              <Button onClick={() => setExtensionActive(!extensionActive)}>
                Toggle Extension {extensionActive ? "Off" : "On"}
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <header className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-emerald-400" />
              <span className="font-bold text-xl">WebLenses</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
              <a href="#demo" className="hover:text-emerald-400 transition-colors">Demo</a>
              <a href="#team" className="hover:text-emerald-400 transition-colors">Team</a>
            </nav>
          </div>
        </header>

        <HeroSection />

        {featuresVisible && (
          <section id="features" className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-900/30">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 px-4 py-1 border-emerald-500 text-emerald-400">Features</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Choose <span className="text-emerald-500">WebLenses?</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Everything you need to track, analyze, and manage UI changes during testing
                </p>
              </div>
              <div className="relative max-w-7xl mx-auto">
                <div className="flex items-center justify-center gap-6 overflow-hidden">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    disabled={featureCards.length <= 3}
                    className="absolute left-0 z-10 bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={carouselIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="flex items-center justify-center gap-6"
                    >
                      {[0, 1, 2].map((offset) => {
                        const index = (carouselIndex + offset) % featureCards.length;
                        const card = featureCards[index];
                        return (
                          <FeatureCard
                            key={card.title}
                            className={`w-64 ${
                              offset === 1
                                ? "transform scale-105 z-20 shadow-xl"
                                : "transform scale-95 opacity-80 z-10"
                            }`}
                            {...card}
                          />
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    disabled={featureCards.length <= 3}
                    className="absolute right-0 z-10 bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: Math.ceil(featureCards.length / 3) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIndex(i * 3)}
                      className={`w-3 h-3 rounded-full ${
                        carouselIndex === i * 3 ? "bg-emerald-500" : "bg-gray-700"
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <DemoSection
          headerText={headerText}
          subheaderText={subheaderText}
          ctaVisible={ctaVisible}
          testimonialCards={testimonialCards}
          glassEffect={getBackdropBlur()}
          animationDuration={getAnimationDuration()}
        />
        <TeamSection />

        <footer className="py-12 px-4 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="h-5 w-5 text-emerald-400" />
                  <span className="font-bold text-xl">WebLenses</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Version control for UI testing. Track, analyze, and manage UI changes with ease.
                </p>
                <div className="flex gap-4 pt-2">
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors"><Github className="h-5 w-5" /></a>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors"><Twitter className="h-5 w-5" /></a>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors"><MessageSquare className="h-5 w-5" /></a>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Home</a></li>
                  <li><a href="#features" className="text-gray-400 hover:text-emerald-400 transition-colors">Features</a></li>
                  <li><a href="#pricing" className="text-gray-400 hover:text-emerald-400 transition-colors">Pricing</a></li>
                  <li><a href="#demo" className="text-gray-400 hover:text-emerald-400 transition-colors">Demo</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">GitHub Repo</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Changelog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} WebLenses. All rights reserved.
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, shortDescription, description, isFuture = false, className }: {
  icon: React.ReactNode
  title: string
  shortDescription: string
  description: React.ReactNode
  isFuture?: boolean
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`group bg-black/40 backdrop-blur-xl border border-gray-800 overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:border-emerald-900/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="relative p-4">
        <div className="flex justify-between items-start">
          <motion.div whileHover={{ rotate: [0, -10, 10, -5, 0] }} transition={{ duration: 0.5 }}>{icon}</motion.div>
          {isFuture && (
            <Badge variant="outline" className="bg-emerald-950/30 text-emerald-400 border-emerald-800">Coming Soon</Badge>
          )}
        </div>
        <CardTitle className="mt-2 text-lg group-hover:text-emerald-400 transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              key="shortDescription"
              initial={{ opacity: 1, height: "auto" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gray-400"
            >
              {shortDescription}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          key="fullDescription"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 overflow-hidden"
        >
          {description}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </CardContent>
    </Card>
  );
}

interface Commit {
  id: number
  message: string
  timestamp: string
  author: string
  aiGenerated: boolean
}