'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  X,
  Camera,
  Users,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Eye,
  ArrowRight,
  Zap,
  LayoutGrid,
  Layers
} from 'lucide-react';

interface GalleryImage {
  _id?: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  category: string;
  eventDate?: string;
  location?: string;
  description: string;
  published?: boolean;
}

export default function Gallery() {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery?published=true');
      const data = await response.json();
      
      if (data.success && data.images) {
        setGalleryImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Global Data', icon: LayoutGrid },
    { id: 'events', name: 'Summits', icon: Calendar },
    { id: 'campus', name: 'Infrastructure', icon: Layers },
    { id: 'graduation', name: 'Deployment', icon: GraduationCap },
    { id: 'activities', name: 'Operations', icon: Users },
    { id: 'achievements', name: 'Benchmarks', icon: Award }
  ];

  // Demo gallery images - always displayed along with database images
  const demoImages: GalleryImage[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Educational Excellence',
      title: 'Educational Architect',
      category: 'achievements',
      eventDate: '2024-03-15',
      location: 'Leadership',
      description: 'Pioneering educational transformation and institutional excellence.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Students Learning',
      title: 'Interactive Learning Session',
      category: 'events',
      eventDate: '2024-03-15',
      location: 'Classroom Hub',
      description: 'Students engaged in collaborative learning and knowledge sharing.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'University Campus',
      title: 'Modern Educational Infrastructure',
      category: 'campus',
      eventDate: '2024-02-20',
      location: 'Campus Node',
      description: 'State-of-the-art campus facilities designed for optimal learning experience.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Graduation Ceremony',
      title: 'Success Protocol 2024',
      category: 'graduation',
      eventDate: '2024-01-30',
      location: 'Convocation Hall',
      description: 'Celebrating the successful deployment of our elite student fleet.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Programming & Development',
      title: 'Collaborative Workspace',
      category: 'activities',
      eventDate: '2024-03-10',
      location: 'Learning Zone',
      description: 'Collaborative environments focused on high-bandwidth knowledge transfer.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Research Lab',
      title: 'Academic Research Wing',
      category: 'achievements',
      eventDate: '2024-02-28',
      location: 'Innovation Lab',
      description: 'Experimental learning nodes achieving unprecedented academic benchmarks.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Workshop Session',
      title: 'International Strategy Workshop',
      category: 'events',
      eventDate: '2024-03-05',
      location: 'Seminar Suite',
      description: 'Bridging international educational gaps through strategic collaboration.'
    }
  ];

  // Combine database images with demo images
  const displayImages = [...galleryImages, ...demoImages];
  const displayFiltered = selectedCategory === 'all'
    ? displayImages
    : displayImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center pt-20 sm:pt-24 overflow-hidden px-4 sm:px-6 lg:px-12">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80"
            alt="Graduation Ceremony Backdrop"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className={`lg:col-span-6 space-y-6 sm:space-y-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 text-[9px] sm:text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em]">
              <Camera className="h-3.5 w-3.5" />
              <span>Campus Life & Events</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] leading-[0.85] tracking-tighter uppercase not-italic font-serif ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              Edbell <br />
              <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Visual Gallery</span>
            </h1>
            <p className={`text-sm sm:text-base text-[var(--text-primary)] font-light leading-relaxed max-w-lg ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              Explore the vibrant life at EdBell through our curated visual repository, showcasing our modern facilities, graduation successes, and student engagement across Kerala.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-blue-500/15 blur-[100px] rounded-full"></div>
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              {displayImages.slice(0, 4).map((img, i) => (
                <div key={i} className="h-40 sm:h-52 lg:h-60 rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--primary)]/20 shadow-xl cursor-pointer group">
                  <img
                    src={img.imageUrl}
                    alt={img.imageAlt}
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

      {/* Category Filter */}
      <section className="relative z-30 py-4 sm:py-6 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] transition-all relative overflow-hidden group ${selectedCategory === c.id
                ? 'bg-[var(--primary)] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105'
                : 'bg-[var(--primary)]/10 border border-[var(--border)] text-[var(--text-primary)] hover:text-white hover:border-[var(--primary)]/50'
                }`}
            >
              <c.icon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${selectedCategory === c.id ? 'animate-pulse' : ''}`} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20 bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {loading ? (
            <div className="text-center py-20">
              <Zap className="h-12 w-12 text-[var(--primary)] mx-auto mb-4 animate-pulse" />
              <p className="text-[var(--text-primary)]">Loading gallery...</p>
            </div>
          ) : displayFiltered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--text-primary)]">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {displayFiltered.map((img, i) => (
                <div
                  key={img._id || i}
                  onClick={() => setSelectedImage(img)}
                  className="group relative h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)]/50 transition-all duration-700 shadow-xl"
                >
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 bg-[var(--primary)] px-3 py-1.5 rounded-lg text-[8px] sm:text-[9px] font-black text-white uppercase tracking-widest shadow-xl">
                    {img.category.toUpperCase()}
                  </div>

                  <img
                    src={img.imageUrl}
                    alt={img.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute inset-0 bg-[var(--primary)]/5 opacity-0 group-hover:opacity-20 transition-opacity"></div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 space-y-2 transition-transform duration-700">
                    <span className="text-[8px] sm:text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.2em]">{img.category} // {img.location || 'EdBell'}</span>
                    <h3 className="text-lg sm:text-xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-none">{img.title}</h3>
                    <p className="text-xs font-light text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 leading-relaxed">
                      {img.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      <span className="text-[8px] sm:text-[9px] font-black text-[var(--text-muted)] uppercase italic">{img.eventDate || new Date().toISOString().split('T')[0]}</span>
                      <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] backdrop-blur-3xl border border-[var(--primary)]/30">
                        <Eye className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24 relative px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          <Zap className="h-12 w-12 sm:h-14 sm:w-14 text-[var(--primary)] mx-auto animate-pulse" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-heading)] tracking-tighter leading-[0.8] uppercase italic">
            Join the <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Ecosystem</span>
          </h2>
          <Link href="/contact" className="inline-block px-8 sm:px-10 py-4 sm:py-5 bg-[var(--primary)] rounded-2xl text-white font-black text-base sm:text-lg uppercase tracking-widest hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-1">
            Deploy Now
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Newsletter />
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4 sm:p-6 lg:p-10 animate-fade-in overflow-y-auto" onClick={() => setSelectedImage(null)}>
          <div className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-[40px]"></div>
          <div className="relative max-w-5xl w-full bg-[var(--bg-secondary)] rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-2xl flex flex-col lg:flex-row my-auto" onClick={e => e.stopPropagation()}>
            <div className="lg:w-2/3 h-[40vh] sm:h-[50vh] lg:h-[70vh] relative group">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.imageAlt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="lg:w-1/3 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[var(--surface)]/40 backdrop-blur-3xl border-l border-[var(--border)] overflow-y-auto">
              <div className="space-y-6">
                <button onClick={() => setSelectedImage(null)} className="p-3 bg-[var(--primary)]/10 border border-[var(--border)] rounded-xl text-[var(--primary)] hover:text-white hover:bg-[var(--primary)] transition-all">
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <div className="space-y-3">
                  <span className="text-[8px] sm:text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.3em]">{selectedImage.category} Protocol</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-none">{selectedImage.title}</h3>
                  <div className="flex items-center space-x-3 text-[8px] sm:text-[9px] font-black text-[var(--text-muted)] uppercase">
                    <MapPin className="h-3 w-3 text-[var(--primary)]" />
                    <span>{selectedImage.location || 'EdBell'}</span>
                    <span className="text-[var(--primary)]/30">|</span>
                    <Calendar className="h-3 w-3 text-[var(--primary)]" />
                    <span>{selectedImage.eventDate || new Date().toISOString().split('T')[0]}</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-[var(--text-primary)] font-light leading-relaxed">{selectedImage.description}</p>
              </div>
              <div className="pt-6">
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-4 sm:py-5 bg-[var(--primary)] rounded-2xl flex items-center justify-center space-x-3 text-white font-black uppercase text-[10px] sm:text-xs tracking-widest hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-1"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>Return to Repository</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
