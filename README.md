# Personal Portfolio Website

A modern, minimal, and elegant portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 Modern, responsive design
- 🌓 Dark/Light mode toggle
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive (desktop, tablet, mobile)
- 📝 Easy to manage data via JSON files
- 🚀 Built with Next.js 14 App Router
- 🧩 DSA/Problem-solving showcase section

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customizing Your Portfolio

All data is stored in JSON files for easy editing:

### Edit Personal Information
**File:** `data/about.json`
- Update your name, title, bio, location, email
- Add your social media links (GitHub, LinkedIn, Twitter)

### Edit Skills
**File:** `data/skills.json`
- Add/modify programming languages
- Add/modify frameworks and libraries
- Add/modify tools and technologies
- Customize the DSA section description

### Add Projects
**File:** `data/projects.json`
- Add new projects with title, description, technologies
- Set `featured: true` to highlight important projects
- Optional: `video` to show a video modal (YouTube URL or mp4). Example:
  ```json
  {
    "id": 7,
    "title": "My Project",
    "description": "...",
    "technologies": ["Next.js", "Tailwind"],
    "github": "https://github.com/you/repo",
    "video": "https://www.youtube.com/embed/VIDEO_ID"
  }
  ```
  If `video` is present, a “Watch Video” button appears. If both `live` and `video` exist, the video button is shown.

### Update Experience
**File:** `data/experience.json`
- Add your work experience, internships, or roles
- Include achievements and responsibilities
- Update dates and locations

## 🎨 Styling

The project uses Tailwind CSS with custom configurations:
- Dark mode is fully supported
- Responsive breakpoints for mobile, tablet, desktop
- Custom animations and transitions
- Gradient effects and glassmorphism

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar with mobile menu
│   ├── Hero.tsx            # Hero section
│   ├── Skills.tsx          # Skills showcase
│   ├── Projects.tsx        # Projects gallery
│   ├── Experience.tsx      # Experience timeline
│   ├── Contact.tsx         # Contact section
│   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   └── ThemeProvider.tsx    # Theme context provider
├── data/
│   ├── about.json          # Personal information
│   ├── skills.json         # Skills data
│   ├── projects.json       # Projects data
│   └── experience.json     # Experience data
└── public/
    └── project-placeholder.svg  # Placeholder images
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **next-themes** - Dark mode support

## 🎯 Sections

1. **Hero** - Introduction with name, title, and CTA buttons
2. **Skills** - Programming languages, frameworks, tools, and DSA
3. **Projects** - Featured projects with descriptions and links
4. **Experience** - Timeline of work experience and internships
5. **Contact** - Contact information and social links

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile navigation menu
- Optimized layouts for all screen sizes

## 🌟 Tips

- Update the placeholder project images with your actual project screenshots
- Customize colors in `tailwind.config.ts` if needed
- Add more sections by creating new components and importing them in `app/page.tsx`
- The theme persists across page reloads using localStorage

## 📄 License

This project is open source and available for personal use.

---

**Made with ❤️ using Next.js and Tailwind CSS**
