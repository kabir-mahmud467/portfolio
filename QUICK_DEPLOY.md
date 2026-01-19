# 🚀 Quick Deploy to GitHub Pages

## ⚡ Fast Track (3 Steps)

### 1️⃣ Set Git Identity (One-time setup)
```bash
git config --global user.name "Kabir Mahmud"
git config --global user.email "your.email@example.com"
```

### 2️⃣ Commit Your Code
```bash
git commit -m "Initial commit: Modern portfolio with 3D design"
```

### 3️⃣ Push to GitHub

**First, create a repository on GitHub:**
- Go to: https://github.com/new
- Name: `portfolio`
- Make it **Public**
- Click "Create repository"

**Then run:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### 4️⃣ Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Source: **gh-pages** branch, **/ (root)** folder
3. Save

### 5️⃣ Enable GitHub Actions Permissions
1. Go to **Settings** → **Actions** → **General**
2. Workflow permissions: ✅ **Read and write**
3. Save

**That's it!** GitHub Actions will auto-deploy. Check the **Actions** tab.

Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio/`
