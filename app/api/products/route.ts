import { NextRequest, NextResponse } from 'next/server';
import { productsAPI } from '@elegant/shared/lib/api';

/**
 * GET /api/products
 * Get all published products for the user site
 */
export async function GET(request: NextRequest) {
  try {
    const products = await productsAPI.getPublished();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
