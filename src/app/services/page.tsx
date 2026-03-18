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
  const [activeFeature, setActiveFeature] = useState<{serviceIdx: number, featureIdx: number} | null>(null);

  useEffect(() => {
    setActiveFeature(null);
  }, [activeService]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mainServices = [
    {
      id: 'SERV_001',
      icon: <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "SSLC / +2",
      description: "Direct academic pathways for completing Secondary (10th) and Senior Secondary (12th) certifications with recognized boards like Jamia, NIOS, and BOSSE.",
      features: [
        { name: "Jamia Admissions", details: "Official support for Jamia Millia Islamia school admissions and board enrollment." },
        { name: "NIOS Stream Execution", "details": "End-to-end guidance for NIOS 10th/12th stream registration and examination." },
        { name: "BOSSE Board Selection", "details": "State board equivalency programs through Board of Open Schooling and Skill Education." },
        { name: "Document Verification", "details": "Assistance in authenticating previous academic records for smooth admission." }
      ],
      stats: { success: "100%", speed: "Verified Nodes" },
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: 'SERV_002',
      icon: <Plane className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "Study Abroad",
      description: "End-to-end data processing for international academic deployment across Tier-1 institutions globally.",
      features: [
        { name: "University Filtering", details: "Algorithmic matching of student profile with global institutional requirements." },
        { name: "Visa Logic Processing", details: "Expert handling of student visa documentation and interview preparation." },
        { name: "International Discovery", details: "Mapping global career market trends for optimal course selection." },
        { name: "Arrival Protocols", details: "Pre-departure briefings and on-ground landing support for international students." }
      ],
      stats: { success: "95%", speed: "Optimized" },
      gradient: "from-indigo-600 to-violet-600"
    },
    {
      id: 'SERV_003',
      icon: <Award className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "Online Degree",
      description: "Activating flexible digital academic protocols for recognized undergraduate and postgraduate programs.",
      features: [
        { name: "UGC Approved Nodes", details: "Ensuring all degree programs are fully recognized by University Grants Commission." },
        { name: "Flexible Learning", details: "Access to recorded sessions and digital modules for self-paced graduation." },
        { name: "Distance Calibration", details: "Optimizing communication between student and university for remote exams." },
        { name: "Digital Certification", details: "Verified electronic certificates issued directly by parent universities." }
      ],
      stats: { success: "98%", speed: "Rapid Access" },
      gradient: "from-violet-600 to-purple-600"
    },
    {
      id: 'SERV_004',
      icon: <Zap className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "Scholarships",
      description: "Activating financial aid protocols and scholarship discovery modules for academic funding and excellence.",
      features: [
        { name: "Merit Identification", details: "Identifying scholarship eligibility based on academic and sports excellence." },
        { name: "Asset Management", details: "Guidance on managing grants and tuition fee waivers efficiently." },
        { name: "Sponsorship Links", details: "Connecting students with corporate and NGO educational sponsors." },
        { name: "Document Auditing", details: "Compiling financial and identity proof for scholarship applications." }
      ],
      stats: { success: "92%", speed: "Accelerated" },
      gradient: "from-purple-600 to-fuchsia-600"
    },
    {
      id: 'SERV_005',
      icon: <UserCheck className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "Admission Support",
      description: "Comprehensive end-to-end assistance for navigating complex university admission protocols and documentation.",
      features: [
        { name: "Form Submission", details: "Expert handling of university application forms to ensure zero-error submissions." },
        { name: "SOP Assistance", details: "Guidance on drafting compelling Statements of Purpose for top-tier institutions." },
        { name: "Document Audit", details: "Thorough verification of all academic and identity proofs before application." },
        { name: "Follow-up Logic", details: "Persistent coordination with university admission desks for status updates." }
      ],
      stats: { success: "100%", speed: "Reliable" },
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 'SERV_006',
      icon: <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "Career Guidance",
      description: "Expert mentorship and psychological mapping to align student passion with industry demand (Provided Free of Cost).",
      features: [
        { name: "Psychometric Testing", details: "Advanced aptitude mapping to identify the most suitable career streams." },
        { name: "One-on-One Mentoring", details: "Personalized sessions with industry leaders for strategic career planning." },
        { name: "Free Consultation", details: "Initial roadmap planning and career path discovery at zero cost." },
        { name: "Market Trend Audit", details: "Real-time updates on emerging high-growth industries and job roles." }
      ],
      stats: { success: "96%", speed: "Deep-Analysis" },
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
            alt="Students Collaborating Backdrop"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-[var(--bg-primary)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
          <div className={`space-y-5 sm:space-y-6 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 text-[9px] sm:text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">
              <Cpu className="h-3.5 w-3.5 animate-pulse" />
              <span>Service Execution Matrix</span>
            </div>

            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)] leading-[0.8] tracking-tighter uppercase not-italic font-serif ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
              Structural <br />
              <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Execution</span>
            </h1>

            <p className={`text-sm sm:text-base lg:text-lg text-[var(--text-primary)] font-light max-w-xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              Activating high-performance modules for global educational excellence. Every protocol is optimized for your precise academic trajectory.
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-8 sm:my-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 w-full pt-4 items-start">
            {/* Left: Tactical Selector */}
            <div className="lg:col-span-5 space-y-3 animate-slide-right animation-delay-200">
              <div className="p-3 bg-[var(--surface)]/40 border border-[var(--border)] rounded-xl mb-4">
                <p className="text-[8px] sm:text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1.5">Protocol_Select</p>
                <div className="h-1 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary)] transition-all duration-700"
                    style={{ width: `${((activeService + 1) / mainServices.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              {mainServices.map((s, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveService(i)}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-500 border ${activeService === i
                    ? 'bg-[var(--primary)] border-[var(--primary-light)]/40 shadow-[0_0_30px_rgba(59,130,246,0.3)] lg:translate-x-2'
                    : 'bg-[var(--surface)]/40 border-[var(--border)] hover:bg-[var(--surface-alt)]/60 grayscale opacity-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${activeService === i ? 'text-blue-100' : 'text-[var(--text-muted)]'}`}>{s.id}</p>
                      <h3 className={`text-base sm:text-lg lg:text-xl font-black uppercase tracking-tight ${activeService === i ? 'text-white' : 'text-[var(--text-primary)]'}`}>{s.title}</h3>
                    </div>
                    <div className={`${activeService === i ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                      <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 ${activeService === i ? 'translate-x-0' : '-translate-x-2'}`} />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Operational Data */}
            <div className="lg:col-span-7 animate-slide-left animation-delay-400">
              <div className={`relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${mainServices[activeService].gradient} border border-white/10 overflow-hidden group min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] flex flex-col justify-between shadow-2xl shadow-blue-900/40`}>
                <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  {mainServices[activeService].icon}
                </div>

                <div className="space-y-5 sm:space-y-6 relative z-10">
                  <div className="space-y-3">
                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter leading-none">{mainServices[activeService].title}</h4>
                    <p className="text-sm sm:text-base lg:text-lg text-white/90 font-light leading-relaxed max-w-xl">
                      {mainServices[activeService].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative">
                    {mainServices[activeService].features.map((f, idx) => (
                      <div key={idx} className="relative group/feature">
                        <button 
                          onClick={() => setActiveFeature(activeFeature?.featureIdx === idx ? null : {serviceIdx: activeService, featureIdx: idx})}
                          className={`w-full flex items-center space-x-3 p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border transition-all ${activeFeature?.featureIdx === idx ? 'border-white/40 bg-white/30' : 'border-white/10 hover:bg-white/20'}`}
                        >
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 transition-colors ${activeFeature?.featureIdx === idx ? 'text-white' : 'text-white/70'}`} />
                          <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider text-left">{f.name}</span>
                        </button>
                        
                        {activeFeature?.serviceIdx === activeService && activeFeature?.featureIdx === idx && (
                          <div className="absolute top-full left-0 right-0 mt-2 z-[60] animate-fade-in-up">
                            <div className="bg-white p-4 rounded-xl shadow-2xl border border-blue-100 relative">
                              <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white rotate-45"></div>
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1.5 flex items-center">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Execution Detail
                              </p>
                              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                                {f.details}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-end justify-between relative z-10 pt-6 sm:pt-8">
                  <div className="flex space-x-6 sm:space-x-8">
                    <div>
                      <p className="text-[8px] sm:text-[9px] font-black text-white/60 uppercase tracking-widest mb-0.5">Success_Rate</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{mainServices[activeService].stats.success}</p>
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[9px] font-black text-white/60 uppercase tracking-widest mb-0.5">Execution_Speed</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{mainServices[activeService].stats.speed}</p>
                    </div>
                  </div>
                  <Link href="/contact" className="hidden sm:flex h-12 w-12 lg:h-14 lg:w-14 bg-white rounded-full items-center justify-center text-[var(--bg-primary)] hover:scale-110 transition-transform shadow-2xl">
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auxiliary Support */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12 sm:space-y-16">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[9px] sm:text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em]">Integrated Nodes</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[var(--text-heading)] uppercase tracking-tighter">Auxiliary Support</h2>
            </div>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-sm">Secondary infrastructure nodes ensuring complete operational coverage for all student parameters.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {[
              { title: "Admission Support", icon: <UserCheck className="w-5 h-5" />, desc: "Complete assistance for university admissions and institutional enrollment." },
              { title: "Career Guidance", icon: <Sparkles className="w-5 h-5" />, desc: "Expert assessment and trajectory mapping for students (Free of cost)." },
              { title: "Visa Sync", icon: <Shield className="w-5 h-5" />, desc: "High-priority visa documentation and processing modules." },
              { title: "Asset Discovery", icon: <FileText className="w-5 h-5" />, desc: "Discovery protocols for scholarships and financial grants." },
              { title: "Arrival Protocols", icon: <Globe className="w-5 h-5" />, desc: "Pre-departure coordination and landing logistics." },
              { title: "Node Networking", icon: <Users className="w-5 h-5" />, desc: "Connecting students with verified alumni clusters." }
            ].map((item, i) => (
              <div key={i} className="p-5 sm:p-6 lg:p-7 bg-[var(--surface)]/40 border border-[var(--border)] rounded-2xl sm:rounded-3xl hover:bg-[var(--surface-alt)]/60 transition-all group">
                <div className="w-10 h-10 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl flex items-center justify-center text-[var(--primary)] mb-4 sm:mb-5 group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h4 className="text-base sm:text-lg font-black text-[var(--text-heading)] uppercase mb-2 tracking-tight">{item.title}</h4>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">{item.desc}</p>
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