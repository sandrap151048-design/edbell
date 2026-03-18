'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  Sparkles,
  ArrowRight,
  Globe,
  Users,
  Building2,
  PhoneCall,
  Languages,
  BookOpenCheck
} from 'lucide-react';

export default function StudyCentres() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const centres = [
    {
      name: "HEAD OFFICE - KERALA",
      location: "15/382, Calicut Tower, Kozhikode Road, Wayanad, Kerala, India",
      phone: "+91 98765 43210",
      email: "info@edbelledusolutions.com",
      image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      name: "REGIONAL CENTRE - CALICUT",
      location: "Building 4, Cyberpark Road, Nellikode, Kozhikode, Kerala",
      phone: "+91 98765 43211",
      email: "calicut@edbelledusolutions.com",
      image: "https://images.unsplash.com/photo-1568241723642-8411993952ba?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      name: "COE CENTRE - KOCHI",
      location: "MG Road, Ravipuram, Kochi, Kerala",
      phone: "+91 98765 43212",
      email: "kochi@edbelledusolutions.com",
      image: "https://images.unsplash.com/photo-1590012314607-cda9d8ecaa19?auto=format&fit=crop&q=80&w=800&h=600"
    }
  ];

  const auxiliaryServices = [
    {
      title: "MOBILE PHONE SOLUTIONS",
      icon: <PhoneCall className="h-6 w-6" />,
      desc: "Integrated communication support for students including device maintenance and digital access."
    },
    {
      title: "SPOKEN ENGLISH MASTERCLASS",
      icon: <Languages className="h-6 w-6" />,
      desc: "Advanced fluency protocols to enhance global communication competence and professional presentation."
    },
    {
      title: "PREMIUM TUITION NODES",
      icon: <BookOpenCheck className="h-6 w-6" />,
      desc: "Subject-specific acceleration programs focusing on core academic performance across all boards."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30 overflow-hidden">
      {/* Hero Section - About style */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524178232457-3bb2449b382a?auto=format&fit=crop&q=80"
            alt="Study Centres Backdrop"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-[var(--bg-primary)]"></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-8">
          <div className={`space-y-6 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-3 bg-[var(--surface)]/40 border border-[var(--border)] rounded-full px-4 py-1.5 backdrop-blur-3xl mx-auto">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)]" />
              <span className="text-[8px] sm:text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Global Infrastructure Matrix</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[var(--text-heading)] leading-[0.85] tracking-tighter uppercase font-serif">
                Operational <br />
                <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">
                  Centres
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-[var(--text-primary)] font-light max-w-2xl mx-auto leading-relaxed">
                Scanning the domestic grid for verified educational nodes. Experience our physical infrastructure designed for high-performance learning and academic support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Nodes - The 3 Photos Section */}
      <section className="py-20 lg:py-28 bg-[var(--bg-secondary)] relative border-y border-[var(--border)]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[9px] sm:text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em]">Infrastructure_Pulse</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[var(--text-heading)] uppercase tracking-tighter">Strategic Locations</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {centres.map((centre, i) => (
              <div key={i} className="group relative flex flex-col space-y-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--border)] shadow-2xl">
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={centre.image}
                    alt={centre.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-4 right-4 z-20">
                     <div className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                        <Navigation className="h-5 w-5 text-white" />
                     </div>
                  </div>
                </div>
                
                <div className="space-y-4 px-2">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-widest">NODE_00{i+1}</p>
                    <h3 className="text-lg lg:text-xl font-black text-[var(--text-heading)] uppercase tracking-tighter">{centre.name}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 text-sm text-[var(--text-primary)] font-light">
                      <MapPin className="h-4 w-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <span>{centre.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-[var(--text-primary)] font-light">
                      <Phone className="h-4 w-4 text-[var(--primary)]" />
                      <span>{centre.phone}</span>
                    </div>
                  </div>

                  <Link href="/contact" className="inline-flex items-center text-[var(--primary)] font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">
                    Initialize Contact <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Sub-Systems - Mobile, English, Tuition */}
      <section className="py-20 lg:py-28 bg-[var(--bg-primary)]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Service_Extensions</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-[0.9]">Advanced <br /> Support Modules</h2>
                <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-md pt-4">
                  Deploying additional pedagogical and technical infrastructure beyond standard institutional protocols to ensure holistic student development.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="px-10 py-4 bg-[var(--primary)] rounded-full text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-500/20">
                  Join The Node
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {auxiliaryServices.map((service, i) => (
                <div key={i} className={`p-8 lg:p-10 bg-[var(--surface)]/40 border border-[var(--border)] rounded-[40px] hover:bg-[var(--surface-alt)]/60 transition-all group ${i === 2 ? 'sm:col-span-2' : ''}`}>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-black text-[var(--text-heading)] uppercase mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-sm text-[var(--text-primary)] font-light leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
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