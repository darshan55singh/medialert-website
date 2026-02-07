import { motion } from "framer-motion";
import { Heart, GraduationCap, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold text-foreground">
              Medi
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Alert
              </span>
            </h3>
            <p className="text-muted-foreground mt-2">
              Smart Medicine Reminders. Safer Health.
            </p>
          </motion.div>

          {/* Project info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span>Engineering Student Project</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              This is an educational prototype designed to demonstrate a smart healthcare solution concept.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 mb-10"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 border-t border-border"
          >
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for better healthcare
            </p>
            <p className="text-muted-foreground/60 text-xs mt-2">
              © 2024 MediAlert. Educational Purpose Only.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
