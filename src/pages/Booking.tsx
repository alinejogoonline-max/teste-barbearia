import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceSelection from "@/components/booking/ServiceSelection";
import BarberSelection from "@/components/booking/BarberSelection";
import DateTimeSelection from "@/components/booking/DateTimeSelection";
import BookingSummary from "@/components/booking/BookingSummary";
import { Check } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
}

export interface BookingData {
  service: Service | null;
  barber: Barber | null;
  date: Date | null;
  time: string | null;
}

const steps = [
  { id: 1, title: "Serviço" },
  { id: 2, title: "Profissional" },
  { id: 3, title: "Data & Hora" },
  { id: 4, title: "Confirmação" },
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    barber: null,
    date: null,
    time: null,
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold transition-all duration-300 ${
                        currentStep > step.id
                          ? "bg-primary text-primary-foreground"
                          : currentStep === step.id
                          ? "bg-gradient-gold text-primary-foreground gold-glow"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={`font-body text-xs mt-2 ${
                        currentStep >= step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 md:w-24 h-0.5 mx-2 transition-all duration-300 ${
                        currentStep > step.id ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {currentStep === 1 && (
                <ServiceSelection
                  selectedService={bookingData.service}
                  onSelect={(service) => updateBookingData({ service })}
                  onNext={handleNext}
                />
              )}
              {currentStep === 2 && (
                <BarberSelection
                  selectedBarber={bookingData.barber}
                  onSelect={(barber) => updateBookingData({ barber })}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <DateTimeSelection
                  selectedDate={bookingData.date}
                  selectedTime={bookingData.time}
                  onSelectDate={(date) => updateBookingData({ date })}
                  onSelectTime={(time) => updateBookingData({ time })}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentStep === 4 && (
                <BookingSummary
                  bookingData={bookingData}
                  onBack={handleBack}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
