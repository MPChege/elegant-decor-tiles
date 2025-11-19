import { NextRequest, NextResponse } from 'next/server';
import { projectsAPI } from '@elegant/shared/lib/api';
import { getPublicMediaUrl } from '@/lib/s3/getPublicUrl';
import type { PublicProject } from '@/lib/public-api';

/**
 * GET /api/public/projects
 * Get all published projects with pagination and filters
 * 
 * Query parameters:
 * - limit (number, default: 50)
 * - offset (number, default: 0)
 * - featured (boolean, optional) - featured=true
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100); // Max 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const featured = searchParams.get('featured') === 'true' ? true : undefined;

    // Fetch all published projects
    let projects = await projectsAPI.getPublished();

    // Apply filters
    if (featured !== undefined) {
      projects = projects.filter((p) => p.featured === featured);
    }

    // Calculate total before pagination
    const total = projects.length;

    // Apply pagination
    const paginatedProjects = projects.slice(offset, offset + limit);

    // Map database format to public API format with full image URLs
    const publicProjects: PublicProject[] = paginatedProjects.map((project) => {
      // Convert image keys to full URLs
      const images = (project.images || []).map((img) => getPublicMediaUrl(img));
      const featuredImage = project.featured_image 
        ? getPublicMediaUrl(project.featured_image)
        : images[0] || null;

      return {
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description || null,
        short_description: project.short_description || null,
        client_name: project.client_name || null,
        location: project.location || null,
        year: project.year || null,
        completion_date: project.completion_date || null,
        featured_image: featuredImage,
        featured_image_key: project.featured_image || null,
        images: images,
        tags: project.tags || [],
        featured: project.featured || false,
        seo_title: null, // Projects table doesn't have seo_title field
        seo_description: null, // Projects table doesn't have seo_description field
      };
    });

    return NextResponse.json({
      success: true,
      data: publicProjects,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}

