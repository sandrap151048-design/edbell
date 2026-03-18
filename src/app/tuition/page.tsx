'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  BookOpen,
  CheckCircle2,
  Cpu,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Settings,
  CircleDot,
  GraduationCap,
  Calculator,
  Beaker,
  History
} from 'lucide-react';

export default function TuitionServices() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { title: "STEM Core Mastery", icon: <Beaker className="h-5 w-5" />, desc: "High-performance Science and Mathematics acceleration nodes for all curricula." },
    { id: "NODE_HUMANITIES", name: "Strategic Humanities", icon: <History className="h-5 w-5" />, desc: "Deep-dive analytical coaching for History, Civics, and Social Sciences." },
    { title: "Academic Audit", icon: <Calculator className="h-5 w-5" />, desc: "Regular performance auditing and milestone tracking for primary-secondary levels." },
    { title: "Board Calibration", icon: <GraduationCap className="h-5 w-5" />, desc: "Specialized preparation sub-systems for CBSE, ICSE, and Kerala State boards." }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30 overflow-hidden pt-24 text-white">
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80" 
            alt="Tuition Excellence" 
            className="w-full h-full object-cover opacity-10 filter blur-[2px] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]"></div>
        </div>

        <div className={`relative z-10 max-w-4xl w-full text-center space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 backdrop-blur-3xl mx-auto">
            <BookOpen className="h-4 w-4 text-blue-500" />
            <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em]">Pedagogical_Audit_Active</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] font-serif">
            Tuition <br />
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text italic">
              Excellence
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-[var(--text-primary)] font-light max-w-2xl mx-auto leading-relaxed">
            Deployment of elite subject-matter experts for academic acceleration across all levels. Focused coaching nodes designed for board excellence and competitive readiness.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/contact" className="px-10 py-4 bg-blue-600 rounded-2xl text-white font-black text-xs uppercase tracking-widest hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all">
                Enroll In Node
             </Link>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border)]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="p-8 bg-[var(--bg-primary)] border border-[var(--border)] rounded-[32px] hover:border-blue-500/50 transition-all group">
                   <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon || <Sparkles className="h-5 w-5" />}
                   </div>
                   <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">{feature.title || feature.name}</h3>
                   <p className="text-xs text-[var(--text-primary)] leading-relaxed font-light">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Node Subjects */}
      <section className="py-20">
         <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
               { sub: "PHYSICS", rate: "Lvl_04" },
               { sub: "CHEMISTRY", rate: "Lvl_04" },
               { sub: "BIOLOGY", rate: "Lvl_04" },
               { sub: "COMPUTING", rate: "Lvl_05" },
               { sub: "ADVANCED MATHS", rate: "Lvl_05" },
               { sub: "ENTRANCE PREP", rate: "EXAM_CORE" }
            ].map((sub, i) => (
               <div key={i} className="flex flex-col items-center justify-center p-8 bg-[var(--surface)]/30 border border-[var(--border)] rounded-[40px] text-center shadow-lg hover:bg-[var(--surface-alt)]/50 transition-all">
                  <span className="text-[9px] font-black text-blue-500 tracking-[0.3em] uppercase mb-4 opacity-70">{sub.rate}</span>
                  <h4 className="text-lg font-black tracking-tighter uppercase text-white">{sub.sub}</h4>
               </div>
            ))}
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
