import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import CourseApplyButton from '@/components/CourseApplyButton';

export const metadata: Metadata = {
  title: 'Bachelor of Commerce (B.Com) - EDBELL EDUSOLUTIONS',
  description: 'Business-focused program covering accounting, finance, economics, and business management.',
  keywords: 'Bachelor of Commerce (B.Com), Undergraduate, education, course, EDBELL',
  openGraph: {
    title: 'Bachelor of Commerce (B.Com) - EDBELL EDUSOLUTIONS',
    description: 'Business-focused program covering accounting, finance, economics, and business management.',
    type: 'website',
  },
};

export default function BachelorofCommerceBComPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 p-4 rounded-full">
                <BookOpen className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bachelor of Commerce (B.Com)
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Business-focused program covering accounting, finance, economics, and business management.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Duration: 3 Years</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Category: Undergraduate</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Fees: ₹35,000 per year</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Business-focused program covering accounting, finance, economics, and business management.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                  <p className="text-blue-600 font-medium">3 Years</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <p className="text-green-600 font-medium">Undergraduate</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Fees</h3>
                  <p className="text-purple-600 font-medium">₹35,000 per year</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Eligibility</h3>
                  <p className="text-yellow-600 font-medium">12th Pass with Commerce/Science/Arts</p>
                </div>
              </div>

              <div className="border-t pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose This Course?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Industry-relevant curriculum designed by experts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Flexible learning schedule for working professionals</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Comprehensive study materials and resources</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Career guidance and placement support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Enroll Now</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">3 Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fees:</span>
                  <span className="font-medium text-green-600">₹35,000 per year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Eligibility:</span>
                  <span className="font-medium">12th Pass with Commerce/Science/Arts</span>
                </div>
              </div>
              
              <CourseApplyButton courseId="bachelor-of-commerce" courseName="Bachelor of Commerce (B.Com)" />
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Get in touch with our counselors for more information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}