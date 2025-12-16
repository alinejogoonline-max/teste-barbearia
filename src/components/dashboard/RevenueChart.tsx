import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { day: "Seg", revenue: 850, appointments: 8 },
  { day: "Ter", revenue: 1200, appointments: 12 },
  { day: "Qua", revenue: 980, appointments: 10 },
  { day: "Qui", revenue: 1450, appointments: 14 },
  { day: "Sex", revenue: 1680, appointments: 16 },
  { day: "Sáb", revenue: 2100, appointments: 20 },
  { day: "Dom", revenue: 0, appointments: 0 },
];

const stats = [
  {
    icon: DollarSign,
    label: "Faturamento Semanal",
    value: "R$ 8.260",
    change: "+12%",
    positive: true,
  },
  {
    icon: Users,
    label: "Total de Clientes",
    value: "80",
    change: "+8%",
    positive: true,
  },
  {
    icon: Calendar,
    label: "Taxa de Ocupação",
    value: "85%",
    change: "+5%",
    positive: true,
  },
];

const RevenueChart = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-body ${
                  stat.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.positive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-1">
              {stat.label}
            </p>
            <p className="font-display text-2xl font-bold text-foreground">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Faturamento Semanal
            </h2>
            <p className="font-body text-muted-foreground">
              Receita por dia da semana
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="font-body text-muted-foreground">Faturamento</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontFamily: "Montserrat, sans-serif",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--primary))" }}
                formatter={(value: number) => [`R$ ${value}`, "Faturamento"]}
              />
              <Bar
                dataKey="revenue"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Daily Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Detalhamento Diário
        </h3>
        <div className="space-y-3">
          {weeklyData
            .filter((d) => d.revenue > 0)
            .map((day, index) => (
              <div
                key={day.day}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display font-semibold text-foreground w-12">
                    {day.day}
                  </span>
                  <div className="h-2 bg-secondary rounded-full w-32 md:w-48 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.revenue / 2100) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-gold rounded-full"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-body font-semibold text-foreground">
                    R$ {day.revenue}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {day.appointments} atendimentos
                  </p>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RevenueChart;
