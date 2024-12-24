import React from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap, Briefcase } from "lucide-react";

type TimelineItem = {
  type: "education" | "experience";
  title: string;
  organization: string;
  period: string;
  description: string;
};

const TimelineSection = () => {
  const timelineItems: TimelineItem[] = [
    {
      type: "education",
      title: "Master of Computer Science",
      organization: "Tech University",
      period: "2020 - 2022",
      description:
        "Specialized in Artificial Intelligence and Machine Learning",
    },
    {
      type: "experience",
      title: "Senior Software Engineer",
      organization: "Tech Corp",
      period: "2022 - Present",
      description:
        "Leading frontend development team and architecting scalable solutions",
    },
    {
      type: "education",
      title: "Bachelor of Computer Science",
      organization: "State University",
      period: "2016 - 2020",
      description: "Focus on Software Engineering and Web Technologies",
    },
    {
      type: "experience",
      title: "Software Developer",
      organization: "StartUp Inc",
      period: "2020 - 2022",
      description: "Full-stack development using React and Node.js",
    },
  ];

  return (
    <section id="timeline" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-mono mb-12 text-center">
          <span className="text-primary">{'">"'}</span> Education & Experience
        </h2>

        <div className="timeline-container">
          {timelineItems.map((item, index) => (
            <div key={index} className="timeline-item">
              <Card className="p-6 border-primary bg-background">
                <div className="flex items-center mb-4">
                  {item.type === "education" ? (
                    <GraduationCap className="w-6 h-6 text-primary" />
                  ) : (
                    <Briefcase className="w-6 h-6 text-primary" />
                  )}
                  <div className="ml-3">
                    <h3 className="text-xl font-mono">{item.title}</h3>
                    <p className="text-muted-foreground">{item.organization}</p>
                  </div>
                </div>
                <p className="text-sm text-primary font-mono mb-2">
                  {item.period}
                </p>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
