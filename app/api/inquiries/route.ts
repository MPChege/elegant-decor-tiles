import { NextRequest, NextResponse } from 'next/server';
import { inquiriesAPI } from '@elegant/shared/lib/api';
import { inquirySchema } from '@elegant/shared/utils/validators';

/**
 * POST /api/inquiries
 * Create a new inquiry from the contact form
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = inquirySchema.parse(body);

    // Create inquiry using shared API
    const inquiry = await inquiriesAPI.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: inquiry,
        message: 'Your message has been sent successfully. We will get back to you soon!',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating inquiry:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to send message',
      },
      { status: 500 }
    );
  }
}
