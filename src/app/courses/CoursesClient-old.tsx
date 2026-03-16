'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Newsletter from '@/components/Newsletter';
import { BookOpen, Clock, Users, Award, CheckCircle, Filter, Download, Phone, ExternalLink, GraduationCap, ArrowRight } from 'lucide-react';

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
  curriculum?: string;
  careerOpportunities?: string;
  admissionProcess?: string;
  examPattern?: string;
  studyMaterials?: string;
  facultySupport?: string;
  placementAssistance?: string;
  certificationDetails?: string;
  prerequisites?: string;
  learningOutcomes?: string;
}

export default function CoursesClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      if (data.success && data.courses && data.courses.length > 0) {
        setCourses(data.courses);
      } else {
        // Use fallback sample data if database is empty
        const fallbackCourses: Course[] = [
          {
            id: '1',
            name: 'Bachelor of Arts (BA)',
            url: '/courses/bachelor-of-arts',
            category: 'Undergraduate',
            duration: '3 Years',
            fees: '₹15,000/year',
            eligibility: '12th Pass from any stream',
            description: 'Comprehensive liberal arts program with literature, history, and political science specializations.'
          },
          {
            id: '2',
            name: 'Bachelor of Commerce (B.Com)',
            url: '/courses/bachelor-of-commerce',
            category: 'Undergraduate',
            duration: '3 Years',
            fees: '₹18,000/year',
            eligibility: '12th Pass with Commerce/Science/Arts',
            description: 'Business-focused program covering accounting, finance, economics, and business management.'
          },
          {
            id: '3',
            name: 'Master of Business Administration (MBA)',
            url: '/courses/master-of-business-administration',
            category: 'Postgraduate',
            duration: '2 Years',
            fees: '₹40,000/year',
            eligibility: 'Graduate Degree with 50% marks',
            description: 'Comprehensive management program for business leadership covering strategy, finance, marketing, operations.'
          },
          {
            id: '4',
            name: 'Bachelor of Science (B.Sc)',
            url: '/courses/bsc',
            category: 'Undergraduate',
            duration: '3 Years',
            fees: '₹20,000/year',
            eligibility: '12th Pass (Science)',
            description: 'Science-focused undergraduate program with specializations in Physics, Chemistry, Biology, and Mathematics.'
          },
          {
            id: '5',
            name: 'Bachelor of Computer Applications (BCA)',
            url: '/courses/bca',
            category: 'Undergraduate',
            duration: '3 Years',
            fees: '₹25,000/year',
            eligibility: '12th Pass',
            description: 'Computer applications program focusing on programming, software development, and IT skills.'
          },
          {
            id: '6',
            name: 'Master of Computer Applications (MCA)',
            url: '/courses/mca',
            category: 'Postgraduate',
            duration: '2 Years',
            fees: '₹35,000/year',
            eligibility: 'Bachelor\'s degree in any stream',
            description: 'Advanced computer applications program with focus on software engineering and IT management.'
          },
          {
            id: '7',
            name: 'Digital Marketing Certification',
            url: '/courses/digital-marketing',
            category: 'Specialized',
            duration: '6 Months',
            fees: '₹12,000',
            eligibility: '12th Pass or Graduate',
            description: 'Comprehensive digital marketing program covering SEO, social media marketing, Google Ads, content marketing.'
          },
          {
            id: '8',
            name: 'Data Science & Analytics',
            url: '/courses/data-science',
            category: 'Specialized',
            duration: '6 Months',
            fees: '₹15,000',
            eligibility: 'Bachelor\'s degree in any stream',
            description: 'Professional certification in data science, machine learning, and business analytics.'
          },
          {
            id: '9',
            name: 'Master of Arts (MA)',
            url: '/courses/ma',
            category: 'Postgraduate',
            duration: '2 Years',
            fees: '₹22,000/year',
            eligibility: 'Bachelor\'s degree',
            description: 'Advanced program in humanities with specializations in English, History, Political Science, and Sociology.'
          }
        ];
        setCourses(fallbackCourses);
        console.warn('Using fallback course data - database may be empty');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Use fallback data on error
      const fallbackCourses: Course[] = [
        {
          id: '1',
          name: 'Bachelor of Arts (BA)',
          url: '/courses/bachelor-of-arts',
          category: 'Undergraduate',
          duration: '3 Years',
          fees: '₹15,000/year',
          eligibility: '12th Pass from any stream',
          description: 'Comprehensive liberal arts program with literature, history, and political science specializations.'
        },
        {
          id: '2',
          name: 'Bachelor of Commerce (B.Com)',
          url: '/courses/bachelor-of-commerce',
          category: 'Undergraduate',
          duration: '3 Years',
          fees: '₹18,000/year',
          eligibility: '12th Pass with Commerce/Science/Arts',
          description: 'Business-focused program covering accounting, finance, economics, and business management.'
        },
        {
          id: '3',
          name: 'Master of Business Administration (MBA)',
          url: '/courses/master-of-business-administration',
          category: 'Postgraduate',
          duration: '2 Years',
          fees: '₹40,000/year',
          eligibility: 'Graduate Degree with 50% marks',
          description: 'Comprehensive management program for business leadership covering strategy, finance, marketing, operations.'
        },
        {
          id: '4',
          name: 'Bachelor of Science (B.Sc)',
          url: '/courses/bsc',
          category: 'Undergraduate',
          duration: '3 Years',
          fees: '₹20,000/year',
          eligibility: '12th Pass (Science)',
          description: 'Science-focused undergraduate program with specializations in Physics, Chemistry, Biology, and Mathematics.'
        },
        {
          id: '5',
          name: 'Bachelor of Computer Applications (BCA)',
          url: '/courses/bca',
          category: 'Undergraduate',
          duration: '3 Years',
          fees: '₹25,000/year',
          eligibility: '12th Pass',
          description: 'Computer applications program focusing on programming, software development, and IT skills.'
        },
        {
          id: '6',
          name: 'Master of Computer Applications (MCA)',
          url: '/courses/mca',
          category: 'Postgraduate',
          duration: '2 Years',
          fees: '₹35,000/year',
          eligibility: 'Bachelor\'s degree in any stream',
          description: 'Advanced computer applications program with focus on software engineering and IT management.'
        },
        {
          id: '7',
          name: 'Digital Marketing Certification',
          url: '/courses/digital-marketing',
          category: 'Specialized',
          duration: '6 Months',
          fees: '₹12,000',
          eligibility: '12th Pass or Graduate',
          description: 'Comprehensive digital marketing program covering SEO, social media marketing, Google Ads, content marketing.'
        },
        {
          id: '8',
          name: 'Data Science & Analytics',
          url: '/courses/data-science',
          category: 'Specialized',
          duration: '6 Months',
          fees: '₹15,000',
          eligibility: 'Bachelor\'s degree in any stream',
          description: 'Professional certification in data science, machine learning, and business analytics.'
        },
        {
          id: '9',
          name: 'Master of Arts (MA)',
          url: '/courses/ma',
          category: 'Postgraduate',
          duration: '2 Years',
          fees: '₹22,000/year',
          eligibility: 'Bachelor\'s degree',
          description: 'Advanced program in humanities with specializations in English, History, Political Science, and Sociology.'
        }
      ];
      setCourses(fallbackCourses);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'Undergraduate', name: 'Undergraduate' },
    { id: 'Postgraduate', name: 'Postgraduate' },
    { id: 'Specialized', name: 'Specialized' }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-cyan-100 mb-2">Loading Courses</h3>
          <p className="text-cyan-200">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950">
      {/* Hero Section with Magazine Style */}
      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/campus-modern.jpg" 
            alt="Courses Background" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-slate-900/85 to-cyan-950/85"></div>
        </div>

        {/* 3D Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/5 to-indigo-600/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center min-h-[600px] lg:min-h-[700px] z-20">
          <div className="max-w-4xl text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-xl">
                <GraduationCap className="h-6 w-6 text-white animate-bounce" />
              </div>
              <span className="text-blue-600 font-medium tracking-wider uppercase text-sm animate-pulse">Course Catalog 2024</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-cyan-100 mb-6 leading-tight transform hover:scale-105 transition-transform duration-300">
              Discover Your
              <span className="block text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text animate-pulse">
                Perfect Course
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-cyan-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Find the program that matches your ambitions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setSelectedCategory('all')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">View All Courses</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <a 
                href="tel:+919876543210"
                className="group px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 backdrop-blur-sm shadow-lg hover:shadow-2xl"
              >
                Get Expert Advice
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section with Unique Design */}
      <section className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 py-12 relative overflow-hidden">
        {/* 3D Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-4 transform hover:scale-105 transition-transform duration-300">Choose Your Path</h2>
            <p className="text-cyan-100 max-w-2xl mx-auto">
              Navigate through our expertly curated programs
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
                  selectedCategory === category.id
                    ? 'bg-white text-blue-600 shadow-2xl scale-105 -translate-y-2'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{category.name}</span>
                {selectedCategory === category.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-cyan-100 mb-3">No Courses Found</h3>
              <p className="text-base text-cyan-300 mb-6 max-w-xl mx-auto">
                {selectedCategory === 'all' 
                  ? 'No courses have been added yet. Please check back later or contact us for more information about our upcoming programs.'
                  : `No ${selectedCategory.toLowerCase()} courses available at the moment. Try selecting a different category or contact us for more options.`
                }
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 text-base"
              >
                <Phone className="h-5 w-5" />
                <span>Contact Us for More Info</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-cyan-100 mb-3">
                  {selectedCategory === 'all' ? 'All Available Courses' : `${selectedCategory} Programs`}
                </h2>
                <p className="text-base text-cyan-300 max-w-3xl mx-auto">
                  UGC-approved programs for your career goals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredCourses.map((course, index) => (
                  <div 
                    key={course._id || course.id || `course-${index}`} 
                    className="bg-slate-800/50 border border-blue-500/30 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:scale-105 hover:-translate-y-2 cursor-pointer flex flex-col hover:border-cyan-400"
                  >
                    {/* Header with Icon and Category */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <BookOpen className="h-6 w-6 text-cyan-400" />
                        </div>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full transform group-hover:scale-110 transition-transform duration-300 ${
                          course.category === 'Undergraduate' ? 'bg-blue-500/20 text-blue-300' :
                          course.category === 'Postgraduate' ? 'bg-cyan-500/20 text-cyan-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}>
                          {course.category}
                        </span>
                      </div>
                      
                      {/* Course Title */}
                      <h3 className="text-xl font-bold text-cyan-100 mb-3 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
                        {course.name}
                      </h3>
                      
                      {/* Course Details - Simplified */}
                      <div className="space-y-2 mb-4 flex-1">
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50">
                          <div className="flex items-center space-x-2 text-cyan-400">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium text-sm">Duration</span>
                          </div>
                          <span className="font-semibold text-cyan-100 text-sm">{course.duration}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50">
                          <div className="flex items-center space-x-2 text-cyan-400">
                            <Award className="h-4 w-4" />
                            <span className="font-medium text-sm">Fee</span>
                          </div>
                          <span className="font-semibold text-cyan-300 text-sm">
                            {course.fees || '₹20,000/year'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Link href={course.url} className="flex-1">
                          <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            <span className="text-sm">View Details</span>
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-800/50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-cyan-100 mb-4">
              Why Choose Our Courses?
            </h2>
            <p className="text-base text-cyan-300 max-w-3xl mx-auto leading-relaxed">
              Our programs provide the skills and knowledge for career success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center group cursor-pointer p-6 rounded-2xl hover:bg-slate-700/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Award className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-100 mb-3 group-hover:text-cyan-300 transition-colors duration-300">UGC Approved</h3>
              <p className="text-cyan-300 text-sm leading-relaxed">All programs are UGC-DEB approved and recognized nationwide.</p>
            </div>
            
            <div className="text-center group cursor-pointer p-6 rounded-2xl hover:bg-slate-700/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-2xl mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Clock className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-100 mb-3 group-hover:text-cyan-300 transition-colors duration-300">Flexible Learning</h3>
              <p className="text-cyan-300 text-sm leading-relaxed">Study at your own pace with 24/7 online access.</p>
            </div>
            
            <div className="text-center group cursor-pointer p-6 rounded-2xl hover:bg-slate-700/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Users className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-100 mb-3 group-hover:text-cyan-300 transition-colors duration-300">Expert Faculty</h3>
              <p className="text-cyan-300 text-sm leading-relaxed">Learn from experienced professors and industry experts.</p>
            </div>
            
            <div className="text-center group cursor-pointer p-6 rounded-2xl hover:bg-slate-700/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-2xl mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <GraduationCap className="h-8 w-8 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-100 mb-3 group-hover:text-cyan-300 transition-colors duration-300">Career Support</h3>
              <p className="text-cyan-300 text-sm leading-relaxed">Placement assistance and career guidance included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-6 transform hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer shadow-xl">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight transform hover:scale-105 transition-transform duration-300">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-base sm:text-lg text-cyan-100 mb-6 leading-relaxed max-w-3xl mx-auto">
            Get personalized course recommendations and expert guidance. Our counselors are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 group">
                <Phone className="h-5 w-5" />
                <span>Get Free Counseling</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-cyan-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Expert Guidance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
