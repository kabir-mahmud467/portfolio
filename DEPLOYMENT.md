# Deployment Guide

## Quick Start

### Option 1: Automatic Deployment (Recommended)

1. **Update GitHub Username**:
   - In `vite.config.js`, change `base: '/portfolio/'` to match your repository name
   - If your repo is `yourusername.github.io`, use `base: '/'`
   - If your repo is `portfolio`, use `base: '/portfolio/'`

2. **Update Personal Information**:
   - Edit `index.html` - Update meta tags, Open Graph URLs
   - Edit `src/components/Hero.jsx` - Update name, social links
   - Edit `src/components/About.jsx` - Update about content
   - Edit `src/components/Projects.jsx` - Add your projects
   - Edit `src/components/Contact.jsx` - Update contact info
   - Edit `public/sitemap.xml` and `public/robots.txt` - Update URLs

3. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`
   - Click Save

5. **GitHub Actions will automatically deploy** on every push to `main` branch!

### Option 2: Manual Deployment

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Update configuration** (same as Option 1, steps 1-2)

3. **Build and deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Click Save

## Important Notes

- **Repository Name**: If your repository is named `yourusername.github.io`, change `base: '/portfolio/'` to `base: '/'` in `vite.config.js`
- **Update URLs**: Replace `yourusername` with your actual GitHub username in:
  - `index.html` (meta tags)
  - `public/sitemap.xml`
  - `public/robots.txt`
- **Custom Domain**: If using a custom domain, add `CNAME` file in `public/` folder

## Troubleshooting

### 404 Errors
- Ensure `base` path in `vite.config.js` matches your repository name
- Check that GitHub Pages is enabled and pointing to `gh-pages` branch

### Assets Not Loading
- Verify `base` path is correct
- Clear browser cache
- Check browser console for errors

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (requires Node 16+)
- Review build errors in terminal
