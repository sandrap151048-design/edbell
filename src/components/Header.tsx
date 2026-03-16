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
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-white border-b border-gray-100 ${isScrolled ? 'py-1 lg:py-1.5 shadow-md' : 'py-2 lg:py-3 shadow-sm'}`}>
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center group">
          {/* Logo Cluster */}
          <Link href="/" className="flex items-center group relative z-10 transition-all hover:scale-105">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="/edbell-logo.png" 
              alt="EdBell Edusolutions" 
              className="h-16 lg:h-24 w-auto object-contain drop-shadow-[0_4px_15px_rgba(37,99,235,0.25)] group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('logo-fallback-header');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback text - only shown if image fails */}
            <div id="logo-fallback-header" className="hidden items-center space-x-2 ml-1">
              <span className="text-2xl lg:text-3xl font-black tracking-tighter leading-none transition-colors text-gray-900 group-hover:text-blue-600">EdBell</span>
              <span className="text-[9px] lg:text-[10px] font-black text-blue-600 tracking-[0.25em] uppercase opacity-80">edusolutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-2 xl:px-3 py-2 text-[9px] xl:text-[10px] font-black text-gray-800 hover:text-blue-700 transition-all tracking-[0.1em] xl:tracking-[0.2em] group flex items-center"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-2 xl:left-3 right-2 xl:right-3 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Action Cluster */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl text-[9px] sm:text-[10px] font-black tracking-widest text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all"
                >
                  <User className="h-3 w-3 text-[var(--primary)] outline-none" />
                  <span className="hidden 2xl:inline">DASHBOARD</span>
                  <span className="2xl:hidden">ADMIN</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center outline-none"
                >
                  <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
                <Link
                  href="/login"
                  className="px-3 sm:px-6 py-2 text-[10px] sm:text-[11px] font-black tracking-widest text-gray-700 hover:text-blue-700 transition-colors flex items-center outline-none"
                >
                  LOGIN
                </Link>
                <Link
                  href="/contact"
                  className="group relative px-4 sm:px-8 py-2.5 sm:py-3 bg-blue-700 rounded-xl text-white text-[10px] sm:text-[11px] font-black tracking-widest hover:bg-blue-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5 overflow-hidden flex items-center outline-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative flex items-center">
                    GET STARTED <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            )}

            {/* Mobile Interface Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 sm:p-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 hover:bg-gray-100 transition-all outline-none"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dynamic Interface */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[150] animate-fade-in">
            <div className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-3xl" onClick={() => setIsMenuOpen(false)}></div>

            <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[var(--bg-secondary)] border-l border-[var(--border)] shadow-2xl flex flex-col p-8 space-y-12 overflow-y-auto animate-fade-in-right">
              <div className="flex justify-between items-center">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                  <img 
                    src="/edbell-logo.png" 
                    alt="EdBell Edusolutions" 
                    className="h-24 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
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