import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Award, 
  CheckCircle, 
  Star, 
  MapPin, 
  Users, 
  BookOpen, 
  Globe, 
  Calendar, 
  Phone, 
  Mail,
  ArrowLeft,
  TrendingUp,
  Building,
  GraduationCap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'delhi - Online University Programs | EDBELL EDUSOLUTIONS',
  description: 'modern infrastructure',
  keywords: 'delhi, online university, distance education, UGC approved, acca',
  openGraph: {
    title: 'delhi - Online University Programs',
    description: 'modern infrastructure',
    type: 'article',
    url: 'https://edbelledusolutions.com/universities/delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'delhi - Online University Programs',
    description: 'modern infrastructure',
  },
  alternates: {
    canonical: 'https://edbelledusolutions.com/universities/delhi',
  },
};

export default function UniversityPage() {
  const university = {
    name: "delhi",
    description: "modern infrastructure",
    accreditation: "acca",
    established: "2021",
    location: "delhi",
    website: "Contact for details"
  };

  return (
    <div className="min-h-screen">


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link href="/universities" className="flex items-center text-green-200 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Universities
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{university.name}</h1>
              <p className="text-xl text-green-100 mb-6">{university.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm text-green-200">Established</div>
                  <div className="font-semibold">{university.established}</div>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm text-green-200">Accreditation</div>
                  <div className="font-semibold">{university.accreditation}</div>
                </div>
                <div className="text-center">
                  <MapPin className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm text-green-200">Location</div>
                  <div className="font-semibold">{university.location}</div>
                </div>
                <div className="text-center">
                  <Star className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm text-green-200">Rating</div>
                  <div className="font-semibold">4.5/5</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+91924130060" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center">
                  Apply Now
                </a>
                <a href="mailto:info@edbelledusolutions.com?subject=University Information Request&body=Hi, I would like more information about this university. Please contact me." className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center">
                  Get More Info
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">University Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-green-200">Established:</span>
                  <span className="font-semibold">{university.established}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Accreditation:</span>
                  <span className="font-semibold">{university.accreditation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Location:</span>
                  <span className="font-semibold">{university.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Website:</span>
                  <span className="font-semibold text-sm">{university.website}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About the University</h3>
                <p className="text-gray-600 leading-relaxed">{university.description}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose This University?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">UGC Approved</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Quality Education</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Online Learning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Student Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Established:</span>
                    <span className="font-medium">{university.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Accreditation:</span>
                    <span className="font-medium">{university.accreditation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{university.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 text-sm">{university.website}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 text-sm">Contact for details</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 text-sm">Contact for details</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join This University?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Take the next step in your educational journey with quality online programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+91924130060" className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Apply Now
            </a>
            <a href="mailto:info@edbelledusolutions.com?subject=University Information Request&body=Hi, I would like more information about this university. Please contact me." className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Get More Information
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
