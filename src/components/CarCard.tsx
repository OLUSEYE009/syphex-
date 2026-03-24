import { motion } from 'framer-motion';
import { Zap, Gauge, Flame } from 'lucide-react';

interface CarCardProps {
  name: string;
  image: string;
  price: string;
  stats: { acceleration: string; range: string; power: string };
  delay: number;
  onConfigure: () => void;
}

const CarCard = ({ name, image, price, stats, delay, onConfigure }: CarCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative bg-[#0f1117] rounded-3xl overflow-hidden border border-[#1e2330] hover:border-[#3b82f6]/50 transition-colors"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] to-transparent"></div>
        <div className="absolute top-4 right-4 bg-[#3b82f6] text-white px-3 py-1 rounded-full text-sm font-medium">
          {price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold font-heading mb-4">{name}</h3>
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-2 bg-[#1e2330] px-3 py-2 rounded-lg group-hover:border-[#3b82f6]/50 transition-colors">
            <Zap className="w-4 h-4 text-[#3b82f6]" />
            <span className="text-sm">{stats.acceleration}</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#1e2330] px-3 py-2 rounded-lg group-hover:border-[#3b82f6]/50 transition-colors">
            <Gauge className="w-4 h-4 text-[#3b82f6]" />
            <span className="text-sm">{stats.range}</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#1e2330] px-3 py-2 rounded-lg group-hover:border-[#3b82f6]/50 transition-colors">
            <Flame className="w-4 h-4 text-[#3b82f6]" />
            <span className="text-sm">{stats.power}</span>
          </div>
        </div>
        <button
          onClick={onConfigure}
          className="w-full bg-[#1e2330] text-white py-3 rounded-lg font-medium hover:bg-[#3b82f6] transition-colors"
        >
          Configure & Order
        </button>
      </div>
    </motion.div>
  );
};

export default CarCard;