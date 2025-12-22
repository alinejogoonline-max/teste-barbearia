import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scissors, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const signupSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse({ email, password });
      } else {
        signupSchema.parse({ email, password, fullName });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            variant: "destructive",
            title: "Erro ao entrar",
            description: error.message === "Invalid login credentials" 
              ? "Email ou senha incorretos" 
              : error.message,
          });
        } else {
          toast({
            title: "Bem-vindo!",
            description: "Login realizado com sucesso.",
          });
          navigate("/dashboard");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            variant: "destructive",
            title: "Erro ao cadastrar",
            description: error.message.includes("already registered")
              ? "Este email já está cadastrado"
              : error.message,
          });
        } else {
          toast({
            title: "Cadastro realizado!",
            description: "Você já pode fazer login.",
          });
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
            <Scissors className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-foreground">
            Elite<span className="text-gold-gradient">Cuts</span>
          </span>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            {isLogin ? "Entrar" : "Criar Conta"}
          </h1>
          <p className="font-body text-muted-foreground text-center mb-6">
            {isLogin 
              ? "Acesse sua conta para gerenciar a barbearia" 
              : "Crie sua conta para começar"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-body">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="font-body">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-body">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-gold hover:opacity-90 text-primary-foreground font-body font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? "Aguarde..." 
                : isLogin 
                  ? "Entrar" 
                  : "Criar Conta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-muted-foreground">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="ml-1 text-primary hover:underline font-medium"
              >
                {isLogin ? "Cadastre-se" : "Entrar"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6 font-body">
          Área exclusiva para donos e barbeiros
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
