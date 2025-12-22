import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, User, Scissors, Phone, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Appointment {
  id: string;
  appointment_time: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  services: { name: string; duration: number } | null;
  barbers: { name: string } | null;
}

const DailyAgenda = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const today = new Date();

  const fetchAppointments = async () => {
    try {
      const todayDate = format(today, "yyyy-MM-dd");
      
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          id,
          appointment_time,
          customer_name,
          customer_phone,
          status,
          services (name, duration),
          barbers (name)
        `)
        .eq("appointment_date", todayDate)
        .order("appointment_time", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os agendamentos.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
      );

      toast({
        title: status === "confirmed" ? "Confirmado!" : "Cancelado",
        description: `Agendamento ${status === "confirmed" ? "confirmado" : "cancelado"} com sucesso.`,
      });
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o agendamento.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {format(today, "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </h2>
            <p className="font-body text-muted-foreground">
              {appointments.length} agendamentos para hoje
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-4 py-2 bg-primary/10 rounded-lg">
              <p className="font-display text-2xl font-bold text-primary">
                {appointments.filter((a) => a.status === "confirmed").length}
              </p>
              <p className="font-body text-xs text-muted-foreground">Confirmados</p>
            </div>
            <div className="text-center px-4 py-2 bg-secondary rounded-lg">
              <p className="font-display text-2xl font-bold text-foreground">
                {appointments.filter((a) => a.status === "pending").length}
              </p>
              <p className="font-body text-xs text-muted-foreground">Pendentes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Scissors className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            Nenhum agendamento hoje
          </h3>
          <p className="font-body text-muted-foreground">
            Não há agendamentos marcados para hoje.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Time */}
                <div className="flex items-center gap-3 md:w-24">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-display text-xl font-bold text-foreground">
                    {appointment.appointment_time.slice(0, 5)}
                  </span>
                </div>

                {/* Client Info */}
                <div className="flex-1 grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {appointment.customer_name}
                      </p>
                      <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {appointment.customer_phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Scissors className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">
                        {appointment.services?.name || "Serviço não especificado"}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {appointment.services?.duration || 30} minutos
                        {appointment.barbers && ` • ${appointment.barbers.name}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  <Badge
                    variant={appointment.status === "confirmed" ? "default" : "secondary"}
                    className={
                      appointment.status === "confirmed"
                        ? "bg-primary/20 text-primary border-primary/30"
                        : appointment.status === "cancelled"
                        ? "bg-destructive/20 text-destructive border-destructive/30"
                        : ""
                    }
                  >
                    {appointment.status === "confirmed"
                      ? "Confirmado"
                      : appointment.status === "cancelled"
                      ? "Cancelado"
                      : appointment.status === "completed"
                      ? "Concluído"
                      : "Pendente"}
                  </Badge>
                  {appointment.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                      >
                        <XCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyAgenda;
