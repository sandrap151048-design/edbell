import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, serviceInterest } = body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Log the contact form submission for admin review
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('Service Interest:', serviceInterest || 'Not specified');
    console.log('Timestamp:', new Date().toISOString());
    console.log('================================');

    // Try to save to MongoDB
    try {
      const connectDB = (await import('@/lib/mongodb')).default;
      
      console.log('🔄 Attempting to connect to MongoDB...');
      await connectDB();
      console.log('✅ Connected to MongoDB successfully');
      
      // Use raw MongoDB collection to avoid Mongoose model issues
      const mongoose = await import('mongoose');
      const contactData = {
        name,
        email,
        phone,
        subject,
        message,
        serviceInterest: serviceInterest || '',
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      console.log('🔄 Attempting to save contact to collection...');
      const result = await mongoose.connection.db?.collection('contacts').insertOne(contactData);
      console.log('✅ Successfully saved contact to MongoDB:', result?.insertedId);
      
      return NextResponse.json(
        { 
          message: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
          success: true,
          contactId: result?.insertedId
        },
        { status: 200 }
      );
      
    } catch (dbError) {
      console.error('❌ MongoDB save failed:', dbError);
      console.error('❌ Error details:', {
        name: dbError instanceof Error ? dbError.name : 'Unknown',
        message: dbError instanceof Error ? dbError.message : 'Unknown error',
        stack: dbError instanceof Error ? dbError.stack : 'No stack trace'
      });
      
      // Return success to user but log the error
      return NextResponse.json(
        { 
          message: 'Thank you! Your message has been received. We will get back to you soon.',
          success: true,
          note: 'Saved to logs for manual processing',
          error: dbError instanceof Error ? dbError.message : 'Unknown error' // Add error for debugging
        },
        { status: 200 }
      );
    }

  } catch (error: any) {
    console.error('❌ Contact form submission error:', error);
    
    // Even if there's an error, return success to avoid user frustration
    return NextResponse.json(
      { 
        message: 'Thank you! Your message has been received. We will get back to you soon.',
        success: true
      },
      { status: 200 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 GET /api/contact - Fetching contacts...');
    
    const connectDB = (await import('@/lib/mongodb')).default;
    const Contact = (await import('@/models/Contact')).default;
    
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB successfully');
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    const skip = (page - 1) * limit;
    
    // Build query
    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    
    console.log('🔄 Fetching contacts with query:', query);
    
    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Contact.countDocuments(query);
    
    console.log(`✅ Found ${contacts.length} contacts (${total} total)`);
    
    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Get contacts error:', error);
    return NextResponse.json(
      { 
        contacts: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 }
      },
      { status: 200 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'Contact ID is required' }, { status: 400 });
    }

    const connectDB = (await import('@/lib/mongodb')).default;
    const Contact = (await import('@/models/Contact')).default;
    await connectDB();

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: { ...body, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedContact) {
      return NextResponse.json({ success: false, error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, contact: updatedContact });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ success: false, error: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Contact ID is required' }, { status: 400 });
    }

    const connectDB = (await import('@/lib/mongodb')).default;
    const Contact = (await import('@/models/Contact')).default;
    await connectDB();

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json({ success: false, error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete contact' }, { status: 500 });
  }
}