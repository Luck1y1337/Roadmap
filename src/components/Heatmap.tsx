import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Heatmap() {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem('luck1y_activity');
        if (saved) setData(JSON.parse(saved));
      } catch {}
    };
    loadData();
    window.addEventListener('activity-updated', loadData);
    return () => window.removeEventListener('activity-updated', loadData);
  }, []);

  // Generate last 365 days
  const today = new Date();
  const days = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }

  // Weeks for grid (approx 52 weeks)
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-white/5 border border-white/5';
    if (count < 3) return 'bg-accent-cyan/30 border border-accent-cyan/40';
    if (count < 6) return 'bg-accent-cyan/60 border border-accent-cyan/70';
    return 'bg-accent-cyan border border-accent-cyan shadow-[0_0_8px_rgba(0,212,255,0.4)]';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
          <span className="text-accent-green">🟩</span> Faollik Grafigi
        </h3>
        <span className="text-xs text-text-muted">So'nggi yil</span>
      </div>
      
      <div className="overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map(day => (
                <motion.div
                  key={day}
                  title={`${day}: ${data[day] || 0} ta vazifa`}
                  className={`w-3.5 h-3.5 rounded-sm transition-colors duration-300 ${getColor(data[day] || 0)}`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
