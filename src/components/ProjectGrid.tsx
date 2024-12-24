import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";

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

type ProjectGridProps = {
  projects?: Project[];
};

const ProjectGrid = ({
  projects = [
    {
      title: "Portfolio Website",
      description:
        "A modern portfolio website built with React and TypeScript featuring a terminal-inspired design.",
      technologies: ["React", "TypeScript", "Tailwind"],
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management.",
      technologies: ["Next.js", "Node.js", "MongoDB"],
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Weather Dashboard",
      description:
        "Real-time weather tracking application with interactive maps.",
      technologies: ["React", "Redux", "OpenWeather API"],
      imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
  ],
}: ProjectGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!projects.length) return;

      const cols =
        window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
      const currentIndex = selectedIndex === -1 ? 0 : selectedIndex;

      switch (e.key) {
        case "ArrowRight":
          setSelectedIndex((prev) =>
            prev === projects.length - 1 ? 0 : prev + 1,
          );
          break;
        case "ArrowLeft":
          setSelectedIndex((prev) =>
            prev <= 0 ? projects.length - 1 : prev - 1,
          );
          break;
        case "ArrowUp":
          setSelectedIndex((prev) => {
            const newIndex = prev - cols;
            return newIndex < 0 ? prev : newIndex;
          });
          break;
        case "ArrowDown":
          setSelectedIndex((prev) => {
            const newIndex = prev + cols;
            return newIndex >= projects.length ? prev : newIndex;
          });
          break;
        case "Enter":
          if (selectedIndex !== -1) {
            window.open(projects[selectedIndex].liveUrl, "_blank");
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects, selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== -1 && gridRef.current) {
      const selectedCard = gridRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedCard) {
        selectedCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <div
      className="w-full bg-background p-8"
      onMouseLeave={() => setSelectedIndex(-1)}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] gap-6"
        >
          {projects.map((project, index) => {
            // Determine if this project should span multiple columns/rows
            const isLarge = index === 0 || index === 3;
            const spanClasses = isLarge
              ? "md:col-span-2 md:row-span-2"
              : "col-span-1 row-span-1";

            return (
              <div
                key={index}
                className={`${spanClasses} relative overflow-hidden`}
              >
                <ProjectCard
                  {...project}
                  isSelected={index === selectedIndex}
                  onMouseEnter={() => setSelectedIndex(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
