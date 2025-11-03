'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { LuxuryLayout } from '@/components/layout/luxury-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Luxury']

const projects = [
  {
    id: 1,
    title: 'Modern Villa Retreat',
    category: 'Residential',
    location: 'Karen, Nairobi',
    year: 2024,
    tags: ['Luxury', 'Modern', 'Villa'],
    image: '/projects/villa-1.jpg',
  },
  {
    id: 2,
    title: 'Urban Penthouse',
    category: 'Residential',
    location: 'Westlands, Nairobi',
    year: 2024,
    tags: ['Contemporary', 'Penthouse'],
    image: '/projects/penthouse.jpg',
  },
  {
    id: 3,
    title: 'Boutique Hotel Lobby',
    category: 'Hospitality',
    location: 'Mombasa',
    year: 2023,
    tags: ['Luxury', 'Hotel', 'Hospitality'],
    image: '/projects/hotel.jpg',
  },
  {
    id: 4,
    title: 'Corporate Office Suite',
    category: 'Commercial',
    location: 'Upper Hill, Nairobi',
    year: 2023,
    tags: ['Modern', 'Office', 'Commercial'],
    image: '/projects/office.jpg',
  },
  {
    id: 5,
    title: 'Luxury Apartment',
    category: 'Residential',
    location: 'Kilimani, Nairobi',
    year: 2023,
    tags: ['Luxury', 'Apartment'],
    image: '/projects/apartment.jpg',
  },
  {
    id: 6,
    title: 'Restaurant Interior',
    category: 'Commercial',
    location: 'Gigiri, Nairobi',
    year: 2024,
    tags: ['Restaurant', 'Hospitality'],
    image: '/projects/restaurant.jpg',
  },
]

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <LuxuryLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Our <span className="text-luxury-gradient">Work</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A portfolio of exceptional design projects that showcase our
              commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-y border-border">
        <div className="container px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'luxury' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <Card className="group overflow-hidden border-luxury hover:shadow-luxury-lg transition-all duration-300 cursor-pointer">
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <Badge variant="luxury" className="mb-3">
                        {project.category}
                      </Badge>
                      <h3 className="font-playfair text-2xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.location} • {project.year}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-background/50 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Placeholder gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </LuxuryLayout>
  )
}

