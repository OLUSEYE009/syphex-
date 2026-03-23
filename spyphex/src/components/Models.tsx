import { motion } from 'framer-motion';
import CarCard from './CarCard';

const CARS = [
  {
    name: 'SYPHEX X1',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80',
    price: '$89,000',
    stats: { acceleration: '2.3s', range: '750km', power: '900HP' },
  },
  {
    name: 'SYPHEX V7',
    image: 'https://images.unsplash.com/photo-1611821064430-0d40291d8b82?w=800&q=80',
    price: '$129,000',
    stats: { acceleration: '1.9s', range: '680km', power: '1100HP' },
  },
  {
    name: 'SYPHEX GT-R',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&q=80',
    price: '$69,000',
    stats: { acceleration: '3.1s', range: '850km', power: '750HP' },
  },
];

const Models = () => {
  return (
    <section id="models" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Fleet</h2>
          <p className="text-gray-400 text-lg">Discover the vehicles that define the future</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARS.map((car, index) => (
            <CarCard
              key={car.name}
              name={car.name}
              image={car.image}
              price={car.price}
              stats={car.stats}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Models;