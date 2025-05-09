"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Gradient animation variables
    let gradientAngle = 0;
    const gradientSpeed = 0.001; // Reduced speed for slower animation
    const colors = [
      { r: 5, g: 5, b: 15 }, // Darker colors
      { r: 10, g: 10, b: 30 },
      { r: 20, g: 5, b: 35 },
      { r: 3, g: 3, b: 15 },
    ];

    // Animation function
    const animate = () => {
      // Update gradient angle
      gradientAngle += gradientSpeed;
      if (gradientAngle >= 2 * Math.PI) {
        gradientAngle = 0;
      }

      // Calculate gradient positions
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.max(canvas.width, canvas.height);

      const x1 = centerX + Math.cos(gradientAngle) * radius;
      const y1 = centerY + Math.sin(gradientAngle) * radius;
      const x2 = centerX + Math.cos(gradientAngle + Math.PI) * radius;
      const y2 = centerY + Math.sin(gradientAngle + Math.PI) * radius;

      // Create gradient
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(
        0,
        `rgb(${colors[0].r}, ${colors[0].g}, ${colors[0].b})`
      );
      gradient.addColorStop(
        0.33,
        `rgb(${colors[1].r}, ${colors[1].g}, ${colors[1].b})`
      );
      gradient.addColorStop(
        0.66,
        `rgb(${colors[2].r}, ${colors[2].g}, ${colors[2].b})`
      );
      gradient.addColorStop(
        1,
        `rgb(${colors[3].r}, ${colors[3].g}, ${colors[3].b})`
      );

      // Fill background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle noise/stars effect - reduced number and slower appearance
      for (let i = 0; i < 50; i++) {
        // Reduced from 100 to 50 stars
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.2;
        const opacity = Math.random() * 0.4; // Reduced opacity

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full object-cover"
    />
  );
}
