import { motion } from "framer-motion";
import { Star, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Barber } from "@/pages/Booking";

const barbers: Barber[] = [
  {
    id: "1",
    name: "Carlos Silva",
    specialty: "Cortes Clássicos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Rafael Santos",
    specialty: "Design de Barba",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Bruno Oliveira",
    specialty: "Cortes Modernos",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    rating: 5.0,
  },
  {
    id: "4",
    name: "André Costa",
    specialty: "Tratamentos Capilares",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    rating: 4.7,
  },
];

interface BarberSelectionProps {
  selectedBarber: Barber | null;
  onSelect: (barber: Barber) => void;
  onNext: () => void;
  onBack: () => void;
}

const BarberSelection = ({ selectedBarber, onSelect, onNext, onBack }: BarberSelectionProps) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Escolha seu <span className="text-gold-gradient">Barbeiro</span>
        </h2>
        <p className="font-body text-muted-foreground">
          Nossos profissionais estão prontos para te atender
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {barbers.map((barber) => {
          const isSelected = selectedBarber?.id === barber.id;

          return (
            <motion.button
              key={barber.id}
              onClick={() => onSelect(barber)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-xl text-center transition-all duration-300 ${
                isSelected
                  ? "bg-primary/10 border-2 border-primary gold-glow"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className={`w-full h-full rounded-full object-cover border-2 ${
                    isSelected ? "border-primary" : "border-border"
                  }`}
                />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {barber.name}
              </h3>

              <p className="font-body text-sm text-muted-foreground mb-2">
                {barber.specialty}
              </p>

              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-body text-sm font-medium text-foreground">
                  {barber.rating}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedBarber}
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

export default BarberSelection;
