import React from "react";
import { Card } from "@/components/ui/card";
import { Terminal, Code2, Database, Cloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: string[];
};

const SkillsSection = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      icon: <Code2 className="w-6 h-6 text-primary" />,
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
    },
    {
      title: "Backend",
      icon: <Terminal className="w-6 h-6 text-primary" />,
      skills: ["Node.js", "Python", "Express", "FastAPI", "GraphQL"],
    },
    {
      title: "Database",
      icon: <Database className="w-6 h-6 text-primary" />,
      skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    },
    {
      title: "DevOps",
      icon: <Cloud className="w-6 h-6 text-primary" />,
      skills: ["AWS", "Docker", "CI/CD", "Kubernetes", "Terraform"],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-mono mb-12 text-center">
          <span className="text-primary">{'">"'}</span> Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-6 border-primary bg-background">
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-mono ml-3">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="outline"
                    className="border-primary text-primary font-mono"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
