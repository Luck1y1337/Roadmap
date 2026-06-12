import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'Welcome to Luck1y OS v1.0.0' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [isHacked, setIsHacked] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', text: trimmed }];
    
    switch (trimmed.toLowerCase()) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands: help, whoami, skills, roadmap, clear, sudo hack' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'Luck1y - 15yo developer from Fergana aiming for Global IT Industry.' });
        break;
      case 'skills':
        newHistory.push({ type: 'output', text: 'React, Node.js, TailwindCSS, MERN stack, TypeScript' });
        break;
      case 'roadmap':
        newHistory.push({ type: 'output', text: 'Current phase: Learning MERN. Next: Cybersecurity or advanced Dev.' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo hack':
        newHistory.push({ type: 'output', text: 'Accessing mainframe... bypassing security... ENCRYPTED ACCESS GRANTED.' });
        setTimeout(() => setIsHacked(true), 1000);
        setTimeout(() => { setIsHacked(false); setIsOpen(false); }, 7000); // end hack effect after 6s
        break;
      default:
        newHistory.push({ type: 'output', text: `Command not found: ${trimmed}` });
    }
    setHistory(newHistory);
    setInput('');
  };

  return (
    <>
      {/* Button to open terminal */}
      <button 
        className="fixed bottom-6 right-6 w-14 h-14 bg-card border border-border rounded-full flex items-center justify-center text-accent-cyan cursor-pointer z-50 shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:scale-110 transition-transform hover:border-accent-cyan"
        onClick={() => setIsOpen(!isOpen)}
        title="Terminal"
      >
        <span className="text-xl font-mono">{'>_'}</span>
      </button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && !isHacked && (
          <motion.div 
            drag dragMomentum={false} dragElastic={0}
            initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-2rem)] h-[400px] bg-[#0d1117] border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="bg-[#161b22] px-4 py-2.5 border-b border-border flex justify-between items-center cursor-move select-none">
              <span className="text-xs text-text-muted font-mono">root@luck1y:~</span>
              <div className="flex gap-2">
                <button className="w-3 h-3 rounded-full bg-accent-amber/80 hover:bg-accent-amber border-none cursor-pointer transition-colors" onClick={() => setIsOpen(false)} />
                <button className="w-3 h-3 rounded-full bg-accent-red/80 hover:bg-accent-red border-none cursor-pointer transition-colors" onClick={() => setIsOpen(false)} />
              </div>
            </div>
            {/* Body */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto flex flex-col gap-1.5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--color-border) transparent' }}>
              {history.map((h, i) => (
                <div key={i} className={h.type === 'input' ? 'text-accent-cyan' : 'text-text-secondary leading-relaxed'}>
                  {h.type === 'input' && <span className="text-text-muted mr-2">Luck1y ~$</span>}
                  {h.text}
                </div>
              ))}
              <div className="flex items-center mt-2">
                <span className="text-accent-green mr-2">Luck1y ~$</span>
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
                  className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-xs"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={endRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sudo Hack Matrix Effect */}
      <AnimatePresence>
        {isHacked && <MatrixEffect onClose={() => setIsHacked(false)} />}
      </AnimatePresence>
    </>
  );
}

function MatrixEffect({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <canvas id="matrix-canvas" className="absolute inset-0" />
      <div className="relative z-10 bg-black/60 p-8 border border-[#0F0] rounded-xl text-center shadow-[0_0_50px_#0F0]">
        <h1 className="text-[#0F0] font-mono text-4xl mb-4 animate-pulse">SYSTEM COMPROMISED</h1>
        <p className="text-[#0F0]/80 font-mono text-lg">Hacked by Luck1y</p>
        <p className="text-[#0F0]/50 font-mono text-sm mt-8 animate-bounce">Click anywhere to restore</p>
      </div>
    </motion.div>
  );
}
