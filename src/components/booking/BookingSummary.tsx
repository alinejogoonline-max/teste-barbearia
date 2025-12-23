import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Calendar, Clock, User, Scissors, CheckCircle2, Phone, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { BookingData } from "@/pages/Booking";

interface BookingSummaryProps {
  bookingData: BookingData;
  onBack: () => void;
}

const BookingSummary = ({ bookingData, onBack }: BookingSummaryProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    if (!bookingData.service || !bookingData.barber || !bookingData.date || !bookingData.time) {
      toast({
        title: "Erro",
        description: "Dados incompletos. Por favor, revise seu agendamento.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const appointmentDate = format(bookingData.date, 'yyyy-MM-dd');
      
      const { error } = await supabase
        .from('appointments')
        .insert({
          barber_id: bookingData.barber.id,
          service_id: bookingData.service.id,
          appointment_date: appointmentDate,
          appointment_time: bookingData.time,
          customer_name: bookingData.customer.name,
          customer_phone: bookingData.customer.phone,
          customer_email: bookingData.customer.email || null,
          status: 'pending'
        });

      if (error) throw error;

      setIsConfirmed(true);
      toast({
        title: "Agendamento Confirmado!",
        description: `${bookingData.customer.name}, você receberá uma confirmação por WhatsApp.`,
      });
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      toast({
        title: "Erro ao agendar",
        description: "Não foi possível confirmar seu agendamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 rounded-full bg-gradient-gold mx-auto mb-6 flex items-center justify-center gold-glow-intense"
        >
          <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        <h2 className="font-display text-3xl font-bold text-foreground mb-4">
          Agendamento <span className="text-gold-gradient">Confirmado!</span>
        </h2>

        <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
          Olá <strong>{bookingData.customer.name}</strong>, seu horário foi reservado com sucesso. 
          Enviamos os detalhes para o WhatsApp <strong>{bookingData.customer.phone}</strong>.
        </p>

        <div className="bg-card border border-border rounded-xl p-6 max-w-sm mx-auto">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="font-body text-sm text-muted-foreground">Cliente</p>
                <p className="font-body font-medium text-foreground">{bookingData.customer.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Scissors className="w-5 h-5 text-primary" />
              <div>
                <p className="font-body text-sm text-muted-foreground">Serviço</p>
                <p className="font-body font-medium text-foreground">{bookingData.service?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="font-body text-sm text-muted-foreground">Barbeiro</p>
                <p className="font-body font-medium text-foreground">{bookingData.barber?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-body text-sm text-muted-foreground">Data</p>
                <p className="font-body font-medium text-foreground">
                  {bookingData.date && format(bookingData.date, "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-body text-sm text-muted-foreground">Horário</p>
                <p className="font-body font-medium text-foreground">{bookingData.time}</p>
              </div>
            </div>
          </div>
        </div>

        <Button asChild variant="gold" size="lg" className="mt-8">
          <a href="/">Voltar ao Início</a>
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Resumo do <span className="text-gold-gradient">Agendamento</span>
        </h2>
        <p className="font-body text-muted-foreground">
          Confira os detalhes antes de confirmar
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        {/* Customer Info */}
        <div className="mb-6 pb-6 border-b border-border">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Dados do Cliente
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="font-body text-xs text-muted-foreground">Nome</p>
                <p className="font-body font-medium text-foreground text-sm">
                  {bookingData.customer.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-body text-xs text-muted-foreground">Telefone</p>
                <p className="font-body font-medium text-foreground text-sm">
                  {bookingData.customer.phone}
                </p>
              </div>
            </div>
            {bookingData.customer.email && (
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-body text-xs text-muted-foreground">Email</p>
                  <p className="font-body font-medium text-foreground text-sm">
                    {bookingData.customer.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Service */}
          <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-body text-sm text-muted-foreground mb-1">Serviço</p>
              <p className="font-display text-lg font-semibold text-foreground">
                {bookingData.service?.name}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {bookingData.service?.duration} minutos
              </p>
            </div>
          </div>

          {/* Barber */}
          <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-body text-sm text-muted-foreground mb-1">Profissional</p>
              <p className="font-display text-lg font-semibold text-foreground">
                {bookingData.barber?.name}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {bookingData.barber?.specialty}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-body text-sm text-muted-foreground mb-1">Data</p>
              <p className="font-display text-lg font-semibold text-foreground">
                {bookingData.date &&
                  format(bookingData.date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-body text-sm text-muted-foreground mb-1">Horário</p>
              <p className="font-display text-lg font-semibold text-foreground">
                {bookingData.time}
              </p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <span className="font-body text-lg text-muted-foreground">Total</span>
          <span className="font-display text-3xl font-bold text-gold-gradient">
            R$ {bookingData.service?.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          variant="gold"
          size="lg"
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Confirmando...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Confirmar Agendamento
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;