import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DailyAgenda from "@/components/dashboard/DailyAgenda";
import ScheduleManager from "@/components/dashboard/ScheduleManager";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Dashboard <span className="text-gold-gradient">Administrativo</span>
            </h1>
            <p className="font-body text-muted-foreground">
              Gerencie sua agenda e acompanhe seu faturamento
            </p>
          </motion.div>

          <Tabs defaultValue="agenda" className="space-y-6">
            <TabsList className="bg-card border border-border p-1">
              <TabsTrigger value="agenda" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar className="w-4 h-4" />
                Agenda do Dia
              </TabsTrigger>
              <TabsTrigger value="schedule" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Clock className="w-4 h-4" />
                Gestão de Horários
              </TabsTrigger>
              <TabsTrigger value="revenue" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="w-4 h-4" />
                Faturamento
              </TabsTrigger>
            </TabsList>

            <TabsContent value="agenda">
              <DailyAgenda />
            </TabsContent>

            <TabsContent value="schedule">
              <ScheduleManager />
            </TabsContent>

            <TabsContent value="revenue">
              <RevenueChart />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
