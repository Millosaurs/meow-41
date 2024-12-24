import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Terminal, User, Briefcase, Code2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../BackgroundAnimation";

type DashboardProps = {
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
      startDate?: string;
      teamSize?: number;
      role?: string;
      features?: string[];
      challenges?: string[];
      impact?: string;
    }>;
  };
  onUpdate: (newData: any) => void;
};

const Dashboard = ({ portfolioData, onUpdate }: DashboardProps) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(portfolioData);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <BackgroundAnimation />

      <div className="fixed top-0 left-0 w-full bg-background z-50 border-b border-primary">
        <div className="h-[62px] flex items-center px-4">
          <Button
            variant="ghost"
            className="gap-2 text-primary"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Button>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center">
              <Terminal className="w-4 h-4 text-primary mr-2" />
              <span className="font-mono text-primary">portfolio.config</span>
            </div>
          </div>
        </div>
      </div>

      <main className="pt-[80px] pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-primary bg-background p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full border border-primary bg-background mb-6">
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

              <form onSubmit={handleSubmit} className="space-y-6">
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
                          skills: e.target.value
                            .split(",")
                            .map((s) => s.trim()),
                        })
                      }
                      className="font-mono min-h-[200px]"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                  {portfolioData.projects.map((project, index) => (
                    <Card
                      key={index}
                      className="p-6 border-primary bg-background space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-mono text-primary">
                          Project #{index + 1}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-mono mb-2 block text-primary">
                            Start Date
                          </label>
                          <Input
                            value={project.startDate}
                            onChange={(e) => {
                              const newProjects = [...portfolioData.projects];
                              newProjects[index] = {
                                ...project,
                                startDate: e.target.value,
                              };
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>

                        <div className="md:col-span-2">
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
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-mono mb-2 block text-primary">
                            Technologies (comma-separated)
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
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-mono mb-2 block text-primary">
                            Team Size
                          </label>
                          <Input
                            type="number"
                            value={project.teamSize}
                            onChange={(e) => {
                              const newProjects = [...portfolioData.projects];
                              newProjects[index] = {
                                ...project,
                                teamSize: parseInt(e.target.value),
                              };
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>

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
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-mono mb-2 block text-primary">
                            Role
                          </label>
                          <Input
                            value={project.role}
                            onChange={(e) => {
                              const newProjects = [...portfolioData.projects];
                              newProjects[index] = {
                                ...project,
                                role: e.target.value,
                              };
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>

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
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
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
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-sm font-mono mb-2 block text-primary">
                            Features (one per line)
                          </label>
                          <Textarea
                            value={project.features?.join("\n")}
                            onChange={(e) => {
                              const newProjects = [...portfolioData.projects];
                              newProjects[index] = {
                                ...project,
                                features: e.target.value
                                  .split("\n")
                                  .map((f) => f.trim())
                                  .filter(Boolean),
                              };
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono min-h-[100px]"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-sm font-mono mb-2 block text-primary">
                            Challenges (one per line)
                          </label>
                          <Textarea
                            value={project.challenges?.join("\n")}
                            onChange={(e) => {
                              const newProjects = [...portfolioData.projects];
                              newProjects[index] = {
                                ...project,
                                challenges: e.target.value
                                  .split("\n")
                                  .map((c) => c.trim())
                                  .filter(Boolean),
                              };
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono min-h-[100px]"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-sm font-mono mb-2 block text-primary">
                            Impact
                          </label>
                          <Textarea
                            value={project.impact}
                            onChange={(e) => {
                              const newProjects = [...portfolioData.projects];
                              newProjects[index] = {
                                ...project,
                                impact: e.target.value,
                              };
                              onUpdate({
                                ...portfolioData,
                                projects: newProjects,
                              });
                            }}
                            className="font-mono"
                          />
                        </div>
                      </div>
                    </Card>
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
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
