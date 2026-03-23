import { motion } from 'framer-motion';
import { Cpu, Maximize, BatteryCharging, Radio, ChevronDown } from 'lucide-react';

const FEATURES = [
  { icon: <Cpu className="w-8 h-8" />, title: 'Autonomous Driving', description: 'Advanced AI systems for safe and efficient navigation.' },
  { icon: <Maximize className="w-8 h-8" />, title: 'Smart Dashboard', description: 'Intuitive interface with real-time vehicle diagnostics.' },
  { icon: <BatteryCharging className="w-8 h-8" />, title: 'Solid-State Battery', description: 'Next-gen battery technology for extended range and faster charging.' },
  { icon: <Radio className="w-8 h-8" />, title: 'Connected Vehicle', description: 'Seamless integration with smart home and mobile devices.' },
];

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative bg-[#0f1117] p-6 rounded-2xl border border-[#1e2330] hover:border-[#3b82f6]/50 transition-colors overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent"></div>
      <div className="relative">
        <div className="text-[#3b82f6] mb-4">{icon}</div>
        <h3 className="text-xl font-bold font-heading mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

const Innovation = () => {
  return (
    <section id="innovation" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial from-[#3b82f6]/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Built on <span className="text-[#3b82f6] drop-shadow-lg">Innovation</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Every SYPHEX vehicle is engineered with cutting-edge technology to deliver unparalleled performance and sustainability.
            </p>
            <a href="#models" className="inline-flex items-center space-x-2 text-[#3b82f6] font-medium group">
              <span>Learn More</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </motion.div>
            </a>
          </motion.div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;