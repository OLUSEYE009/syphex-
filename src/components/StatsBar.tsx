import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const Counter = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const start = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(easeOutCubic * end);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold font-heading">
        {count.toFixed(end % 1 === 0 ? 0 : 1)}{suffix}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wide mt-2">{label}</div>
    </div>
  );
};

const StatsBar = () => {
  const stats = [
    { label: '0-100 km/h', value: 2.1, suffix: 's' },
    { label: 'Max Range', value: 800, suffix: 'km' },
    { label: 'Peak Power', value: 1200, suffix: 'HP' },
    { label: 'Warranty', value: 5, suffix: ' Years' },
  ];

  return (
    <section className="py-16 border-t border-b border-[#1e2330] bg-[#0f1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <Counter key={index} end={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;