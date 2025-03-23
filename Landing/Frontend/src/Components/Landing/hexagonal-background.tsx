"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { debounce } from "lodash";

interface HexagonalBackgroundProps {
  scrollEffect?: boolean;
  parallaxOffset?: { x: number; y: number };
}

const HexagonalBackground = memo(({
  scrollEffect = false,
  parallaxOffset = { x: 0, y: 0 },
}: HexagonalBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position if scrollEffect is enabled
  useEffect(() => {
    if (!scrollEffect) return;

    const handleScroll = debounce(() => {
      setScrollY(window.scrollY);
    }, 50); // Debounce scroll events for performance

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollEffect]);

  // Draw hexagons on the canvas
  const drawHexagons = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number, scrollOffset: number, parallaxX: number, parallaxY: number) => {
    const hexSize = 30;
    const hexSpacing = 60;
    const hexRows = Math.ceil(canvas.height / (hexSpacing * 0.75)) + 1;
    const hexCols = Math.ceil(canvas.width / hexSpacing) + 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < hexRows; row++) {
      for (let col = 0; col < hexCols; col++) {
        const isOffset = row % 2 === 1;

        // Apply parallax and scroll effects to position
        const x = col * hexSpacing + (isOffset ? hexSpacing / 2 : 0) + parallaxX;
        const y = row * (hexSpacing * 0.75) + (scrollEffect ? Math.sin(col * 0.1 + scrollOffset) * 5 : 0) + parallaxY;

        // Calculate opacity based on sine wave for pulsing effect
        const distanceFromCenter = Math.sqrt(
          Math.pow((x - canvas.width / 2) / canvas.width, 2) + Math.pow((y - canvas.height / 2) / canvas.height, 2),
        );

        const opacity =
          0.1 +
          0.2 * Math.sin(time + distanceFromCenter * 5) +
          0.1 * Math.sin(time * 0.5 - distanceFromCenter * 3) +
          (scrollEffect ? 0.05 * Math.sin(scrollOffset * 2 + col * 0.2) : 0);

        // Only draw if opacity is positive (performance optimization)
        if (opacity > 0) {
          drawHexagon(
            ctx,
            x,
            y,
            hexSize *
              (0.8 +
                0.2 * Math.sin(time + distanceFromCenter * 2) +
                (scrollEffect ? 0.05 * Math.sin(scrollOffset + row * 0.1) : 0)),
            opacity,
          );
        }
      }
    }
  }, [scrollEffect]);

  // Draw a single hexagon
  const drawHexagon = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const hx = x + size * Math.cos(angle);
      const hy = y + size * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(hx, hy);
      } else {
        ctx.lineTo(hx, hy);
      }
    }
    ctx.closePath();

    // Glow effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 1.5);
    gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity * 0.2})`);
    gradient.addColorStop(1, "rgba(16, 185, 129, 0)");

    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.5})`;
    ctx.lineWidth = 1;

    // Add glow
    ctx.shadowColor = "rgba(16, 185, 129, 0.5)";
    ctx.shadowBlur = 10 * opacity;

    ctx.stroke();
    ctx.shadowBlur = 0;

    // Fill with gradient for subtle glow
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      const scrollOffset = scrollEffect ? scrollY * 0.0005 : 0;
      const parallaxX = parallaxOffset.x * 0.1;
      const parallaxY = parallaxOffset.y * 0.1;

      drawHexagons(ctx, canvas, time, scrollOffset, parallaxX, parallaxY);
      time += 0.005;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrame);
    };
  }, [scrollY, scrollEffect, parallaxOffset, drawHexagons]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-70" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-0" />

      {/* Animated glow spots with parallax effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          x: parallaxOffset.x * -0.5,
          y: parallaxOffset.y * -0.5 + (scrollEffect ? scrollY * -0.05 : 0),
        }}
        transition={{
          opacity: {
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          },
          x: { duration: 0.1 },
          y: { duration: 0.1 },
        }}
        className="fixed top-1/4 left-1/4 w-[30vw] h-[30vh] bg-emerald-500/10 blur-[100px] rounded-full z-0"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          x: parallaxOffset.x * -0.3,
          y: parallaxOffset.y * -0.3 + (scrollEffect ? scrollY * -0.03 : 0),
        }}
        transition={{
          opacity: {
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          },
          x: { duration: 0.1 },
          y: { duration: 0.1 },
        }}
        className="fixed bottom-1/4 right-1/4 w-[25vw] h-[25vh] bg-blue-500/10 blur-[100px] rounded-full z-0"
      />
    </>
  );
});

export default HexagonalBackground;