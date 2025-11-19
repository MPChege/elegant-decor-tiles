import { fetchPublicProducts, type PublicProduct } from '@/lib/public-api'
import { LuxuryLayout } from '@/components/layout/luxury-layout'
import { ProductsPageClient } from '@/components/products/products-page-client'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  let products: PublicProduct[] = []

  try {
    products = await fetchPublicProducts()
  } catch {
    products = []
  }

  return (
    <LuxuryLayout>
      <ProductsPageClient products={products} />
    </LuxuryLayout>
  )
}


