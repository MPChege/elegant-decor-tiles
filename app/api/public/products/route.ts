import { NextRequest, NextResponse } from 'next/server';
import { productsAPI } from '@elegant/shared/lib/api';
import { getPublicMediaUrl } from '@/lib/s3/getPublicUrl';
import type { Product } from '@elegant/shared/types/database.types';

/**
 * GET /api/public/products
 * Get all published products with pagination and filters
 * 
 * Query parameters:
 * - limit (number, default: 50)
 * - offset (number, default: 0)
 * - category (string, optional)
 * - featured (boolean, optional) - featured=true
 * - in_stock (boolean, optional) - in_stock=true
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100); // Max 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const category = searchParams.get('category') || undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const inStock = searchParams.get('in_stock') === 'true' ? true : undefined;

    // Fetch all published products
    let products = await productsAPI.getPublished();

    // Apply filters
    if (category) {
      products = products.filter((p) => p.category === category);
    }
    if (featured !== undefined) {
      products = products.filter((p) => p.featured === featured);
    }
    if (inStock !== undefined) {
      products = products.filter((p) => p.in_stock === inStock);
    }

    // Calculate total before pagination
    const total = products.length;

    // Apply pagination
    const paginatedProducts = products.slice(offset, offset + limit);

    // Map to public API format with full image URLs
    const publicProducts = paginatedProducts.map((product: Product) => {
      // Convert image keys to full URLs
      const images = (product.images || []).map((img) => getPublicMediaUrl(img));
      const featuredImage = product.featured_image 
        ? getPublicMediaUrl(product.featured_image)
        : images[0] || null;

      return {
        id: product.id,
        title: product.title || product.name, // Support both title and name
        slug: product.slug || product.id, // Use slug if available, fallback to id
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
    });

    return NextResponse.json({
      success: true,
      data: publicProducts,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

