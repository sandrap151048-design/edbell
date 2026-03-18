'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, CheckCircle, Loader2, Zap, LogIn, Sparkles } from 'lucide-react';

interface NewsletterProps {
  variant?: 'default' | 'compact' | 'sidebar';
  className?: string;
}

export default function Newsletter({ variant = 'default', className = '' }: NewsletterProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn');
      const userEmail = localStorage.getItem('userEmail');
      if (loggedIn === 'true' && userEmail) {
        setIsAuthenticated(true);
        setEmail(userEmail);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setMessage('AUTHENTICATION REQUIRED');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setMessage('SUBSCRIPTION SYNCHRONIZED');
      setIsLoading(false);
    }, 1500);
  };

  if (variant === 'sidebar') {
    return (
      <div className={`bg-[var(--bg-primary)]/60 backdrop-blur-3xl border border-[var(--border)] rounded-[40px] p-8 space-y-6 ${className}`}>
        <div className="space-y-4">
          <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Signal Subscription</span>
          <h3 className="text-xl font-black text-[var(--text-heading)] uppercase tracking-tighter">Stay Connected</h3>
        </div>
        {!isAuthenticated ? (
          <button onClick={() => router.push('/login')} className="w-full py-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest hover:text-[var(--text-heading)] transition-all">Initialize Auth</button>
        ) : isSubscribed ? (
          <div className="flex items-center space-x-3 text-emerald-500">
            <CheckCircle className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="IDENT_EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-6 py-4 text-xs font-bold text-[var(--text-heading)] focus:border-[var(--primary)]/50 outline-none transition-all"
              required
            />
            <button type="submit" disabled={isLoading} className="w-full py-4 bg-[var(--primary)] rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Subscribe Node'}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`relative bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[48px] p-10 lg:p-16 overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <Sparkles className="h-24 w-24 text-[var(--primary)]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-3 text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.5em]">
          <Zap className="h-4 w-4" />
          <span>Intelligence Stream</span>
        </div>
        <h3 className="text-4xl lg:text-6xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-none">Stay Ahead of the Curve</h3>
        <p className="text-lg text-[var(--text-primary)] font-light max-w-lg mx-auto">Join our elite network of students and professionals receiving real-time insights and career opportunities.</p>

        {!isAuthenticated ? (
          <button onClick={() => router.push('/login')} className="px-12 py-5 bg-[var(--surface)] border border-[var(--border)] rounded-3xl text-[10px] font-black text-[var(--text-heading)] uppercase tracking-[0.3em] hover:bg-[var(--primary)] hover:text-white transition-all">Connect Terminal</button>
        ) : isSubscribed ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 inline-block">
            <div className="flex items-center space-x-4 text-emerald-500">
              <CheckCircle className="h-8 w-8" />
              <span className="text-xl font-black uppercase tracking-tighter">{message}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Terminal Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-3xl px-8 py-5 text-sm font-bold text-[var(--text-heading)] focus:border-[var(--primary)]/50 outline-none transition-all placeholder:text-[var(--text-muted)]"
              required
            />
            <button type="submit" disabled={isLoading} className="px-10 py-5 bg-[var(--primary)] rounded-3xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
