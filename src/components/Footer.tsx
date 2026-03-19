'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Heart, Loader2, CheckCircle, ArrowRight, Zap, Globe, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(loggedIn);
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
    }, 1500);
  };

  const quickLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'COURSES', href: '/courses' },
    { name: 'UNIVERSITIES', href: '/universities' },
    { name: 'SERVICES', href: '/services' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'FB', icon: Facebook, href: '#' },
    { name: 'IG', icon: Instagram, href: '#' },
    { name: 'TW', icon: Twitter, href: '#' },
    { name: 'LN', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="relative bg-[var(--bg-primary)] pt-24 lg:pt-32 pb-12 overflow-hidden border-t border-[var(--border)]">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-[var(--primary)]/5 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-20 mb-20 lg:mb-24 items-start">

          {/* Brand Engine - Left Aligned */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-10 text-center md:text-left">
            <Link href="/" className="inline-block">
              <img 
                src="/edbell-logo.jpg?v=1.1" 
                alt="EdBell Edusolutions" 
                className="h-20 lg:h-28 w-auto object-contain mx-auto md:mx-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </Link>
            <p className="text-lg lg:text-xl text-[var(--text-primary)] font-light leading-relaxed max-w-md mx-auto md:mx-0">
              Engineering the future of education with high-performance digital infrastructure and global institutional partnerships.
            </p>
            <div className="space-y-4 lg:space-y-6 max-w-xs mx-auto md:mx-0">
              <div className="flex items-start space-x-4 text-left">
                <div className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--primary)] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-xs lg:text-sm font-bold text-[var(--text-primary)] tracking-tight uppercase">
                  15/382, Calicut Tower, <br /> Kozhikode Road, Wayanad, Kerala
                </div>
              </div>
              <a href="tel:+91924130060" className="flex items-center space-x-4 text-left hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-xs lg:text-sm font-bold text-[var(--text-primary)] tracking-tight">+91 92413 0060</div>
              </a>
              <a href="mailto:info@edbelledusolutions.com" className="flex items-center space-x-4 text-left hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-xs lg:text-sm font-bold text-[var(--text-primary)] tracking-tight uppercase truncate">info@edbelledusolutions.com</div>
              </a>
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:gap-12 text-center md:text-left">
            <div className="space-y-6 lg:space-y-8">
              <h4 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Matrix</h4>
              <ul className="space-y-4">
                {quickLinks.slice(0, 4).map(l => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-[10px] lg:text-xs font-black text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors tracking-widest uppercase">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <h4 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Support</h4>
              <ul className="space-y-4">
                {quickLinks.slice(4).map(l => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-[10px] lg:text-xs font-black text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors tracking-widest uppercase">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Communications Hub */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-10">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[30px] lg:rounded-[40px] p-8 lg:p-10 shadow-xl">
              <h4 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em] mb-6 text-center">Protocol Subscription</h4>
              {isSubscribed ? (
                <div className="text-center py-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl animate-fade-in">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Subscriber Sync Complete</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="EMAIL_ENDPOINT"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl py-4 lg:py-5 px-6 text-[var(--text-heading)] text-[10px] lg:text-xs font-bold placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]/50 transition-all"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isAuthenticated ? (
                    <Link
                      href="/login"
                      className="w-full py-4 lg:py-5 bg-[var(--primary)] rounded-2xl text-white text-[10px] lg:text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center space-x-2"
                    >
                      Login to Subscribe
                    </Link>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 lg:py-5 bg-[var(--primary)] rounded-2xl text-white text-[10px] lg:text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center space-x-2"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Subscribe</span>}
                    </button>
                  )}
                </form>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
              <div className="flex space-x-4">
                {socialLinks.map(s => (
                  <Link key={s.name} href={s.href} className="w-10 h-10 lg:w-12 lg:h-12 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white transition-all">
                    <s.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-3 text-[9px] lg:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                <Globe className="h-4 w-4" />
                <span>Global Reach</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer / Sub-footer */}
        <div className="pt-12 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 text-center md:text-left">
          <p className="text-[9px] lg:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">
            © {currentYear} EDBELL EDUSOLUTIONS LLP // ALL_RIGHTS_RESERVED
          </p>
          <div className="flex items-center space-x-6 lg:space-x-8 text-[9px] lg:text-[10px] font-black text-[var(--text-muted)] tracking-[0.2em]">
            <Link href="#" className="hover:text-[var(--primary)] transition-colors uppercase">Security</Link>
            <Link href="#" className="hover:text-[var(--primary)] transition-colors uppercase">Privacy</Link>
            <Link href="#" className="hover:text-[var(--primary)] transition-colors uppercase">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
