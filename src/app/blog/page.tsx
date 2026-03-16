'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  Clock,
  Tag,
  Target,
  Users,
  Zap,
  GraduationCap,
  Sparkles,
  Play
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  featured: boolean;
  views: number;
  image: string;
}

export default function Blog() {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Intelligence');

  useEffect(() => {
    setMounted(true);
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Architecture of Modern Learning in India",
      slug: "future-online-education-india",
      excerpt: "Analyzing the structural transition from legacy classrooms to high-bandwidth digital education protocols.",
      content: "Full content here...",
      author: "Dr. Arif Wafy Varambatta",
      category: "Macro Trends",
      tags: ["online learning", "infrastructure", "india", "future"],
      publishDate: "2024-02-01",
      readTime: "5 min read",
      featured: true,
      views: 1250,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      id: 2,
      title: "Optimization Strategies Post-Graduation",
      slug: "top-career-opportunities-graduation",
      excerpt: "A tactical guide to navigating high-growth career sectors in the current industrial landscape.",
      content: "Full content here...",
      author: "Dr. Arif Wafy Varambatta",
      category: "Tactical Guidance",
      tags: ["career", "optimization", "jobs", "industrial"],
      publishDate: "2024-01-28",
      readTime: "7 min read",
      featured: false,
      views: 980,
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800&h=600"
    }
  ];

  const categories = ['All Intelligence', 'Macro Trends', 'Tactical Guidance', 'Global Nodes', 'Scholarship Matrix'];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center pt-20 sm:pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80"
            alt="University Library Backdrop"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]"></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
        </div>

        <div className="absolute top-20 left-1/4 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-56 h-56 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            <div className={`inline-flex items-center bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-2 backdrop-blur-2xl uppercase ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Sparkles className="h-3.5 w-3.5 text-blue-400 mr-2" />
              <span className="text-[8px] sm:text-[10px] font-black text-blue-400 tracking-[0.25em]">Knowledge Base Alpha</span>
            </div>

            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] leading-[0.9] tracking-tighter uppercase ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
              Intelligence <br />
              <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">
                & Insights
              </span>
            </h1>

            <p className={`text-sm sm:text-base lg:text-lg text-[var(--text-primary)] font-light leading-relaxed max-w-xl ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              Scanning the frontlines of global education. Access high-resolution analysis on institutional trends, career optimization, and academic infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Content */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-wider transition-all ${selectedCategory === c
                        ? 'bg-[var(--primary)] text-white shadow-lg'
                        : 'bg-[var(--surface)]/40 text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-alt)]/60'
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <article className="relative bg-gradient-to-br from-[#0A1F3F] to-[#051428] backdrop-blur-3xl border border-[#0066CC]/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-[#0066CC]/50 transition-all duration-500 flex flex-col sm:flex-row gap-5 sm:gap-8 overflow-hidden shadow-sm hover:shadow-[0_0_30px_rgba(0,102,204,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="sm:w-1/3 h-48 sm:h-auto rounded-xl sm:rounded-2xl overflow-hidden bg-[#0066CC]/10 flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?auto=format&fit=crop&q=80&w=600&h=400";
                        }}
                      />
                    </div>

                    <div className="sm:w-2/3 space-y-3 sm:space-y-4 relative z-10">
                      <div className="flex items-center space-x-3">
                        <span className="text-[8px] sm:text-[9px] font-black text-[#0066CC] uppercase tracking-widest">{post.category}</span>
                        <div className="h-1 w-1 bg-[#0066CC]/30 rounded-full"></div>
                        <span className="text-[8px] sm:text-[9px] font-black text-[#0066CC]/70 uppercase tracking-widest">{post.readTime}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white hover:text-[#0066CC] transition-colors uppercase tracking-tighter leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#B0C4DE] font-light leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="pt-4 sm:pt-5 border-t border-[#0066CC]/20 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#0066CC] rounded-xl flex items-center justify-center text-white font-bold text-xs">
                            {post.author[0]}
                          </div>
                          <div>
                            <p className="text-[8px] sm:text-[9px] font-black text-[#0066CC]/70 uppercase tracking-widest mb-0.5">Expert Analyst</p>
                            <p className="text-[10px] sm:text-xs font-bold text-white">{post.author}</p>
                          </div>
                        </div>
                        <div className="p-2.5 bg-[#0066CC]/20 rounded-xl group-hover:bg-[#0066CC] transition-all">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}