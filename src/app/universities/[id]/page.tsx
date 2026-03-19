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
  Sparkles,
  Zap
} from 'lucide-react';
import Newsletter from '@/components/Newsletter';

const universities = {
  'ignou': {
    id: 'ignou',
    name: "Indira Gandhi National Open University",
    shortName: "IGNOU",
    location: "New Delhi",
    state: "Delhi",
    established: "1985",
    accreditation: "NAAC A++",
    ugcApproved: true,
    programs: ["BA", "B.Com", "BBA", "MA", "M.Com", "MBA", "BCA", "MCA"],
    highlights: ["Global Recognition", "4M+ Student Base", "Distance Education Leader", "UGC Qualified"],
    description: "The world's largest open university system, pioneering accessible higher education since 1985.",
    ranking: "#1 in Distance Education",
    totalStudents: "4,000,000+",
    type: "Central University",
    feeStructure: { UG: "₹7k - ₹15k/yr", PG: "₹9k - ₹20k/yr" }
  },
  'lpu-placement': {
    id: 'lpu-placement',
    name: "LPU (Placement & Industry Hub)",
    shortName: "LPU",
    location: "Phagwara, Punjab",
    state: "Punjab",
    established: "2005",
    accreditation: "NAAC A++",
    ugcApproved: true,
    programs: ["B.Tech", "MBA", "BBA", "MCA", "BCA"],
    highlights: ["Industry Partnerships", "High Placements", "Modern Tech Infrastructure", "International Hub"],
    description: "Modern infrastructure and industry partnerships with comprehensive programs across engineering, management, and liberal arts. A hub for placement and industry connections.",
    ranking: "Top 100 NIRF",
    totalStudents: "30,000+",
    type: "Private University",
    feeStructure: { UG: "₹80k - ₹1.5L/yr", PG: "₹90k - ₹1.8L/yr" }
  },
  'amity-university-online': {
    id: 'amity-university-online',
    name: "Amity University (Online Excellence)",
    shortName: "Amity",
    location: "Noida",
    state: "Uttar Pradesh",
    established: "2005",
    accreditation: "NAAC A+",
    ugcApproved: true,
    programs: ["MBA", "BBA", "MCA", "BCA", "B.Tech", "M.Tech"],
    highlights: ["Global Campuses", "Industry Integration", "Modern E-Learning", "Rich Alumni Base"],
    description: "Technology-enabled learning with comprehensive online programs and industry-relevant curriculum. Renowned for online excellence.",
    ranking: "#3 Online Education",
    totalStudents: "25,000+",
    type: "Private University",
    feeStructure: { UG: "₹60k - ₹1.2L/yr", PG: "₹70k - ₹1.5L/yr" }
  },
  'delhi-university-heritage': {
    id: 'delhi-university-heritage',
    name: "Delhi University (Academic Heritage)",
    shortName: "DU",
    location: "Delhi",
    state: "Delhi",
    established: "1922",
    accreditation: "NAAC A++",
    ugcApproved: true,
    programs: ["BA", "B.SC", "B.COM", "MA", "M.SC", "M.COM"],
    highlights: ["Heritage Institution", "Top Faculty", "Extensive Research", "Central University Status"],
    description: "Premier institution with 100+ years of excellence in higher education and research. Academic heritage you can trust.",
    ranking: "#1 Central University",
    totalStudents: "130,000+",
    type: "Central University",
    feeStructure: { UG: "₹10k - ₹25k/yr", PG: "₹15k - ₹35k/yr" }
  },
  'manipal-research': {
    id: 'manipal-research',
    name: "Manipal (Research & Innovation)",
    shortName: "MAHE",
    location: "Manipal",
    state: "Karnataka",
    established: "1953",
    accreditation: "NAAC A++",
    ugcApproved: true,
    programs: ["B.Tech", "MBA", "MBBS", "BDS", "B.Arch"],
    highlights: ["World-Class Campus", "Global Rankings", "Research Excellence", "Industry Connect"],
    description: "Comprehensive university with strong focus on research, innovation, and global education standards.",
    ranking: "#4 Private University",
    totalStudents: "35,000+",
    type: "Deemed University",
    feeStructure: { UG: "₹1L - ₹3L/yr", PG: "₹1.5L - ₹4L/yr" }
  },
  'symbiosis-management': {
    id: 'symbiosis-management',
    name: "Symbiosis (Management Specialists)",
    shortName: "SIU",
    location: "Pune",
    state: "Maharashtra",
    established: "1971",
    accreditation: "NAAC A+",
    ugcApproved: true,
    programs: ["MBA", "Law", "Liberal Arts", "Media & Comm", "Computer Studies"],
    highlights: ["Specialized Management", "Interdisciplinary Approach", "International Hub", "Strong Placements"],
    description: "Specialized university known for excellence in management, law, and liberal arts education. Management specialists.",
    ranking: "#5 Private University",
    totalStudents: "20,000+",
    type: "Deemed University",
    feeStructure: { UG: "₹90k - ₹2L/yr", PG: "₹1.2L - ₹2.5L/yr" }
  },
  'excellence-institute-tech': {
    id: 'excellence-institute-tech',
    name: "Excellence Institute (Future-Ready Tech)",
    shortName: "Excellence",
    location: "Knowledge City",
    state: "India",
    established: "2000",
    accreditation: "NAAC A++",
    ugcApproved: true,
    programs: ["Tech", "Management", "Research"],
    highlights: ["Future-Ready Tech", "Global Faculty", "Research Focus"],
    description: "A research-driven educational node focused on future technologies and management excellence.",
    ranking: "#1 Research Institute",
    totalStudents: "5,000+",
    type: "Research Institute",
    feeStructure: { UG: "₹50k - ₹1L/yr", PG: "₹70k - ₹1.2L/yr" }
  }
};

interface UniversityPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: UniversityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const university = (universities as any)[resolvedParams.id];
  return { title: `${university?.name || 'University'} - EDBELL` };
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const resolvedParams = await params;
  const university = (universities as any)[resolvedParams.id];

  if (!university) {
    return <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-heading)] font-black uppercase">Archive Node Not Found</div>;
  }

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
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">Network Size</p>
                  <p className="text-2xl font-black text-[var(--text-heading)]">{university.totalStudents}</p>
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
              <h3 className="text-xs font-black text-[var(--primary)] uppercase tracking-[0.4em]">Protocol Highlights</h3>
              <div className="space-y-6">
                {university.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-center space-x-4">
                    <CheckCircle className="h-5 w-5 text-[var(--primary)]" />
                    <span className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">{h}</span>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-[var(--border)]">
                <Link href="/contact" className="block w-full py-4 bg-[var(--primary)] rounded-2xl text-white text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:bg-[var(--primary)]/90 transition-all text-center">
                  Initialize Enrollment
                </Link>
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
            <div className="space-y-12">
              <div className="flex items-center space-x-4">
                <GraduationCap className="h-6 w-6 text-[var(--primary)]" />
                <h3 className="text-3xl font-black text-[var(--text-heading)] uppercase tracking-tighter">Offered Programs</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {university.programs.map((p: string, i: number) => (
                  <Link key={i} href="/contact" className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-3xl p-6 text-center hover:border-[var(--primary)] hover:shadow-lg transition-all group shadow-sm">
                    <p className="text-lg font-black text-[var(--text-heading)] group-hover:text-[var(--primary)] transition-colors uppercase">{p}</p>
                    <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest block mt-2 group-hover:text-[var(--primary)]">Inquire Now</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Fee Protocol */}
            <div className="space-y-12">
              <div className="flex items-center space-x-4">
                <TrendingUp className="h-6 w-6 text-[var(--primary)]" />
                <h3 className="text-3xl font-black text-[var(--text-heading)] uppercase tracking-tighter">Fee Structure</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {Object.entries(university.feeStructure).map(([k, v]) => (
                  <Link key={k} href="/contact" className="bg-[var(--surface)]/20 border border-[var(--border)] rounded-[40px] p-10 flex items-center justify-between shadow-sm hover:border-[var(--primary)]/50 transition-all group">
                    <div>
                      <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">{k} Program</p>
                      <p className="text-3xl font-black text-[var(--primary)]">{v as string}</p>
                    </div>
                    <Zap className="h-8 w-8 text-[var(--bg-primary)] opacity-40 group-hover:text-[var(--primary)] group-hover:opacity-100 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-[var(--bg-primary)]/60 backdrop-blur-3xl border border-[var(--border)] rounded-[40px] p-8 lg:p-10 space-y-8 sticky top-32 shadow-xl">
              <h4 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">Node Metadata</h4>
              <div className="space-y-6">
                <div className="flex justify-between border-b border-[var(--border)] pb-4">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Ownership</span>
                  <span className="text-xs font-bold text-[var(--text-heading)] uppercase">{university.type}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-4">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Base Hub</span>
                  <span className="text-xs font-bold text-[var(--text-heading)] uppercase">{university.location}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-4">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Rank Tier</span>
                  <span className="text-xs font-bold text-[var(--text-heading)] uppercase">{university.ranking}</span>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em] mb-4">Direct Terminal</p>
                <div className="flex flex-col gap-3">
                  <a href="tel:+91924130060" className="flex items-center justify-center space-x-3 py-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[10px] font-black text-[var(--text-heading)] hover:bg-[var(--primary)] hover:text-white transition-all">
                    <Phone className="h-4 w-4" />
                    <span>Call Advisor</span>
                  </a>
                  <a href="mailto:info@edbelledusolutions.com" className="flex items-center justify-center space-x-3 py-4 bg-[var(--primary)] rounded-2xl text-[10px] font-black text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                    <Mail className="h-4 w-4" />
                    <span>Request Brochure</span>
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