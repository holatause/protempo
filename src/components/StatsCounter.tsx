import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, BarChart } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color: string;
}

interface StatsCounterProps {
  inView?: boolean;
}

const StatsCounter: React.FC<StatsCounterProps> = ({ inView = true }) => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  
  const stats: Stat[] = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: 37,
      label: 'Aumento en conversiones',
      suffix: '%',
      color: 'from-blue-600 to-blue-800'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      value: 68,
      label: 'Ahorro de tiempo',
      suffix: '%',
      color: 'from-blue-700 to-blue-900'
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: 1250,
      label: 'Agencias colombianas',
      prefix: '+',
      color: 'from-blue-800 to-blue-950'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      value: 3.2,
      label: 'ROI promedio',
      prefix: 'x',
      color: 'from-blue-600 to-blue-900'
    }
  ];

  useEffect(() => {
    if (!inView) {
      setCounts([0, 0, 0, 0]);
      return;
    }

    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts(prevCounts => {
          const newCounts = [...prevCounts];
          const step = Math.max(1, stat.value / 50);
          
          if (newCounts[index] < stat.value) {
            newCounts[index] = Math.min(stat.value, newCounts[index] + step);
          }
          
          return newCounts;
        });
      }, 30);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [inView]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className={`bg-gradient-to-r ${stat.color} p-4 flex justify-center`}>
            <div className="bg-white/20 p-2 rounded-full text-white">
              {stat.icon}
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="text-3xl font-bold text-gray-800">
              {stat.prefix && <span>{stat.prefix}</span>}
              {stat.value === 3.2 ? counts[index].toFixed(1) : Math.round(counts[index])}
              {stat.suffix && <span>{stat.suffix}</span>}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCounter;
