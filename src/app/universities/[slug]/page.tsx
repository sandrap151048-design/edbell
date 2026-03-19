import { Metadata } from 'next';
import Link from 'next/link';
import { Award, CheckCircle, MapPin, Users, Globe, Calendar, ArrowLeft, Building, GraduationCap, Phone, Info } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import University from '@/models/University';
import { notFound } from 'next/navigation';
import Newsletter from '@/components/Newsletter';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const university = await University.findOne({ url: `/universities/${slug}` });
  
  if (!university) {
    return {
      title: 'University Not Found - EDBELL EDUSOLUTIONS',
    };
  }

  return {
    title: `${university.name} - Online University Programs | EDBELL EDUSOLUTIONS`,
    description: university.description,
  };
}

export default async function UniversityPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  const university = await University.findOne({ url: `/universities/${slug}` });

  if (!university) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#030B1A] selection:bg-blue-500/30">
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Dynamic Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Link href="/universities" className="inline-flex items-center text-blue-400/70 hover:text-blue-400 text-xs font-black uppercase tracking-widest mb-4 transition-all group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Universities
              </Link>
              
              <div className="space-y-6">
                <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 backdrop-blur-3xl">
                  <Award className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{university.accreditation} ACCREDITED</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight uppercase italic font-serif">
                   {university.name}
                </h1>
                
                <p className="text-lg text-[#B0C4DE] leading-relaxed font-light max-w-xl">
                  {university.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A1628] border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 transition-all group">
                  <Calendar className="h-5 w-5 mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">Established</div>
                  <div className="text-sm font-bold text-white">{university.established}</div>
                </div>
                <div className="bg-[#0A1628] border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 transition-all group">
                  <MapPin className="h-5 w-5 mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">Location</div>
                  <div className="text-sm font-bold text-white">{university.location || 'India'}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-2xl transition-all duration-300 text-center shadow-[0_0_30px_rgba(37,99,235,0.3)] uppercase tracking-widest text-xs flex items-center justify-center">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                {university.website && (
                  <a href={university.website.startsWith('http') ? university.website : `https://${university.website}`} target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-4 px-10 rounded-2xl transition-all duration-300 text-center uppercase tracking-widest text-xs">
                    Official Website
                  </a>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-0 -top-20 -bottom-20 bg-blue-600/10 blur-[100px] rounded-full opacity-50"></div>
              <div className="relative bg-[#0A1628]/80 backdrop-blur-3xl rounded-[40px] p-8 sm:p-10 border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-10 uppercase italic tracking-tight border-b border-white/5 pb-6">University Protocol</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-white/5 group">
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-blue-400 transition-colors">
                      <Building className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Institution Type</span>
                    </div>
                    <span className="font-bold text-white text-sm">UGC Approved</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-4 border-b border-white/5 group">
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-blue-400 transition-colors">
                      <Globe className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Learning Mode</span>
                    </div>
                    <span className="font-bold text-white text-sm">100% Online</span>
                  </div>

                  <div className="flex justify-between items-center py-4 border-b border-white/5 group">
                    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-blue-400 transition-colors">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Accreditation</span>
                    </div>
                    <span className="font-bold text-blue-400 text-sm">{university.accreditation}</span>
                  </div>

                  <div className="pt-6">
                    <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-5">
                       <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center">
                         <Info className="h-3 w-3 mr-1.5" />
                         Admission Support
                       </p>
                       <p className="text-xs text-[#B0C4DE] leading-relaxed">
                         Our expert counselors handle the entire documentation and submission process for this institution.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040D1E] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Ready to Start?</h2>
            <p className="text-lg text-[#B0C4DE] font-light leading-relaxed">
              Connect with our senior admission architect to begin your enrollment procedure at {university.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-12 rounded-2xl transition-all shadow-xl hover:shadow-blue-600/20 uppercase tracking-[0.2em] text-xs">
                Contact Counselor
              </Link>
              <a href={`tel:+91924130060`} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-5 px-12 rounded-2xl transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" /> Call Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#030B1A] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
