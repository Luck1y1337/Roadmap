import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { api } from '../api';
import { useLanguage } from '../LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
        login(res.token, res.user);
        onClose();
      } else {
        const res = await api.post('/auth/register', formData);
        login(res.token, res.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.msg || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] bg-card border border-border rounded-2xl p-8 z-[210] shadow-2xl" initial={{ opacity: 0, y: '-45%', x: '-50%' }} animate={{ opacity: 1, y: '-50%', x: '-50%' }} exit={{ opacity: 0, y: '-45%', x: '-50%' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{isLogin ? 'Tizimga kirish' : 'Ro\'yxatdan o\'tish'}</h2>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary bg-transparent border-none cursor-pointer text-xl">✕</button>
            </div>

            {error && <div className="bg-accent-red-light/20 text-accent-red p-3 rounded-lg text-sm mb-4 border border-accent-red/20">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-text-secondary">Foydalanuvchi nomi</label>
                  <input type="text" required value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className="bg-white/5 border border-border rounded-lg p-3 outline-none text-text-primary focus:border-accent-cyan transition-colors" placeholder="Masalan: luck1y" />
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-text-secondary">Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-white/5 border border-border rounded-lg p-3 outline-none text-text-primary focus:border-accent-cyan transition-colors" placeholder="example@gmail.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-text-secondary">Parol</label>
                <input type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="bg-white/5 border border-border rounded-lg p-3 outline-none text-text-primary focus:border-accent-cyan transition-colors" placeholder="••••••••" />
              </div>
              
              <button type="submit" disabled={loading} className="w-full py-3.5 mt-2 bg-gradient-main text-[#06080f] font-bold rounded-lg cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? 'Kutib turing...' : (isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish')}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-text-muted">
              {isLogin ? 'Akkauntingiz yo\'qmi? ' : 'Allaqachon ro\'yxatdan o\'tganmisiz? '}
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="bg-transparent border-none text-accent-cyan font-medium cursor-pointer hover:underline">
                {isLogin ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
