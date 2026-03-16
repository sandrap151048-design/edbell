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
      {/* Visionary Hero - Re-engineered for full content and animations */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-6 overflow-hidden">
        {/* Massive Background Image */}
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

        {/* Massive Background Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1400px] max-h-[1400px] border border-blue-500/5 rounded-full animate-[spin_100s_linear_infinite] pointer-events-none">
          <div className="absolute top-[10%] left-1/2 w-40 h-40 bg-blue-600/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[10%] left-1/2 w-40 h-40 bg-indigo-600/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center text-center">
            {/* Heading Content */}
            <div className={`space-y-8 text-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-4 bg-[var(--surface)]/40 border border-[var(--border)] rounded-full px-6 py-2 backdrop-blur-3xl mx-auto">
                <Orbit className="h-4 w-4 text-[var(--primary)] animate-spin" />
                <span className="text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.5em]">The Architects of Future Learning</span>
              </div>

              <div className="space-y-6">
                <h1 className={`text-4xl sm:text-5xl lg:text-5xl font-black text-[var(--text-heading)] leading-[0.85] tracking-tighter uppercase not-italic font-serif ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
                  Beyond <br />
                  <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Boundaries</span>
                </h1>
                <p className={`text-base sm:text-lg lg:text-xl text-[var(--text-primary)] font-light max-w-2xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
                  We are the structural integrity for the next generation of global scholars. Since 2024, our mission has been the high-speed democratization of top-tier education.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
                <Link href="/contact" className="px-10 py-5 bg-[var(--primary)] rounded-2xl text-white font-black text-sm uppercase tracking-widest hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Protocol - Values */}
      <section className="py-24 lg:py-40 bg-[var(--bg-secondary)] relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="space-y-12 lg:space-y-16">
            <div className="space-y-6 text-center lg:text-left">
              <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.5em]">Mission Parameters</span>
              <h2 className="text-5xl lg:text-8xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-[0.9]">Encoded <br /> With Value</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:gap-10">
              {[
                { title: "Excellence", icon: <Target />, desc: "Highest academic standards achieved via precision auditing." },
                { title: "Innovation", icon: <Zap />, desc: "Leveraging technical stacks to transform traditional pedagogical models." },
                { title: "Integrity", icon: <Shield />, desc: "Absolute transparency in every synchronized transaction." }
              ].map((v, i) => (
                <div key={i} className="flex space-x-6 lg:space-x-8 group">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl lg:rounded-3xl bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all shadow-xl flex-shrink-0">
                    {v.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl lg:text-2xl font-black text-[var(--text-heading)] uppercase tracking-tight">{v.title}</h4>
                    <p className="text-base lg:text-lg text-[var(--text-primary)] font-light leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-20 lg:mt-0">
            <div className="absolute inset-0 bg-blue-600/10 blur-[150px] rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-4 lg:gap-8">
              <div className="space-y-4 lg:space-y-8">
                <div className="h-64 lg:h-80 bg-[var(--surface)] border border-[var(--border)] rounded-[30px] lg:rounded-[48px] overflow-hidden group shadow-lg">
                  <img src="/about-team.jpg" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000" />
                </div>
                <div className="h-48 lg:h-64 bg-[var(--primary)] rounded-[30px] lg:rounded-[48px] p-6 lg:p-10 flex flex-col justify-end shadow-xl">
                  <h5 className="text-3xl lg:text-4xl font-black text-white leading-none tracking-tighter uppercase">98.5%</h5>
                  <p className="text-[9px] lg:text-[10px] font-black text-blue-100 uppercase tracking-widest mt-2">Completion_Rate</p>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-8 pt-12 lg:pt-20">
                <div className="h-48 lg:h-64 bg-[var(--bg-primary)] border border-[var(--border)] rounded-[30px] lg:rounded-[48px] p-6 lg:p-10 flex flex-col justify-center items-center text-center shadow-lg">
                  <Users className="h-8 lg:h-10 w-8 lg:w-10 text-[var(--primary)] mb-4" />
                  <p className="text-xl lg:text-2xl font-black text-[var(--text-heading)] leading-none">5K+</p>
                  <p className="text-[9px] lg:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-2">Students_Enrolled</p>
                </div>
                <div className="h-64 lg:h-80 bg-[var(--surface)] border border-[var(--border)] rounded-[30px] lg:rounded-[48px] overflow-hidden group shadow-lg">
                  <img src="/about-campus.jpg" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Odyssey - Modern Timeline Vertical */}
      <section className="py-24 lg:py-40 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto px-6 space-y-24 lg:space-y-32">
          <div className="text-center space-y-6">
            <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.5em]">The Chronology</span>
            <h2 className="text-4xl lg:text-7xl font-black text-[var(--text-heading)] uppercase tracking-tighter">Growth Architecture</h2>
          </div>

          <div className="space-y-20 lg:space-y-40 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden lg:block"></div>

            {timeline.map((item, i) => (
              <div key={i} className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 text-center lg:text-right">
                  <span className="text-5xl lg:text-9xl font-black text-[var(--text-heading)]/5 uppercase tracking-tighter select-none">{item.year}</span>
                </div>
                <div className="relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--primary)] border-[8px] lg:border-[10px] border-[var(--bg-primary)] shadow-[0_0_30px_rgba(59,130,246,0.4)] hidden lg:block"></div>
                <div className={`lg:w-1/2 space-y-4 text-center lg:text-left`}>
                  <h4 className="text-3xl lg:text-4xl font-black text-[var(--text-heading)] uppercase tracking-tight">{item.title}</h4>
                  <p className="text-lg lg:text-xl text-[var(--text-primary)] font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
