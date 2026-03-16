'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import { 
  Globe, 
  DollarSign,
  Star,
  ArrowRight,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  url: string;
  category: 'Undergraduate' | 'Postgraduate' | 'Specialized';
  duration: string;
  fees: string;
  eligibility: string;
  description: string;
}

export default function Home() {
  const courses: Course[] = [
    {
      id: '1',
      name: 'Bachelor of Arts (BA)',
      url: '/courses/bachelor-of-arts',
      category: 'Undergraduate',
      duration: '3 Years',
      fees: '₹15,000',
      eligibility: '12th Pass',
      description: 'Comprehensive liberal arts program covering literature, history, political science, and more.'
    },
    {
      id: '2',
      name: 'Bachelor of Commerce (B.Com)',
      url: '/courses/bachelor-of-commerce',
      category: 'Undergraduate',
      duration: '3 Years',
      fees: '₹18,000',
      eligibility: '12th Pass',
      description: 'Business-focused program covering accounting, finance, economics, and business management.'
    },
    {
      id: '3',
      name: 'Master of Business Administration (MBA)',
      url: '/courses/master-of-business-administration',
      category: 'Postgraduate',
      duration: '2 Years',
      fees: '₹40,000',
      eligibility: 'Graduate',
      description: 'Comprehensive management program preparing leaders for global business challenges.'
    },
    {
      id: '4',
      name: 'Bachelor of Science (B.Sc)',
      url: '/courses/bsc',
      category: 'Undergraduate',
      duration: '3 Years',
      fees: '₹20,000',
      eligibility: '12th Pass (Science)',
      description: 'Science-focused undergraduate program with specializations in various disciplines.'
    },
    {
      id: '5',
      name: 'Bachelor of Computer Applications (BCA)',
      url: '/courses/bsc-cs',
      category: 'Undergraduate',
      duration: '3 Years',
      fees: '₹25,000',
      eligibility: '12th Pass',
      description: 'Computer applications program focusing on programming and software development.'
    },
    {
      id: '6',
      name: 'Digital Marketing Certification',
      url: '/courses/digital-marketing',
      category: 'Specialized',
      duration: '6 Months',
      fees: '₹12,000',
      eligibility: 'Any Graduate',
      description: 'Professional certification in digital marketing strategies and online advertising.'
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'World-Class Education',
      description: 'Access to premium courses from top universities with industry experts.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Recognition',
      description: 'Degrees recognized internationally with global career opportunities.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to course materials.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Career Growth',
      description: 'Placement assistance and career counseling for all graduates.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Verified',
      description: 'UGC approved universities with verified credentials.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Track Programs',
      description: 'Accelerated learning paths for working professionals.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'MBA Graduate',
      image: '👩‍🎓',
      text: 'EDBELL helped me transition to my dream career. The courses are comprehensive and the support is exceptional.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'B.Tech Graduate',
      image: '👨‍💼',
      text: 'The flexibility of online learning combined with quality education made it perfect for my situation.'
    },
    {
      name: 'Anjali Patel',
      role: 'Digital Marketing Specialist',
      image: '👩‍💻',
      text: 'The certification course was industry-relevant and helped me land my current position.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/campus-modern.jpg" 
            alt="Education Background" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-slate-900/85 to-cyan-950/85"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-floating"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-floating animation-delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-floating animation-delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-20 py-20">
          {/* Left Content */}
          <div className="space-y-12">
            <div className="inline-flex items-center bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-3 backdrop-blur-sm w-fit">
              <Sparkles className="w-5 h-5 text-cyan-400 mr-2" />
              <span className="text-sm font-semibold text-cyan-300">Welcome to EDBELL EDUSOLUTIONS</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-cyan-100">Transform Your</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text animate-gradient-shift">
                Future Today
              </span>
            </h1>

            <p className="text-xl text-cyan-200 leading-relaxed max-w-2xl font-medium">
              Access world-class education from India's top universities. Flexible, affordable, and recognized globally.
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100">
              Your Gateway to Excellence
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/courses">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-5 rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center space-x-2 group text-lg">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/universities">
                <button className="bg-slate-800/50 border-2 border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 px-10 py-5 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center space-x-2 text-lg">
                  <Globe className="w-6 h-6" />
                  <span>View Universities</span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">50+</div>
                <div className="text-sm text-cyan-300 mt-2">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">10K+</div>
                <div className="text-sm text-cyan-300 mt-2">Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">95%</div>
                <div className="text-sm text-cyan-300 mt-2">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative h-full flex items-center justify-center">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 rounded-3xl overflow-hidden">
                  <img 
                    src="/hero-arif.jpg" 
                    alt="EDBELL Education Expert - Arif" 
                    className="w-full h-80 object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-cyan-100 mb-4">
              Why Choose EDBELL?
            </h2>
            <p className="text-lg text-cyan-300 max-w-3xl mx-auto">
              We provide comprehensive education solutions with world-class quality and affordability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-8 hover:border-cyan-400 transition-all duration-300 group hover:shadow-lg"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-cyan-100 mb-3">{feature.title}</h3>
                <p className="text-cyan-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-cyan-100 mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-cyan-300 max-w-3xl mx-auto">
              Choose from our wide range of undergraduate, postgraduate, and specialized programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link key={course.id} href={course.url}>
                <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg overflow-hidden hover:border-cyan-400 group cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                    <span className="inline-block bg-white/20 text-cyan-100 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {course.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {course.name}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-cyan-200 text-sm leading-relaxed mb-6">{course.description}</p>

                    {/* Course Details */}
                    <div className="space-y-3 mb-6 flex-grow">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-cyan-400 font-semibold">Duration</div>
                          <div className="text-sm text-cyan-100">{course.duration}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-cyan-400 font-semibold">Fees</div>
                          <div className="text-sm text-cyan-100">{course.fees}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <UserCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-cyan-400 font-semibold">Eligibility</div>
                          <div className="text-sm text-cyan-100">{course.eligibility}</div>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center space-x-2 group text-lg">
                <span>View All Courses</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-cyan-100 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-cyan-300 max-w-3xl mx-auto">
              Hear from our graduates who have transformed their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-8 hover:border-cyan-400 transition-all duration-300 group hover:shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <h4 className="text-lg font-bold text-cyan-100">{testimonial.name}</h4>
                    <p className="text-sm text-cyan-400 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-cyan-300 italic text-sm leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-cyan-100 mb-6">
            Ready to Start Your Journey?
          </h2>

          <p className="text-lg text-cyan-300 mb-10 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their careers with EDBELL.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center space-x-2 group text-lg">
                <span>Get Started Today</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/courses">
              <button className="bg-slate-800/50 border-2 border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 px-10 py-4 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 text-lg">
                Browse Courses
              </button>
            </Link>
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
