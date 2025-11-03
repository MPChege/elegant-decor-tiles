# Deployment Guide - Elegant Tiles & Décor Centre

## 🚀 Deployment Overview

This guide covers deploying the Elegant Tiles website to production using Vercel and Supabase.

---

## Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [Supabase Account](https://supabase.com)
- GitHub repository (recommended)
- Node.js 18.17+

---

## 1️⃣ Supabase Setup

### Create Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: elegant-tiles-production
   - **Database Password**: (secure password)
   - **Region**: Choose closest to your users
4. Wait for project initialization

### Run Database Schema

1. Open SQL Editor in Supabase
2. Copy contents from `lib/supabase-schema.sql`
3. Execute the SQL script
4. Verify tables are created

### Configure Storage

1. Go to **Storage** in Supabase Dashboard
2. Create buckets:
   - `products` (public)
   - `projects` (public)
   - `blog` (public)
3. Set bucket policies to public read

### Setup Authentication

1. Go to **Authentication** → **Providers**
2. Enable Email/Password authentication
3. (Optional) Enable OAuth providers (Google, etc.)
4. Configure email templates

### Get API Keys

1. Go to **Settings** → **API**
2. Copy:
   - Project URL
   - `anon` public key
   - `service_role` key (keep secure!)

---

## 2️⃣ Vercel Deployment

### Connect Repository

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **"New Project"**
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Environment Variables

Add these in Vercel Dashboard → **Settings** → **Environment Variables**:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI (for AI features)
OPENAI_API_KEY=your-openai-key

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. Vercel will provide a preview URL

---

## 3️⃣ Custom Domain Setup

### Add Domain

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain (e.g., `eleganttiles.co.ke`)
3. Follow DNS configuration instructions

### DNS Configuration

Add these DNS records at your domain registrar:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### SSL Certificate

- Vercel automatically provisions SSL certificates
- HTTPS will be enabled within minutes

---

## 4️⃣ Post-Deployment Checklist

### Security

- [ ] Change default admin passwords
- [ ] Enable RLS policies in Supabase
- [ ] Verify API keys are not exposed in client
- [ ] Set up rate limiting
- [ ] Configure CORS properly

### Performance

- [ ] Verify Lighthouse score (target: 95+)
- [ ] Test on mobile devices
- [ ] Check image optimization
- [ ] Verify edge caching
- [ ] Test loading times globally

### SEO

- [ ] Update `sitemap.xml`
- [ ] Configure `robots.txt`
- [ ] Add Google Search Console
- [ ] Set up Google Analytics
- [ ] Verify Open Graph tags
- [ ] Test social media previews

### Monitoring

- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Configure email alerts
- [ ] Monitor Supabase metrics

---

## 5️⃣ CI/CD Pipeline

### Automatic Deployments

Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On pull requests

### GitHub Actions (Optional)

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
```

---

## 6️⃣ Database Backups

### Supabase Automatic Backups

- Supabase Pro plan includes automatic daily backups
- Backups retained for 7 days
- Can restore from Supabase Dashboard

### Manual Backup

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Backup database
supabase db dump -f backup.sql
```

---

## 7️⃣ Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Monitor Performance

- Check Vercel Analytics weekly
- Review Lighthouse scores monthly
- Monitor Supabase usage
- Review error logs regularly

---

## 8️⃣ Rollback Strategy

### Vercel Rollback

1. Go to Vercel Dashboard → **Deployments**
2. Find previous working deployment
3. Click **"Promote to Production"**

### Database Rollback

1. Go to Supabase Dashboard → **Database** → **Backups**
2. Select backup point
3. Click **"Restore"**

---

## 🆘 Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs
```

### Environment Variables Not Working

- Verify variable names match exactly
- Redeploy after adding variables
- Check variable scope (Production/Preview/Development)

### Database Connection Issues

- Verify Supabase project is not paused
- Check API keys are correct
- Verify RLS policies allow access

---

## 📞 Support

For deployment issues:
- **Vercel**: [support@vercel.com](mailto:support@vercel.com)
- **Supabase**: [support@supabase.io](mailto:support@supabase.io)

---

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Site loads at custom domain
- ✅ HTTPS is enabled
- ✅ All pages load correctly
- ✅ Database connection works
- ✅ Image uploads work
- ✅ Contact forms submit successfully
- ✅ Admin dashboard is accessible
- ✅ AI features are functional
- ✅ Mobile experience is smooth

---

**Ready to go live! 🎉**

