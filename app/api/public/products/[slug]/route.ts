import { NextRequest, NextResponse } from 'next/server';
import { productsAPI } from '@elegant/shared/lib/api';
import { getPublicMediaUrl } from '@/lib/s3/getPublicUrl';
import type { Product } from '@elegant/shared/types/database.types';

/**
 * GET /api/public/products/[slug]
 * Get single product by slug
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const product = await productsAPI.getBySlug(slug);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Convert image keys to full URLs
    const images = ((product as Product).images || []).map((img) => getPublicMediaUrl(img));
    const featuredImage = (product as Product).featured_image 
      ? getPublicMediaUrl((product as Product).featured_image)
      : images[0] || null;

    // Map to public API format
    const publicProduct = {
      id: product.id,
      title: product.title || product.name,
      slug: product.slug || product.id,
      description: product.description || null,
      category: product.category,
      subcategory: product.subcategory || null,
      price: product.price || null,
      currency: product.currency || 'KES',
      featured_image: featuredImage,
      images: images,
      tags: product.tags || [],
      featured: product.featured || false,
      in_stock: product.in_stock !== undefined ? product.in_stock : true,
      specifications: product.specifications || null,
      seo_title: product.seo_title || null,
      seo_description: product.seo_description || null,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };

    return NextResponse.json({
      success: true,
      data: publicProduct,
    });
  } catch (error) {
    console.error('Error fetching product:', error);

    const errorMessage = error instanceof Error ? error.message : '';

    if (errorMessage.includes('not found')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage || 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}

