import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Star,
} from "lucide-react";

const ProjectDialog = ({ project, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-background border border-primary">
        <DialogHeader>
          <div className="h-8 bg-background border-b border-primary flex items-center px-4 -mx-6 -mt-6">
            <Terminal className="w-4 h-4 text-primary mr-2" />
            <DialogTitle className="text-primary font-mono text-sm">
              {project.title}.exe
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-video relative overflow-hidden rounded-md border border-primary">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-primary text-primary font-mono"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                Code
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </a>
            </div>
          </div>

          <div className="space-y-6 font-mono">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Overview
              </h3>
              <p className="text-foreground">{project.description}</p>
            </div>

            {project.role && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Role
                </h3>
                <p className="text-foreground">{project.role}</p>
              </div>
            )}

            {project.features && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Key Features
                </h3>
                <ul className="list-disc pl-4 text-foreground">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.challenges && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Challenges & Solutions
                </h3>
                <ul className="list-disc pl-4 text-foreground">
                  {project.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-6">
              {project.startDate && (
                <div className="flex items-center text-foreground">
                  <Calendar className="w-4 h-4 text-primary mr-2" />
                  {project.startDate}
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center text-foreground">
                  <Users className="w-4 h-4 text-primary mr-2" />
                  Team of {project.teamSize}
                </div>
              )}
            </div>

            {project.impact && (
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  <Star className="w-4 h-4 inline-block mr-2" />
                  Impact
                </h3>
                <p className="text-foreground">{project.impact}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
