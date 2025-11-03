'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  BookOpen,
  Mail,
  Users,
  Settings,
  TrendingUp,
  Eye,
  ShoppingCart,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const stats = [
  {
    title: 'Total Views',
    value: '24,567',
    change: '+12.5%',
    icon: Eye,
    trend: 'up',
  },
  {
    title: 'Inquiries',
    value: '156',
    change: '+8.2%',
    icon: Mail,
    trend: 'up',
  },
  {
    title: 'Products',
    value: '342',
    change: '+5',
    icon: Package,
    trend: 'up',
  },
  {
    title: 'Active Projects',
    value: '28',
    change: '+3',
    icon: FolderOpen,
    trend: 'up',
  },
]

const quickActions = [
  { title: 'Manage Products', href: '/admin/products', icon: Package },
  { title: 'Manage Projects', href: '/admin/projects', icon: FolderOpen },
  { title: 'Manage Blog', href: '/admin/blog', icon: BookOpen },
  { title: 'View Inquiries', href: '/admin/inquiries', icon: Mail },
  { title: 'Subscribers', href: '/admin/subscribers', icon: Users },
  { title: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-2xl font-bold">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">{stat.change}</span>
                    <span>from last month</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="font-playfair text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
              >
                <Link href={action.href}>
                  <Card className="hover:shadow-luxury-md transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <action.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{action.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        Project consultation request
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-muted" />
                      <div>
                        <p className="font-medium">Product Name {i + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          234 views
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

