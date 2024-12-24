import React from "react";
import { smoothScrollTo } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import CommandBar from "./CommandBar";
import HeroSection from "./HeroSection";
import ProjectGrid from "./ProjectGrid";
import SkillsSection from "./SkillsSection";
import TimelineSection from "./TimelineSection";
import BackgroundAnimation from "./BackgroundAnimation";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  startDate?: string;
  teamSize?: number;
  role?: string;
  features?: string[];
  challenges?: string[];
  impact?: string;
};

const defaultProjects: Project[] = [
  {
    title: "AI Code Assistant",
    description:
      "An intelligent code completion and refactoring tool powered by machine learning.",
    technologies: ["Python", "TensorFlow", "FastAPI", "React"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    startDate: "Dec 2023",
    teamSize: 3,
    role: "ML Engineer & Frontend Developer",
    features: [
      "Real-time code suggestions",
      "Automated code refactoring",
      "Multi-language support",
      "IDE integration plugins",
    ],
    challenges: [
      "Training models on diverse codebases",
      "Minimizing suggestion latency",
      "Handling complex code contexts",
    ],
    impact: "Improved developer productivity by 35% in beta testing",
  },
  {
    title: "Blockchain Explorer",
    description:
      "A comprehensive blockchain visualization and analysis platform.",
    technologies: ["Web3.js", "D3.js", "Node.js", "PostgreSQL"],
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    startDate: "Aug 2023",
    teamSize: 2,
    role: "Full Stack Developer",
    features: [
      "Real-time transaction tracking",
      "Interactive network graphs",
      "Smart contract analysis",
      "Wallet integration",
    ],
    challenges: [
      "Handling large-scale blockchain data",
      "Optimizing graph visualizations",
      "Ensuring cross-chain compatibility",
    ],
    impact: "Processing 1M+ daily transactions with sub-second latency",
  },
  {
    title: "DevOps Dashboard",
    description:
      "Unified platform for monitoring and managing cloud infrastructure.",
    technologies: ["Vue.js", "Go", "Docker", "Prometheus"],
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    startDate: "Jun 2023",
    teamSize: 5,
    role: "DevOps Engineer",
    features: [
      "Real-time metrics visualization",
      "Automated deployment pipelines",
      "Incident management",
      "Cost optimization tools",
    ],
    challenges: [
      "Aggregating data from multiple cloud providers",
      "Building scalable alerting system",
      "Implementing zero-downtime deployments",
    ],
    impact: "Reduced deployment time by 60% and infrastructure costs by 25%",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website built with React and TypeScript featuring a terminal-inspired design.",
    technologies: ["React", "TypeScript", "Tailwind"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    startDate: "Jan 2024",
    teamSize: 1,
    role: "Full Stack Developer",
    features: [
      "Terminal-inspired command interface",
      "Dark/Light theme switching",
      "Responsive design with Tailwind CSS",
      "Interactive project showcase",
    ],
    challenges: [
      "Implementing smooth theme transitions",
      "Creating a responsive timeline layout",
      "Optimizing performance with lazy loading",
    ],
    impact:
      "Increased portfolio engagement by 40% and improved accessibility scores to 98/100",
  },
  {
    title: "Real-time Chat App",
    description:
      "Feature-rich chat application with end-to-end encryption and real-time translation.",
    technologies: ["Next.js", "Socket.io", "Redis", "WebRTC"],
    imageUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    startDate: "Nov 2023",
    teamSize: 3,
    role: "Lead Developer",
    features: [
      "End-to-end encryption",
      "Real-time translation",
      "Voice and video calls",
      "File sharing with preview",
    ],
    challenges: [
      "Implementing secure E2E encryption",
      "Optimizing WebRTC connections",
      "Handling offline message sync",
    ],
    impact: "Achieved 99.9% uptime with 100k+ daily active users",
  },
  {
    title: "ML Image Editor",
    description:
      "AI-powered image editing tool with advanced filters and automatic enhancements.",
    technologies: ["PyTorch", "OpenCV", "FastAPI", "React"],
    imageUrl: "https://images.unsplash.com/photo-1533228100845-08145b01de14",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    startDate: "Jul 2023",
    teamSize: 4,
    role: "ML Engineer",
    features: [
      "AI-powered photo enhancement",
      "Style transfer filters",
      "Object removal",
      "Background replacement",
    ],
    challenges: [
      "Training efficient ML models",
      "Reducing processing latency",
      "Implementing real-time preview",
    ],
    impact: "Processing 50k+ images daily with 95% user satisfaction",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = React.useState({
    name: "John Doe",
    role: "Full Stack Developer",
    email: "contact@example.com",
    skills: ["TypeScript", "React", "Node.js", "Python", "AWS"],
    projects: defaultProjects,
  });

  const handleCommand = (command: string) => {
    switch (command) {
      case "dashboard":
        navigate("/dashboard");
        break;
      default:
        const section = document.getElementById(command);
        if (section) {
          smoothScrollTo(section);
        }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <BackgroundAnimation />

      <CommandBar onCommand={handleCommand} />

      <main className="pt-[60px]">
        <section id="about">
          <HeroSection
            name={portfolioData.name}
            role={portfolioData.role}
            skills={portfolioData.skills}
          />
        </section>

        <SkillsSection />

        <TimelineSection />

        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-mono mb-12 text-center">
              <span className="text-primary">{'">"'}</span> Projects
            </h2>
            <ProjectGrid projects={portfolioData.projects} />
          </div>
        </section>

        <section id="contact" className="py-20 border-t border-primary/20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-mono mb-8">
              <span className="text-primary">{'">"'}</span> Contact
            </h2>
            <p className="font-mono text-primary mb-8">
              Let's collaborate on something amazing
            </p>
            <a
              href={`mailto:${portfolioData.email}`}
              className="inline-block border border-primary px-6 py-3 font-mono hover:bg-primary/10 transition-colors"
            >
              {portfolioData.email}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
