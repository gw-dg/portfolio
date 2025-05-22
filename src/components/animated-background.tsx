"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

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

    // Function to get CSS custom property values
    const getCSSVariableValue = (variable: string): string => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
    };

    // Function to convert HSL string to RGB values
    const hslToRgb = (
      hslString: string
    ): { r: number; g: number; b: number } => {
      // Parse HSL string like "222 84% 4.9%"
      const parts = hslString.split(" ");
      const h = parseInt(parts[0]) / 360;
      const s = parseInt(parts[1]) / 100;
      const l = parseInt(parts[2]) / 100;

      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
      };
    };

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
      const dotCount = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.8 + 0.7,
          opacity: Math.random() * 0.35 + 0.05,
          speed: Math.random() * 0.3 + 0.1,
          direction: Math.random() * Math.PI * 2,
        });
      }
    };

    createDots();

    // Animation function
    const animate = () => {
      const isDarkTheme = resolvedTheme === "dark";

      // Get background color from CSS custom properties
      const backgroundHsl = getCSSVariableValue("--background");
      const foregroundHsl = getCSSVariableValue("--foreground");
      const mutedHsl = getCSSVariableValue("--muted");
      const accentHsl = getCSSVariableValue("--accent");

      // Convert to RGB for canvas operations
      const backgroundRgb = hslToRgb(backgroundHsl);
      const foregroundRgb = hslToRgb(foregroundHsl);
      const mutedRgb = hslToRgb(mutedHsl);
      const accentRgb = hslToRgb(accentHsl);

      // Set background using theme tokens
      ctx.fillStyle = `rgb(${backgroundRgb.r}, ${backgroundRgb.g}, ${backgroundRgb.b})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create gradient overlay using theme colors
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      );

      if (isDarkTheme) {
        // Dark theme gradient using muted and accent colors
        gradient.addColorStop(
          0,
          `rgba(${mutedRgb.r}, ${mutedRgb.g}, ${mutedRgb.b}, 0.3)`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.1)`
        );
        gradient.addColorStop(
          1,
          `rgba(${backgroundRgb.r}, ${backgroundRgb.g}, ${backgroundRgb.b}, 0)`
        );
      } else {
        // Light theme gradient using accent and muted colors
        gradient.addColorStop(
          0,
          `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.2)`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${mutedRgb.r}, ${mutedRgb.g}, ${mutedRgb.b}, 0.1)`
        );
        gradient.addColorStop(
          1,
          `rgba(${backgroundRgb.r}, ${backgroundRgb.g}, ${backgroundRgb.b}, 0)`
        );
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

        // Draw dot using foreground color with opacity
        ctx.fillStyle = `rgba(${foregroundRgb.r}, ${foregroundRgb.g}, ${foregroundRgb.b}, ${dot.opacity})`;
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
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full object-cover"
      style={{
        backgroundColor: `hsl(var(--background))`,
      }}
    />
  );
}
