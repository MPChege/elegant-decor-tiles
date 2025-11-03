'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Heart, ShoppingCart, Check } from 'lucide-react'
import { LuxuryLayout } from '@/components/layout/luxury-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

// Mock product database - would come from Supabase in production
const productDatabase: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Italian Carrara Marble',
    category: 'Marble',
    price: 15000,
    description:
      'Authentic Italian Carrara marble, known for its distinctive white background and grey veining. Perfect for luxury residential and commercial projects.',
    specifications: {
      size: '60x60cm',
      thickness: '10mm',
      finish: 'Polished',
      origin: 'Carrara, Italy',
      absorption: '<0.5%',
      application: 'Indoor/Outdoor',
    },
    features: [
      'Natural stone elegance',
      'Heat resistant',
      'Scratch resistant',
      'Easy to maintain',
      'Timeless beauty',
    ],
    inStock: true,
    images: ['/products/carrara-1.jpg', '/products/carrara-2.jpg'],
  },
  '2': {
    id: '2',
    name: 'Premium Porcelain Tiles',
    category: 'Porcelain',
    price: 8500,
    description:
      'High-quality porcelain tiles with exceptional durability and low maintenance. Ideal for high-traffic areas.',
    specifications: {
      size: '80x80cm',
      thickness: '9mm',
      finish: 'Matt',
      origin: 'Spain',
      absorption: '<0.1%',
      application: 'Indoor/Outdoor',
    },
    features: [
      'Highly durable',
      'Stain resistant',
      'Low maintenance',
      'Slip resistant',
      'Modern aesthetic',
    ],
    inStock: true,
  },
  '3': {
    id: '3',
    name: 'Travertine Natural Stone',
    category: 'Natural Stone',
    price: 12000,
    description:
      'Authentic travertine stone with unique character and texture. Perfect for creating warm, inviting spaces.',
    specifications: {
      size: '40x60cm',
      thickness: '12mm',
      finish: 'Honed',
      origin: 'Turkey',
      absorption: '2-3%',
      application: 'Indoor',
    },
    features: [
      'Natural beauty',
      'Unique patterns',
      'Warm tones',
      'Elegant finish',
      'Classic appeal',
    ],
    inStock: true,
  },
  '4': {
    id: '4',
    name: 'Black Galaxy Granite',
    category: 'Granite',
    price: 18000,
    description:
      'Striking black granite with golden flecks. Makes a bold statement in any space.',
    specifications: {
      size: '60x60cm',
      thickness: '20mm',
      finish: 'Polished',
      origin: 'India',
      absorption: '<0.4%',
      application: 'Indoor/Outdoor',
    },
    features: [
      'Dramatic appearance',
      'Extremely durable',
      'Heat resistant',
      'Scratch resistant',
      'Luxury finish',
    ],
    inStock: false,
  },
  '5': {
    id: '5',
    name: 'Ceramic Floor Tiles',
    category: 'Ceramic',
    price: 4500,
    description:
      'Affordable ceramic tiles without compromising on quality. Perfect for budget-conscious projects.',
    specifications: {
      size: '60x60cm',
      thickness: '8mm',
      finish: 'Matt',
      origin: 'China',
      absorption: '3-6%',
      application: 'Indoor',
    },
    features: [
      'Cost-effective',
      'Easy to install',
      'Good durability',
      'Various colors',
      'Versatile use',
    ],
    inStock: true,
  },
  '6': {
    id: '6',
    name: 'Calacatta Gold Marble',
    category: 'Marble',
    price: 25000,
    description:
      'Ultra-premium Calacatta marble with distinctive gold veining. The epitome of luxury.',
    specifications: {
      size: '120x120cm',
      thickness: '12mm',
      finish: 'Polished',
      origin: 'Italy',
      absorption: '<0.5%',
      application: 'Indoor',
    },
    features: [
      'Museum-grade quality',
      'Rare patterns',
      'Luxurious appearance',
      'Investment piece',
      'Statement making',
    ],
    inStock: true,
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedImage, setSelectedImage] = React.useState(0)
  
  const productId = params.id as string
  const product = productDatabase[productId]

  // If product doesn't exist, show error
  if (!product) {
    return (
      <LuxuryLayout>
        <div className="container px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-playfair text-4xl font-bold mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="luxury" asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </LuxuryLayout>
    )
  }

  return (
    <LuxuryLayout>
      {/* Back Button */}
      <div className="container px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 mb-4 overflow-hidden">
                {/* Placeholder for main image */}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg bg-muted hover:border-primary transition-all ${
                      selectedImage === index ? 'border-2 border-primary' : ''
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="luxury" className="mb-4">
                {product.category}
              </Badge>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-primary">
                  KSh {product.price.toLocaleString()}
                </div>
                <Badge variant={product.inStock ? 'default' : 'secondary'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Key Features</h3>
                <div className="space-y-2">
                  {product.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-sm text-muted-foreground capitalize">
                        {key}
                      </div>
                      <div className="font-medium">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Actions */}
              <div className="flex gap-4">
                <Button 
                  variant="luxury" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "Quote Request Sent!",
                      description: "We'll contact you shortly with pricing details.",
                      variant: "success",
                    })
                  }}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? 'Request Quote' : 'Out of Stock'}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    toast({
                      title: "Added to Wishlist",
                      description: `${product.name} saved to your wishlist.`,
                    })
                  }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    toast({
                      title: "Link Copied!",
                      description: "Product link copied to clipboard.",
                    })
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-muted/30">
        <div className="container px-6">
          <h2 className="font-playfair text-3xl font-bold mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card
                key={index}
                className="hover:shadow-luxury-lg transition-all duration-300"
              >
                <div className="aspect-square bg-muted rounded-t-lg" />
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-2">
                    Related Product {index + 1}
                  </h3>
                  <div className="text-primary font-semibold">
                    KSh 12,000/sqm
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </LuxuryLayout>
  )
}

