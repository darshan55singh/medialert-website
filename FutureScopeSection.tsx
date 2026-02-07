import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { Stethoscope, Building2, Brain, ArrowRight } from "lucide-react";

const futureFeatures = [
  {
    icon: Stethoscope,
    title: "Doctor Integration",
    description: "Connect directly with healthcare providers for consultations and prescription management.",
  },
  {
    icon: Building2,
    title: "Pharmacy Partnerships",
    description: "Direct integration with online pharmacies for seamless medicine ordering and delivery.",
  },
  {
    icon: Brain,
    title: "AI Health Insights",
    description: "Personalized health recommendations powered by artificial intelligence and machine learning.",
  },
];

const FutureScopeSection = () => {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-background/10 text-background text-sm font-medium mb-4">
            Future Scope
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What's Coming
            <br />
            <span className="text-background/60">Next</span>
          </h2>
          <p className="text-background/70 text-lg max-w-2xl mx-auto">
            We're constantly evolving to bring you the best healthcare experience.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {futureFeatures.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.15}>
              <motion.div
                className="group relative p-8 rounded-3xl bg-background/5 border border-background/10 hover:bg-background/10 transition-all duration-500 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-background/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-8 h-8 text-background" />
                </div>
                
                <h3 className="text-xl font-semibold text-background mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-background/70 leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-background/50 text-sm font-medium group-hover:text-background transition-colors">
                  <span>Coming Soon</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureScopeSection;
