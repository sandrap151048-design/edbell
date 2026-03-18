'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Smartphone,
  CheckCircle2,
  Cpu,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Settings,
  CircleDot
} from 'lucide-react';

export default function MobilePhones() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { title: "Device Optimization", desc: "Configuration for optimized academic performance and educational access." },
    { title: "Student Support Nodes", desc: "Dedicated line for technical and communication assistance." },
    { title: "Security Matrix", desc: "Enhanced firewall and privacy settings for student data protection." },
    { title: "Digital Infrastructure", desc: "Next-gen communication protocols for high-speed learning." }
  ];

  const mobiles = [
    { name: "Support Node Alpha", tech: "ED-001", status: "Active" },
    { name: "Support Node Beta", tech: "ED-002", status: "Active" },
    { name: "Support Node Gamma", tech: "ED-003", status: "Active" }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30 overflow-hidden pt-24 text-white">
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80" 
            alt="Mobile Technology" 
            className="w-full h-full object-cover opacity-10 filter blur-[2px] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]"></div>
        </div>

        <div className={`relative z-10 max-w-4xl w-full text-center space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 backdrop-blur-3xl mx-auto">
            <Smartphone className="h-4 w-4 text-blue-400" />
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em]">Digital_Node_Integrated</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] font-serif">
            Student <br />
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text italic">
              Communication
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-[var(--text-primary)] font-light max-w-2xl mx-auto leading-relaxed">
            Provisioning high-performance communication hardware and technical support protocols to ensure seamless student connectivity within the EdBell ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/contact" className="px-10 py-4 bg-blue-600 rounded-full text-white font-black text-xs uppercase tracking-widest hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all">
                Access Node
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
                   <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                      {i === 0 ? <Cpu className="h-5 w-5" /> : i === 1 ? <PhoneCall className="h-5 w-5" /> : i === 2 ? <Shield className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                   </div>
                   <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">{feature.title}</h3>
                   <p className="text-xs text-[var(--text-primary)] leading-relaxed font-light">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Node Status */}
      <section className="py-20">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-12">Support Grid Status</h2>
            <div className="space-y-4">
               {mobiles.map((node, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-[var(--surface)]/30 border border-[var(--border)] rounded-2xl backdrop-blur-xl">
                    <div className="flex items-center space-x-4">
                       <CircleDot className="h-4 w-4 text-blue-500 animate-pulse" />
                       <span className="font-bold uppercase tracking-tight text-sm">{node.name}</span>
                    </div>
                    <span className="text-[10px] font-black bg-blue-500 text-white px-3 py-1 rounded-md tracking-[0.2em]">{node.tech}</span>
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{node.status}</span>
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
