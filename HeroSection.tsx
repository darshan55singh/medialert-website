import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Shield, Bell, Pill, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToSection = () => {
    document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-secondary to-background">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-[10%] w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Pill className="w-10 h-10 text-primary" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%] w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Bell className="w-8 h-8 text-accent" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[20%] w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Shield className="w-7 h-7 text-primary" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            Smart Healthcare Solution
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6">
            Medi
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Alert
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Smart Medicine Reminders.
            <br />
            <span className="text-foreground font-medium">Safer Health.</span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="group px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-[var(--shadow-button)]"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToSection}
              className="group px-8 py-6 text-lg"
            >
              How It Works
              <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
