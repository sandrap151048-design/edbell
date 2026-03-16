'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, ArrowRight, Zap, Sparkles } from 'lucide-react';

const Header = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn');
      const email = localStorage.getItem('userEmail');

      if (loggedIn === 'true' && email) {
        setIsAuthenticated(true);
        setUserEmail(email);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail('');
    router.push('/');
  };

  const navigation = [
    { name: 'HOME', href: '/' },
    { name: 'UNIVERSITIES', href: '/universities' },
    { name: 'COURSES', href: '/courses' },
    { name: 'SERVICES', href: '/services' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'BLOG', href: '/blog' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
      ? 'py-3 lg:py-4 bg-white border-b border-gray-200 shadow-lg'
      : 'py-4 lg:py-6 bg-transparent border-b border-transparent'
      }`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Cluster */}
          <Link href="/" className="flex items-center group relative z-10 transition-all hover:scale-105">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative h-10 w-10 lg:h-14 lg:w-14 flex items-center justify-center">
              <img 
                src="/edbell-logo.png" 
                alt="EDBELL" 
                className="h-full w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextLevel = e.currentTarget.parentElement?.nextElementSibling;
                  if (nextLevel) (nextLevel as HTMLElement).style.display = 'flex';
                }}
              />
            </div>
            {/* Fallback text - only shown if image fails */}
            <div className="hidden flex-col ml-3">
              <span className={`text-xl lg:text-3xl font-black tracking-tighter leading-none transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'} group-hover:text-blue-600`}>EDBELL</span>
              <span className="text-[8px] lg:text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase opacity-80">Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation - High-Impact Typography */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-5 py-2 text-[11px] font-black transition-all tracking-[0.2em] group ${isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-[var(--text-secondary)] hover:text-[var(--text-heading)]'}`}
              >
                <span className="relative z-10">{item.name}</span>
                <span className={`absolute bottom-0 left-5 right-5 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full ${isScrolled ? 'bg-blue-600' : 'bg-[var(--primary)]'}`}></span>
              </Link>
            ))}
          </nav>

          {/* Action Cluster */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black tracking-widest text-slate-200 hover:bg-white/5 transition-all"
                >
                  <User className="h-3 w-3 text-blue-400" />
                  <span>DASHBOARD</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`px-4 py-2 text-[10px] font-black tracking-widest transition-colors ${isScrolled ? 'text-gray-800 hover:text-gray-900' : 'text-slate-300 hover:text-white'}`}
                >
                  LOGIN
                </Link>
                <Link
                  href="/contact"
                  className="group relative px-6 py-2.5 bg-blue-600 rounded-xl text-white text-[10px] font-black tracking-widest hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative flex items-center">
                    GET STARTED <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            )}

            {/* Mobile Interface Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[var(--text-heading)] hover:bg-[var(--surface-alt)] transition-all shadow-xl"
            >
              {isMenuOpen ? <X className="h-6 w-6 stroke-[2.5]" /> : <Menu className="h-6 w-6 stroke-[2.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dynamic Interface */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[150] lg:hidden animate-fade-in">
            <div className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-3xl" onClick={() => setIsMenuOpen(false)}></div>

            <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[var(--bg-secondary)] border-l border-[var(--border)] shadow-2xl flex flex-col p-8 space-y-12 overflow-y-auto animate-fade-in-right">
              <div className="flex justify-between items-center">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-black text-[var(--text-heading)] tracking-tighter">EDBELL</span>
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-[var(--surface)] rounded-2xl text-[var(--text-heading)]">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-black text-[var(--text-heading)] hover:text-[var(--primary)] transition-colors tracking-tighter uppercase"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-3xl border border-white/10">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold uppercase">
                        {userEmail[0]}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Session</p>
                        <p className="text-sm font-bold text-white truncate">{userEmail}</p>
                      </div>
                    </div>
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center justify-center py-5 bg-white/5 border border-white/10 rounded-3xl text-white font-black uppercase tracking-widest text-xs"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-5 bg-red-600/10 border border-red-600/20 text-red-500 rounded-3xl font-black uppercase tracking-widest text-xs"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center justify-center py-5 bg-white/5 border border-white/10 rounded-3xl text-white font-black uppercase tracking-widest text-xs"
                    >
                      Auth Terminal
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center justify-center py-4 bg-blue-600 rounded-2xl text-white font-black uppercase tracking-widest text-[10px]"
                    >
                      GET STARTED
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;