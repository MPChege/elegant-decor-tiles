import { NextRequest, NextResponse } from 'next/server';
import { blogAPI } from '@elegant/shared/lib/api';
import { getPublicMediaUrl } from '@/lib/s3/getPublicUrl';
import type { PublicBlogPost } from '@/lib/public-api';

/**
 * GET /api/public/blog
 * Get all published blog posts with pagination and filters
 * 
 * Query parameters:
 * - limit (number, default: 50)
 * - offset (number, default: 0)
 * - featured (boolean, optional) - featured=true (placeholder for future use)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100); // Max 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    // Note: featured filter is a placeholder - blog_posts table doesn't have featured field yet

    // Fetch all published posts
    let posts = await blogAPI.getPublished();

    // Calculate total before pagination
    const total = posts.length;

    // Apply pagination
    const paginatedPosts = posts.slice(offset, offset + limit);

    // Map database format to public API format with full image URLs
    const publicPosts: PublicBlogPost[] = paginatedPosts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || null,
      content: post.content,
      featured_image: post.featured_image ? getPublicMediaUrl(post.featured_image) : null,
      featured_image_key: post.featured_image || null,
      images: [], // Blog posts don't have images array in DB, but we can extend this later
      tags: post.tags || [],
      category: post.category || null,
      published: post.published,
      published_at: post.published_at || post.publish_date || null,
      read_time: post.read_time || null,
      seo_title: post.seo_title || null,
      seo_description: post.seo_description || null,
    }));

    return NextResponse.json({
      success: true,
      data: publicPosts,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch blog posts',
      },
      { status: 500 }
    );
  }
}

