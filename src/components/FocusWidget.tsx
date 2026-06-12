import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FocusWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <>
      <button 
        className="fixed bottom-24 right-6 w-14 h-14 bg-card border border-border rounded-full flex items-center justify-center text-accent-purple cursor-pointer z-50 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:scale-110 transition-transform hover:border-accent-purple"
        onClick={() => setIsOpen(!isOpen)}
        title="Focus Mode"
      >
        <span className="text-xl">🎧</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            drag dragMomentum={false} dragElastic={0}
            initial={{ opacity: 0, scale: 0.8, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8, x: 50 }}
            className="fixed bottom-40 right-6 w-[300px] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-[100]"
          >
            <div className="bg-[#161b22] px-4 py-2.5 border-b border-border flex justify-between items-center cursor-move select-none">
              <span className="text-xs font-semibold text-text-primary flex items-center gap-2"><span className="text-accent-purple">🎧</span> Focus Mode</span>
              <button className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 text-text-muted flex items-center justify-center border-none cursor-pointer transition-colors" onClick={() => setIsOpen(false)}>✕</button>
            </div>
            
            <div className="p-5 flex flex-col items-center gap-4">
              <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                <button className={`px-4 py-1.5 rounded-md text-xs font-medium border-none cursor-pointer transition-colors ${mode === 'work' ? 'bg-accent-purple text-white' : 'bg-transparent text-text-secondary hover:text-text-primary'}`} onClick={() => { setMode('work'); setTimeLeft(25 * 60); setIsActive(false); }}>Work</button>
                <button className={`px-4 py-1.5 rounded-md text-xs font-medium border-none cursor-pointer transition-colors ${mode === 'break' ? 'bg-accent-green text-[#06080f]' : 'bg-transparent text-text-secondary hover:text-text-primary'}`} onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}>Break</button>
              </div>

              <div className={`text-5xl font-mono font-bold tracking-wider ${mode === 'work' ? 'text-accent-purple' : 'text-accent-green'}`}>
                {minutes}:{seconds}
              </div>

              <div className="flex gap-3">
                <button onClick={toggleTimer} className={`px-6 py-2 rounded-lg font-semibold text-sm border-none cursor-pointer transition-transform hover:scale-105 active:scale-95 ${isActive ? 'bg-accent-amber text-[#06080f]' : 'bg-accent-purple text-white'}`}>
                  {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-text-primary font-semibold text-sm border-none cursor-pointer transition-transform hover:scale-105 active:scale-95">
                  Reset
                </button>
              </div>

              <div className="w-full mt-2 rounded-lg overflow-hidden border border-border bg-black">
                <iframe 
                  width="100%" 
                  height="140" 
                  src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&showinfo=0" 
                  title="Lofi Girl" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                />
              </div>
              <p className="text-[0.65rem] text-text-muted mt-1 text-center">Tinglash uchun videoni yoqing (Unmute)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
