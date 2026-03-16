import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import { writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

// GET - Fetch all courses
export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, courses: [], message: 'Database not configured' });
    }
    const courses = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ success: true, courses: [], message: 'Database connection issue' });
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Received course data:', body);
    
    // Validate required fields
    if (!body.name || !body.description || !body.category || !body.duration) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, description, category, and duration are required' 
      }, { status: 400 });
    }

    // Auto-generate URL if not provided
    if (!body.url) {
      body.url = '/courses/' + body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    // Clean up empty strings for optional fields
    const optionalFields = ['fees', 'eligibility', 'curriculum', 'careerOpportunities', 'admissionProcess', 
                           'examPattern', 'studyMaterials', 'facultySupport', 'placementAssistance', 
                           'certificationDetails', 'prerequisites', 'learningOutcomes'];
    
    optionalFields.forEach(field => {
      if (body[field] === '') {
        delete body[field];
      }
    });

    // Ensure description has minimum length
    if (body.description.length < 10) {
      return NextResponse.json({ 
        success: false, 
        error: 'Description must be at least 10 characters long' 
      }, { status: 400 });
    }
    
    // Create course in database
    const course = new Course(body);
    await course.save();
    console.log('Course saved successfully:', course._id);

    // Generate course page file
    const pageCreated = await generateCoursePage(course);

    return NextResponse.json({ 
      success: true, 
      course,
      pageCreated,
      message: 'Course created successfully'
    });
  } catch (error: any) {
    console.error('Error creating course:', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'Course URL already exists' }, { status: 400 });
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ 
        success: false, 
        error: `Validation failed: ${validationErrors.join(', ')}` 
      }, { status: 400 });
    }
    
    return NextResponse.json({ success: false, error: `Failed to create course: ${error.message}` }, { status: 500 });
  }
}

// PUT - Update course
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { _id, ...updateData } = body;

    const course = await Course.findByIdAndUpdate(_id, updateData, { new: true });
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    // Update course page file
    const pageUpdated = await generateCoursePage(course);

    return NextResponse.json({ 
      success: true, 
      course,
      pageUpdated,
      message: 'Course updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating course:', error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'Course URL already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to update course' }, { status: 500 });
  }
}

// DELETE - Delete course
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    // Delete course page file
    const pageDeleted = await deleteCoursePage(course.url);

    // Delete from database
    await Course.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      pageDeleted,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete course' }, { status: 500 });
  }
}

// Helper function to generate course page
async function generateCoursePage(course: any): Promise<boolean> {
  try {
    const courseSlug = course.url.replace('/courses/', '');
    const coursesDir = join(process.cwd(), 'src', 'app', 'courses');
    const courseDir = join(coursesDir, courseSlug);
    
    if (!existsSync(courseDir)) {
      mkdirSync(courseDir, { recursive: true });
    }

    const escapedName = course.name.replace(/'/g, "\\'");
    const escapedDesc = course.description.replace(/'/g, "\\'");
    const escapedFees = (course.fees || 'Contact for details').replace(/'/g, "\\'");
    const escapedElig = (course.eligibility || 'As per university norms').replace(/'/g, "\\'");
    const escapedCurriculum = (course.curriculum || 'Comprehensive curriculum designed by industry experts').replace(/'/g, "\\'");
    const escapedCareer = (course.careerOpportunities || 'Wide range of career opportunities in various sectors').replace(/'/g, "\\'");
    const escapedAdmission = (course.admissionProcess || 'Simple online admission process with document verification').replace(/'/g, "\\'");
    const escapedStudy = (course.studyMaterials || 'Digital study materials and online resources provided').replace(/'/g, "\\'");
    const escapedFaculty = (course.facultySupport || 'Experienced faculty with industry expertise').replace(/'/g, "\\'");
    const escapedOutcomes = (course.learningOutcomes || 'Comprehensive knowledge and practical skills in the field').replace(/'/g, "\\'");

    const pageContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Users, Award, CheckCircle, ArrowLeft, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: '${escapedName} - Online Degree Program | EDBELL EDUSOLUTIONS',
  description: '${escapedDesc}',
};

export default function CoursePage() {
  const course = {
    name: "${escapedName}",
    category: "${course.category}",
    duration: "${course.duration}",
    fees: "${escapedFees}",
    eligibility: "${escapedElig}",
    description: "${escapedDesc}",
    curriculum: "${escapedCurriculum}",
    careerOpportunities: "${escapedCareer}",
    admissionProcess: "${escapedAdmission}",
    studyMaterials: "${escapedStudy}",
    facultySupport: "${escapedFaculty}",
    learningOutcomes: "${escapedOutcomes}"
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
}`;

    const pageFilePath = join(courseDir, 'page.tsx');
    writeFileSync(pageFilePath, pageContent, 'utf8');
    
    return true;
  } catch (error) {
    console.error('Error generating course page:', error);
    return false;
  }
}

// Helper function to delete course page
async function deleteCoursePage(courseUrl: string): Promise<boolean> {
  try {
    const courseSlug = courseUrl.replace('/courses/', '');
    const courseDir = join(process.cwd(), 'src', 'app', 'courses', courseSlug);
    const pageFilePath = join(courseDir, 'page.tsx');
    
    if (existsSync(pageFilePath)) {
      unlinkSync(pageFilePath);
      try {
        const fs = require('fs');
        const files = fs.readdirSync(courseDir);
        if (files.length === 0) {
          fs.rmdirSync(courseDir);
        }
      } catch (e) {
        // Directory not empty or other error, ignore
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting course page:', error);
    return false;
  }
}