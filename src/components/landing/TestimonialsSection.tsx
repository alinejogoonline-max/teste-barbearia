import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ricardo Almeida",
    role: "Empresário",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    content: "Ambiente impecável e profissionais de primeira. Meu corte nunca ficou tão bom. Virei cliente fiel!",
    rating: 5,
  },
  {
    name: "Fernando Costa",
    role: "Advogado",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    content: "A experiência premium que eu procurava. O agendamento online é super prático e o atendimento é excepcional.",
    rating: 5,
  },
  {
    name: "Lucas Mendes",
    role: "Médico",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    content: "Melhor barbearia da cidade, sem dúvidas. Os barbeiros são verdadeiros artistas. Recomendo demais!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-primary rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-primary rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm uppercase tracking-widest text-primary mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O Que Nossos <span className="text-gold-gradient">Clientes</span> Dizem
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Confira o que eles têm a dizer sobre a experiência Elite Barber.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-background border border-border rounded-2xl p-6 relative group hover:border-primary/50 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="font-body text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
