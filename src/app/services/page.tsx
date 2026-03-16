'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  UserCheck,
  Plane,
  DollarSign,
  BookOpen,
  GraduationCap,
  Users,
  CheckCircle,
  ArrowRight,
  Globe,
  Award,
  Target,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  FileText,
  Briefcase,
  Star,
  Sparkles,
  Zap,
  Shield,
  Activity,
  Cpu,
  Database
} from 'lucide-react';

export default function Services() {
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mainServices = [
    {
      id: 'SERV_001',
      icon: <UserCheck className="h-10 w-10" />,
      title: "Career Strategy",
      description: "Synchronizing student objectives with global industry demand signals for precise career trajectory.",
      features: ["Assessment", "Trajectory Mapping", "Inquiry simulation", "Resume Optimization"],
      stats: { success: "98%", speed: "High" },
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: 'SERV_002',
      icon: <Plane className="h-10 w-10" />,
      title: "Global Mobility",
      description: "End-to-end data processing for international academic deployment across Tier-1 institutions.",
      features: ["University Filtering", "Visa Logic Processing", "Scholarship Mining", "Arrival Protocols"],
      stats: { success: "95%", speed: "Optimized" },
      gradient: "from-indigo-600 to-violet-600"
    },
    {
      id: 'SERV_003',
      icon: <DollarSign className="h-10 w-10" />,
      title: "Capital Support",
      description: "Activating financial aid protocols and scholarship discovery modules for academic funding.",
      features: ["Grant Identification", "Asset Management", "Sponsorship Links", "Document Auditing"],
      stats: { success: "88%", speed: "Rapid" },
      gradient: "from-violet-600 to-purple-600"
    },
    {
      id: 'SERV_004',
      icon: <BookOpen className="h-10 w-10" />,
      title: "Benchmark Prep",
      description: "High-intensity training modules for competitive examination benchmarks and entrance logic.",
      features: ["Adaptive Testing", "Linguistic Prep", "Logic Workshops", "Mock Environments"],
      stats: { success: "92%", speed: "Accelerated" },
      gradient: "from-purple-600 to-fuchsia-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30 overflow-hidden">
      {/* Revolutionary Hero Section - Interactive Hub */}
      <section className="relative pt-32 pb-32 px-6 lg:px-12 overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
            alt="Students Collaborating Backdrop"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-[var(--bg-primary)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
          {/* Animated Matrix Core */}
          <div className={`space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-3 text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.5em] mb-4">
              <Cpu className="h-4 w-4 animate-pulse" />
              <span>Service Execution Matrix</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-5xl font-black text-[var(--text-heading)] leading-[0.8] tracking-tighter uppercase not-italic font-serif ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
              Structural <br />
              <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Execution</span>
            </h1>

            <p className={`text-base lg:text-xl text-[var(--text-primary)] font-light max-w-2xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              Activating high-performance modules for global educational excellence. Every protocol is optimized for your precise academic trajectory.
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-16"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full pt-12 items-start">
            {/* Left: Tactical Selector */}
            <div className="lg:col-span-5 space-y-4 animate-slide-right animation-delay-200">
              <div className="p-4 bg-[var(--surface)]/40 border border-[var(--border)] rounded-2xl mb-8">
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">Protocol_Select</p>
                <div className="h-1 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary)] transition-all duration-700"
                    style={{ width: `${(activeService + 1) * 25}%` }}
                  ></div>
                </div>
              </div>
              {mainServices.map((s, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveService(i)}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left p-6 lg:p-8 rounded-[30px] lg:rounded-[40px] transition-all duration-500 border ${activeService === i
                    ? 'bg-[var(--primary)] border-[var(--primary-light)]/40 shadow-[0_0_50px_rgba(59,130,246,0.3)] translate-x-4'
                    : 'bg-[var(--surface)]/40 border-[var(--border)] hover:bg-[var(--surface-alt)]/60 grayscale opacity-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-[0.4em] mb-2 ${activeService === i ? 'text-blue-100' : 'text-[var(--text-muted)]'}`}>{s.id}</p>
                      <h3 className={`text-2xl lg:text-3xl font-black uppercase tracking-tight ${activeService === i ? 'text-white' : 'text-[var(--text-primary)]'}`}>{s.title}</h3>
                    </div>
                    <div className={`${activeService === i ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                      <ArrowRight className={`h-6 w-6 transition-transform duration-500 ${activeService === i ? 'translate-x-0' : '-translate-x-4'}`} />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Operational Data */}
            <div className="lg:col-span-7 animate-slide-left animation-delay-400">
              <div className={`relative p-8 lg:p-16 rounded-[40px] lg:rounded-[60px] bg-gradient-to-br ${mainServices[activeService].gradient} border border-white/10 overflow-hidden group min-h-[500px] lg:min-h-[600px] flex flex-col justify-between shadow-2xl shadow-blue-900/40`}>
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  {mainServices[activeService].icon}
                </div>

                <div className="space-y-10 relative z-10">
                  <div className="space-y-4">
                    <h4 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">{mainServices[activeService].title}</h4>
                    <p className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-xl">
                      {mainServices[activeService].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    {mainServices[activeService].features.map((f, idx) => (
                      <div key={idx} className="flex items-center space-x-4 p-4 lg:p-6 bg-white/10 backdrop-blur-md rounded-2xl lg:rounded-3xl border border-white/10 group/item hover:bg-white/20 transition-all">
                        <CheckCircle className="h-5 w-5 text-white/70" />
                        <span className="text-sm font-black text-white uppercase tracking-widest">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-end justify-between relative z-10 pt-12">
                  <div className="flex space-x-12">
                    <div>
                      <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Success_Rate</p>
                      <p className="text-3xl lg:text-5xl font-black text-white">{mainServices[activeService].stats.success}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Execution_Speed</p>
                      <p className="text-3xl lg:text-5xl font-black text-white">{mainServices[activeService].stats.speed}</p>
                    </div>
                  </div>
                  <Link href="/contact" className="hidden sm:flex h-16 w-16 lg:h-20 lg:w-20 bg-white rounded-full items-center justify-center text-[var(--bg-primary)] hover:scale-110 transition-transform shadow-2xl">
                    <ArrowRight className="h-8 w-8" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auxiliary Support Infrastructure */}
      <section className="py-24 lg:py-40 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Integrated Nodes</p>
              <h2 className="text-4xl lg:text-7xl font-black text-[var(--text-heading)] uppercase tracking-tighter">Auxiliary Support</h2>
            </div>
            <p className="text-lg text-[var(--text-secondary)] max-w-sm mb-2">Secondary infrastructure nodes ensuring complete operational coverage for all student parameters.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Visa Sync", icon: <Shield />, desc: "High-priority visa documentation and processing modules." },
              { title: "Asset Discovery", icon: <FileText />, desc: "Discovery protocols for scholarships and financial grants." },
              { title: "Arrival Protocols", icon: <Globe />, desc: "Pre-departure coordination and landing logistics." },
              { title: "Node Networking", icon: <Users />, desc: "Connecting students with verified alumni clusters." },
              { title: "Metric Analysis", icon: <Activity />, desc: "Deep performance auditing for institutional matching." },
              { title: "Data Security", icon: <Shield />, desc: "Encrypted handling of all sensitive student data points." }
            ].map((item, i) => (
              <div key={i} className="p-8 lg:p-10 bg-[var(--surface)]/40 border border-[var(--border)] rounded-[40px] hover:bg-[var(--surface-alt)]/60 transition-all group">
                <div className="w-12 h-12 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-8 group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-black text-[var(--text-heading)] uppercase mb-4 tracking-tight">{item.title}</h4>
                <p className="text-[var(--text-primary)] leading-relaxed text-base">{item.desc}</p>
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