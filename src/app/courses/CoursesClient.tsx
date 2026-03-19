'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Newsletter from '@/components/Newsletter';
import { BookOpen, Clock, Award, CheckCircle, GraduationCap, ArrowRight, Sparkles, Filter, Search, Zap } from 'lucide-react';

interface Course {
  _id?: string;
  id: string;
  name: string;
  url: string;
  category: 'Undergraduate' | 'Postgraduate' | 'Specialized';
  duration: string;
  fees?: string;
  eligibility?: string;
  description: string;
}



export default function CoursesClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const response = await fetch('/api/courses', { signal: controller.signal });
        const data = await response.json();
        clearTimeout(timeoutId);

        if (data.success && data.courses) {
          setCourses(data.courses);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Live sync failed or timed out.', err);
      }

      setCourses([]);
    } catch (error) {
      console.error('Critical failure in fetchCourses:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Modules' },
    { id: 'Undergraduate', name: 'Undergraduate' },
    { id: 'Postgraduate', name: 'Postgraduate' },
    { id: 'Specialized', name: 'Specialized' }
  ];

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--primary)]/20 blur-3xl rounded-full"></div>
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 border-t-2 border-b-2 border-[var(--primary)] rounded-full animate-spin"></div>
            <p className="mt-8 text-[var(--text-muted)] font-bold uppercase tracking-widest text-[10px]">Syncing Educational Modules...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden">
        {/* Dynamic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/campus-modern.jpg" 
            alt="Courses Background"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]"></div>
          <div className="absolute inset-0 bg-[var(--bg-primary)]/40 backdrop-blur-[1px]"></div>
        </div>

        {/* Floating Particles/Glows */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className={`lg:col-span-8 space-y-10 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center bg-[var(--surface)]/40 border border-[var(--border)] rounded-2xl px-5 py-2.5 backdrop-blur-2xl">
              <GraduationCap className="h-5 w-5 text-[var(--primary)] mr-3" />
              <span className="text-[10px] sm:text-xs font-black text-[var(--primary)] uppercase tracking-[0.3em]">Knowledge Architecture</span>
            </div>

            <h1 className={`text-5xl lg:text-7xl font-black text-[var(--text-heading)] leading-[0.9] tracking-tighter uppercase not-italic font-serif ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
              Engineered <br />
              <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">
                For Growth
              </span>
            </h1>

            <p className={`text-base lg:text-xl text-[var(--text-primary)] font-light leading-relaxed max-w-2xl ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              Access globally recognized degrees and specialized certifications designed to meet the demands of the modern industrial landscape. 100% Digital. 100% Recognized.
            </p>

            <div className={`flex flex-col sm:flex-row gap-6 pt-4 ${mounted ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
              <button
                onClick={() => document.getElementById('course-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-10 py-5 bg-[var(--primary)] rounded-2xl text-white font-black text-sm uppercase tracking-widest hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-1"
              >
                Scan Available Modules
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Navigation & Filter Node */}
      <section id="filter-node" className="relative z-20 bg-[var(--bg-primary)]/80 backdrop-blur-3xl border-y border-[var(--border)] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center text-[var(--primary)]">
              <Filter className="h-5 w-5" />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="SEARCH CURRICULUM..."
              className="w-full bg-gray-100 border border-gray-300 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-all uppercase tracking-widest"
            />
          </div>
        </div>
      </section>

      {/* Main Course Grid */}
      <section id="course-grid" className="py-32 bg-[var(--bg-secondary)] pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-40 bg-[var(--surface)]/20 border border-[var(--border)] rounded-[48px]">
              <Zap className="h-16 w-16 text-[var(--text-muted)] mx-auto mb-8 animate-pulse" />
              <h3 className="text-3xl font-black text-[var(--text-heading)] uppercase tracking-tighter mb-4">No Matches Detected</h3>
              <p className="text-[var(--text-primary)] max-w-sm mx-auto">Our database is currently updating. Try refining your parameters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <Link key={course._id || course.id || index} href={course.url} className="group relative">
                  <div className="h-full bg-[var(--surface)]/40 backdrop-blur-3xl border border-[var(--border)] rounded-[32px] p-8 hover:border-[var(--primary)]/40 transition-all duration-500 flex flex-col overflow-hidden shadow-sm hover:shadow-xl">
                    {/* Animated Gradient Border Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex items-start justify-between mb-10">
                      <div className="w-16 h-16 bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-[var(--text-primary)] group-hover:bg-[var(--primary)] group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-xl">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <span className={`text-[10px] font-black px-4 py-2 rounded-full border tracking-[0.2em] uppercase backdrop-blur-xl ${course.category === 'Undergraduate' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        course.category === 'Postgraduate' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                          'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        }`}>
                        {course.category}
                      </span>
                    </div>

                    <div className="relative z-10 flex-1">
                      <h4 className="text-2xl font-black text-[var(--text-heading)] mb-4 tracking-tighter group-hover:text-[var(--primary)] transition-colors uppercase leading-tight">
                        {course.name}
                      </h4>
                      <p className="text-[var(--text-primary)] font-light text-sm leading-relaxed mb-8">
                        {course.description}
                      </p>
                    </div>

                    <div className="relative z-10 space-y-4 pt-8 border-t border-[var(--border)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 opacity-60">
                          <Clock className="h-4 w-4 text-[var(--primary)]" />
                          <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Duration</span>
                        </div>
                        <span className="text-sm font-bold text-[var(--text-heading)]">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 opacity-60">
                          <Award className="h-4 w-4 text-[var(--primary)]" />
                          <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Investment</span>
                        </div>
                        <span className="text-sm font-bold text-[var(--primary)]">{course.fees || 'TBA'}</span>
                      </div>
                    </div>

                    <div className="relative z-10 mt-10 w-full py-4 bg-[var(--surface-alt)] group-hover:bg-[var(--primary)] border border-[var(--border)] group-hover:border-[var(--primary)] rounded-2xl flex items-center justify-center space-x-3 transition-all duration-500">
                      <span className="text-[10px] font-black text-[var(--text-heading)] uppercase tracking-[0.2em] group-hover:text-white">Examine Module</span>
                      <ArrowRight className="h-4 w-4 text-[var(--text-heading)] group-hover:text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-40 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[60px] p-16 lg:p-24 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/10 to-transparent"></div>
            <div className="relative z-10 text-center space-y-10">
              <h2 className="text-5xl lg:text-8xl font-black text-[var(--text-heading)] tracking-tighter leading-[0.9] uppercase italic">
                Initialize Your <br />
                Career Protocol
              </h2>
              <p className="text-base lg:text-xl text-[var(--text-primary)] font-light max-w-2xl mx-auto">
                Global recognition. Expert guidance. Strategic growth. Connect with our admission architects for a customized roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="px-12 py-5 bg-[var(--primary)] rounded-2xl text-white font-black text-sm uppercase tracking-widest hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-1">
                  Apply Now
                </Link>
                <Link href="/about" className="px-12 py-5 bg-[var(--surface)]/40 border border-[var(--border)] rounded-2xl text-[var(--text-heading)] font-black text-sm uppercase tracking-widest hover:bg-[var(--surface-alt)]/60 transition-all transform hover:-translate-y-1">
                  The Charter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nodes */}
      <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
