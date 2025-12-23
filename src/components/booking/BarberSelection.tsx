import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Barber } from "@/pages/Booking";

interface BarberSelectionProps {
  selectedBarber: Barber | null;
  onSelect: (barber: Barber) => void;
  onNext: () => void;
  onBack: () => void;
}

const BarberSelection = ({ selectedBarber, onSelect, onNext, onBack }: BarberSelectionProps) => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const { data, error } = await supabase
          .from('barbers')
          .select('id, name, specialty, avatar_url')
          .eq('is_active', true)
          .order('name', { ascending: true });

        if (error) throw error;

        setBarbers(data.map(b => ({
          id: b.id,
          name: b.name,
          specialty: b.specialty || 'Barbeiro',
          image: b.avatar_url || '',
          rating: 5.0
        })));
      } catch (error) {
        console.error('Erro ao carregar barbeiros:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBarbers();
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
          Escolha seu <span className="text-gold-gradient">Barbeiro</span>
        </h2>
        <p className="font-body text-muted-foreground">
          Nossos profissionais estão prontos para te atender
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                {barber.image ? (
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className={`w-full h-full rounded-full object-cover border-2 ${
                      isSelected ? "border-primary" : "border-border"
                    }`}
                  />
                ) : (
                  <div className={`w-full h-full rounded-full flex items-center justify-center bg-secondary border-2 ${
                    isSelected ? "border-primary" : "border-border"
                  }`}>
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {barber.name}
              </h3>

              <p className="font-body text-sm text-muted-foreground">
                {barber.specialty}
              </p>
            </motion.button>
          );
        })}
      </div>

      {barbers.length === 0 && !isLoading && (
        <p className="text-center text-muted-foreground py-8">
          Nenhum barbeiro disponível no momento.
        </p>
      )}

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