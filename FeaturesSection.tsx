import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { 
  Bell, 
  ScanLine, 
  FileText, 
  MapPin, 
  Smartphone,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Intelligent alerts that adapt to your daily routine and never let you miss a dose.",
  },
  {
    icon: ScanLine,
    title: "Barcode Scanner",
    description: "Scan any medicine barcode to instantly access detailed information and usage guides.",
  },
  {
    icon: FileText,
    title: "Medicine Database",
    description: "Comprehensive information about medicines, diseases they treat, and proper usage.",
  },
  {
    icon: MapPin,
    title: "Local Ordering",
    description: "Find and order medicines from local pharmacies across India with ease.",
  },
  {
    icon: Smartphone,
    title: "User Friendly",
    description: "Clean, intuitive interface designed for users of all ages and technical abilities.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your health data is encrypted and stored securely on your device.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need
            <br />
            <span className="text-muted-foreground font-normal">In One Place</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.1}>
              <motion.div
                className="group relative p-6 md:p-8 rounded-3xl bg-card border border-border hover:border-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-500">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
