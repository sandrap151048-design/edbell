import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { upload, deleteUploadedFile, getFileUrl } from '@/lib/upload';
import { promisify } from 'util';

// Convert multer middleware to work with Next.js
const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// GET - Fetch all gallery images
export async function GET(request: NextRequest) {
  try {
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json({
        success: true,
        images: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 },
        message: 'Database not configured - returning empty results'
      });
    }

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Build query
    const query: any = {};
    if (published !== null) {
      query.published = published === 'true';
    }
    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured !== null) {
      query.featured = featured === 'true';
    }
    
    // Execute query with pagination
    const skip = (page - 1) * limit;
    const images = await Gallery.find(query)
      .sort({ eventDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Gallery.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({
      success: true,
      images: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 0 },
      message: 'Database connection issue - returning empty results'
    });
  }
}

// POST - Upload new gallery image
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const location = formData.get('location') as string;
    const eventDate = formData.get('eventDate') as string;
    const tags = formData.get('tags') as string;
    const featured = formData.get('featured') === 'true';
    const published = formData.get('published') === 'true';
    const uploadedBy = formData.get('uploadedBy') as string || 'Admin';

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Image file is required' },
        { status: 400 }
      );
    }

    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Save file to uploads directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.round(Math.random() * 1E9);
    const fileExtension = file.name.split('.').pop();
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const filename = `${sanitizedTitle}-${timestamp}-${randomSuffix}.${fileExtension}`;
    
    // Ensure uploads directory exists
    const fs = require('fs');
    const path = require('path');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Write file
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);
    
    // Create gallery entry
    const galleryImage = new Gallery({
      title: title.trim(),
      description: description.trim(),
      category,
      imageUrl: `/uploads/gallery/${filename}`,
      imageAlt: title.trim(),
      location: location?.trim() || undefined,
      eventDate: eventDate ? new Date(eventDate) : new Date(),
      uploadedBy: uploadedBy.trim(),
      tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      featured,
      published
    });
    
    await galleryImage.save();
    
    return NextResponse.json({
      success: true,
      image: galleryImage.toObject(),
      message: 'Image uploaded successfully'
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error uploading image:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: validationErrors.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// PUT - Update gallery image
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Image ID is required' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!updateData.title || !updateData.description || !updateData.category) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }
    
    // Prepare update data
    const cleanUpdateData = {
      title: updateData.title.trim(),
      description: updateData.description.trim(),
      category: updateData.category,
      imageAlt: updateData.imageAlt?.trim() || updateData.title.trim(),
      location: updateData.location?.trim() || undefined,
      eventDate: updateData.eventDate ? new Date(updateData.eventDate) : undefined,
      tags: Array.isArray(updateData.tags) ? updateData.tags.filter((tag: string) => tag.trim()) : [],
      featured: Boolean(updateData.featured),
      published: Boolean(updateData.published)
    };
    
    // Remove undefined values
    Object.keys(cleanUpdateData).forEach(key => {
      if (cleanUpdateData[key as keyof typeof cleanUpdateData] === undefined) {
        delete cleanUpdateData[key as keyof typeof cleanUpdateData];
      }
    });
    
    const image = await Gallery.findByIdAndUpdate(
      _id,
      cleanUpdateData,
      { new: true, runValidators: true }
    );
    
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      image: image.toObject(),
      message: 'Image updated successfully'
    });
    
  } catch (error: any) {
    console.error('Error updating image:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: validationErrors.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update image' },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery image
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Image ID is required' },
        { status: 400 }
      );
    }
    
    const image = await Gallery.findById(id);
    
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      );
    }
    
    // Delete the physical file
    if (image.imageUrl.startsWith('/uploads/')) {
      const filename = image.imageUrl.split('/').pop();
      if (filename) {
        deleteUploadedFile(filename);
      }
    }
    
    // Delete from database
    await Gallery.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });
    
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}