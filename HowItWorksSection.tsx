import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { PlusCircle, ScanLine, FileText, Bell } from "lucide-react";

const steps = [
  {
    icon: PlusCircle,
    step: "01",
    title: "Add Medicine",
    description: "Manually add your medicine or use barcode scanning for instant entry.",
  },
  {
    icon: ScanLine,
    step: "02",
    title: "Scan Barcode",
    description: "Point your camera at the medicine barcode to auto-fill all details.",
  },
  {
    icon: FileText,
    step: "03",
    title: "View Information",
    description: "Get complete medicine details including usage, dosage, and disease treatment info.",
  },
  {
    icon: Bell,
    step: "04",
    title: "Get Reminders",
    description: "Receive timely notifications to take your medicine on schedule.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Simple Steps to
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Better Health
            </span>
          </h2>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <AnimatedSection key={step.step} delay={index * 0.1}>
              <div className="relative flex items-start gap-6 md:gap-10 mb-12 last:mb-0">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[39px] md:left-[47px] top-20 w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent" />
                )}

                {/* Step number circle */}
                <motion.div
                  className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                    {step.step}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="pt-2 md:pt-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
