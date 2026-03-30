import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import University from '@/models/University';

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
    const body = await request.json();
    console.log('Received university data:', body);
    
    if (!body.name || !body.description || !body.accreditation || !body.established) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, description, accreditation, and established are required' 
      }, { status: 400 });
    }

    // Connect to database
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please try again later.' 
      }, { status: 503 });
    }

    // Auto-generate URL if not provided
    if (!body.url) {
      body.url = '/universities/' + body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    // Ensure unique URL
    let finalUrl = body.url;
    const existingUni = await University.findOne({ url: finalUrl });
    if (existingUni) {
      finalUrl = `${body.url}-${Math.random().toString(36).substring(2, 7)}`;
    }
    body.url = finalUrl;

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
    
    // Create university in database
    const university = new University(body);
    await university.save();
    console.log('University saved successfully:', university._id);
    
    return NextResponse.json({ 
      success: true, 
      university,
      message: 'University created successfully'
    });
  } catch (error: any) {
    console.error('Error creating university:', error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'University URL already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create university' }, { status: 500 });
  }
}

// PUT - Update university
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ success: false, error: 'University ID is required' }, { status: 400 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please try again later.' 
      }, { status: 503 });
    }

    const university = await University.findByIdAndUpdate(_id, updateData, { new: true });
    if (!university) {
      return NextResponse.json({ success: false, error: 'University not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      university,
      message: 'University updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating university:', error);
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

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please try again later.' 
      }, { status: 503 });
    }

    await University.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      message: 'University deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete university' }, { status: 500 });
  }
}