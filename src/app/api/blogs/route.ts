import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET - Fetch all blogs
export async function GET(request: NextRequest) {
  try {
    const db = await connectToDatabase();
    
    if (!db) {
      return NextResponse.json({
        success: true,
        blogs: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
        message: 'Database not configured - returning empty results'
      });
    }

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Build query
    const query: any = {};
    if (published !== null) {
      query.published = published === 'true';
    }
    if (category) {
      query.category = category;
    }
    if (featured !== null) {
      query.featured = featured === 'true';
    }
    
    // Execute query with pagination
    const skip = (page - 1) * limit;
    const blogs = await Blog.find(query)
      .sort({ publishDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Blog.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({
      success: true,
      blogs: [],
      pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      message: 'Database connection issue - returning empty results'
    });
  }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'author', 'category', 'readTime'];
    for (const field of requiredFields) {
      if (!body[field] || !body[field].toString().trim()) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Create blog
    const blog = new Blog({
      title: body.title.trim(),
      slug: body.slug?.trim() || body.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, ''),
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      author: body.author.trim(),
      category: body.category,
      tags: Array.isArray(body.tags) ? body.tags.filter((tag: string) => tag.trim()) : [],
      readTime: body.readTime.trim(),
      featured: Boolean(body.featured),
      published: Boolean(body.published),
      publishDate: body.publishDate ? new Date(body.publishDate) : new Date()
    });
    
    await blog.save();
    
    return NextResponse.json({
      success: true,
      blog: blog.toObject(),
      message: 'Blog created successfully'
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating blog:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A blog with this slug already exists' },
        { status: 400 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: validationErrors.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
}

// PUT - Update blog
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'author', 'category', 'readTime'];
    for (const field of requiredFields) {
      if (!updateData[field] || !updateData[field].toString().trim()) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Prepare update data
    const cleanUpdateData = {
      title: updateData.title.trim(),
      slug: updateData.slug?.trim() || undefined,
      excerpt: updateData.excerpt.trim(),
      content: updateData.content.trim(),
      author: updateData.author.trim(),
      category: updateData.category,
      tags: Array.isArray(updateData.tags) ? updateData.tags.filter((tag: string) => tag.trim()) : [],
      readTime: updateData.readTime.trim(),
      featured: Boolean(updateData.featured),
      published: Boolean(updateData.published),
      publishDate: updateData.publishDate ? new Date(updateData.publishDate) : undefined
    };
    
    // Remove undefined values
    Object.keys(cleanUpdateData).forEach(key => {
      if ((cleanUpdateData as any)[key] === undefined) {
        delete (cleanUpdateData as any)[key];
      }
    });
    
    const blog = await Blog.findByIdAndUpdate(
      _id,
      cleanUpdateData,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      blog: blog.toObject(),
      message: 'Blog updated successfully'
    });
    
  } catch (error: any) {
    console.error('Error updating blog:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A blog with this slug already exists' },
        { status: 400 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, error: validationErrors.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog ID is required' },
        { status: 400 }
      );
    }
    
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });
    
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    );
  }
}