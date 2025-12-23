import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scissors, Clock, Check, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Service } from "@/pages/Booking";

interface ServiceSelectionProps {
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  onNext: () => void;
}

const ServiceSelection = ({ selectedService, onSelect, onNext }: ServiceSelectionProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, name, price, duration')
          .eq('is_active', true)
          .order('price', { ascending: true });

        if (error) throw error;

        setServices(data.map(s => ({
          id: s.id,
          name: s.name,
          price: Number(s.price),
          duration: s.duration
        })));
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
        {services.map((service) => {
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
                <Scissors className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {service.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-bold text-primary">
                  R$ {service.price.toFixed(2)}
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

      {services.length === 0 && !isLoading && (
        <p className="text-center text-muted-foreground py-8">
          Nenhum serviço disponível no momento.
        </p>
      )}

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