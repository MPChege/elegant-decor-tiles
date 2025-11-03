# Installation Instructions

Quick setup guide for the Elegant Tiles & Décor Centre website.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17.0 or higher
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** (for cloning the repository)
- A code editor (VS Code recommended)

Check your versions:
```bash
node --version
npm --version
git --version
```

---

## 🚀 Quick Install (5 Minutes)

### 1. Navigate to Project Directory

```bash
cd elegant-tiles-decor
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### 3. Create Environment File

```bash
# Copy the example file
cp .env.example .env.local
```

### 4. Add Temporary Variables

Open `.env.local` and add placeholders:

```env
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-key
OPENAI_API_KEY=sk-placeholder
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

*Note: The site will run locally with these placeholders, but database features won't work until you set up Supabase.*

### 5. Start Development Server

```bash
npm run dev
```

### 6. Open in Browser

Navigate to: **http://localhost:3000**

✅ **You should see the Elegant Tiles website!**

---

## 🗄️ Full Setup with Supabase (15 Minutes)

### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up (free tier is perfect)

### Step 2: Create New Project

1. Click **"New Project"**
2. Fill in:
   - **Name**: elegant-tiles-dev
   - **Database Password**: (create a strong password)
   - **Region**: Select closest to you
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup

### Step 3: Set Up Database

1. In Supabase Dashboard, click **"SQL Editor"**
2. Click **"New Query"**
3. Open `lib/supabase-schema.sql` from the project
4. Copy all contents
5. Paste into Supabase SQL Editor
6. Click **"Run"**
7. You should see "Success. No rows returned"

### Step 4: Configure Storage

1. Click **"Storage"** in sidebar
2. Click **"Create bucket"**
3. Create these buckets (all public):
   - `products`
   - `projects`
   - `blog`
4. For each bucket:
   - Click the bucket name
   - Click **"Policies"**
   - Click **"New Policy"**
   - Choose **"For full customization"**
   - Policy name: `Public Access`
   - Check all: SELECT, INSERT, UPDATE, DELETE
   - Target roles: `public`
   - Click **"Review"** → **"Save policy"**

### Step 5: Get API Keys

1. Click **"Settings"** (gear icon) → **"API"**
2. Copy these values:
   - **Project URL** (e.g., https://xyz.supabase.co)
   - **anon public** key
   - **service_role** key (keep this secret!)

### Step 6: Update Environment Variables

Open `.env.local` and update with your real values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
OPENAI_API_KEY=sk-your-openai-key  # Optional for now
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 7: Restart Development Server

```bash
# Stop the server (Ctrl + C)
# Start again
npm run dev
```

### Step 8: Test Database Connection

1. Go to http://localhost:3000/contact
2. Fill out the contact form
3. Submit it
4. Go to Supabase Dashboard → **Table Editor** → **inquiries**
5. You should see your submission!

✅ **Full setup complete!**

---

## 🧪 Optional: Seed Test Data

To populate the database with sample data:

1. In Supabase SQL Editor, run:

```sql
-- Sample Products
INSERT INTO products (name, description, category, price, featured, in_stock)
VALUES 
  ('Italian Carrara Marble', 'Premium white marble with grey veining', 'Marble', 15000.00, true, true),
  ('Porcelain Floor Tiles', 'Durable porcelain tiles for high traffic areas', 'Porcelain', 8500.00, false, true),
  ('Natural Stone Slate', 'Rustic slate tiles perfect for outdoor use', 'Natural Stone', 12000.00, true, true);

-- Sample Projects
INSERT INTO projects (title, description, category, location, year, featured)
VALUES
  ('Modern Villa', 'Contemporary villa with luxury finishes', 'Residential', 'Karen, Nairobi', 2024, true),
  ('Boutique Hotel Lobby', 'Five-star hotel interior design', 'Hospitality', 'Mombasa', 2023, true),
  ('Corporate Office', 'Modern office space design', 'Commercial', 'Upper Hill, Nairobi', 2024, false);

-- Sample Blog Posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, published, publish_date)
VALUES
  ('2025 Design Trends', '2025-design-trends', 'Top design trends for the new year', 'Full article content here...', 'Sarah Kamau', true, NOW()),
  ('Choosing the Right Tiles', 'choosing-right-tiles', 'Guide to selecting perfect tiles', 'Full article content here...', 'David Ochieng', true, NOW());
```

---

## 🛠️ Troubleshooting

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Try again
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Restart the dev server
# Stop with Ctrl+C, then:
npm run dev
```

### Issue: Supabase connection not working

**Check:**
- [ ] Copied correct URL and keys
- [ ] No extra spaces in `.env.local`
- [ ] Restarted dev server after adding keys
- [ ] Supabase project is not paused

---

## ✅ Installation Checklist

- [ ] Node.js 18.17+ installed
- [ ] Project dependencies installed (`npm install`)
- [ ] `.env.local` file created
- [ ] Dev server running (`npm run dev`)
- [ ] Site opens at localhost:3000
- [ ] *(Optional)* Supabase project created
- [ ] *(Optional)* Database schema applied
- [ ] *(Optional)* Storage buckets configured
- [ ] *(Optional)* API keys added to `.env.local`
- [ ] *(Optional)* Database connection tested

---

## 📚 Next Steps

After installation:

1. **Read the documentation**:
   - `README.md` - Project overview
   - `GETTING-STARTED.md` - Development guide
   - `FEATURES.md` - Feature documentation

2. **Explore the codebase**:
   - Browse the pages in `app/`
   - Check out components in `components/`
   - Review utility functions in `lib/`

3. **Start developing**:
   - Make a small change to see hot reload
   - Create a new page
   - Customize the design

---

## 🎉 Success!

If you can see the website at http://localhost:3000, you're ready to go!

For detailed development information, check `GETTING-STARTED.md`.

**Happy coding! 🚀**

