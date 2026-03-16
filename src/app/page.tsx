'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Globe,
  DollarSign,
  Star,
  ArrowRight,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Sparkles,
  UserCheck,
  Award,
  BookOpen,
  Users,
  CheckCircle,
  Play
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  url: string;
  category: 'Undergraduate' | 'Postgraduate' | 'Specialized';
  duration: string;
  fees: string;
  eligibility: string;
  description: string;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const courses: Course[] = [
    {
      id: '1',
      name: 'Bachelor of Arts (BA)',
      url: '/courses/bachelor-of-arts',
      category: 'Undergraduate',
      duration: '3 Years',
      fees: '₹15,000',
      eligibility: '12th Pass',
      description: 'Comprehensive liberal arts program covering literature, history, political science, and more.'
    },
    {
      id: '2',
      name: 'Bachelor of Commerce (B.Com)',
      url: '/courses/bachelor-of-commerce',
      category: 'Undergraduate',
      duration: '3 Years',
      fees: '₹18,000',
      eligibility: '12th Pass',
      description: 'Business-focused program covering accounting, finance, economics, and business management.'
    },
    {
      id: '3',
      name: 'Master of Business Administration (MBA)',
      url: '/courses/master-of-business-administration',
      category: 'Postgraduate',
      duration: '2 Years',
      fees: '₹40,000',
      eligibility: 'Graduate',
      description: 'Comprehensive management program preparing leaders for global business challenges.'
    },
    {
      id: '4',
      name: 'Bachelor of Science (B.Sc)',
      url: '/courses/bsc',
      category: 'Undergraduate',
      duration: '3 Years',
      fees: '₹20,000',
      eligibility: '12th Pass (Science)',
      description: 'Science-focused undergraduate program with specializations in various disciplines.'
    },
    {
      id: '5',
      name: 'Bachelor of Computer Applications (BCA)',
      url: '/courses/bca',
      category: 'Undergraduate',
      duration: '3 Years',
      fees: '₹25,000',
      eligibility: '12th Pass',
      description: 'Computer applications program focusing on programming and software development.'
    },
    {
      id: '6',
      name: 'Digital Marketing Certification',
      url: '/courses/digital-marketing',
      category: 'Specialized',
      duration: '6 Months',
      fees: '₹12,000',
      eligibility: 'Any Graduate',
      description: 'Professional certification in digital marketing strategies and online advertising.'
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'World-Class Education',
      description: 'Access to premium courses from top universities with industry experts.',
      accent: 'text-blue-400'
    },
    {
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Global Recognition',
      description: 'Degrees recognized internationally with global career opportunities.',
      accent: 'text-indigo-400'
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to course materials.',
      accent: 'text-cyan-400'
    },
    {
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Career Growth',
      description: 'Placement assistance and career counseling for all graduates.',
      accent: 'text-emerald-400'
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Secure & Verified',
      description: 'UGC approved universities with verified credentials.',
      accent: 'text-teal-400'
    },
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Fast Track Programs',
      description: 'Accelerated learning paths for working professionals.',
      accent: 'text-orange-400'
    }
  ];

  const milestones = [
    {
      title: 'Institutional Sync',
      metric: '15+ Nodes',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200',
      text: 'Successfully digitized 15+ legacy universities into the Edbell ecosystem, providing high-bandwidth course delivery for global learners.'
    },
    {
      title: 'Global Deployment',
      metric: '2,500+ Syncs',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80',
      text: 'Executed 2,500+ international student deployments to Tier-1 global institutions with a 100% synchronization rate in visa protocols.'
    },
    {
      title: 'Capital Engineering',
      metric: '₹12Cr+ Grants',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=200',
      text: 'Unlocked strategic financial grants through our proprietary Discovery Engine, maximizing academic accessibility for the 2024-25 cycle.'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">
        {/* Dynamic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80"
            alt="Technology and Innovation Backdrop"
            className="w-full h-full object-cover opacity-35 filter contrast-110 brightness-90"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/30 to-[var(--bg-primary)]"></div>
          <div className="absolute inset-0 bg-[var(--bg-primary)]/20 backdrop-blur-[1px]"></div>
        </div>

        {/* Global Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className={`inline-flex items-center bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-2 backdrop-blur-2xl ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <img src="/edbell-logo.png" alt="" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 object-contain" />
              <span className="text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-[0.25em]">Excellence Re-engineered</span>
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase not-italic font-serif max-w-xl ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
              Future <br />
              <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text">
                Infrastructure
              </span>
            </h1>

            <p className={`text-sm sm:text-base lg:text-lg text-[var(--text-primary)] font-light leading-relaxed max-w-xl ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              Access high-bandwidth educational pathways. We provide the structural support for the next generation of global leaders and working professionals.
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 ${mounted ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
              <Link
                href="/courses"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 rounded-xl sm:rounded-2xl text-white font-black text-sm sm:text-base hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-1 relative overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                Explore Curriculum
              </Link>
              <Link
                href="/contact"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl sm:rounded-2xl text-[var(--text-heading)] font-black text-sm sm:text-base hover:bg-[var(--surface-alt)] transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <Play className="h-4 w-4 fill-current text-[var(--primary)]" />
                <span>Initialize</span>
              </Link>
            </div>
          </div>

          <div className={`relative ${mounted ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="absolute -inset-8 bg-blue-600/10 rounded-full blur-[100px]"></div>
            <div className="relative bg-[var(--surface)]/80 backdrop-blur-3xl border border-[var(--border)] rounded-[40px] p-3 overflow-hidden shadow-2xl max-w-lg ml-auto">
              <img src="/hero-arif.jpg" alt="Adv.Arif Wafy" className="w-full h-[400px] xl:h-[480px] xxl:h-[550px] object-cover rounded-[36px] filter contrast-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent"></div>

              <div className="absolute bottom-8 left-8 right-8 z-20">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 drop-shadow-lg">Leadership</p>
                <h3 className="text-xl lg:text-2xl font-black text-white leading-tight uppercase tracking-tighter drop-shadow-2xl">
                  Adv.Arif Wafy <br />
                  <span className="text-sm font-bold text-blue-200/80 tracking-normal normal-case italic">Educational Architect</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
            <div className="flex-1">
              <h2 className="text-[10px] sm:text-xs font-black text-[var(--primary)] uppercase tracking-[0.4em] mb-3">Operational Logic</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-heading)] tracking-tighter leading-none uppercase">Why Choose <br className="hidden sm:block" /> The EDBELL <br className="hidden sm:block" /> Stack</h3>
            </div>
            <p className="flex-1 text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] font-light max-w-lg">
              Our proprietary framework integrates institutional excellence with high-performance digital delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div key={i} className="group p-6 sm:p-8 bg-[var(--surface)]/60 backdrop-blur-3xl border border-[var(--border)] rounded-2xl sm:rounded-3xl hover:border-[var(--primary)]/40 transition-all duration-500 hover:-translate-y-1">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 ${f.accent} group-hover:bg-[var(--primary)] group-hover:text-white transition-all shadow-xl`}>
                  {f.icon}
                </div>
                <h4 className="text-base sm:text-lg font-black text-[var(--text-heading)] mb-2 tracking-tighter uppercase">{f.title}</h4>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] font-light leading-relaxed group-hover:text-[var(--text-heading)] transition-colors">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC MODULES - COURSES */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-blue-600/[0.02] blur-[150px] rounded-full"></div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h2 className="text-[10px] sm:text-xs font-black text-[var(--primary)] uppercase tracking-[0.4em] mb-3">Curriculum Layers</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-heading)] tracking-tighter uppercase leading-none">Strategic <br /> Degree Programs</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {courses.slice(0, 6).map((c, i) => (
              <Link key={i} href={c.url} className="group">
                <div className="bg-[var(--surface)]/80 backdrop-blur-3xl border border-[var(--border)] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 hover:border-[var(--primary)]/40 transition-all duration-500 h-full flex flex-col shadow-sm hover:shadow-xl">
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-black px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full border border-[var(--primary)]/20 uppercase tracking-widest">{c.category}</span>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-black text-[var(--text-heading)] mb-2 tracking-tighter group-hover:text-[var(--primary)] transition-colors uppercase leading-tight">{c.name}</h4>
                    <p className="text-[var(--text-primary)] font-light text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{c.description}</p>
                  </div>

                  <div className="pt-4 sm:pt-5 border-t border-[var(--border)] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] sm:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-0.5">Duration</span>
                      <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)]">{c.duration}</span>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center group-hover:bg-[var(--primary)] transition-all shadow-xl">
                      <ArrowRight className="h-4 w-4 text-[var(--primary)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link href="/courses" className="inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[var(--text-heading)] font-black text-sm sm:text-base hover:bg-[var(--surface-alt)] transition-all transform hover:-translate-y-1 shadow-sm">
              <span>Scan Full Directory</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* VALIDATION NODES - MILESTONES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-between mb-12 lg:mb-16">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-[10px] sm:text-xs font-black text-[var(--primary)] uppercase tracking-[0.4em] mb-3">Network Integrity</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-heading)] tracking-tighter uppercase leading-none">Operational <br /> Milestones</h3>
            </div>
            <div className="flex items-center space-x-8 sm:space-x-10">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)]">10K+</p>
                <p className="text-[8px] sm:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1">Active Learners</p>
              </div>
              <div className="w-px h-10 sm:h-12 bg-[var(--border)]"></div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)]">98%</p>
                <p className="text-[8px] sm:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mt-1">Success Velocity</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {milestones.map((m, i) => (
              <div key={i} className="group p-6 sm:p-8 bg-[var(--surface)]/80 backdrop-blur-3xl border border-[var(--border)] rounded-2xl sm:rounded-3xl hover:border-[var(--primary)]/30 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-5 sm:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden group-hover:scale-110 transition-all duration-500 shadow-2xl border-2 border-[var(--border)] flex-shrink-0">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-black text-[var(--text-heading)] uppercase tracking-tighter leading-none mb-1">{m.title}</h5>
                    <p className="text-[9px] sm:text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.1em]">{m.metric}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] font-light italic leading-relaxed">
                  &quot;{m.text}&quot;
                </p>
                <div className="flex gap-1 mt-5 sm:mt-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[var(--primary)] fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASSIVE CTA ENGINE */}
      <section className="py-16 sm:py-20 lg:py-24 relative px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] bg-[var(--primary)]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8 sm:space-y-10">
          <div className="relative inline-block group">
            <Zap className="h-12 w-12 sm:h-16 sm:w-16 text-[var(--primary)] mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-[var(--primary)] blur-3xl opacity-20 scale-150"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-heading)] tracking-tighter leading-[0.85] uppercase">
            Initialize Your <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Success Protocol</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] font-light max-w-2xl mx-auto leading-relaxed">
            Global recognition. Unmatched flexibility. Strategic career growth. The future is a decision away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4">
            <Link
              href="/contact"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-[var(--primary)] rounded-2xl text-white font-black text-base sm:text-lg hover:shadow-[0_0_80px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
              Contact Now
            </Link>
            <Link
              href="/universities"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[var(--text-heading)] font-black text-base sm:text-lg hover:bg-[var(--surface-alt)] transition-all transform hover:-translate-y-1 shadow-sm"
            >
              Global Nodes
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER NODES */}
      <section className="py-12 sm:py-16 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
