import AnimatedSection from "./AnimatedSection";
import { AlertTriangle, Brain, HelpCircle } from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "Forgotten Doses",
    description: "People forget to take their medicines on time, leading to incomplete treatments.",
  },
  {
    icon: AlertTriangle,
    title: "Wrong Usage",
    description: "Incorrect medicine dosage or timing can cause serious health complications.",
  },
  {
    icon: HelpCircle,
    title: "Lack of Awareness",
    description: "Limited access to information about medicines and their proper usage.",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            The Problem
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Healthcare Challenges
            <br />
            <span className="text-muted-foreground font-normal">We Face Daily</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <AnimatedSection key={problem.title} delay={index * 0.15}>
              <div className="group relative p-8 rounded-3xl bg-card border border-border hover:border-destructive/30 transition-all duration-500 hover:shadow-[var(--shadow-card)]">
                <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <problem.icon className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
