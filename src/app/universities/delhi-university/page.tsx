import { Metadata } from 'next';
import Link from 'next/link';
import {
  Award,
  CheckCircle,
  Star,
  MapPin,
  Users,
  BookOpen,
  Globe,
  Calendar,
  Phone,
  Mail,
  ArrowLeft,
  TrendingUp,
  Building,
  GraduationCap,
  Zap
} from 'lucide-react';
import Newsletter from '@/components/Newsletter';

export const metadata: Metadata = {
  title: 'Delhi University - Online University Programs | EDBELL',
  description: "One of India's premier central universities, established in 1922.",
};

export default function UniversityPage() {
  const university = {
    name: "Delhi University",
    description: "One of India's premier central universities, established in 1922. NAAC A++ accredited.",
    accreditation: "NAAC A++",
    established: "1922",
    location: "New Delhi, India",
    website: "https://www.du.ac.in"
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--primary)]/30">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden border-b border-[var(--border)]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--primary)]/5 blur-[120px] -translate-y-1/2"></div>
        <div className="relative z-10 max-w-7xl mx-auto space-y-12">
          <Link href="/universities" className="inline-flex items-center space-x-3 text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em] hover:text-[var(--text-heading)] transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" />
            <span>Back to Global Repository</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center bg-[var(--surface)]/40 border border-[var(--border)] rounded-2xl px-5 py-2.5">
                <Building className="h-4 w-4 text-[var(--primary)] mr-3" />
                <span className="text-[10px] font-black text-[var(--primary)] tracking-[0.3em] uppercase">Institutional Core</span>
              </div>
              <h1 className="text-5xl lg:text-8xl font-black text-[var(--text-heading)] leading-none tracking-tighter uppercase">{university.name}</h1>
              <p className="text-xl text-[var(--text-primary)] font-light leading-relaxed max-w-2xl">{university.description}</p>

              <div className="flex flex-wrap gap-12 pt-8">
                <div>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">Established</p>
                  <p className="text-2xl font-black text-[var(--text-heading)]">{university.established}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">Location</p>
                  <p className="text-2xl font-black text-[var(--text-heading)]">NEW DELHI</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">Accreditation</p>
                  <p className="text-2xl font-black text-[var(--primary)]">{university.accreditation}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[48px] p-10 lg:p-12 space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8">
                <Zap className="h-10 w-10 text-[var(--primary)] opacity-20" />
              </div>
              <h3 className="text-xs font-black text-[var(--primary)] uppercase tracking-[0.4em]">Node Protocol</h3>
              <div className="space-y-6">
                {["UGC Approved", "Global Recognition", "Heritage Campus", "Research Excellence"].map((h, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <CheckCircle className="h-5 w-5 text-[var(--primary)]" />
                    <span className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{h}</span>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-[var(--border)] flex gap-4">
                <button className="flex-1 py-4 bg-[var(--primary)] rounded-2xl text-white text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">Initialize Enrollment</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Details Node */}
      <section className="py-32 bg-[var(--bg-secondary)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-24">
            {/* Program Matrix */}
            <div className="bg-[var(--bg-primary)]/60 backdrop-blur-3xl border border-[var(--border)] rounded-[48px] p-8 lg:p-16 shadow-xl">
              <h3 className="text-3xl font-black text-[var(--text-heading)] uppercase tracking-tighter mb-8">About Institutional Node</h3>
              <p className="text-base lg:text-xl text-[var(--text-primary)] font-light leading-relaxed">
                The University of Delhi is a premier university of the country with a venerable legacy and international acclaim for highest academic standards, diverse educational programs, distinguished faculty, illustrious alumni, varied co-curricular activities and modern infrastructure. Over the many years of its existence, the University has sustained the highest global standards and best practices in higher education.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-[var(--bg-primary)]/60 backdrop-blur-3xl border border-[var(--border)] rounded-[40px] p-8 lg:p-10 space-y-8 sticky top-32 shadow-xl">
              <h4 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Institutional Metadata</h4>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-[var(--border)] pb-4">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Type</span>
                  <span className="text-xs font-bold text-[var(--text-heading)] uppercase">Central</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-4">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Base Hub</span>
                  <span className="text-xs font-bold text-[var(--text-heading)] uppercase">Delhi</span>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="flex flex-col gap-3">
                  <a href="tel:+919876543210" className="flex items-center justify-center space-x-3 py-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[10px] font-black text-[var(--text-heading)] hover:bg-[var(--primary)] hover:text-white transition-all">
                    <Phone className="h-4 w-4" />
                    <span>Call Advisor</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Newsletter Node */}
      <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
