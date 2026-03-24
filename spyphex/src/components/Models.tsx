import { motion } from 'framer-motion';
import CarCard from './CarCard';
import x1Image from '../assets/cars/SYPHEX electric car lineup in studio.png';
import v7Image from '../assets/cars/SYPHEX hypercar in moody studio__endoftext__.png';
import gtrImage from '../assets/cars/Sleek black supercar at sunset.png';

const CARS = [
  {
    name: 'SYPHEX X1',
    image: x1Image,
    price: '$89,000',
    stats: { acceleration: '2.3s', range: '750km', power: '900HP' },
  },
  {
    name: 'SYPHEX V7',
    image: v7Image,
    price: '$129,000',
    stats: { acceleration: '1.9s', range: '680km', power: '1100HP' },
  },
  {
    name: 'SYPHEX GT-R',
    image: gtrImage,
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