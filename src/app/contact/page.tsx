'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Globe,
  Cpu,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceInterest: 'Career Strategy'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(loggedIn);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear status when user starts typing again
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: formData.subject || formData.message.substring(0, 50) // Use message as subject if not provided
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', serviceInterest: 'Career Strategy' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] selection:bg-blue-500/30 overflow-hidden">
      {/* Terminal Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80"
            alt="University Office Backdrop"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-[var(--bg-primary)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>


          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)] leading-[0.8] tracking-tighter uppercase not-italic font-serif ${mounted ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
            Command <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] bg-clip-text">Center</span>
          </h1>

          <p className={`text-base lg:text-xl text-[var(--text-primary)] font-light max-w-2xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            Initialize a direct connection to our global deployment architects. We are on standby for your educational synchronization.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-40 relative z-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          {/* Left: Communication Protocol Info */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32 animate-slide-right">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-black text-[var(--text-heading)] uppercase tracking-tighter leading-none">Global Nodes</h2>
              <p className="text-lg lg:text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                Our coordination grid spans multiple domestic and international zones. Initialize contact via your preferred encryption protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:gap-10">
              {[
                { title: "Location_Prime", value: "Wayanad, Kerala", icon: <MapPin />, desc: "Central Operations Hub" },
                { title: "Voice_Uplink", value: "+91 98765 43210", icon: <Phone />, desc: "Direct Logic Support" },
                { title: "Data_Endpoint", value: "info@edbelledusolutions.com", icon: <Mail />, desc: "Secure Document Sync" }
              ].map((item, i) => (
                <div key={i} className="flex space-x-6 lg:space-x-8 group">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl lg:rounded-3xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all shadow-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">{item.title}</p>
                    <h4 className="text-xl lg:text-2xl font-black text-[var(--text-heading)] uppercase tracking-tight">{item.value}</h4>
                    <p className="text-sm text-[var(--text-muted)] font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            </div>

          {/* Right: The Terminal Form */}
          <div className="lg:col-span-7 animate-slide-left">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[40px] lg:rounded-[60px] p-8 lg:p-16 shadow-2xl relative overflow-hidden group">
              {/* Decorative Grid */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,var(--text-muted)_1px,transparent_0)] bg-[size:32px_32px]"></div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8 lg:space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-4">USER_IDENTITY</label>
                    <input
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-[24px] lg:rounded-[32px] py-4 lg:py-6 px-8 text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)]/50 transition-all font-bold placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-4">EMAIL_SIGNAL</label>
                    <input
                      type="email" name="email" required value={formData.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-[24px] lg:rounded-[32px] py-4 lg:py-6 px-8 text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)]/50 transition-all font-bold placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-4">VOICE_NODE</label>
                    <input
                      type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-[24px] lg:rounded-[32px] py-4 lg:py-6 px-8 text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)]/50 transition-all font-bold placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-4">PROTOCOL_INTEREST</label>
                    <select
                      name="serviceInterest" value={formData.serviceInterest} onChange={handleChange}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-[24px] lg:rounded-[32px] py-4 lg:py-6 px-8 text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)]/50 transition-all font-bold appearance-none cursor-pointer"
                    >
                      <option value="Career Strategy">Career Strategy</option>
                      <option value="Global Mobility">Global Mobility</option>
                      <option value="Capital Support">Capital Support</option>
                      <option value="Benchmark Prep">Benchmark Prep</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-4">DATA_PAYLOAD</label>
                  <textarea
                    name="message" required value={formData.message} onChange={handleChange}
                    placeholder="Briefly describe your academic synchronization requirements..."
                    rows={5}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-[24px] lg:rounded-[40px] py-4 lg:py-8 px-8 text-[var(--text-heading)] focus:outline-none focus:border-[var(--primary)]/50 transition-all font-bold placeholder:text-[var(--text-muted)] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 lg:py-5 bg-[var(--primary)] rounded-[24px] lg:rounded-[32px] text-white font-black text-sm uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center space-x-4 group/btn overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                  <span>{isSubmitting ? 'SENDING...' : 'Send Message'}</span>
                  <Send className={`h-4 w-4 transition-transform duration-500 ${isSubmitting ? 'animate-ping' : 'group-hover/btn:translate-x-2'}`} />
                </button>

                {submitStatus === 'success' && (
                  <p className="text-emerald-500 text-sm font-bold text-center animate-bounce">✅ SIGNAL_STRENGTH_MAX: Payload Delivered Successfully.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm font-bold text-center">❌ LINK_FAILURE: Unable to establish connection. Retry later.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>
    </div >
  );
}