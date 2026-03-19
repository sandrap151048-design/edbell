import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

// GET - Fetch all services
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST - Create new service
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Auto-generate serviceId if not provided
    if (!body.serviceId) {
      const count = await Service.countDocuments();
      const padded = String(count + 1).padStart(3, '0');
      body.serviceId = `SERV_${padded}`;
    }

    // Filter out empty features (name or details must not be blank)
    if (body.features && Array.isArray(body.features)) {
      body.features = body.features.filter(
        (f: { name: string; details: string }) =>
          f.name && f.name.trim() !== '' && f.details && f.details.trim() !== ''
      );
    }

    // Validate at least title and description exist
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ success: false, error: 'Service title is required' }, { status: 400 });
    }
    if (!body.description || !body.description.trim()) {
      return NextResponse.json({ success: false, error: 'Service description is required' }, { status: 400 });
    }

    const service = new Service(body);
    await service.save();
    
    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT - Update service
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...updateData } = body;

    // Filter out empty features on update too
    if (updateData.features && Array.isArray(updateData.features)) {
      updateData.features = updateData.features.filter(
        (f: { name: string; details: string }) =>
          f.name && f.name.trim() !== '' && f.details && f.details.trim() !== ''
      );
    }

    const service = await Service.findByIdAndUpdate(_id, updateData, { new: true });
    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE - Delete service
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Service ID is required' }, { status: 400 });
    }

    await Service.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
