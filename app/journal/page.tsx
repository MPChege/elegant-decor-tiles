'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, User, ArrowRight, Search } from 'lucide-react'
import { LuxuryLayout } from '@/components/layout/luxury-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const heroBackground = '/LEHIGH/RECEPTION%20FINAL_5%20-%20Photo.png'

const articles = [
  {
    id: 1,
    title: "2025 Tile Trends: What's Hot in Luxury Interiors",
    excerpt:
      'Discover the latest trends shaping luxury interior design this year.',
    author: 'Sarah Kamau',
    date: '2024-11-15',
    readTime: '5 min read',
    category: 'Trends',
    featured: true,
    image: '/blog/trends-2025.jpg',
  },
  {
    id: 2,
    title: 'Marble vs. Porcelain: Making the Right Choice',
    excerpt: 'A comprehensive guide to choosing between marble and porcelain tiles.',
    author: 'David Ochieng',
    date: '2024-11-10',
    readTime: '7 min read',
    category: 'Guides',
    featured: false,
    image: '/blog/marble-porcelain.jpg',
  },
  {
    id: 3,
    title: 'Transforming Small Spaces with Strategic Tile Selection',
    excerpt: 'Expert tips for making small spaces feel larger through design.',
    author: 'Amina Hassan',
    date: '2024-11-05',
    readTime: '6 min read',
    category: 'Tips',
    featured: true,
    image: '/blog/small-spaces.jpg',
  },
  {
    id: 4,
    title: 'Sustainable Materials in Modern Interior Design',
    excerpt: 'How eco-friendly materials are reshaping luxury interiors.',
    author: 'James Mwangi',
    date: '2024-10-28',
    readTime: '8 min read',
    category: 'Sustainability',
    featured: false,
    image: '/blog/sustainable.jpg',
  },
  {
    id: 5,
    title: 'The Art of Mixing Patterns and Textures',
    excerpt: 'Master the skill of combining different tiles for stunning effects.',
    author: 'Sarah Kamau',
    date: '2024-10-20',
    readTime: '6 min read',
    category: 'Design',
    featured: false,
    image: '/blog/patterns.jpg',
  },
  {
    id: 6,
    title: 'Maintaining Your Luxury Tiles: A Complete Guide',
    excerpt: 'Everything you need to know about caring for premium tiles.',
    author: 'David Ochieng',
    date: '2024-10-15',
    readTime: '5 min read',
    category: 'Maintenance',
    featured: false,
    image: '/blog/maintenance.jpg',
  },
]

const categories = ['All', 'Trends', 'Guides', 'Tips', 'Design', 'Sustainability']

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticle = articles.find((a) => a.featured)

  return (
    <LuxuryLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <Image
          src={heroBackground}
          alt="Design studio moodboard"
          fill
          priority
          sizes="100vw"
          className="object-cover absolute inset-0 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/45 to-background/95" />
        <div className="container px-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Design <span className="text-luxury-gradient">Journal</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8">
              Insights, trends, and inspiration from our design experts.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/85 border-white/60 text-primary placeholder:text-primary/60 focus-visible:ring-primary/40"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12 bg-muted/30">
          <div className="container px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href={`/journal/${featuredArticle.id}`}>
                <Card className="overflow-hidden hover:shadow-luxury-lg transition-all duration-300 border-luxury">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden bg-muted">
                      <Badge
                        variant="luxury"
                        className="absolute top-4 left-4 z-10"
                      >
                        Featured
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
                    </div>
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <Badge variant="outline" className="w-fit mb-4">
                        {featuredArticle.category}
                      </Badge>
                      <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {featuredArticle.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {featuredArticle.readTime}
                        </div>
                      </div>
                      <Button variant="luxury">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 border-y border-border">
        <div className="container px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'luxury' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <Link href={`/journal/${article.id}`}>
                  <Card className="group h-full hover:shadow-luxury-lg transition-all duration-300 border-luxury">
                    <div className="aspect-[16/10] relative overflow-hidden bg-muted rounded-t-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3">
                        {article.category}
                      </Badge>
                      <h3 className="font-playfair text-xl font-semibold mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button variant="ghost" className="w-full group-hover:text-primary">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </LuxuryLayout>
  )
}

