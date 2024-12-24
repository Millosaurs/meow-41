import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, ExternalLink, Github, Maximize2 } from "lucide-react";
import ProjectDialog from "./ProjectDialog.jsx";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  startDate?: string;
  teamSize?: number;
  features?: string[];
  impact?: string;
  role?: string;
  challenges?: string[];
};

type ProjectCardProps = Project & {
  isSelected?: boolean;
  onMouseEnter?: () => void;
};

const LoadingAnimation = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 font-mono text-primary">
      <div className="animate-pulse">
        <Terminal className="w-8 h-8" />
      </div>
      <div className="flex items-center space-x-2">
        <span>Loading{dots}</span>
      </div>
      <div className="text-xs opacity-75">
        <span className="font-mono">[</span>
        <span className="animate-pulse">||||||||||</span>
        <span className="font-mono">]</span>
      </div>
    </div>
  );
};

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project showcasing its key features and technologies used.",
  technologies = ["React", "TypeScript", "Tailwind"],
  imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  githubUrl = "https://github.com",
  liveUrl = "https://example.com",
  startDate,
  teamSize,
  features,
  impact,
  role,
  challenges,
  isSelected = false,
  onMouseEnter,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return (
    <>
      <Card
        className={`relative w-full h-full bg-background border overflow-hidden group cursor-pointer transition-all duration-300 ${isSelected ? "border-primary shadow-[0_0_15px_rgba(0,255,0,0.3)]" : "border-primary"}`}
        onMouseEnter={() => {
          setIsHovered(true);
          onMouseEnter?.();
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 left-0 w-full h-8 bg-background border-b border-primary flex items-center px-4">
          <Terminal className="w-4 h-4 text-primary mr-2" />
          <div className="text-primary font-mono text-sm">{title}</div>
        </div>

        <div className="w-full h-full">
          {!imageLoaded && !imageError ? (
            <div className="w-full h-full bg-background">
              <LoadingAnimation />
            </div>
          ) : imageError ? (
            <div className="w-full h-full bg-background flex items-center justify-center font-mono text-primary">
              <span className="text-sm">Error loading image</span>
            </div>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          )}
        </div>

        <div
          className={`absolute inset-0 mt-8 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ${isHovered || isSelected ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="p-6 font-mono">
            <p className="text-foreground mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-primary text-primary"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDialog(true)}
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <Maximize2 className="w-5 h-5 mr-2" />
                Details
              </button>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                Code
              </a>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Demo
              </a>
            </div>
          </div>
        </div>
      </Card>

      <ProjectDialog
        project={{
          title,
          description,
          technologies,
          imageUrl,
          githubUrl,
          liveUrl,
          startDate,
          teamSize,
          features,
          impact,
          role,
          challenges,
        }}
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
};

export default ProjectCard;
