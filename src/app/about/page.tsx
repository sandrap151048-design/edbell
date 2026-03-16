'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Users,
  Target,
  Trophy,
  History,
  TrendingUp,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Shield,
  Cpu,
  Orbit,
  Layers
} from 'lucide-react';

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const timeline = [
    { year: "2024", title: "GENESIS", desc: "Initialization in Kerala. Core mission parameters established." },
    { year: "2024", title: "NETWORK_SYNC", desc: "UGC-DEB partner node integration finalized." },
    { year: "2025", title: "ECOSYSTEM_v1", desc: "Edbell Digital Portal deployed for global operations." },
    { year: "FUTURE", title: "EXPANSION_CORE", desc: "Scaling across every domestic educational zone." }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30 overflow-hidden">
      {/* Visionary Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240715632-99045506af5c?auto=format&fit=crop&q=80"
            alt="University Students Backdrop"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-[var(--bg-primary)]"></div>
        </div>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523050338692-7b835a07973f?auto=format&fit=crop&q=80"
            alt="About Backdrop"
            className="w-full h-full object-cover opacity-10 filter grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]"></div>
        </div>

        {/* Background Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border border-blue-500/5 rounded-full animate-[spin_100s_linear_infinite] pointer-events-none">
          <div className="absolute top-[10%] left-1/2 w-24 h-24 bg-blue-600/10 blur-[80px] rounded-full"></div>
          <div className="absolute bottom-[10%] left-1/2 w-24 h-24 bg-indigo-600/10 blur-[80px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <div className="flex flex-col items-center text-center">
            <div className={`space-y-5 sm:space-y-6 text-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-3 bg-[var(--surface)]/40 border border-[var(--border)] rounded-full px-4 py-1.5 backdrop-blur-3xl mx-auto">
                <img src="/edbell-logo.png" alt="" className="h-4 w-4 sm:h-5 sm:w-5 object-contain" />
                <span className="text-[8px] sm:text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">The Architects of Future Learning</span>
              </div>

              <div className="space-y-4">
                <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)] leading-[0.85] tracking-tighter uppercase not-italic font-serif ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
                  Beyond <br />
                  <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Boundaries</span>
                </h1>
                <p className={`text-sm sm:text-base lg:text-lg text-[var(--text-primary)] font-light max-w-xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
                  We are the structural integrity for the next generation of global scholars. Since 2024, our mission has been the high-speed democratization of top-tier education.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="px-8 py-3.5 bg-[var(--primary)] rounded-xl text-white font-black text-xs sm:text-sm uppercase tracking-widest hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Protocol - Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-secondary)] relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-3 text-center lg:text-left">
              <span className="text-[9px] sm:text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Mission Parameters</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-[0.9]">Encoded <br /> With Value</h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              {[
                { title: "Excellence", icon: <Target className="w-5 h-5" />, desc: "Highest academic standards achieved via precision auditing." },
                { title: "Innovation", icon: <Zap className="w-5 h-5" />, desc: "Leveraging technical stacks to transform traditional pedagogical models." },
                { title: "Integrity", icon: <Shield className="w-5 h-5" />, desc: "Absolute transparency in every synchronized transaction." }
              ].map((v, i) => (
                <div key={i} className="flex space-x-4 sm:space-x-5 group">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all shadow-xl flex-shrink-0">
                    {v.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm sm:text-base lg:text-lg font-black text-[var(--text-heading)] uppercase tracking-tight">{v.title}</h4>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] font-light leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 lg:mt-0 flex justify-center">
            <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[var(--primary)] rounded-tl-xl z-10"></div>
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-[var(--primary)] rounded-tr-xl z-10"></div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-[var(--primary)] rounded-bl-xl z-10"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[var(--primary)] rounded-br-xl z-10"></div>

              {/* Photo */}
              <div className="rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-blue-900/30">
                <img
                  src="/about-director.jpg"
                  alt="Director - EdBell Edusolutions"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Name Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl px-6 py-3 shadow-xl backdrop-blur-xl whitespace-nowrap">
                <p className="text-xs font-black text-[var(--text-heading)] uppercase tracking-widest text-center">Adv. Arif Wafy</p>
                <p className="text-[9px] font-bold text-[var(--primary)] uppercase tracking-[0.2em] text-center mt-0.5">Founder & Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Odyssey - Modern Timeline */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-primary)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 lg:space-y-20">
          <div className="text-center space-y-3">
            <span className="text-[9px] sm:text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">The Chronology</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[var(--text-heading)] uppercase tracking-tighter">Growth Architecture</h2>
          </div>

          <div className="space-y-12 sm:space-y-16 lg:space-y-20 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden lg:block"></div>

            {timeline.map((item, i) => (
              <div key={i} className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 text-center lg:text-right">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)]/5 uppercase tracking-tighter select-none">{item.year}</span>
                </div>
                <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--primary)] border-[6px] sm:border-[8px] border-[var(--bg-primary)] shadow-[0_0_20px_rgba(59,130,246,0.4)] hidden lg:block"></div>
                <div className={`lg:w-1/2 space-y-2 text-center lg:text-left`}>
                  <h4 className="text-xl sm:text-2xl lg:text-2xl font-black text-[var(--text-heading)] uppercase tracking-tight">{item.title}</h4>
                  <p className="text-sm sm:text-base text-[var(--text-primary)] font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
