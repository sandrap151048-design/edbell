'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Users,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Eye,
  Download,
  Share2,
  ArrowRight,
  Sparkles,
  Zap,
  LayoutGrid,
  Layers
} from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  date: string;
  location?: string;
  description: string;
}

export default function Gallery() {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Updated fallback images with generated high-quality assets
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      alt: 'Educational Excellence',
      title: 'Educational Architect',
      category: 'achievements',
      date: '2024-03-15',
      location: 'Leadership',
      description: 'Pioneering educational transformation and institutional excellence.'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600&h=600',
      alt: 'Students Learning',
      title: 'Interactive Learning Session',
      category: 'events',
      date: '2024-03-15',
      location: 'Classroom Hub',
      description: 'Students engaged in collaborative learning and knowledge sharing.'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600&h=600',
      alt: 'University Campus',
      title: 'Modern Educational Infrastructure',
      category: 'campus',
      date: '2024-02-20',
      location: 'Campus Node',
      description: 'State-of-the-art campus facilities designed for optimal learning experience.'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600&h=600',
      alt: 'Graduation Ceremony',
      title: 'Success Protocol 2024',
      category: 'graduation',
      date: '2024-01-30',
      location: 'Convocation Hall',
      description: 'Celebrating the successful deployment of our elite student fleet.'
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      alt: 'Programming & Development',
      title: 'Collaborative Workspace',
      category: 'activities',
      date: '2024-03-10',
      location: 'Learning Zone',
      description: 'Collaborative environments focused on high-bandwidth knowledge transfer.'
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=600',
      alt: 'Research Lab',
      title: 'Academic Research Wing',
      category: 'achievements',
      date: '2024-02-28',
      location: 'Innovation Lab',
      description: 'Experimental learning nodes achieving unprecedented academic benchmarks.'
    },
    {
      id: '7',
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      alt: 'Workshop Session',
      title: 'International Strategy Workshop',
      category: 'events',
      date: '2024-03-05',
      location: 'Seminar Suite',
      description: 'Bridging international educational gaps through strategic collaboration.'
    }
  ];

  const categories = [
    { id: 'all', name: 'Global Data', icon: LayoutGrid },
    { id: 'events', name: 'Summits', icon: Calendar },
    { id: 'campus', name: 'Infrastructure', icon: Layers },
    { id: 'graduation', name: 'Deployment', icon: GraduationCap },
    { id: 'activities', name: 'Operations', icon: Users },
    { id: 'achievements', name: 'Benchmarks', icon: Award }
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30">
      {/* Hero Section - unique UI with floating elements */}
      <section className="relative min-h-[110vh] flex items-center pt-32 overflow-hidden px-6 lg:px-12">
        {/* Abstract Technical Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80"
            alt="Graduation Ceremony Backdrop"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"></div>
          <div className="grid grid-cols-10 h-full w-full opacity-10">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-[var(--primary)]/30"></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className={`lg:col-span-6 space-y-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-3 text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.5em] mb-4">
              <Camera className="h-4 w-4" />
              <span>Visual Core Intelligence</span>
            </div>
            <h1 className={`text-3xl lg:text-5xl font-black text-[var(--text-heading)] leading-[0.85] tracking-tighter uppercase not-italic font-serif ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
              Optical <br />
              <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Repository</span>
            </h1>
            <p className={`text-lg text-[var(--text-primary)] font-light leading-relaxed max-w-xl ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              Visualizing the high-resolution trajectory of institutional growth and student deployment benchmarks across our global network.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-blue-500/15 blur-[120px] rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-6">
              {galleryImages.slice(0, 4).map((img, i) => (
                <div key={i} className="h-80 rounded-3xl overflow-hidden border border-[var(--primary)]/20 shadow-2xl cursor-pointer group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Category Filter Node */}
      <section className="sticky top-0 z-[100] py-10 bg-[var(--bg-secondary)]/60 backdrop-blur-3xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap gap-3 justify-center">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center space-x-4 px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group ${selectedCategory === c.id
                ? 'bg-[var(--primary)] text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-105'
                : 'bg-[var(--primary)]/10 border border-[var(--border)] text-[var(--text-primary)] hover:text-white hover:border-[var(--primary)]/50'
                }`}
            >
              <c.icon className={`h-4 w-4 ${selectedCategory === c.id ? 'animate-pulse' : ''}`} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* High-Impact Gallery Grid */}
      <section className="py-32 bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredImages.map((img, i) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative h-[500px] rounded-[48px] overflow-hidden bg-[var(--bg-primary)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)]/50 transition-all duration-700 hover:-translate-y-4 shadow-xl"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* ID Tag */}
                <div className="absolute top-8 left-8 z-20 bg-[var(--primary)] px-4 py-2 rounded-xl text-[9px] font-black text-white uppercase tracking-widest shadow-xl">
                  NODE_{img.id.padStart(3, '0')}
                </div>

                {/* Primary Image */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />

                {/* Glass Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-90"></div>
                <div className="absolute inset-0 bg-[var(--primary)]/5 opacity-0 group-hover:opacity-20 transition-opacity"></div>

                {/* Content Node */}
                <div className="absolute inset-x-0 bottom-0 p-10 space-y-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em]">{img.category} // {img.location}</span>
                  <h3 className="text-3xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-none">{img.title}</h3>
                  <p className="text-sm font-light text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 leading-relaxed">
                    {img.description}
                  </p>
                  <div className="pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                    <span className="text-[10px] font-black text-[var(--text-muted)] uppercase italic">{img.date}</span>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] backdrop-blur-3xl border border-[var(--primary)]/30">
                      <Eye className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive Deployment Hub CTA */}
      <section className="py-40 relative px-6 overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <Zap className="h-20 w-20 text-[var(--primary)] mx-auto animate-pulse" />
          <h2 className="text-7xl lg:text-[10rem] font-black text-[var(--text-heading)] tracking-tighter leading-[0.8] uppercase italic">
            Join the <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Ecosystem</span>
          </h2>
          <Link href="/contact" className="inline-block px-16 py-8 bg-[var(--primary)] rounded-[32px] text-white font-black text-2xl uppercase tracking-widest hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-2">
            Deploy Now
          </Link>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>

      {/* Lightbox Node - Premium Blur with Colorful Animation */}
      {selectedImage && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 lg:p-12 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <div className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-[40px]"></div>
          <div className="relative max-w-7xl w-full bg-[var(--bg-secondary)] rounded-[64px] border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col lg:flex-row" onClick={e => e.stopPropagation()}>
            <div className="lg:w-2/3 h-[50vh] lg:h-[80vh] relative group">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-cover shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute top-8 left-8 flex gap-4">
                <span className="bg-[var(--bg-primary)]/80 backdrop-blur-2xl border border-[var(--border)] px-6 py-3 rounded-2xl text-[10px] font-black text-[var(--text-primary)] uppercase tracking-widest">{selectedImage.id} // SECURE_NODE</span>
              </div>
            </div>
            <div className="lg:w-1/3 p-12 lg:p-16 flex flex-col justify-between bg-[var(--surface)]/40 backdrop-blur-3xl border-l border-[var(--border)]">
              <div className="space-y-10">
                <button onClick={() => setSelectedImage(null)} className="p-5 bg-[var(--primary)]/10 border border-[var(--border)] rounded-2xl text-[var(--primary)] hover:text-white hover:bg-[var(--primary)] transition-all">
                  <X className="h-6 w-6" />
                </button>
                <div className="space-y-6">
                  <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">{selectedImage.category} Protocol</span>
                  <h3 className="text-4xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-none">{selectedImage.title}</h3>
                  <div className="flex items-center space-x-4 text-[10px] font-black text-[var(--text-muted)] uppercase">
                    <MapPin className="h-4 w-4 text-[var(--primary)]" />
                    <span>{selectedImage.location}</span>
                    <span className="text-[var(--primary)]/30">|</span>
                    <Calendar className="h-4 w-4 text-[var(--primary)]" />
                    <span>{selectedImage.date}</span>
                  </div>
                </div>
                <p className="text-xl text-[var(--text-primary)] font-light leading-relaxed">{selectedImage.description}</p>
              </div>
              <div className="pt-10 space-y-4">
                <button className="w-full py-5 bg-[var(--primary)] rounded-3xl flex items-center justify-center space-x-4 text-white font-black uppercase text-xs tracking-widest hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
                  <Download className="h-5 w-5" />
                  <span>Download Data</span>
                </button>
                <button className="w-full py-5 bg-[var(--primary)]/10 border border-[var(--border)] rounded-3xl flex items-center justify-center space-x-4 text-[var(--primary)] font-black uppercase text-xs tracking-widest hover:text-white hover:bg-[var(--primary)] transition-all">
                  <Share2 className="h-5 w-5" />
                  <span>Distribute Signal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}