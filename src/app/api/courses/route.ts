import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import University from '@/models/University';
import { writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

// GET - Fetch all courses
export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, courses: [], message: 'Database not configured' });
    }
    const courses = await Course.find({}).populate('offeredByUniversities', 'name location url logo placeholderBg').sort({ createdAt: -1 });
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
    
    // Explicitly populate for page generation
    const populatedCourse = await Course.findById(course._id).populate('offeredByUniversities', 'name location url logo placeholderBg');
    console.log('Course saved successfully:', course._id);

    // Dynamic pages are now handled by src/app/courses/[slug]/page.tsx
    return NextResponse.json({ 
      success: true, 
      course,
      pageCreated: true,
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

    const course = await Course.findByIdAndUpdate(_id, updateData, { new: true }).populate('offeredByUniversities', 'name location url logo placeholderBg');
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    // Dynamic pages are now handled by src/app/courses/[slug]/page.tsx
    return NextResponse.json({ 
      success: true, 
      course,
      pageUpdated: true,
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

    await Course.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      pageDeleted: true, 
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete course' }, { status: 500 });
  }
}