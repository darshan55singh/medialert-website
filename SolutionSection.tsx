import AnimatedSection from "./AnimatedSection";
import { Bell, Info, ScanLine, CheckCircle2 } from "lucide-react";

const solutions = [
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Never miss a dose with intelligent, timely medication reminders tailored to your schedule.",
  },
  {
    icon: Info,
    title: "Medicine Information",
    description: "Access comprehensive details about your medicines, including usage, side effects, and precautions.",
  },
  {
    icon: ScanLine,
    title: "Barcode Scanning",
    description: "Instantly get medicine details by scanning the barcode. Simple, fast, and accurate.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            The Solution
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            MediAlert Makes
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Healthcare Simple
            </span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <AnimatedSection key={solution.title} delay={index * 0.15} direction="up">
              <div className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-[var(--shadow-card-hover)] h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-tr-3xl rounded-bl-[80px]" />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <solution.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {solution.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {solution.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Available Now</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
