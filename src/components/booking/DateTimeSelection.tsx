import { useState } from "react";
import { motion } from "framer-motion";
import { format, addDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

// Simulated unavailable slots
const unavailableSlots = ["10:00", "11:30", "15:00", "18:00"];

interface DateTimeSelectionProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DateTimeSelection = ({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onNext,
  onBack,
}: DateTimeSelectionProps) => {
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekDays = () => {
    const days = [];
    const startDay = addDays(new Date(), weekOffset * 7);
    for (let i = 0; i < 7; i++) {
      days.push(addDays(startDay, i));
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Escolha <span className="text-gold-gradient">Data & Horário</span>
        </h2>
        <p className="font-body text-muted-foreground">
          Selecione o melhor momento para sua visita
        </p>
      </div>

      {/* Date Selection */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Selecione a Data
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
              disabled={weekOffset === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setWeekOffset(weekOffset + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());

            return (
              <motion.button
                key={day.toISOString()}
                onClick={() => onSelectDate(day)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg text-center transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-gold text-primary-foreground gold-glow"
                    : isToday
                    ? "bg-primary/10 border border-primary"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <p className={`font-body text-xs uppercase ${
                  isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  {format(day, "EEE", { locale: ptBR })}
                </p>
                <p className={`font-display text-lg font-bold ${
                  isSelected ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {format(day, "dd")}
                </p>
                <p className={`font-body text-xs ${
                  isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  {format(day, "MMM", { locale: ptBR })}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Selecione o Horário
        </h3>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;
            const isUnavailable = unavailableSlots.includes(time);

            return (
              <motion.button
                key={time}
                onClick={() => !isUnavailable && onSelectTime(time)}
                disabled={isUnavailable}
                whileHover={!isUnavailable ? { scale: 1.05 } : {}}
                whileTap={!isUnavailable ? { scale: 0.95 } : {}}
                className={`p-3 rounded-lg font-body text-sm font-medium transition-all duration-300 ${
                  isUnavailable
                    ? "bg-secondary/50 text-muted-foreground/50 cursor-not-allowed line-through"
                    : isSelected
                    ? "bg-gradient-gold text-primary-foreground gold-glow"
                    : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {time}
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-secondary" />
            <span className="font-body text-muted-foreground">Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-secondary/50" />
            <span className="font-body text-muted-foreground">Indisponível</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
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

export default DateTimeSelection;
