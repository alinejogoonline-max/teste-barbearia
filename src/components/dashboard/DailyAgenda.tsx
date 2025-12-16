import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, User, Scissors, Phone, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const appointments = [
  {
    id: "1",
    time: "09:00",
    client: "Ricardo Almeida",
    phone: "(11) 99999-1111",
    service: "Corte Premium",
    duration: 90,
    status: "confirmed",
  },
  {
    id: "2",
    time: "10:30",
    client: "Fernando Costa",
    phone: "(11) 99999-2222",
    service: "Barba Completa",
    duration: 40,
    status: "confirmed",
  },
  {
    id: "3",
    time: "11:30",
    client: "Lucas Mendes",
    phone: "(11) 99999-3333",
    service: "Corte Clássico",
    duration: 45,
    status: "pending",
  },
  {
    id: "4",
    time: "14:00",
    client: "André Silva",
    phone: "(11) 99999-4444",
    service: "Corte + Barba",
    duration: 75,
    status: "confirmed",
  },
  {
    id: "5",
    time: "15:30",
    client: "Paulo Santos",
    phone: "(11) 99999-5555",
    service: "Tratamento Capilar",
    duration: 60,
    status: "confirmed",
  },
];

const DailyAgenda = () => {
  const today = new Date();

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
                  {appointment.time}
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
                      {appointment.client}
                    </p>
                    <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {appointment.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground">
                      {appointment.service}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {appointment.duration} minutos
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
                      : ""
                  }
                >
                  {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-400 hover:bg-green-500/10">
                    <CheckCircle2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 hover:bg-destructive/10">
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyAgenda;
