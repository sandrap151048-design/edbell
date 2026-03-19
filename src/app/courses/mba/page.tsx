import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Users, Award, CheckCircle, ArrowLeft, Star, Building2, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'mba - Online Degree Program | EDBELL EDUSOLUTIONS',
  description: 'awsdfgvbhjnm',
};

export default function CoursePage() {
  const course = {
    name: "mba",
    category: "Postgraduate",
    duration: "2",
    fees: "1000000",
    eligibility: "degree",
    description: "awsdfgvbhjnm",
    curriculum: "semester 1",
    careerOpportunities: "business",
    admissionProcess: "Simple online admission process with document verification",
    studyMaterials: "Digital study materials and online resources provided",
    facultySupport: "Experienced faculty with industry expertise",
    learningOutcomes: "Comprehensive knowledge and practical skills in the field",
    offeredByUniversities: [{"_id":"69b7a5e829f5bbf714e97a28","url":"/universities/symbiosis-management","location":"Pune, India","name":"Symbiosis (Management Specialists)"}]
  };

  return (
    <div className="min-h-screen bg-[#030B1A]">
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0066CC]/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0066CC]/8 rounded-full blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Link href="/courses" className="inline-flex items-center text-[#0066CC]/70 hover:text-[#0066CC] text-sm font-medium mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">{course.name}</h1>
              <p className="text-lg text-[#B0C4DE] mb-10 leading-relaxed">{course.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="text-center bg-[#0A1628] border border-[#0066CC]/15 rounded-2xl p-4">
                  <Clock className="h-5 w-5 mx-auto mb-2 text-[#0066CC]" />
                  <div className="text-[10px] text-[#0066CC]/60 uppercase tracking-widest font-bold mb-1">Duration</div>
                  <div className="text-sm font-bold text-white">{course.duration}</div>
                </div>
                <div className="text-center bg-[#0A1628] border border-[#0066CC]/15 rounded-2xl p-4">
                  <Award className="h-5 w-5 mx-auto mb-2 text-[#0066CC]" />
                  <div className="text-[10px] text-[#0066CC]/60 uppercase tracking-widest font-bold mb-1">Category</div>
                  <div className="text-sm font-bold text-white">{course.category}</div>
                </div>
                <div className="text-center bg-[#0A1628] border border-[#0066CC]/15 rounded-2xl p-4">
                  <Users className="h-5 w-5 mx-auto mb-2 text-[#0066CC]" />
                  <div className="text-[10px] text-[#0066CC]/60 uppercase tracking-widest font-bold mb-1">Mode</div>
                  <div className="text-sm font-bold text-white">Online</div>
                </div>
                <div className="text-center bg-[#0A1628] border border-[#0066CC]/15 rounded-2xl p-4">
                  <Star className="h-5 w-5 mx-auto mb-2 text-[#0066CC]" />
                  <div className="text-[10px] text-[#0066CC]/60 uppercase tracking-widest font-bold mb-1">Rating</div>
                  <div className="text-sm font-bold text-white">4.5/5</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-[#0066CC] hover:bg-[#0055AA] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 text-center hover:shadow-[0_0_30px_rgba(0,102,204,0.3)]">
                  Enroll Now
                </Link>
                <Link href="/contact" className="bg-white/5 hover:bg-white/10 border border-[#0066CC]/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 text-center">
                  Get More Info
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0A1628] to-[#051428] rounded-3xl p-8 border border-[#0066CC]/20 shadow-[0_0_40px_rgba(0,102,204,0.1)]">
              <h3 className="text-2xl font-bold text-white mb-8">Course Details</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center py-3 border-b border-[#0066CC]/10">
                  <span className="text-[#B0C4DE]/70 text-sm">Fees</span>
                  <span className="font-bold text-white text-sm">{course.fees}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#0066CC]/10">
                  <span className="text-[#B0C4DE]/70 text-sm">Eligibility</span>
                  <span className="font-bold text-white text-sm text-right max-w-[200px]">{course.eligibility}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#0066CC]/10">
                  <span className="text-[#B0C4DE]/70 text-sm">Mode</span>
                  <span className="font-bold text-white text-sm">100% Online</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[#B0C4DE]/70 text-sm">Recognition</span>
                  <span className="font-bold text-[#0066CC] text-sm">UGC Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050E1F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {course.offeredByUniversities && course.offeredByUniversities.length > 0 && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Offered By Universities</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {course.offeredByUniversities.map((uni: any, idx: number) => (
                      <Link href={uni.url || '#'} key={idx} className="bg-[#051428] border border-[#0066CC]/20 rounded-xl p-4 flex items-start gap-4 hover:border-[#0066CC]/50 transition-colors">
                        {uni.logo ? (
                          <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex-shrink-0 flex items-center justify-center p-1 border border-gray-100">
                            <img src={uni.logo} alt={uni.name} className="max-w-full max-h-full object-contain" />
                          </div>
                        ) : (
                          <div className={`w-12 h-12 rounded-lg ${uni.placeholderBg || 'bg-gradient-to-br from-indigo-500 to-blue-600'} text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg border border-white/10`}>
                            {uni.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-white text-sm line-clamp-2">{uni.name}</h4>
                          {uni.location && (
                            <div className="flex items-center text-[#B0C4DE]/80 text-xs mt-2">
                              <MapPin className="w-3 h-3 mr-1" />
                              {uni.location}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {course.curriculum && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Curriculum</h3>
                  <p className="text-[#B0C4DE] leading-relaxed">{course.curriculum}</p>
                </div>
              )}
              {course.careerOpportunities && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Career Opportunities</h3>
                  <p className="text-[#B0C4DE] leading-relaxed">{course.careerOpportunities}</p>
                </div>
              )}
              {course.learningOutcomes && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Learning Outcomes</h3>
                  <p className="text-[#B0C4DE] leading-relaxed">{course.learningOutcomes}</p>
                </div>
              )}
              {course.admissionProcess && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Admission Process</h3>
                  <p className="text-[#B0C4DE] leading-relaxed">{course.admissionProcess}</p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                <h3 className="text-xl font-bold text-white mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#0066CC]" />
                    <span className="text-[#B0C4DE]">UGC Approved</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#0066CC]" />
                    <span className="text-[#B0C4DE]">100% Online</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#0066CC]" />
                    <span className="text-[#B0C4DE]">Flexible Schedule</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#0066CC]" />
                    <span className="text-[#B0C4DE]">Career Support</span>
                  </div>
                </div>
              </div>
              {course.studyMaterials && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Study Materials</h3>
                  <p className="text-[#B0C4DE] text-sm leading-relaxed">{course.studyMaterials}</p>
                </div>
              )}
              {course.facultySupport && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Faculty Support</h3>
                  <p className="text-[#B0C4DE] text-sm leading-relaxed">{course.facultySupport}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#030B1A] border-t border-[#0066CC]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-10 text-[#B0C4DE]">Take the first step towards your career goals with our comprehensive online program.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#0066CC] hover:bg-[#0055AA] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,102,204,0.3)]">
              Enroll Now
            </Link>
            <Link href="/contact" className="bg-white/5 border border-[#0066CC]/30 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-2xl transition-all duration-300">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}