import React, { useRef, useEffect } from "react";
import { useZero } from "../../context/ZeroContext";

export const ZeroParticleField = () => {
  const canvasRef = useRef(null);
  const { theme, particleDensity, reducedMotion } = useZero();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Number of particles based on density slider
    const count = Math.floor((particleDensity / 100) * 65);
    const particles = [];

    // Parse primary and secondary colors for particle tints
    const pColor = theme.accentPrimary || "#00f2fe";
    const sColor = theme.accentSecondary || "#9d4edd";
    const gColor = theme.accentTertiary || "#ffd166";

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.1, // gently rising
        alpha: Math.random() * 0.7 + 0.2,
        color: i % 3 === 0 ? pColor : i % 3 === 1 ? sColor : gColor,
        isPetal: i % 7 === 0 // occasional floral drifting petal
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Slight gentle gravitational drift towards mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 0.3;
          p.y += (dy / dist) * 0.3;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        if (p.isPetal) {
          // Soft petal shape
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.radius * 2.2, p.radius * 1.2, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Starlight mote
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme, particleDensity, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 opacity-70"
      aria-hidden="true"
    />
  );
};
