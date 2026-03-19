import { Metadata } from 'next/types';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowLeft, 
  Download, 
  Phone, 
  Mail,
  Star,
  Calendar,
  Target,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import CourseEnrollmentSection from '@/components/CourseEnrollmentSection';

// Course data (in production, this would come from a database)
const courses = {
  'bachelor-of-arts': {
    id: 'bachelor-of-arts',
    title: "Bachelor of Arts (BA)",
    shortTitle: "BA",
    category: "undergraduate",
    duration: "3 Years",
    mode: "Online",
    eligibility: "12th Pass from recognized board",
    description: "Comprehensive liberal arts program with specializations in humanities and social sciences.",
    detailedDescription: "The Bachelor of Arts (BA) program is designed to provide students with a broad understanding of humanities and social sciences, developing critical thinking and analytical abilities.",
    features: ["UGC Approved", "NAAC A++ University", "Flexible Learning", "Home Exams", "Digital Library Access"],
    fee: "₹24,000 per year",
    totalFee: "₹72,000",
    specializations: [
      { name: "English Literature", description: "Study of literary works and poetry" },
      { name: "History", description: "Ancient, medieval, and modern history" },
      { name: "Political Science", description: "Government systems and political theory" }
    ],
    careerOptions: [
      { title: "Civil Services", salary: "₹56,100 - ₹2,50,000/month", description: "IAS, IPS, and other government roles" },
      { title: "Journalism", salary: "₹20,000 - ₹1,00,000/month", description: "Media and broadcast positions" }
    ],
    curriculum: [
      { year: "Year 1", subjects: ["English", "History", "Political Science", "Environmental Studies"] },
      { year: "Year 2", subjects: ["Advanced Literature", "Public Administration", "Economics"] },
      { year: "Year 3", subjects: ["Specialization Subjects", "Project Work", "Electives"] }
    ],
    admissionProcess: ["Online Application", "Document Verification", "Fee Payment"],
    universities: ["IGNOU", "LPU", "Amity University"],
    rating: 4.5,
    studentsEnrolled: 2500,
    placementRate: "85%"
  },
  'bachelor-of-commerce': {
    id: 'bachelor-of-commerce',
    title: "Bachelor of Commerce (B.Com)",
    shortTitle: "B.Com",
    category: "undergraduate",
    duration: "3 Years",
    mode: "Online",
    eligibility: "12th Pass (Commerce Preferred)",
    description: "Business-focused program covering accounting, finance, and economics.",
    detailedDescription: "B.Com provides a strong foundation in business and accounting, preparing students for careers in finance and corporate sectors.",
    features: ["UGC Approved", "Industry-Relevant Curriculum", "Placement Support"],
    fee: "₹18,000 - ₹28,000 per year",
    totalFee: "₹54,000 - ₹84,000",
    specializations: [
      { name: "Accounting", description: "Financial and cost accounting" },
      { name: "Finance", description: "Banking and financial management" }
    ],
    careerOptions: [
      { title: "Accountant", salary: "₹25,000 - ₹60,000/month", description: "Corporate accounting and tax" }
    ],
    curriculum: [{ year: "Full Program", subjects: ["Financial Accounting", "Audit", "Tax", "Business Law"] }],
    admissionProcess: ["Online Submission", "Verification"],
    universities: ["IGNOU", "CU", "LPU"],
    rating: 4.4,
    studentsEnrolled: 3000,
    placementRate: "88%"
  },
  'bba': {
    id: 'bba',
    title: "Bachelor of Business Administration (BBA)",
    shortTitle: "BBA",
    category: "undergraduate",
    duration: "3 Years",
    mode: "Online",
    eligibility: "12th Pass",
    description: "Management and leadership program for future business professionals.",
    detailedDescription: "BBA focuses on developing leadership skills, management techniques, and business acumen.",
    features: ["UGC Approved", "Leadership Training", "Industry Projects"],
    fee: "₹25,000 - ₹40,000 per year",
    totalFee: "₹75,000 - ₹1,20,000",
    specializations: [{ name: "HR Management", description: "Human resources and talent management" }],
    careerOptions: [{ title: "Business Analyst", salary: "₹30,000 - ₹70,000/month", description: "Process improvement" }],
    curriculum: [{ year: "Full Program", subjects: ["Marketing", "HR", "Operations", "Finance"] }],
    admissionProcess: ["Online Form", "Counseling"],
    universities: ["Amity", "Manipal", "LPU"],
    rating: 4.6,
    studentsEnrolled: 2800,
    placementRate: "92%"
  },
  'bca': {
    id: 'bca',
    title: "Bachelor of Computer Applications (BCA)",
    shortTitle: "BCA",
    category: "undergraduate",
    duration: "3 Years",
    mode: "Online",
    eligibility: "12th Pass (Maths Preferred)",
    description: "Technical program focusing on software development and computer applications.",
    detailedDescription: "BCA prepares students for the IT industry with focus on programming, databases, and networking.",
    features: ["UGC Approved", "Technical Labs", "IT Placement Assist"],
    fee: "₹22,000 - ₹35,000 per year",
    totalFee: "₹66,000 - ₹1,05,000",
    specializations: [{ name: "Software Development", description: "Web and app development" }],
    careerOptions: [{ title: "Software Engineer", salary: "₹35,000 - ₹1,00,000/month", description: "Dev positions" }],
    curriculum: [{ year: "Full Program", subjects: ["C++", "Java", "Python", "DBMS", "Networking"] }],
    admissionProcess: ["Online Application", "Tech Interview"],
    universities: ["Jain", "Manipal", "Chandigarh University"],
    rating: 4.7,
    studentsEnrolled: 2200,
    placementRate: "95%"
  },
  'master-of-arts': {
    id: 'master-of-arts',
    title: "Master of Arts (MA)",
    shortTitle: "MA",
    category: "postgraduate",
    duration: "2 Years",
    mode: "Online",
    eligibility: "Bachelor's Degree in relevant field",
    description: "Advanced program for in-depth study of humanities and social sciences.",
    detailedDescription: "MA offers academic specialization in languages, social work, or history for higher research and teaching roles.",
    features: ["UGC Approved", "Academic Excellence", "Higher Research Path"],
    fee: "₹20,000 - ₹30,000 per year",
    totalFee: "₹40,000 - ₹60,000",
    specializations: [{ name: "English", description: "Advanced literary studies" }],
    careerOptions: [{ title: "Professor", salary: "₹45,000 - ₹1,20,000/month", description: "Higher education roles" }],
    curriculum: [{ year: "Full Program", subjects: ["Research Methodology", "Theories", "Dissertation"] }],
    admissionProcess: ["Graduation Check", "Enrollment"],
    universities: ["IGNOU", "DU SOL", "Amity"],
    rating: 4.5,
    studentsEnrolled: 1800,
    placementRate: "82%"
  },
  'master-of-commerce': {
    id: 'master-of-commerce',
    title: "Master of Commerce (M.Com)",
    shortTitle: "M.Com",
    category: "postgraduate",
    duration: "2 Years",
    mode: "Online",
    eligibility: "B.Com / BBA Graduate",
    description: "Postgraduate program for advanced business and financial studies.",
    detailedDescription: "M.Com focuses on advanced accounting, corporate finance, and economic analysis.",
    features: ["UGC Approved", "Corporate Readiness", "Advanced Finance"],
    fee: "₹22,000 - ₹32,000 per year",
    totalFee: "₹44,000 - ₹64,000",
    specializations: [{ name: "Corporate Finance", description: "Advanced financial strategy" }],
    careerOptions: [{ title: "Financial Consultant", salary: "₹50,000 - ₹1,50,000/month", description: "Financial advisory" }],
    curriculum: [{ year: "Full Program", subjects: ["Managerial Accounting", "Eco Analysis", "Stats"] }],
    admissionProcess: ["Direct Admission", "Document Verification"],
    universities: ["IGNOU", "LPU", "Manipal"],
    rating: 4.4,
    studentsEnrolled: 1500,
    placementRate: "85%"
  },
  'mba': {
    id: 'mba',
    title: "Master of Business Administration (MBA)",
    shortTitle: "MBA",
    category: "postgraduate",
    duration: "2 Years",
    mode: "Online",
    eligibility: "Any Graduate with 50% marks",
    description: "Elite management program for leadership roles in various industries.",
    detailedDescription: "Online MBA provides the flexibility to study while working, focusing on strategy, marketing, and leadership.",
    features: ["UGC & AICTE Approved", "Global Recognition", "Career Transformation"],
    fee: "₹45,000 - ₹85,000 per year",
    totalFee: "₹90,000 - ₹1,70,000",
    specializations: [{ name: "Marketing", description: "Digital and traditional marketing strategy" }],
    careerOptions: [{ title: "Marketing Manager", salary: "₹60,000 - ₹3,00,000/month", description: "Brand management" }],
    curriculum: [{ year: "Full Program", subjects: ["Strategic Mgmt", "Global Business", "Ethics"] }],
    admissionProcess: ["Entrance Exam / Merit", "Interview"],
    universities: ["Amity", "Jain", "Manipal", "NMIMS"],
    rating: 4.8,
    studentsEnrolled: 4500,
    placementRate: "98%"
  },
  'mca': {
    id: 'mca',
    title: "Master of Computer Applications (MCA)",
    shortTitle: "MCA",
    category: "postgraduate",
    duration: "2 Years",
    mode: "Online",
    eligibility: "BCA / B.Sc CS Graduate",
    description: "Advanced technical degree for software architects and IT leaders.",
    detailedDescription: "MCA offers deep specialization in cloud computing, cybersecurity, or data science.",
    features: ["UGC Approved", "Tech Specializations", "Top MNC Hiring"],
    fee: "₹35,000 - ₹55,000 per year",
    totalFee: "₹70,000 - ₹1,10,000",
    specializations: [{ name: "Cloud Computing", description: "AWS/Azure infrastructure" }],
    careerOptions: [{ title: "Solution Architect", salary: "₹80,000 - ₹4,00,000/month", description: "Design systems" }],
    curriculum: [{ year: "Full Program", subjects: ["Cloud Compute", "AI/ML", "Big Data"] }],
    admissionProcess: ["Technical Screening", "Enrollment"],
    universities: ["Amity", "Manipal", "Chandigarh University"],
    rating: 4.7,
    studentsEnrolled: 2000,
    placementRate: "96%"
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: "Digital Marketing Certification",
    shortTitle: "DMC",
    category: "specialized",
    duration: "6 Months",
    mode: "Online",
    eligibility: "12th Pass / Graduate",
    description: "Practical certification covering SEO, SMM, and Google Ads.",
    detailedDescription: "A fast-track program to master the digital landscape and start a career in marketing.",
    features: ["Skill-Based", "Project Portfolio", "Job Assistance"],
    fee: "₹15,000 - ₹25,000",
    totalFee: "₹15,000 - ₹25,000",
    specializations: [{ name: "Performance Marketing", description: "Paid ads and ROI focus" }],
    careerOptions: [{ title: "SEO Specialist", salary: "₹20,000 - ₹50,000/month", description: "Search optimization" }],
    curriculum: [{ year: "6 Months", subjects: ["SEO", "AdWords", "Content", "Analytics"] }],
    admissionProcess: ["Direct Enrollment"],
    universities: ["Edbell Edusolutions"],
    rating: 4.6,
    studentsEnrolled: 1200,
    placementRate: "90%"
  },
  'data-science': {
    id: 'data-science',
    title: "Data Science & Analytics",
    shortTitle: "DSA",
    category: "specialized",
    duration: "6 Months",
    mode: "Online",
    eligibility: "Maths / Tech Background",
    description: "Professional program in data analysis and machine learning.",
    detailedDescription: "Learn to interpret complex data and build predictive models for business decisions.",
    features: ["Data Projects", "Advanced Analytics", "High Demand Skills"],
    fee: "₹20,000 - ₹35,000",
    totalFee: "₹20,000 - ₹35,000",
    specializations: [{ name: "Machine Learning", description: "Predictive modeling and AI" }],
    careerOptions: [{ title: "Data Analyst", salary: "₹30,000 - ₹80,000/month", description: "Data interpretation" }],
    curriculum: [{ year: "6 Months", subjects: ["Python", "SQL", "Tableau", "Stats"] }],
    admissionProcess: ["Logic Test", "Enrollment"],
    universities: ["Edbell Edusolutions"],
    rating: 4.8,
    studentsEnrolled: 1000,
    placementRate: "94%"
  }
};

interface CoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const course = courses[resolvedParams.id as keyof typeof courses];
  
  if (!course) {
    return {
      title: 'Course Not Found - EDBELL EDUSOLUTIONS',
      description: 'The requested course could not be found.'
    };
  }

  return {
    title: `${course.title} - Online Degree Program | EDBELL EDUSOLUTIONS`,
    description: `${course.detailedDescription.substring(0, 160)}...`,
    keywords: `${course.title}, ${course.shortTitle}, online degree, ${course.category}, UGC approved, distance education, ${course.specializations.map(s => s.name).join(', ')}`,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const resolvedParams = await params;
  const course = courses[resolvedParams.id as keyof typeof courses];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/courses" className="text-blue-600 hover:text-blue-800">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B14]">
      {/* Hero Section */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] opacity-50"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link href="/courses" className="flex items-center text-blue-200 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Courses
                </Link>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-base text-blue-100 mb-3">{course.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                <div className="text-center">
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  <div className="text-xs text-blue-200">Duration</div>
                  <div className="text-xs font-semibold">{course.duration}</div>
                </div>
                <div className="text-center">
                  <BookOpen className="h-4 w-4 mx-auto mb-1" />
                  <div className="text-xs text-blue-200">Mode</div>
                  <div className="text-xs font-semibold">{course.mode}</div>
                </div>
                <div className="text-center">
                  <Users className="h-4 w-4 mx-auto mb-1" />
                  <div className="text-xs text-blue-200">Students</div>
                  <div className="text-xs font-semibold">{course.studentsEnrolled}+</div>
                </div>
                <div className="text-center">
                  <Star className="h-4 w-4 mx-auto mb-1" />
                  <div className="text-xs text-blue-200">Rating</div>
                  <div className="text-xs font-semibold">{course.rating}/5</div>
                </div>
              </div>

              <CourseEnrollmentSection courseId={course.id} courseName={course.title} />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <h3 className="text-lg font-bold mb-3">Course Highlights</h3>
              <div className="space-y-2">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-blue-200">Course Fee</div>
                    <div className="text-base font-bold">{course.fee}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-200">Placement Rate</div>
                    <div className="text-base font-bold">{course.placementRate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* About Course */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About This Course</h2>
                <p className="text-sm text-gray-700 mb-6">{course.detailedDescription}</p>
                
                <div className="mb-8 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl">
                  <p className="text-sm font-bold text-blue-900 mb-4 tracking-tight uppercase">Ready to start your journey?</p>
                  <CourseEnrollmentSection courseId={course.id} courseName={course.title} />
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Eligibility Criteria</h3>
                  <p className="text-xs text-gray-700">{course.eligibility}</p>
                </div>
              </div>

              {/* Curriculum */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((year, index) => (
              <div className="bg-[#0A192F]/50 backdrop-blur-xl rounded-3xl border border-white/5 p-8 shadow-2xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{year.year}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {year.subjects.map((subject, subIndex) => (
                          <div key={subIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Specializations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.specializations.map((spec, index) => (
              <div className="bg-[#0A192F]/50 backdrop-blur-xl rounded-3xl border border-white/5 p-8 shadow-2xl">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{spec.name}</h3>
                      <p className="text-xs text-gray-600">{spec.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Opportunities */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Career Opportunities</h2>
                <div className="space-y-3">
                  {course.careerOptions.map((career, index) => (
              <div className="bg-[#0A192F]/50 backdrop-blur-xl rounded-3xl border border-white/5 p-8 shadow-2xl">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">{career.title}</h3>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {career.salary}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{career.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Info */}
              <div className="bg-[#0A192F]/50 backdrop-blur-xl rounded-3xl border border-white/5 p-8 shadow-2xl">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Quick Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="text-sm font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mode</span>
                    <span className="text-sm font-semibold">{course.mode}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Fee</span>
                    <span className="text-sm font-semibold">{course.totalFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Students Enrolled</span>
                    <span className="text-sm font-semibold">{course.studentsEnrolled}+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Placement Rate</span>
                    <span className="text-sm font-semibold text-green-600">{course.placementRate}</span>
                  </div>
                </div>
              </div>

              {/* Universities */}
              <div className="bg-[#0A192F]/50 backdrop-blur-xl rounded-3xl border border-white/5 p-8 shadow-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Partner Universities</h3>
                <div className="space-y-2">
                  {course.universities.map((university, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-3 w-3 text-blue-600" />
                      <span className="text-sm text-gray-700">{university}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-blue-600 text-white rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-blue-100 mb-3">
                  Get personalized guidance from our education counselors.
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+91924130060"
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Phone className="mr-2 h-3 w-3" />
                    Call Now
                  </a>
                  <a
                    href="mailto:info@edbelledusolutions.com"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Mail className="mr-2 h-3 w-3" />
                    Get Counseling
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}