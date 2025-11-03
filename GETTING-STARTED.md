# Getting Started Guide

Welcome to the **Elegant Tiles & Décor Centre** website project!

---

## 📋 Quick Start

### 1. Install Dependencies

```bash
cd elegant-tiles-decor
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI (for AI features)
OPENAI_API_KEY=sk-your_openai_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup

### Option 1: Supabase Cloud (Recommended)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Copy and run `lib/supabase-schema.sql`
5. Go to Settings → API → Copy your keys

### Option 2: Local Supabase

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize
supabase init

# Start local instance
supabase start

# Run migrations
supabase db push
```

---

## 📁 Project Structure Explained

```
elegant-tiles-decor/
│
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with fonts
│   ├── globals.css        # Global styles + Tailwind
│   ├── services/          # Services page
│   ├── work/              # Portfolio page
│   ├── products/          # Products catalog
│   ├── journal/           # Blog/Journal
│   ├── about/             # About page
│   ├── contact/           # Contact form
│   ├── approach/          # Our approach page
│   ├── admin/             # Admin dashboard (protected)
│   └── ai/                # AI features
│       ├── moodboard/     # AI Moodboard Builder
│       └── assistant/     # Virtual Assistant (Amira)
│
├── components/
│   ├── ui/                # ShadCN UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/            # Layout components
│   │   ├── header.tsx     # Site header with nav
│   │   ├── footer.tsx     # Site footer
│   │   └── luxury-layout.tsx  # Wrapper with ambient effects
│   ├── animations/        # Animation components
│   │   ├── scroll-reveal.tsx
│   │   ├── parallax-section.tsx
│   │   └── stagger-children.tsx
│   └── mobile/            # Mobile-specific
│       ├── sticky-cta-bar.tsx
│       └── swipeable-section.tsx
│
├── lib/
│   ├── brand.ts           # Brand system config
│   ├── utils.ts           # Utility functions
│   ├── supabase.ts        # Supabase client setup
│   ├── database.types.ts  # TypeScript types
│   └── supabase-schema.sql # Database schema
│
├── public/                # Static assets
│   ├── manifest.json      # PWA manifest
│   └── icons/             # App icons
│
├── tailwind.config.ts     # Tailwind + custom theme
├── tsconfig.json          # TypeScript config
├── next.config.js         # Next.js config
└── package.json           # Dependencies
```

---

## 🎨 Customization

### Change Brand Colors

Edit `app/globals.css`:

```css
:root {
  --primary: 352 68% 50%;     /* Change primary color */
  --background: 35 25% 94%;   /* Change background */
  /* ... */
}
```

Or use the brand system in `lib/brand.ts`.

### Modify Typography

Update fonts in `app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google'

// Change to your preferred fonts
const bodyFont = Inter({ ... })
const headingFont = Playfair_Display({ ... })
```

### Add New Pages

1. Create folder in `app/`
2. Add `page.tsx`:

```typescript
export default function MyPage() {
  return (
    <div>My Page Content</div>
  )
}
```

3. Add to navigation in `components/layout/header.tsx`

---

## 🧩 Key Features Usage

### Using Animations

```typescript
import { ScrollReveal } from '@/components/animations/scroll-reveal'

<ScrollReveal direction="up" delay={0.2}>
  <h1>Animated Heading</h1>
</ScrollReveal>
```

### Using Brand System

```typescript
import { brand } from '@/lib/brand'

const myColor = brand.colors.light.primary
const myFont = brand.typography.heading.font
```

### Supabase Queries

```typescript
import { supabase } from '@/lib/supabase'

// Fetch products
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('featured', true)
```

---

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript checking

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production
```

---

## 🎯 Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ...

# Commit
git commit -m "Add new feature"

# Push
git push origin feature/new-feature
```

### 2. Testing Locally

- Test all breakpoints (mobile, tablet, desktop)
- Check animations and interactions
- Verify forms submit correctly
- Test with network throttling

### 3. Preview Deployment

- Push to GitHub
- Vercel automatically creates preview
- Share preview link for review

### 4. Production Deployment

```bash
# Merge to main
git checkout main
git merge feature/new-feature
git push origin main

# Vercel auto-deploys to production
```

---

## 🐛 Common Issues

### "Module not found" Error

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Supabase Connection Error

- Check `.env.local` variables
- Verify Supabase project is active
- Check API keys are correct

### Tailwind Styles Not Applying

- Restart dev server: `npm run dev`
- Check if file is included in `tailwind.config.ts`

### Images Not Loading

- Check image paths are correct
- Verify images are in `public/` folder
- Use `next/image` component for optimization

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [ShadCN UI](https://ui.shadcn.com/)

### Tutorials
- Next.js App Router guide
- Tailwind CSS customization
- Supabase real-time features
- Animation with Framer Motion

---

## 🆘 Getting Help

### Project Issues
- Check existing documentation
- Review error messages carefully
- Search GitHub issues

### Community Support
- Next.js Discord
- Supabase Discord
- Stack Overflow

---

## ✅ Checklist for First Run

- [ ] Node.js 18.17+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with all variables
- [ ] Supabase project created
- [ ] Database schema applied
- [ ] Dev server running (`npm run dev`)
- [ ] Site opens at localhost:3000
- [ ] No console errors

---

## 🎉 You're Ready!

Start building amazing features for Elegant Tiles & Décor Centre!

**Happy coding! 🚀**

