# Quick Deployment Guide

## Step 1: Configure Git (if not already done)

Run these commands in your terminal:

```bash
git config --global user.name "Kabir Mahmud"
git config --global user.email "your.email@example.com"
```

(Replace with your actual email)

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `portfolio` (or your preferred name)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 3: Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

## Step 5: Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests
3. Click **Save**

## Step 6: Update Base Path (IMPORTANT!)

**If your repository is named `portfolio`:**
- Keep `base: '/portfolio/'` in `vite.config.js` ✅ (already set)

**If your repository is `yourusername.github.io`:**
- Change `base: '/portfolio/'` to `base: '/'` in `vite.config.js`

## Step 7: Wait for Deployment

- GitHub Actions will automatically build and deploy
- Check the **Actions** tab in your repository
- Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio/`

## Troubleshooting

- If deployment fails, check the **Actions** tab for errors
- Make sure GitHub Actions has write permissions
- Verify the base path matches your repository name
