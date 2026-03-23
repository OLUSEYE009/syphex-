import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const QUOTES = [
  {
    quote: "The X1 completely redefined my understanding of electric performance.",
    name: "James R.",
    role: "CEO",
  },
  {
    quote: "SYPHEX didn't just give me a car, it gave me the future.",
    name: "Priya M.",
    role: "Tech Entrepreneur",
  },
  {
    quote: "Nothing compares to the GT-R on the open road.",
    name: "Carlos D.",
    role: "Racing Driver",
  },
  {
    quote: "The range anxiety is gone. Pure freedom in every drive.",
    name: "Sarah L.",
    role: "Environmental Engineer",
  },
];

const TestimonialCard = ({ quote, name, role, delay }: { quote: string; name: string; role: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-[#0f1117] to-[#1a1d23] p-8 rounded-3xl border border-[#1e2330]/50 hover:border-[#3b82f6]/40 transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-[#3b82f6]/10"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Decorative quote mark */}
      <div className="absolute top-6 right-6 text-[#3b82f6]/10 text-8xl font-serif leading-none group-hover:text-[#3b82f6]/20 transition-colors duration-300">"</div>

      {/* Star rating with animation */}
      <motion.div
        className="flex mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: delay + 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
          >
            <Star className="w-5 h-5 text-[#3b82f6] fill-current" />
          </motion.div>
        ))}
      </motion.div>

      {/* Quote text */}
      <motion.p
        className="text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
      >
        {quote}
      </motion.p>

      {/* Author info */}
      <motion.div
        className="flex items-center relative z-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + 0.7 }}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6] to-[#1e40af] rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-white text-lg">{name}</div>
          <div className="text-[#3b82f6] text-sm font-medium">{role}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0c10] to-[#0f1117] border-t border-b border-[#1e2330]/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#3b82f6]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3b82f6]/3 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent mx-auto"></div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            What Drivers Say
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Real experiences from those who've embraced the future of electric driving
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {QUOTES.map((quote, index) => (
            <TestimonialCard
              key={quote.name}
              quote={quote.quote}
              name={quote.name}
              role={quote.role}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;