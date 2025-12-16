import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scissors, Sparkles, Droplets, Crown, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Scissors,
    title: "Corte Clássico",
    description: "Corte tradicional com acabamento perfeito e toalha quente",
    price: "R$ 60",
    duration: "45 min",
  },
  {
    icon: Crown,
    title: "Corte Premium",
    description: "Corte personalizado + barba + hidratação facial completa",
    price: "R$ 120",
    duration: "90 min",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Barba Completa",
    description: "Design de barba com navalha e produtos premium",
    price: "R$ 50",
    duration: "40 min",
  },
  {
    icon: Droplets,
    title: "Tratamento Capilar",
    description: "Hidratação profunda + massagem relaxante no couro cabeludo",
    price: "R$ 80",
    duration: "60 min",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background relative">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm uppercase tracking-widest text-primary mb-4 block">
            Nossos Serviços
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Experiências <span className="text-gold-gradient">Exclusivas</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Cada serviço é cuidadosamente elaborado para proporcionar uma experiência 
            única de cuidado e estilo masculino.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-2xl p-6 transition-all duration-500 ${
                service.featured
                  ? "bg-gradient-gold gold-glow-intense"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background rounded-full text-xs font-body font-semibold text-primary border border-primary">
                  Mais Popular
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                service.featured ? "bg-primary-foreground/20" : "bg-primary/10"
              }`}>
                <service.icon className={`w-7 h-7 ${
                  service.featured ? "text-primary-foreground" : "text-primary"
                }`} />
              </div>
              
              <h3 className={`font-display text-xl font-semibold mb-2 ${
                service.featured ? "text-primary-foreground" : "text-foreground"
              }`}>
                {service.title}
              </h3>
              
              <p className={`font-body text-sm mb-4 ${
                service.featured ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {service.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`font-display text-2xl font-bold ${
                  service.featured ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {service.price}
                </span>
                <span className={`font-body text-sm flex items-center gap-1 ${
                  service.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </span>
              </div>
              
              <Button
                asChild
                variant={service.featured ? "secondary" : "goldOutline"}
                className="w-full"
              >
                <Link to="/booking">
                  Agendar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
