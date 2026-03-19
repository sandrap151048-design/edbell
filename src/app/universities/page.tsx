'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
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
  Building,
  GraduationCap,
  Trophy,
  Target,
  Zap,
  Shield,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  Heart,
  TrendingUp
} from 'lucide-react';

interface University {
  _id?: string;
  name: string;
  url: string;
  accreditation: string;
  established: string;
  location?: string;
  website?: string;
  description: string;
  ranking?: string;
  studentsCount?: string;
  coursesOffered?: number;
  specialization?: string[];
  rating?: number;
}

export default function Universities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/universities');
      const data = await response.json();

      if (data.success && data.universities) {
        setUniversities(data.universities);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate university slugs that match the [id] route
  const getUniversitySlug = (universityName: string): string => {
    // Convert university name to URL-friendly slug
    return universityName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const filters = [
    { id: 'all', name: 'All Universities', count: universities.length },
    { id: 'naac-a++', name: 'NAAC A++', count: universities.filter(u => u.accreditation === 'NAAC A++').length },
    { id: 'naac-a+', name: 'NAAC A+', count: universities.filter(u => u.accreditation === 'NAAC A+').length },
    { id: 'top-ranked', name: 'Top Ranked', count: universities.filter(u => u.ranking?.includes('#1') || u.ranking?.includes('#2') || u.ranking?.includes('#3')).length }
  ];

  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.specialization?.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'naac-a++' && university.accreditation === 'NAAC A++') ||
      (selectedFilter === 'naac-a+' && university.accreditation === 'NAAC A+') ||
      (selectedFilter === 'top-ranked' && (university.ranking?.includes('#1') || university.ranking?.includes('#2') || university.ranking?.includes('#3')));

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <h3 className="text-2xl font-bold text-[var(--text-heading)] mb-2">Loading Universities</h3>
          <p className="text-[var(--text-muted)]">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-10 sm:py-14 lg:py-16 overflow-hidden min-h-[500px] sm:min-h-[550px] lg:min-h-[650px] bg-[var(--bg-primary)] pt-20 flex items-center">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/about-campus.jpg"
            alt="University Background"
            className="w-full h-full object-cover opacity-35 scale-105 filter contrast-110 brightness-90 will-change-auto"
            loading="lazy"
            decoding="async"
            style={{ animationDuration: '8s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/50 via-[var(--bg-primary)]/70 to-[var(--bg-primary)]"></div>
        </div>

        {/* Floating Light Elements */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[var(--primary)]/10 to-transparent blur-3xl opacity-50 z-10" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-[120px] animate-pulse z-10" />

        <div className="relative max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 z-20 w-full pt-6 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className={`text-center lg:text-left space-y-5 sm:space-y-6 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center bg-[var(--surface)]/40 border border-[var(--border)] rounded-full px-3 py-1.5 backdrop-blur-md mb-2 hover:bg-[var(--surface-alt)]/60 transition-all duration-300 transform hover:scale-105">
                <span className="flex h-2 w-2 rounded-full bg-[var(--primary)] mr-2 animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-medium text-[var(--text-primary)] tracking-wide uppercase">Premier University Partners</span>
              </div>

              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] leading-[1.1] tracking-tight uppercase not-italic font-serif ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
                Choose Your <br />
                <span className="text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text">
                  Dream University
                </span>
              </h1>

              <p className={`text-sm sm:text-base lg:text-lg text-[var(--text-primary)] leading-relaxed font-light max-w-xl mx-auto lg:mx-0 ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
                Partner with India's top universities offering world-class online education with industry-recognized degrees and career support.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="group relative bg-[var(--surface)]/20 border border-[var(--border)] rounded-xl p-3 sm:p-4 hover:bg-[var(--surface-alt)]/40 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-2xl shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                    {universities.length === 0 ? "10" : universities.length}+
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--text-muted)] font-medium">Top Universities</div>
                </div>
                <div className="group relative bg-[var(--surface)]/20 border border-[var(--border)] rounded-xl p-3 sm:p-4 hover:bg-[var(--surface-alt)]/40 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-2xl shadow-sm">
                  <div className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-1 group-hover:text-[var(--accent)] transition-colors">200+</div>
                  <div className="text-[10px] sm:text-xs text-[var(--text-muted)] font-medium">Degree Programs</div>
                </div>
                <div className="group relative bg-[var(--surface)]/20 border border-[var(--border)] rounded-xl p-3 sm:p-4 hover:bg-[var(--surface-alt)]/40 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-2xl shadow-sm sm:col-span-1 col-span-2">
                  <div className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-1 group-hover:text-[var(--primary)] transition-colors">95%</div>
                  <div className="text-[10px] sm:text-xs text-[var(--text-muted)] font-medium tracking-tight">Success Rate</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                <Link href="#universities" className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-6 py-3 rounded-xl font-bold shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center group uppercase tracking-widest text-xs">
                  <span>Explore Universities</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="bg-[var(--surface)]/40 border border-[var(--border)] hover:bg-[var(--surface-alt)]/60 text-[var(--text-heading)] px-6 py-3 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center uppercase tracking-widest text-xs">
                  Get Guidance
                </Link>
              </div>
            </div>

            {/* Right Content - Featured Showcase (Dynamic) */}
            <div className="relative hidden lg:block">
              {universities.length > 0 ? (
                <div className="grid grid-cols-2 gap-6">
                  {universities.slice(0, 4).map((u, i) => (
                    <div 
                      key={u._id || i}
                      className={`group relative bg-[var(--surface)]/20 border border-[var(--border)] rounded-3xl p-6 hover:bg-[var(--surface-alt)]/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden hover:shadow-2xl cursor-pointer ${i % 2 === 1 ? 'mt-12' : ''}`}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                          {i % 2 === 0 ? <Award className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
                        </div>
                        <span className="text-[10px] bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/20 px-2 py-0.5 rounded-full uppercase font-black tracking-widest">{u.accreditation}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-1">{u.name}</h3>
                      <p className="text-[var(--text-muted)] text-xs font-light leading-relaxed line-clamp-2">{u.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4 opacity-50">
                    <Building className="w-16 h-16 mx-auto text-[var(--text-muted)]" />
                    <p className="text-xs font-black uppercase tracking-widest">Network Synchronizing...</p>
                  </div>
                </div>
              )}

              {/* Central Floating Badge */}
              <div className="absolute -top-10 -right-10 bg-[var(--surface)]/60 backdrop-blur-2xl border border-[var(--border)] rounded-2xl p-5 shadow-2xl animate-bounce hover:animate-none group transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[var(--text-heading)] tracking-tight">UGC</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">Approved Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-10 sm:py-12 bg-[var(--bg-secondary)] border-y border-[var(--border)]" id="universities">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text-heading)] mb-3 tracking-tight uppercase">Find Your Future University</h2>
            <p className="text-sm sm:text-base text-[var(--text-primary)] max-w-xl mx-auto font-light leading-relaxed">
              Browse through our handpicked partner institutions to find the perfect fit for your educational journey.
            </p>
          </div>

          {/* Search Interface */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl blur opacity-25 group-focus-within:opacity-50 transition-all duration-500" />
              <div className="relative">
                <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name, location, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base border border-[var(--border)] rounded-xl bg-[var(--bg-primary)]/80 backdrop-blur-xl text-[var(--text-heading)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--primary)]/30 transition-all tracking-tight font-bold"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-black transition-all duration-500 flex items-center space-x-2 border uppercase tracking-wider text-[9px] sm:text-[10px] ${selectedFilter === filter.id
                  ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] scale-105'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-alt)] hover:text-white hover:-translate-y-0.5'
                  }`}
              >
                <span>{filter.name}</span>
                <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-black ${selectedFilter === filter.id ? 'bg-white/20' : 'bg-[var(--surface-alt)] text-[var(--text-muted)]'
                  }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[var(--bg-primary)]">
        <div className="max-w-[1700px] mx-auto">
          {filteredUniversities.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--text-muted)]">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-heading)] mb-4">No results found</h3>
              <p className="text-[var(--text-primary)] max-w-md mx-auto mb-10 font-light text-sm">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedFilter('all'); }}
                className="bg-[var(--surface)] border border-[var(--border)] text-[var(--text-heading)] px-8 py-3 rounded-xl hover:bg-[var(--surface-alt)] transition-all font-black uppercase tracking-widest text-xs"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredUniversities.map((university, index) => (
                <div
                  key={university._id || university.name}
                  className="group relative h-full bg-[var(--surface)]/20 border border-[var(--border)] rounded-3xl overflow-hidden hover:bg-[var(--surface-alt)]/40 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl flex flex-col shadow-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Top Bar Decoration */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                  <div className="p-4 sm:p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl sm:rounded-2xl flex items-center justify-center text-[var(--text-muted)] group-hover:scale-110 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-500">
                        <Building className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-[10px] font-black tracking-widest mb-2 uppercase border border-[var(--primary)]/10">
                          {university.accreditation}
                        </div>
                        <div className="flex items-center justify-end text-yellow-400/80">
                          <Star className="w-3.5 h-3.5 fill-current mr-1" />
                          <span className="text-sm font-bold">{university.rating || '4.5'}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[var(--text-heading)] mb-2 sm:mb-3 group-hover:text-[var(--primary)] transition-colors tracking-tight uppercase italic">{university.name}</h3>

                    <div className="flex items-center text-[var(--text-muted)] text-xs mb-4 space-x-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5 text-[var(--primary)]/50" />
                        <span>{university.location || 'India'}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-[var(--primary)]/50" />
                        <span>Est. {university.established}</span>
                      </div>
                    </div>

                    <p className="text-[var(--text-primary)] text-xs sm:text-sm font-light leading-relaxed mb-4 flex-grow line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {university.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {university.specialization?.slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--surface-alt)]/60 text-[var(--text-muted)] border border-[var(--border)]">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="bg-[var(--surface-alt)]/40 rounded-xl p-2.5 sm:p-3 border border-[var(--border)]">
                        <div className="text-xs sm:text-sm font-bold text-[var(--text-heading)]">{university.studentsCount || '5K+'}</div>
                        <div className="text-[8px] sm:text-[9px] text-[var(--text-muted)] font-black uppercase tracking-wider">Students</div>
                      </div>
                      <div className="bg-[var(--surface-alt)]/40 rounded-xl p-2.5 sm:p-3 border border-[var(--border)]">
                        <div className="text-xs sm:text-sm font-bold text-[var(--text-heading)]">{university.coursesOffered || '50+'}</div>
                        <div className="text-[8px] sm:text-[9px] text-[var(--text-muted)] font-black uppercase tracking-wider">Courses</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-6 text-[10px] font-medium text-[var(--text-primary)]">
                       <div className="flex items-center space-x-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                         <span className="text-[var(--text-muted)] font-bold uppercase tracking-wider">Type:</span>
                         <span className="text-[var(--text-heading)]">{university.ranking?.includes('Private') ? 'Private' : 'Central/Deemed'}</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
                         <span className="text-[var(--text-muted)] font-bold uppercase tracking-wider">Status:</span>
                         <span className="text-[var(--text-heading)]">UGC & DEB Approved</span>
                       </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link href={university.url || `/universities/${getUniversitySlug(university.name)}`} className="flex-1">
                        <button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-black py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 text-[10px] sm:text-xs uppercase tracking-widest">
                          View Program
                        </button>
                      </Link>
                      <Link href="/contact" className="w-10 sm:w-12 items-center justify-center flex">
                        <button className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--surface-alt)]/40 border border-[var(--border)] rounded-lg sm:rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all">
                          <Phone className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--surface)]/40 backdrop-blur-xl rounded-xl border border-[var(--border)] flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl group cursor-pointer hover:rotate-12 transition-transform">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--primary)]" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-heading)] mb-4 tracking-tight leading-tight uppercase italic">
            Start Your Journey with <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--highlight)] bg-clip-text">EDBELL EDUSOLUTIONS</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[var(--text-primary)] mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Get personalized university recommendations. Our expert counselors will guide you through the entire admission process for free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center space-x-2 group uppercase tracking-widest text-xs">
                <Phone className="w-4 h-4" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/courses" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[var(--surface)]/40 border border-[var(--border)] hover:bg-[var(--surface-alt)]/60 text-[var(--text-heading)] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black transition-all transform hover:-translate-y-1 inline-flex items-center justify-center space-x-2 uppercase tracking-widest text-xs">
                <BookOpen className="w-4 h-4" />
                <span>Explore Courses</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Addition */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
