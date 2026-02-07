import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import FutureScopeSection from "@/components/FutureScopeSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <section id="solution">
        <SolutionSection />
      </section>
      <HowItWorksSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="future">
        <FutureScopeSection />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
