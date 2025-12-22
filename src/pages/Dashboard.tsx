import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DailyAgenda from "@/components/dashboard/DailyAgenda";
import ScheduleManager from "@/components/dashboard/ScheduleManager";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, TrendingUp, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading, isStaff, isOwner, userRole } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Show message if user doesn't have staff role
  if (!isStaff) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-12 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-8 max-w-md"
            >
              <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                Acesso Restrito
              </h1>
              <p className="font-body text-muted-foreground mb-6">
                Você não tem permissão para acessar o dashboard. 
                Entre em contato com o administrador para solicitar acesso.
              </p>
              <button
                onClick={() => navigate("/")}
                className="text-primary hover:underline font-body"
              >
                Voltar para a página inicial
              </button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              {isOwner ? "Gerencie sua barbearia e acompanhe seu faturamento" : "Gerencie sua agenda"}
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
              {isOwner && (
                <TabsTrigger value="revenue" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <TrendingUp className="w-4 h-4" />
                  Faturamento
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="agenda">
              <DailyAgenda />
            </TabsContent>

            <TabsContent value="schedule">
              <ScheduleManager />
            </TabsContent>

            {isOwner && (
              <TabsContent value="revenue">
                <RevenueChart />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
