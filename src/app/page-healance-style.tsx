'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import { 
  Globe, 
  DollarSign,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle
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
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'World-Class Education',
      description: 'Access to premium courses from top universities with industry experts.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Recognition',
      description: 'Degrees recognized internationally with global career opportunities.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to course materials.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'MBA Graduate',
      text: 'EDBELL helped me transition to my dream career. The courses are comprehensive and the support is exceptional.',
      image: '👩‍🎓'
    },
    {
      name: 'Rajesh Kumar',
      role: 'B.Tech Graduate',
      text: 'The flexibility of online learning combined with quality education made it perfect for my situation.',
      image: '👨‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION - Minimalist with Image */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/campus-modern.jpg" 
            alt="Education Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <div className="mb-8">
              <span className="text-sm font-semibold text-cyan-300 tracking-widest uppercase">Welcome to EDBELL</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Transform Your Future Today
            </h1>
            
            <p className="text-xl text-gray-200 mb-12 leading-relaxed max-w-xl">
              Access world-class education from India's top universities. Flexible, affordable, and recognized globally.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/courses">
                <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 group">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Bottom Info */}
            <div className="mt-16 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-gray-300">University Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">25K+</div>
                <div className="text-gray-300">Happy Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Minimal Cards */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-sm font-semibold text-cyan-600 tracking-widest uppercase">Why Choose Us</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mt-4 mb-6">
              Trusted Support for Every Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              We provide comprehensive education solutions with world-class quality and affordability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES - Image + Text Layout */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-sm font-semibold text-cyan-600 tracking-widest uppercase">Our Programs</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mt-4">
              Popular Courses
            </h2>
          </div>

          <div className="space-y-20">
            {courses.map((course, index) => (
              <Link key={course.id} href={course.url}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group cursor-pointer">
                  {/* Image */}
                  <div className={`relative h-96 rounded-2xl overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img 
                      src="/about-campus.jpg" 
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <span className="text-sm font-semibold text-cyan-600 uppercase tracking-widest">{course.category}</span>
                    <h3 className="text-4xl font-bold text-slate-900 mt-4 mb-6">{course.name}</h3>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{course.description}</p>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Duration</div>
                        <div className="text-xl font-semibold text-slate-900">{course.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Fees</div>
                        <div className="text-xl font-semibold text-slate-900">{course.fees}</div>
                      </div>
                    </div>

                    <button className="text-cyan-600 font-semibold flex items-center gap-2 group/btn hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Minimal Cards */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-sm font-semibold text-cyan-600 tracking-widest uppercase">Testimonials</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mt-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-12 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of students who are already transforming their futures with EDBELL.
          </p>
          <Link href="/contact">
            <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 group">
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
