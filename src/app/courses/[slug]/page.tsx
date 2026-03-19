import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Users, Award, CheckCircle, ArrowLeft, ArrowRight, Star, Building2, MapPin, GraduationCap, Laptop, BookOpen, ShieldCheck } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import University from '@/models/University';
import { notFound } from 'next/navigation';
import Newsletter from '@/components/Newsletter';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const course = await Course.findOne({ url: `/courses/${slug}` });
  
  if (!course) {
    return {
      title: 'Course Not Found - EDBELL EDUSOLUTIONS',
    };
  }

  return {
    title: `${course.name} | Online Degree Program | EDBELL EDUSOLUTIONS`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  
  // Find course and populate universities
  const rawCourse = await Course.findOne({ url: `/courses/${slug}` })
    .populate('offeredByUniversities', 'name location url logo placeholderBg accreditation')
    .lean();

  if (!rawCourse) {
    notFound();
  }

  // Ensure plain object serialization
  const course = JSON.parse(JSON.stringify(rawCourse));

  return (
    <div className="min-h-screen bg-[#030B1A] selection:bg-blue-500/30 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Dynamic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/campus-modern.jpg" 
            alt="Courses Background"
            className="w-full h-full object-cover opacity-20 filter contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030B1A] via-transparent to-[#030B1A]/80"></div>
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <Link href="/courses" className="inline-flex items-center text-blue-400/70 hover:text-blue-400 text-xs font-black uppercase tracking-[0.2em] transition-all group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Catalog
              </Link>
              
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 backdrop-blur-3xl">
                  <GraduationCap className="h-4 w-4 text-blue-400" />
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{course.category} Program</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase font-serif italic">
                   {course.name}
                </h1>
                
                <p className="text-lg text-[#B0C4DE] leading-relaxed font-light max-w-xl">
                  {course.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Clock, label: 'Duration', val: course.duration },
                  { icon: Laptop, label: 'Mode', val: 'Online' },
                  { icon: BookOpen, label: 'Eligibility', val: course.eligibility || 'Graduation' },
                  { icon: ShieldCheck, label: 'Status', val: 'Approved' }
                ].map((item, i) => (
                  <div key={i} className="text-center bg-[#0A1628] border border-white/5 rounded-2xl p-4 hover:border-blue-500/30 transition-all group shadow-xl">
                    <item.icon className="h-5 w-5 mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform" />
                    <div className="text-[8px] text-slate-500 uppercase tracking-widest font-black mb-1">{item.label}</div>
                    <div className="text-xs font-bold text-white uppercase tracking-tighter">{item.val}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-2xl transition-all duration-300 text-center shadow-[0_0_30px_rgba(37,99,235,0.3)] uppercase tracking-widest text-xs flex items-center justify-center">
                  Enroll Program <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/contact" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-4 px-10 rounded-2xl transition-all duration-300 text-center uppercase tracking-widest text-xs">
                  Request Info
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-0 -top-20 -bottom-20 bg-blue-600/10 blur-[100px] rounded-full opacity-50"></div>
              <div className="relative bg-[#0A1628]/80 backdrop-blur-3xl rounded-[40px] p-8 sm:p-10 border border-white/10 shadow-2xl space-y-10">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight border-b border-white/5 pb-6">Course Parameters</h3>
                
                <div className="space-y-6">
                   <div className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-[#B0C4DE]/60 text-[10px] font-black uppercase tracking-widest">Enrollment Fee</span>
                      <span className="font-bold text-white text-sm">{course.fees || 'TBD'}</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-[#B0C4DE]/60 text-[10px] font-black uppercase tracking-widest">Academic Board</span>
                      <span className="font-bold text-white text-sm">UGC Recognized</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-[#B0C4DE]/60 text-[10px] font-black uppercase tracking-widest">Learning System</span>
                      <span className="font-bold text-blue-400 text-sm">Synchronous Online</span>
                   </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl p-6 border border-blue-500/30">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3">Admission Protocol</p>
                  <p className="text-xs text-[#B0C4DE] leading-relaxed mb-4">
                    Secure your entry for the 2024-2025 academic session. Enrollment nodes are currently open for verified applicants.
                  </p>
                  <div className="flex items-center space-x-2 text-[8px] font-black text-white/50 bg-[#030B1A]/80 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span>ACTIVE_CYCLE_01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-24 bg-[#050E1F] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             <div className="lg:col-span-8 space-y-16">
               {/* Offered By Universities */}
               {course.offeredByUniversities && course.offeredByUniversities.length > 0 && (
                 <div className="space-y-8">
                   <div className="flex items-center space-x-3">
                     <Building2 className="h-5 w-5 text-blue-500" />
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic font-serif">Accredited Partners</h3>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {course.offeredByUniversities?.map((uni: any, idx: number) => (
                       <Link 
                        href={uni?.url || '#'} 
                        key={idx} 
                        className="bg-[#0A1628] border border-white/5 rounded-3xl p-6 flex flex-col gap-4 hover:border-blue-500/50 transition-all group relative overflow-hidden"
                       >
                         <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[40px]"></div>
                         <div className="flex items-center gap-4">
                           {uni?.logo ? (
                            <img src={uni.logo} alt={uni.name} className="w-12 h-12 rounded-xl object-contain bg-white border border-white/10" />
                           ) : (
                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-lg border border-white/10">{(uni?.name || 'U').charAt(0)}</div>
                           )}
                           <div className="flex-1 min-w-0">
                             <h4 className="font-black text-white text-sm uppercase truncate tracking-tight">{uni?.name || 'Partner University'}</h4>
                             <p className="text-[8px] text-blue-400 font-bold uppercase tracking-widest mt-1">{uni?.accreditation || 'UGC A++'}</p>
                           </div>
                         </div>
                         <div className="flex items-center text-[#B0C4DE]/60 text-[9px] font-black uppercase tracking-widest">
                           <MapPin className="w-3 h-3 mr-1.5 text-blue-500" />
                           {uni?.location || 'GLOBAL_NODE'}
                         </div>
                       </Link>
                     ))}
                   </div>
                 </div>
               )}

               {/* Curriculum & Specs */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-[#0A1628]/40 border border-white/5 rounded-[32px] p-8 space-y-6">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter border-b border-white/5 pb-4">Curriculum Pulse</h3>
                    <p className="text-sm text-[#B0C4DE] leading-relaxed font-light">
                      {course.curriculum || 'A comprehensive framework designed for industry synchronization and professional mastery.'}
                    </p>
                 </div>
                 <div className="bg-[#0A1628]/40 border border-white/5 rounded-[32px] p-8 space-y-6">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter border-b border-white/5 pb-4">Career Trajectory</h3>
                    <p className="text-sm text-[#B0C4DE] leading-relaxed font-light">
                      {course.careerOpportunities || 'Deployment benchmarks targeting top-tier global sectors and leadership positions.'}
                    </p>
                 </div>
               </div>

               {/* Admission & Support */}
               <div className="bg-[#0A1628]/40 border border-white/5 rounded-[40px] p-8 sm:p-12">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">Admission Protocol</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest">Process Flow</h4>
                       <p className="text-sm text-[#B0C4DE] leading-relaxed">
                         {course.admissionProcess || 'Single-source documentation handling with end-to-end institutional synchronization support.'}
                       </p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest">Learning Outcomes</h4>
                       <p className="text-sm text-[#B0C4DE] leading-relaxed">
                         {course.learningOutcomes || 'Mastery of technical core and development of high-performance professional competencies.'}
                       </p>
                    </div>
                  </div>
               </div>
             </div>

             <div className="lg:col-span-4 space-y-8">
               <div className="bg-[#0A1628] rounded-[32px] border border-white/5 p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-6">Quick Specs</h3>
                  <div className="space-y-5">
                    {[
                      'UGC Approved Degree',
                      '100% Online Delivery',
                      'Flexible Examination',
                      'Expert Counselor Support',
                      'Technical Certification',
                      'Career Mentoring'
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center space-x-3 text-xs text-[#B0C4DE]">
                        <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <span className="font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-gradient-to-br from-[#0A1628] to-[#0A1628]/40 rounded-[32px] border border-blue-500/20 p-8 space-y-6">
                  <Star className="h-8 w-8 text-blue-500" />
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter">Support Architecture</h3>
                  <p className="text-xs text-[#B0C4DE] leading-relaxed font-light">
                    {course.studyMaterials || 'Receive full access to digital pedagogy resources and 24/7 technical infrastructure for consistent learning.'}
                  </p>
               </div>
             </div>
           </div>
        </div>
      </section>

      <section className="py-24 bg-[#030B1A] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
