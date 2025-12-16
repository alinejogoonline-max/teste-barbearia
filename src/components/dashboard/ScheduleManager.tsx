import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const ScheduleManager = () => {
  const [blockedSlots, setBlockedSlots] = useState<Set<string>>(
    new Set(["Seg-10:00", "Ter-14:30", "Qua-18:00", "Sex-09:00"])
  );
  const { toast } = useToast();

  const toggleSlot = (day: string, time: string) => {
    const slotKey = `${day}-${time}`;
    const newBlocked = new Set(blockedSlots);
    
    if (newBlocked.has(slotKey)) {
      newBlocked.delete(slotKey);
      toast({
        title: "Horário Liberado",
        description: `${day} às ${time} está disponível para agendamentos.`,
      });
    } else {
      newBlocked.add(slotKey);
      toast({
        title: "Horário Bloqueado",
        description: `${day} às ${time} foi bloqueado.`,
      });
    }
    
    setBlockedSlots(newBlocked);
  };

  const isBlocked = (day: string, time: string) => {
    return blockedSlots.has(`${day}-${time}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Gestão de Horários
            </h2>
            <p className="font-body text-muted-foreground">
              Clique nos horários para bloquear ou liberar
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary border border-border" />
              <span className="font-body text-muted-foreground">Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive/50" />
              <span className="font-body text-muted-foreground">Bloqueado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="p-2 text-left font-body text-sm text-muted-foreground">
                Horário
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="p-2 text-center font-display font-semibold text-foreground"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time}>
                <td className="p-2 font-body text-sm font-medium text-foreground">
                  {time}
                </td>
                {days.map((day) => {
                  const blocked = isBlocked(day, time);
                  return (
                    <td key={`${day}-${time}`} className="p-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleSlot(day, time)}
                        className={`w-full p-2 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          blocked
                            ? "bg-destructive/20 border border-destructive/50 text-destructive"
                            : "bg-secondary border border-border hover:border-primary/50 text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {blocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </motion.button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={() => {
            const allSlots = new Set<string>();
            days.forEach((day) => {
              timeSlots.slice(0, 6).forEach((time) => {
                allSlots.add(`${day}-${time}`);
              });
            });
            setBlockedSlots(allSlots);
            toast({
              title: "Manhãs Bloqueadas",
              description: "Todos os horários da manhã foram bloqueados.",
            });
          }}
        >
          <Lock className="w-4 h-4 mr-2" />
          Bloquear Manhãs
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setBlockedSlots(new Set());
            toast({
              title: "Horários Liberados",
              description: "Todos os horários foram liberados.",
            });
          }}
        >
          <Unlock className="w-4 h-4 mr-2" />
          Liberar Todos
        </Button>
      </div>
    </div>
  );
};

export default ScheduleManager;
