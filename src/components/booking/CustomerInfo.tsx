import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CustomerData } from "@/pages/Booking";

interface CustomerInfoProps {
  customerData: CustomerData;
  onUpdate: (data: Partial<CustomerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerInfo = ({ customerData, onUpdate, onNext, onBack }: CustomerInfoProps) => {
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    onUpdate({ phone: formatted });
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ name: e.target.value });
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ email: e.target.value });
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string; email?: string } = {};
    
    if (!customerData.name || customerData.name.trim().length < 3) {
      newErrors.name = "Nome completo é obrigatório (mínimo 3 caracteres)";
    }
    
    const phoneNumbers = customerData.phone?.replace(/\D/g, "") || "";
    if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      newErrors.phone = "Telefone inválido";
    }

    if (customerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Suas <span className="text-gold-gradient">Informações</span>
        </h2>
        <p className="font-body text-muted-foreground">
          Precisamos de alguns dados para confirmar seu agendamento
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-body text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Nome Completo *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={customerData.name}
              onChange={handleNameChange}
              className={`bg-secondary/50 border-border focus:border-primary ${
                errors.name ? "border-destructive" : ""
              }`}
            />
            {errors.name && (
              <p className="font-body text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-body text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Telefone / WhatsApp *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={customerData.phone}
              onChange={handlePhoneChange}
              className={`bg-secondary/50 border-border focus:border-primary ${
                errors.phone ? "border-destructive" : ""
              }`}
            />
            {errors.phone && (
              <p className="font-body text-sm text-destructive">{errors.phone}</p>
            )}
            <p className="font-body text-xs text-muted-foreground">
              Enviaremos a confirmação por WhatsApp
            </p>
          </div>

          {/* Email (Opcional) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-body text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email (opcional)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={customerData.email || ""}
              onChange={handleEmailChange}
              className={`bg-secondary/50 border-border focus:border-primary ${
                errors.email ? "border-destructive" : ""
              }`}
            />
            {errors.email && (
              <p className="font-body text-sm text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            variant="gold"
            size="lg"
            className="gap-2"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerInfo;
