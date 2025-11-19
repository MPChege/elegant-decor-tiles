import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/public/services
 * Get all published services with pagination and filters
 * 
 * Query parameters:
 * - limit (number, default: 50)
 * - offset (number, default: 0)
 * - category (string, optional)
 * - featured (boolean, optional) - featured=true
 * 
 * NOTE: Currently returns static data. In the future, this should be migrated
 * to a `services` table in the database for dynamic management via the admin dashboard.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100); // Max 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const category = searchParams.get('category') || undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;

    // Static services data (to be migrated to database)
    const allServices = [
      {
        id: 'interior-design',
        title: 'Interior Design',
        slug: 'interior-design',
        description: 'Bespoke interior design solutions that reflect your personality and lifestyle.',
        category: 'design',
        icon: null,
        featured_image: null,
        images: [],
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'luxury-tiles',
        title: 'Luxury Tiles',
        slug: 'luxury-tiles',
        description: 'Premium tiles sourced from the finest manufacturers around the world.',
        category: 'products',
        icon: null,
        featured_image: null,
        images: [],
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'project-management',
        title: 'Project Management',
        slug: 'project-management',
        description: 'End-to-end project execution with meticulous attention to detail.',
        category: 'services',
        icon: null,
        featured_image: null,
        images: [],
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'custom-fabrication',
        title: 'Custom Fabrication',
        slug: 'custom-fabrication',
        description: 'Tailored solutions for unique design requirements.',
        category: 'services',
        icon: null,
        featured_image: null,
        images: [],
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'design-consultation',
        title: 'Design Consultation',
        slug: 'design-consultation',
        description: 'Expert advice to help you make informed design decisions.',
        category: 'consultation',
        icon: null,
        featured_image: null,
        images: [],
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'installation-warranty',
        title: 'Installation & Warranty',
        slug: 'installation-warranty',
        description: 'Professional installation with comprehensive warranty coverage.',
        category: 'services',
        icon: null,
        featured_image: null,
        images: [],
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    // Apply filters
    let filteredServices = allServices;
    if (category) {
      filteredServices = filteredServices.filter((s) => s.category === category);
    }
    if (featured !== undefined) {
      filteredServices = filteredServices.filter((s) => s.featured === featured);
    }

    // Calculate total before pagination
    const total = filteredServices.length;

    // Apply pagination
    const paginatedServices = filteredServices.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginatedServices,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching services:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch services',
      },
      { status: 500 }
    );
  }
}

