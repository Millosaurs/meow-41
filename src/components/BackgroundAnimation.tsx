import React, { useEffect, useRef, useMemo } from "react";
import { useTheme } from "./ThemeProvider";

type BackgroundAnimationProps = {
  speed?: number;
  density?: number;
};

const BackgroundAnimation = ({
  speed = 50,
  density = 25,
}: BackgroundAnimationProps) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);

  // Pre-generate characters array
  const characters = useMemo(
    () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()".split(""),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false, // Optimize by disabling alpha channel
    });
    if (!ctx) return;

    // Performance optimization: Use off-screen canvas for character rendering
    const charCanvas = document.createElement("canvas");
    const charCtx = charCanvas.getContext("2d");
    if (!charCtx) return;

    const fontSize = 14;
    charCanvas.width = fontSize;
    charCanvas.height = fontSize;
    charCtx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    charCtx.fillStyle = theme === "dark" ? "#f2f0e3" : "#202020";
    charCtx.textBaseline = "top";

    // Pre-render characters
    const charImages = new Map();
    characters.forEach((char) => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = fontSize;
      tempCanvas.height = fontSize;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      tempCtx.fillStyle = theme === "dark" ? "#f2f0e3" : "#202020";
      tempCtx.textBaseline = "top";
      tempCtx.fillText(char, 0, 0);
      charImages.set(char, tempCanvas);
    });

    // Set canvas size with device pixel ratio consideration
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Reset drops array
      const columns = Math.floor(width / fontSize);
      dropsRef.current = Array(columns).fill(1);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Optimized draw function
    const draw = (timestamp: number) => {
      // Control frame rate
      const elapsed = timestamp - lastTimeRef.current;
      if (elapsed < 1000 / 30) {
        // Limit to ~30 FPS
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTimeRef.current = timestamp;

      // Clear with opacity for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw matrix effect
      ctx.fillStyle = theme === "dark" ? "#f2f0e3" : "#202020";
      dropsRef.current.forEach((drop, i) => {
        if (Math.random() < 0.975) {
          // Reduce update frequency
          const char =
            characters[Math.floor(Math.random() * characters.length)];
          const charImg = charImages.get(char);
          if (charImg) {
            ctx.drawImage(charImg, i * fontSize, drop * fontSize);
          }
        }

        if (drop * fontSize > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        } else {
          dropsRef.current[i]++;
        }
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme, characters]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-background -z-10">
      <canvas
        ref={canvasRef}
        className="opacity-20 dark:opacity-30"
        style={{
          filter: "blur(0.5px)", // Reduced blur for better performance
          willChange: "transform", // Optimize composite layers
        }}
      />
    </div>
  );
};

export default React.memo(BackgroundAnimation);
