import { NextRequest, NextResponse } from 'next/server';
import { blogAPI } from '@elegant/shared/lib/api';
import { getPublicMediaUrl } from '@/lib/s3/getPublicUrl';
import type { PublicBlogPost } from '@/lib/public-api';

/**
 * GET /api/public/blog/[slug]
 * Get a single published blog post by slug
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const post = await blogAPI.getBySlug(slug);

    // Map database format to public API format with full image URLs
    const publicPost: PublicBlogPost = {
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
    };

    return NextResponse.json({
      success: true,
      data: publicPost,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);

    const errorMessage = error instanceof Error ? error.message : '';

    if (errorMessage.includes('not found') || errorMessage.includes('No rows')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage || 'Failed to fetch blog post',
      },
      { status: 500 }
    );
  }
}

