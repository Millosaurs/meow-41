import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type HeroSectionProps = {
  name?: string;
  role?: string;
  skills?: string[];
};

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "John Doe",
  role = "Full Stack Developer",
  skills = ["TypeScript", "React", "Node.js", "Python", "AWS"],
}) => {
  const { theme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = `${name} | ${role}`;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <div className="min-h-[600px] w-full bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Terminal-style header */}
      <div className="w-full max-w-4xl bg-background border border-primary rounded-lg overflow-hidden shadow-md">
        <div className="h-8 bg-background border-b border-primary flex items-center px-4">
          <Terminal className="w-4 h-4 text-primary mr-2" />
          <span className="text-primary font-mono text-sm">portfolio.exe</span>
        </div>

        {/* Main content */}
        <div className="p-8">
          <div className="font-mono text-4xl md:text-6xl text-primary mb-6">
            {displayText}
            <span className="animate-pulse">_</span>
          </div>

          {isTypingComplete && (
            <div className="space-y-6 animate-fadeIn">
              <p className="font-mono text-primary/80 text-lg md:text-xl max-w-2xl">
                Welcome to my digital workspace. I craft elegant solutions to
                complex problems.
              </p>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-primary text-primary font-mono"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
    </div>
  );
};

export default HeroSection;
