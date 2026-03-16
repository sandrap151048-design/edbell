import { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle,
  Phone,
  ArrowLeft,
  Building,
  Zap
} from 'lucide-react';
import Newsletter from '@/components/Newsletter';

export const metadata: Metadata = {
  title: 'Test University - Excellence Institute | EDBELL',
  description: "Excellence in higher education and research.",
};

export default function UniversityPage() {
  const university = {
    name: "Excellence Institute",
    description: "A research-driven educational node focused on future technologies and management excellence.",
    accreditation: "NAAC A++",
    established: "2000",
    location: "Knowledge City, India",
  };

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-blue-500/30">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden border-b border-white/5">
        <div className="relative z-10 max-w-7xl mx-auto space-y-12 text-center lg:text-left">
          <Link href="/universities" className="inline-flex items-center space-x-3 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] hover:text-white transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" />
            <span>Back to Global Repository</span>
          </Link>

          <div className="space-y-10">
            <div className="inline-flex items-center bg-white/[0.03] border border-white/[0.1] rounded-2xl px-5 py-2.5">
              <Building className="h-4 w-4 text-blue-400 mr-3" />
              <span className="text-[10px] font-black text-blue-400 tracking-[0.3em] uppercase">Intelligence Node</span>
            </div>
            <h1 className="text-5xl lg:text-9xl font-black text-white leading-none tracking-tighter uppercase">{university.name}</h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto lg:mx-0">{university.description}</p>

            <div className="hidden lg:flex gap-12 pt-8">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Established</p>
                <p className="text-2xl font-black text-white">{university.established}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Accreditation</p>
                <p className="text-2xl font-black text-blue-400">{university.accreditation}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Interface Node */}
      <section className="py-32 bg-[#050B14]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-20">
          <div className="space-y-12">
            <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">Synchronized Excellence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["Future-Ready Tech", "Global Faculty", "High placement Rate", "Research Grants"].map((h, i) => (
                <div key={i} className="bg-[#030712] border border-white/5 rounded-[40px] p-12 hover:border-blue-500/30 transition-all flex flex-col items-center">
                  <Zap className="h-10 w-10 text-blue-600 mb-6" />
                  <span className="text-lg font-black text-white uppercase tracking-widest">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-20 border-t border-white/5 space-y-10">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">Command Center</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="tel:+919876543210" className="px-12 py-6 bg-blue-600 rounded-3xl text-sm font-black text-white uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all">Initialize Connection</a>
              <Link href="/contact" className="px-12 py-6 bg-white/[0.03] border border-white/10 rounded-3xl text-sm font-black text-white uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">Request Briefing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Newsletter Node */}
      <section className="py-20 bg-[#030712] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}