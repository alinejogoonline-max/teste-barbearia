import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Pronto Para a <span className="text-gold-gradient">Transformação</span>?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Agende seu horário agora e descubra por que somos a escolha número um 
            dos homens que valorizam estilo e qualidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild variant="gold" size="xl">
              <Link to="/booking" className="gap-2">
                <Calendar className="w-5 h-5" />
                Agendar Online
              </Link>
            </Button>
            <Button asChild variant="goldOutline" size="xl">
              <a href="tel:+5511999999999" className="gap-2">
                <Phone className="w-5 h-5" />
                Ligar Agora
              </a>
            </Button>
          </div>
          
          {/* Contact info */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, label: "Localização", value: "Av. Paulista, 1000 - SP" },
              { icon: Clock, label: "Horário", value: "Seg-Sáb: 9h às 20h" },
              { icon: Phone, label: "Telefone", value: "(11) 99999-9999" },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-4 rounded-xl bg-card border border-border"
              >
                <item.icon className="w-6 h-6 text-primary mb-2" />
                <p className="font-body text-sm text-muted-foreground">{item.label}</p>
                <p className="font-body font-medium text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
