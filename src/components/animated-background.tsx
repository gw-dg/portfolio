"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create dots
    const dots: {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      direction: number;
    }[] = [];

    const createDots = () => {
      const dotCount = Math.floor((canvas.width * canvas.height) / 15000); // Adjust density

      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.8 + 0.7, // Smaller dots between 0.2 and 1.0
          opacity: Math.random() * 0.35 + 0.05, // Varying opacity
          speed: Math.random() * 0.3 + 0.1, // Movement speed
          direction: Math.random() * Math.PI * 2, // Random direction
        });
      }
    };

    createDots();

    // Animation function
    const animate = () => {
      const isDarkTheme = document.documentElement.classList.contains("dark");

      // Set background based on theme
      if (isDarkTheme) {
        // AMOLED black background for dark theme
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle gradient overlay for dark theme
        const darkGradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width * 0.8
        );

        darkGradient.addColorStop(0, "rgba(10, 10, 20, 0.3)");
        darkGradient.addColorStop(0.5, "rgba(5, 5, 15, 0.1)");
        darkGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = darkGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // White background for light theme
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle gradient overlay for light theme
        const lightGradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width * 0.8
        );

        lightGradient.addColorStop(0, "rgba(240, 240, 250, 0.3)");
        lightGradient.addColorStop(0.5, "rgba(230, 230, 245, 0.1)");
        lightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = lightGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Animate dots
      dots.forEach((dot) => {
        // Update position with slight movement
        dot.x += Math.cos(dot.direction) * dot.speed;
        dot.y += Math.sin(dot.direction) * dot.speed;

        // Change direction occasionally
        if (Math.random() < 0.01) {
          dot.direction += (Math.random() - 0.5) * 0.5;
        }

        // Slightly adjust opacity for twinkling effect
        dot.opacity += (Math.random() - 0.5) * 0.01;
        dot.opacity = Math.max(0.05, Math.min(0.4, dot.opacity));

        // Wrap around screen edges
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        // Draw dot with color based on theme
        if (isDarkTheme) {
          // White dots for dark theme
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        } else {
          // Darker dots for light theme (increased contrast)
          ctx.fillStyle = `rgba(0, 0, 40, ${dot.opacity * 1.5})`;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full object-cover"
    />
  );
}
