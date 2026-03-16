import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CourseApplication from '@/models/CourseApplication';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, phone, password, courseId, courseName, type } = body;

    // Basic validation
    if (!name || !email || !courseId) {
      return NextResponse.json(
        { success: false, error: 'Name, Email and Course are required' },
        { status: 400 }
      );
    }

    if (type === 'apply' && (!password || !phone)) {
       return NextResponse.json(
        { success: false, error: 'Phone and Password are required for application' },
        { status: 400 }
      );
    }

    const application = await CourseApplication.create({
      name,
      email,
      phone: phone || '',
      password: password || '',
      courseId,
      courseName,
      type: type || 'apply',
      status: 'new'
    });

    console.log(`✅ New course ${type}:`, application._id);

    return NextResponse.json({
      success: true,
      message: type === 'apply' ? 'Application submitted successfully!' : 'Enquiry sent successfully!',
      applicationId: application._id
    });

  } catch (error: any) {
    console.error('❌ Course application error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Check for admin auth in a real app, here we just return all
    const applications = await CourseApplication.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      applications
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
