import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import University from '@/models/University';
import { writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

// GET - Fetch all universities
export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, universities: [], message: 'Database not configured' });
    }
    const universities = await University.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, universities });
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ success: true, universities: [], message: 'Database connection issue' });
  }
}

// POST - Create new university
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Received university data:', body);
    
    if (!body.name || !body.description || !body.accreditation || !body.established) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, description, accreditation, and established are required' 
      }, { status: 400 });
    }

    if (!body.url) {
      body.url = '/universities/' + body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    const optionalFields = ['location', 'website'];
    optionalFields.forEach(field => {
      if (body[field] === '') {
        delete body[field];
      }
    });

    if (body.description.length < 10) {
      return NextResponse.json({ 
        success: false, 
        error: 'Description must be at least 10 characters long' 
      }, { status: 400 });
    }
    
    const university = new University(body);
    await university.save();
    console.log('University saved successfully:', university._id);

    const pageCreated = await generateUniversityPage(university);

    return NextResponse.json({ 
      success: true, 
      university,
      pageCreated,
      message: 'University created successfully'
    });
  } catch (error: any) {
    console.error('Error creating university:', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'University URL already exists' }, { status: 400 });
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ 
        success: false, 
        error: `Validation failed: ${validationErrors.join(', ')}` 
      }, { status: 400 });
    }
    
    return NextResponse.json({ success: false, error: `Failed to create university: ${error.message}` }, { status: 500 });
  }
}

// PUT - Update university
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    const university = await University.findByIdAndUpdate(_id, updateData, { new: true });
    if (!university) {
      return NextResponse.json({ success: false, error: 'University not found' }, { status: 404 });
    }

    const pageUpdated = await generateUniversityPage(university);

    return NextResponse.json({ 
      success: true, 
      university,
      pageUpdated,
      message: 'University updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating university:', error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'University URL already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to update university' }, { status: 500 });
  }
}

// DELETE - Delete university
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'University ID is required' }, { status: 400 });
    }

    const university = await University.findById(id);
    if (!university) {
      return NextResponse.json({ success: false, error: 'University not found' }, { status: 404 });
    }

    const pageDeleted = await deleteUniversityPage(university.url);
    await University.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      pageDeleted,
      message: 'University deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete university' }, { status: 500 });
  }
}

// Helper function to generate university page
async function generateUniversityPage(university: any): Promise<boolean> {
  try {
    const universitySlug = university.url.replace('/universities/', '');
    const universitiesDir = join(process.cwd(), 'src', 'app', 'universities');
    const universityDir = join(universitiesDir, universitySlug);
    
    if (!existsSync(universityDir)) {
      mkdirSync(universityDir, { recursive: true });
    }

    const esc = (val: string) => (val || '').replace(/'/g, "\\'").replace(/"/g, '\\"');

    const pageContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { Award, CheckCircle, MapPin, Users, Globe, Calendar, ArrowLeft, Building, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: '${esc(university.name)} - Online University Programs | EDBELL EDUSOLUTIONS',
  description: '${esc(university.description)}',
};

export default function UniversityPage() {
  const university = {
    name: "${esc(university.name)}",
    description: "${esc(university.description)}",
    accreditation: "${esc(university.accreditation)}",
    established: "${esc(university.established)}",
    location: "${esc(university.location || 'India')}",
    website: "${esc(university.website || '')}",
    universityType: "${esc(university.universityType || 'Private')}",
    campusSize: "${esc(university.campusSize || '')}",
    totalStudents: "${esc(university.totalStudents || '')}",
    facultyCount: "${esc(university.facultyCount || '')}",
    coursesOffered: "${esc(university.coursesOffered || '')}",
    specializations: "${esc(university.specializations || '')}",
    facilities: "${esc(university.facilities || '')}",
    admissionProcess: "${esc(university.admissionProcess || 'Simple online admission process')}",
    feeStructure: "${esc(university.feeStructure || 'Contact for details')}"
  };

  return (
    <div className="min-h-screen bg-[#030B1A]">
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0066CC]/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#0066CC]/8 rounded-full blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Link href="/universities" className="inline-flex items-center text-[#0066CC]/70 hover:text-[#0066CC] text-sm font-medium mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Universities
              </Link>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">{university.name}</h1>
              <p className="text-lg text-[#B0C4DE] mb-10 leading-relaxed">{university.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-[#0A1628] border border-[#0066CC]/15 rounded-2xl p-4">
                  <Calendar className="h-5 w-5 mb-2 text-[#0066CC]" />
                  <div className="text-[10px] text-[#0066CC]/60 uppercase tracking-widest font-bold mb-1">Established</div>
                  <div className="text-sm font-bold text-white">{university.established}</div>
                </div>
                <div className="bg-[#0A1628] border border-[#0066CC]/15 rounded-2xl p-4">
                  <Award className="h-5 w-5 mb-2 text-[#0066CC]" />
                  <div className="text-[10px] text-[#0066CC]/60 uppercase tracking-widest font-bold mb-1">Accreditation</div>
                  <div className="text-sm font-bold text-white">{university.accreditation}</div>
                </div>
                <div className="bg-[#0A1628] border border-[#0066CC]/15 rounded-2xl p-4">
                  <MapPin className="h-5 w-5 mb-2 text-[#0066CC]" />
                  <div className="text-[10px] text-[#0066CC]/60 uppercase tracking-widest font-bold mb-1">Location</div>
                  <div className="text-sm font-bold text-white">{university.location}</div>
                </div>
                <div className="bg-[#0A1628] border border-[#0066CC]/15 rounded-2xl p-4">
                  <Building className="h-5 w-5 mb-2 text-[#0066CC]" />
                  <div className="text-[10px] text-[#0066CC]/60 uppercase tracking-widest font-bold mb-1">Type</div>
                  <div className="text-sm font-bold text-white">{university.universityType}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-[#0066CC] hover:bg-[#0055AA] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 text-center hover:shadow-[0_0_30px_rgba(0,102,204,0.3)]">
                  Apply Now
                </Link>
                <Link href="/contact" className="bg-white/5 hover:bg-white/10 border border-[#0066CC]/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 text-center">
                  Get More Info
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0A1628] to-[#051428] rounded-3xl p-8 border border-[#0066CC]/20 shadow-[0_0_40px_rgba(0,102,204,0.1)]">
              <h3 className="text-2xl font-bold text-white mb-8">University Overview</h3>
              <div className="space-y-5">
                {university.totalStudents && (
                  <div className="flex justify-between items-center py-3 border-b border-[#0066CC]/10">
                    <span className="text-[#B0C4DE]/70 text-sm">Total Students</span>
                    <span className="font-bold text-white text-sm">{university.totalStudents}</span>
                  </div>
                )}
                {university.facultyCount && (
                  <div className="flex justify-between items-center py-3 border-b border-[#0066CC]/10">
                    <span className="text-[#B0C4DE]/70 text-sm">Faculty Members</span>
                    <span className="font-bold text-white text-sm">{university.facultyCount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3 border-b border-[#0066CC]/10">
                  <span className="text-[#B0C4DE]/70 text-sm">Fee Structure</span>
                  <span className="font-bold text-white text-sm">{university.feeStructure}</span>
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
              {university.coursesOffered && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Courses Offered</h3>
                  <p className="text-[#B0C4DE] leading-relaxed">{university.coursesOffered}</p>
                </div>
              )}
              {university.specializations && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Specializations</h3>
                  <p className="text-[#B0C4DE] leading-relaxed">{university.specializations}</p>
                </div>
              )}
              {university.admissionProcess && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Admission Process</h3>
                  <p className="text-[#B0C4DE] leading-relaxed">{university.admissionProcess}</p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                <h3 className="text-xl font-bold text-white mb-6">Key Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#0066CC]" />
                    <span className="text-[#B0C4DE]">UGC Recognized</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#0066CC]" />
                    <span className="text-[#B0C4DE]">NAAC Accredited</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#0066CC]" />
                    <span className="text-[#B0C4DE]">Online Learning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#0066CC]" />
                    <span className="text-[#B0C4DE]">Placement Support</span>
                  </div>
                </div>
              </div>
              {university.facilities && (
                <div className="bg-[#0A1628] rounded-2xl border border-[#0066CC]/15 p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Facilities</h3>
                  <p className="text-[#B0C4DE] text-sm leading-relaxed">{university.facilities}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#030B1A] border-t border-[#0066CC]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Ready to Join?</h2>
          <p className="text-lg mb-10 text-[#B0C4DE]">Take the first step towards your future with a globally recognized degree.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#0066CC] hover:bg-[#0055AA] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,102,204,0.3)]">
              Apply Now
            </Link>
            <Link href="/contact" className="bg-white/5 border border-[#0066CC]/30 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-2xl transition-all duration-300">
              Get More Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}`;

    const pageFilePath = join(universityDir, 'page.tsx');
    writeFileSync(pageFilePath, pageContent, 'utf8');
    
    return true;
  } catch (error) {
    console.error('Error generating university page:', error);
    return false;
  }
}

// Helper function to delete university page
async function deleteUniversityPage(universityUrl: string): Promise<boolean> {
  try {
    const universitySlug = universityUrl.replace('/universities/', '');
    const universityDir = join(process.cwd(), 'src', 'app', 'universities', universitySlug);
    const pageFilePath = join(universityDir, 'page.tsx');
    
    if (existsSync(pageFilePath)) {
      unlinkSync(pageFilePath);
      try {
        const fs = require('fs');
        const files = fs.readdirSync(universityDir);
        if (files.length === 0) {
          fs.rmdirSync(universityDir);
        }
      } catch (e) {
        // Directory not empty or other error, ignore
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting university page:', error);
    return false;
  }
}