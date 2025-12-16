import { motion } from "framer-motion";
import { Scissors, Crown, Sparkles, Droplets, Clock, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/pages/Booking";

const services: Service[] = [
  { id: "1", name: "Corte Clássico", price: 60, duration: 45 },
  { id: "2", name: "Corte Premium", price: 120, duration: 90 },
  { id: "3", name: "Barba Completa", price: 50, duration: 40 },
  { id: "4", name: "Tratamento Capilar", price: 80, duration: 60 },
  { id: "5", name: "Corte + Barba", price: 100, duration: 75 },
  { id: "6", name: "Pigmentação", price: 150, duration: 120 },
];

const icons = [Scissors, Crown, Sparkles, Droplets, Scissors, Crown];

interface ServiceSelectionProps {
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  onNext: () => void;
}

const ServiceSelection = ({ selectedService, onSelect, onNext }: ServiceSelectionProps) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Escolha seu <span className="text-gold-gradient">Serviço</span>
        </h2>
        <p className="font-body text-muted-foreground">
          Selecione o serviço desejado para continuar
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {services.map((service, index) => {
          const Icon = icons[index];
          const isSelected = selectedService?.id === service.id;

          return (
            <motion.button
              key={service.id}
              onClick={() => onSelect(service)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-xl text-left transition-all duration-300 ${
                isSelected
                  ? "bg-primary/10 border-2 border-primary gold-glow"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                isSelected ? "bg-primary/20" : "bg-secondary"
              }`}>
                <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {service.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-bold text-primary">
                  R$ {service.price}
                </span>
                <span className="font-body text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {service.duration} min
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedService}
          variant="gold"
          size="lg"
          className="gap-2"
        >
          Continuar
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelection;
