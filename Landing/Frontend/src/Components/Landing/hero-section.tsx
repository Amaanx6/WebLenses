"use client";

import { motion } from "framer-motion";
import { Play, GitPullRequestArrow } from "lucide-react";
import { Button } from "../ui/button";
import { Badge,  } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const HeroSection = memo(() => {
  const navigate = useNavigate();

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
            <Badge variant="outline" className="px-4 py-1 border-emerald-500 text-emerald-400">
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
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
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
              className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 relative"
              onClick={() => navigate("/diff")}
            >
              <span className="relative z-10">DiffArchive</span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                <span className="absolute -inset-[3px] bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 hover:opacity-30 blur-md transition-opacity duration-300"></span>
              </span>
            </Button>
            <Button size="lg" variant="outline" className="group relative overflow-hidden">
              <GitPullRequestArrow className="h-4 w-4 mr-2" />
              <span onClick={() => navigate("/diff")} className="relative z-10">Snap Map</span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;