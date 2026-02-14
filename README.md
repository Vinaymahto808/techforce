# TechForge - Complete React + Tailwind Website

A vibrant, colorful, and feature-rich business website built with React, Framer Motion, and Tailwind CSS.

## 📁 Project Structure

```
techforge-website/
├── public/
│   └── images/
│       ├── ecommerce-project.jpg
│       ├── crm-project.jpg
│       ├── dashboard-project.jpg
│       ├── fintech-project.jpg
│       ├── healthcare-project.jpg
│       └── ai-content-project.jpg
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── ColorfulParticleBackground.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceDetailModal.jsx
│   │   ├── Process.jsx
│   │   ├── Tools.jsx
│   │   ├── Work.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Create React App:**
```bash
npx create-react-app techforge-website
cd techforge-website
```

2. **Install Dependencies:**
```bash
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure Tailwind:**

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        black: ['Archivo Black', 'sans-serif'],
        sans: ['Darker Grotesque', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
}
```

Update `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Darker+Grotesque:wght@300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    font-family: 'Darker Grotesque', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Archivo Black', sans-serif;
  }
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

::selection {
  background-color: #EC4899;
  color: white;
}

*:focus-visible {
  outline: 2px solid #EC4899;
  outline-offset: 2px;
}
```

4. **Copy Component Files:**

Copy all files from the provided components folder to `src/components/`

5. **Update src/index.js:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

6. **Run the Development Server:**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📦 Components Breakdown

### Navigation.jsx
- Sticky navigation bar
- Mobile hamburger menu
- Smooth scroll links
- Colorful gradient logo

### Hero.jsx
- Animated letter-by-letter title
- Colorful particle background
- Floating gradient blobs
- Traffic light animation
- CTA buttons

### ColorfulParticleBackground.jsx
- Canvas-based particle system
- 8 different particle colors
- Smooth animations

### Services.jsx (Advanced)
- 6 detailed service offerings
- Category filtering
- Click to open detailed modals
- Pricing tiers
- Tech stack display
- Use cases

### ServiceDetailModal.jsx
- Full-screen modal
- Detailed features
- Pricing plans (3 tiers)
- Technology stack
- Use cases
- Smooth animations

### Process.jsx
- 4-step process
- Colorful cards
- Number badges
- Hover effects

### Tools.jsx
- 6 tool cards
- 3D tilt effect
- Gradient progress bars
- Emoji icons

### Work.jsx
- 6 complete project showcases
- Detailed case studies
- Client testimonials
- Results metrics
- Feature lists
- Project modals

### Footer.jsx
- Gradient background
- Social links
- Rotating emoji
- Copyright info

## 🎨 Color Palette

```javascript
const colors = {
  pink: '#FF6B6B, #EC4899',
  purple: '#9333EA, #8B5CF6',
  indigo: '#4F46E5, #6366F1',
  orange: '#FB923C, #F97316',
  cyan: '#06B6D4, #14B8A6',
  yellow: '#FBBF24, #F59E0B',
}
```

## 🖼️ Adding Images

1. Create `public/images/` directory
2. Add project images:
   - ecommerce-project.jpg
   - crm-project.jpg
   - dashboard-project.jpg
   - fintech-project.jpg
   - healthcare-project.jpg
   - ai-content-project.jpg

See `IMAGE_GUIDE.md` for detailed instructions.

## 🎯 Features

### Advanced Services
- ✅ 6 complete services with full details
- ✅ Category filtering (7 categories)
- ✅ Interactive modals
- ✅ 3-tier pricing plans
- ✅ Technology stack badges
- ✅ Real use cases

### Portfolio/Work
- ✅ 6 detailed project case studies
- ✅ Client names and testimonials
- ✅ Key results metrics
- ✅ Challenge & solution sections
- ✅ Feature lists
- ✅ Tech stack displays
- ✅ Interactive project modals

### Animations
- ✅ Framer Motion throughout
- ✅ Particle background
- ✅ 3D card tilts
- ✅ Smooth scroll reveals
- ✅ Hover effects
- ✅ Page transitions

## 📱 Responsive Design

- **Desktop**: Full layout with all features
- **Tablet**: 2-column grid, hamburger menu
- **Mobile**: Single column, optimized spacing

## 🚀 Build for Production

```bash
npm run build
```

Creates optimized build in `build/` folder.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Drag and drop `build` folder to Netlify
2. Or connect GitHub repo

### GitHub Pages
```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/techforge",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Deploy:
```bash
npm run deploy
```

## 🎨 Customization

### Change Company Name
Search and replace "TechForge" in all files.

### Update Colors
Edit color variables in components and `tailwind.config.js`.

### Modify Services
Edit the `services` array in `Services.jsx`:
```javascript
const services = [
  {
    icon: '📊',
    title: 'Your Service',
    description: '...',
    // ... more fields
  }
]
```

### Update Projects
Edit the `projects` array in `Work.jsx`.

## 📄 File Sizes

Component sizes (approximate):
- Navigation: ~3KB
- Hero: ~4KB
- Services: ~12KB (with modal)
- Process: ~4KB
- Tools: ~5KB
- Work: ~15KB (with modal and projects)
- Footer: ~2KB

## 🔧 Troubleshooting

**Framer Motion not working:**
```bash
npm install framer-motion --save
```

**Tailwind classes not applying:**
- Check `tailwind.config.js` content paths
- Restart development server

**Images not loading:**
- Ensure images are in `public/images/`
- Use relative paths: `/images/filename.jpg`

## 📚 Resources

- [React Documentation](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Image Guide](./IMAGE_GUIDE.md)

## 🤝 Support

For issues or questions:
1. Check this README
2. Review component code
3. Check console for errors
4. Verify all dependencies installed

## 📝 License

MIT License - Free to use for personal and commercial projects

---

Built with ❤️ using React, Framer Motion, and Tailwind CSS 🌈