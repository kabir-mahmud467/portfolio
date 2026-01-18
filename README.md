# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Framer Motion. Features SEO optimization and is configured for GitHub Pages deployment.

## 🚀 Features

- **Modern Design**: Beautiful, responsive UI with smooth animations
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and structured data
- **Dark Mode**: Toggle between light and dark themes
- **Performance**: Fast loading with Vite and optimized assets
- **Accessible**: Semantic HTML and ARIA labels
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Technologies

- React 18
- Vite
- Framer Motion
- React Icons
- CSS3 with CSS Variables

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Configuration

### Update Personal Information

1. **index.html**: Update meta tags, Open Graph, and structured data with your information
2. **src/components/Hero.jsx**: Update name, title, description, and social links
3. **src/components/About.jsx**: Update about section content
4. **src/components/Skills.jsx**: Update skills and technologies
5. **src/components/Projects.jsx**: Update projects with your actual projects
6. **src/components/Contact.jsx**: Update contact information

### Update GitHub Username

1. In `vite.config.js`, update the `base` path:
```javascript
base: '/yourusername/', // Change 'yourusername' to your GitHub username
```

2. In `index.html`, update all URLs:
```html
<!-- Replace 'yourusername' with your GitHub username -->
<meta property="og:url" content="https://yourusername.github.io/portfolio/" />
```

## 🚀 Deployment to GitHub Pages

1. **Install gh-pages** (already in package.json):
```bash
npm install
```

2. **Update vite.config.js** with your GitHub username:
```javascript
base: '/yourusername/', // Your GitHub username
```

3. **Build and deploy**:
```bash
npm run deploy
```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "gh-pages" branch
   - Click Save

5. **Your site will be live at**:
```
https://yourusername.github.io/portfolio/
```

## 📝 Customization

### Colors

Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  /* ... */
}
```

### Add Resume

1. Place your resume PDF in the `public` folder
2. Update the resume link in `src/components/Hero.jsx`:
```jsx
href="/resume.pdf"
```

### Contact Form

The contact form currently shows an alert. To make it functional, integrate with:
- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- [Netlify Forms](https://www.netlify.com/products/forms/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
