'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  BookOpen,
  ThumbsUp,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
  Sparkles,
  Zap,
  Download
} from 'lucide-react';
import Newsletter from '@/components/Newsletter';

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
  likes: number;
}

interface BlogArticleClientProps {
  post: BlogPost;
  blogPosts: BlogPost[];
}

export default function BlogArticleClient({ post, blogPosts }: BlogArticleClientProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleShare = async (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL');
        }
        break;
    }
  };

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32 overflow-hidden px-6 lg:px-12">
        {/* Dynamic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/about-professional.jpg"
            alt="Intelligence Background"
            className="w-full h-full object-cover opacity-20 filter contrast-125 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]"></div>
          <div className="absolute inset-0 bg-[#030712]/40 backdrop-blur-[1px]"></div>
        </div>

        {/* Global Glows */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-5xl mx-auto w-full space-y-10">
          <Link href="/blog" className="inline-flex items-center space-x-3 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] hover:text-white transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" />
            <span>Back to Intelligence Hub</span>
          </Link>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{post.category}</span>
              {post.featured && <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center"><Sparkles className="h-3 w-3 mr-2" /> Featured Logic</span>}
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1] tracking-tighter uppercase">
              {post.title}
            </h1>

            <p className="text-xl lg:text-2xl text-slate-400 font-light leading-relaxed max-w-4xl">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-wrap items-center gap-10">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-600 rounded-[20px] flex items-center justify-center text-white font-black text-xl">
                {post.author[0]}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Architecture Lead</p>
                <p className="text-lg font-bold text-white">{post.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Compute Time</span>
                <span className="text-xs font-bold text-slate-300 flex items-center uppercase"><Clock className="h-3 w-3 mr-2" /> {post.readTime}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Traffic Node</span>
                <span className="text-xs font-bold text-slate-300 flex items-center uppercase"><BookOpen className="h-3 w-3 mr-2" /> {post.views} Views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Architecture Node */}
      <section className="py-32 bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Primary Data Stream */}
            <div className="lg:col-span-8">
              <article className="bg-[#030712]/40 backdrop-blur-3xl border border-white/5 rounded-[48px] p-8 lg:p-16 shadow-2xl relative overflow-hidden">
                {/* Article Content with Premium Prose */}
                <div
                  className="prose prose-invert prose-xl max-w-none 
                        prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white
                        prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed
                        prose-strong:text-blue-400 prose-strong:font-black
                        prose-li:text-slate-400
                        prose-h2:text-4xl prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-6 prose-h2:mt-16
                        prose-h3:text-2xl prose-h3:text-blue-300"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Metadata Tags */}
                <div className="mt-20 pt-12 border-t border-white/5">
                  <div className="flex items-center space-x-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">
                    <Tag className="h-4 w-4" />
                    <span>Metadata Alignment</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((t, i) => (
                      <span key={i} className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white hover:border-blue-500/30 transition-all cursor-default">
                        #{t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engagement Matrix */}
                <div className="mt-12 pt-12 border-t border-white/5 flex flex-wrap items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-4 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${liked
                        ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                        : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      <ThumbsUp className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                      <span>{likes} Nodes</span>
                    </button>
                    <div className="flex items-center space-x-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                      <MessageCircle className="h-4 w-4" />
                      <span>Signal Shared</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={() => handleShare('facebook')} className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"><Facebook className="h-5 w-5" /></button>
                    <button onClick={() => handleShare('twitter')} className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-sky-500 hover:text-white transition-all"><Twitter className="h-5 w-5" /></button>
                    <button onClick={() => handleShare('linkedin')} className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-blue-700 hover:text-white transition-all"><Linkedin className="h-5 w-5" /></button>
                    <button onClick={() => handleShare('copy')} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/[0.03] border border-white/10 text-slate-500 hover:bg-white/5'}`}>
                      {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </article>

              {/* Related Intelligence Nodes */}
              {relatedPosts.length > 0 && (
                <div className="mt-24 space-y-12">
                  <div className="flex items-center space-x-4">
                    <Zap className="h-6 w-6 text-blue-500" />
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Synchronized Intelligence</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((p) => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="group relative bg-[#030712]/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 hover:border-blue-500/30 transition-all">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] block mb-4">{p.category}</span>
                        <h4 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors mb-4">{p.title}</h4>
                        <ArrowRight className="h-5 w-5 text-slate-700 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Interface Nodes */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-[#030712]/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 lg:p-10 space-y-8">
                <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Intelligence Lead</h4>
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto text-white font-black text-4xl shadow-2xl">
                    {post.author[0]}
                  </div>
                  <div>
                    <h5 className="text-xl font-black text-white uppercase tracking-tighter">{post.author}</h5>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{post.category} SPECIALIST</p>
                  </div>
                  <Link href="/contact" className="block w-full py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Request Briefing
                  </Link>
                </div>
              </div>

              <Newsletter variant="sidebar" />

              <div className="bg-[#030712]/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 lg:p-10 space-y-8">
                <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">High Frequency Data</h4>
                <div className="space-y-6">
                  {blogPosts.slice(0, 3).map((p) => (
                    <Link key={p.id} href={`/blog/${p.slug}`} className="block group">
                      <p className="text-xs font-black text-slate-300 group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-snug">{p.title}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{p.views} REACH</span>
                        <ArrowRight className="h-3 w-3 text-slate-700 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
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