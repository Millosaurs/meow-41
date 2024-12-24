import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Terminal, User, Briefcase, Code2, Mail } from "lucide-react";

type DashboardPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: {
    name: string;
    role: string;
    email: string;
    skills: string[];
    projects: Array<{
      title: string;
      description: string;
      technologies: string[];
      imageUrl: string;
      githubUrl: string;
      liveUrl: string;
    }>;
  };
  onUpdate: (newData: any) => void;
};

const DashboardPanel = ({
  isOpen,
  onClose,
  portfolioData,
  onUpdate,
}: DashboardPanelProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onUpdate(portfolioData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] bg-background border-l border-primary">
        <SheetHeader>
          <div className="h-8 bg-background border-b border-primary flex items-center px-4 -mx-6 -mt-6">
            <Terminal className="w-4 h-4 text-primary mr-2" />
            <SheetTitle className="text-primary font-mono text-sm">
              portfolio.config
            </SheetTitle>
          </div>
        </SheetHeader>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="w-full border border-primary bg-background">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 data-[state=active]:bg-primary/10"
            >
              <User className="w-4 h-4" /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="flex items-center gap-2 data-[state=active]:bg-primary/10"
            >
              <Code2 className="w-4 h-4" /> Skills
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex items-center gap-2 data-[state=active]:bg-primary/10"
            >
              <Briefcase className="w-4 h-4" /> Projects
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <TabsContent value="profile" className="space-y-4">
              <div>
                <label className="text-sm font-mono mb-2 block text-primary">
                  Name
                </label>
                <Input
                  value={portfolioData.name}
                  onChange={(e) =>
                    onUpdate({ ...portfolioData, name: e.target.value })
                  }
                  className="font-mono"
                />
              </div>
              <div>
                <label className="text-sm font-mono mb-2 block text-primary">
                  Role
                </label>
                <Input
                  value={portfolioData.role}
                  onChange={(e) =>
                    onUpdate({ ...portfolioData, role: e.target.value })
                  }
                  className="font-mono"
                />
              </div>
              <div>
                <label className="text-sm font-mono mb-2 block text-primary">
                  Email
                </label>
                <Input
                  value={portfolioData.email}
                  onChange={(e) =>
                    onUpdate({ ...portfolioData, email: e.target.value })
                  }
                  className="font-mono"
                  type="email"
                />
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div>
                <label className="text-sm font-mono mb-2 block text-primary">
                  Skills (comma-separated)
                </label>
                <Textarea
                  value={portfolioData.skills.join(", ")}
                  onChange={(e) =>
                    onUpdate({
                      ...portfolioData,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="font-mono"
                />
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              {portfolioData.projects.map((project, index) => (
                <div
                  key={index}
                  className="space-y-4 border border-primary p-4"
                >
                  <div>
                    <label className="text-sm font-mono mb-2 block text-primary">
                      Project Title
                    </label>
                    <Input
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...portfolioData.projects];
                        newProjects[index] = {
                          ...project,
                          title: e.target.value,
                        };
                        onUpdate({ ...portfolioData, projects: newProjects });
                      }}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-mono mb-2 block text-primary">
                      Description
                    </label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...portfolioData.projects];
                        newProjects[index] = {
                          ...project,
                          description: e.target.value,
                        };
                        onUpdate({ ...portfolioData, projects: newProjects });
                      }}
                      className="font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-mono mb-2 block text-primary">
                        Image URL
                      </label>
                      <Input
                        value={project.imageUrl}
                        onChange={(e) => {
                          const newProjects = [...portfolioData.projects];
                          newProjects[index] = {
                            ...project,
                            imageUrl: e.target.value,
                          };
                          onUpdate({ ...portfolioData, projects: newProjects });
                        }}
                        className="font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-mono mb-2 block text-primary">
                        Technologies
                      </label>
                      <Input
                        value={project.technologies.join(", ")}
                        onChange={(e) => {
                          const newProjects = [...portfolioData.projects];
                          newProjects[index] = {
                            ...project,
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim()),
                          };
                          onUpdate({ ...portfolioData, projects: newProjects });
                        }}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-mono mb-2 block text-primary">
                        GitHub URL
                      </label>
                      <Input
                        value={project.githubUrl}
                        onChange={(e) => {
                          const newProjects = [...portfolioData.projects];
                          newProjects[index] = {
                            ...project,
                            githubUrl: e.target.value,
                          };
                          onUpdate({ ...portfolioData, projects: newProjects });
                        }}
                        className="font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-mono mb-2 block text-primary">
                        Live URL
                      </label>
                      <Input
                        value={project.liveUrl}
                        onChange={(e) => {
                          const newProjects = [...portfolioData.projects];
                          newProjects[index] = {
                            ...project,
                            liveUrl: e.target.value,
                          };
                          onUpdate({ ...portfolioData, projects: newProjects });
                        }}
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </form>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardPanel;
