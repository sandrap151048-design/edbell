'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Languages,
  BookOpenCheck,
  CheckCircle2,
  Cpu,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Settings,
  CircleDot,
  Quote,
  MessageCircle,
  Video,
  Mic2
} from 'lucide-react';

export default function SpokenEnglish() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { title: "Vocabulary Matrix", icon: <BookOpenCheck className="h-5 w-5" />, desc: "High-performance linguistic expansion for global communication." },
    { title: "Interactive Hub", icon: <MessageCircle className="h-5 w-5" />, desc: "Real-time communication protocols with certified educators." },
    { title: "Phonetic Precision", icon: <Mic2 className="h-5 w-5" />, desc: "Advanced pronunciation and accent management sub-systems." },
    { title: "Digital Coaching", icon: <Video className="h-5 w-5" />, desc: "Live-streamed training sessions for intensive learning." }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30 overflow-hidden pt-24 text-white">
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80" 
            alt="Spoken English Mastery" 
            className="w-full h-full object-cover opacity-10 filter blur-[2px] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]"></div>
        </div>

        <div className={`relative z-10 max-w-4xl w-full text-center space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 backdrop-blur-3xl mx-auto">
            <Languages className="h-4 w-4 text-indigo-400" />
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.4em]">Language_Protocol_Online</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] font-serif">
            Fluency <br />
            <span className="text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text italic">
              Mastery
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-[var(--text-primary)] font-light max-w-2xl mx-auto leading-relaxed">
            Deployment of advanced linguistic communication protocols for professional global alignment. Achieve peak verbal performance with our certified interactive coaching.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/contact" className="px-10 py-4 bg-indigo-600 rounded-full text-white font-black text-xs uppercase tracking-widest hover:shadow-[0_0_50px_rgba(79,70,229,0.4)] transition-all">
                Initialize Coaching
             </Link>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border)]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="p-8 bg-[var(--bg-primary)] border border-[var(--border)] rounded-[32px] hover:border-indigo-500/50 transition-all group">
                   <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                   </div>
                   <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">{feature.title}</h3>
                   <p className="text-xs text-[var(--text-primary)] leading-relaxed font-light">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Testimony Node */}
      <section className="py-24 bg-[var(--bg-primary)]">
         <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
            <Quote className="h-10 w-10 text-indigo-500 mx-auto opacity-50" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-tight italic">
              "The synchronization of linguistic skills at EdBell allowed me to bridge the gap between academic knowledge and professional communication."
            </h2>
            <div className="flex flex-col items-center">
               <div className="w-16 h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent mb-4"></div>
               <p className="text-sm font-black uppercase tracking-widest">Global Alumnus</p>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Batch 2024</p>
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
