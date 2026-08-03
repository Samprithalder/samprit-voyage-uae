# Voyage UAE — Grade 9 Artificial Intelligence Project

A clean, interactive single-page travel guide website for exploring landmarks, culture, and nature across all seven Emirates of the United Arab Emirates.

## Project Overview

**Voyage UAE** is a Grade 9 AI project that demonstrates how simple artificial intelligence tools can help tourists navigate and discover the UAE more effectively. The site features an interactive itinerary generator, landmark showcase, and educational content about AI applications in travel.

### Key Features

- **Interactive Itinerary Generator**: Select an Emirate, travel interest, and trip duration to generate a customized sample route
- **Landmark Showcase**: Browse featured UAE destinations organized by topic (Culture & Heritage, Nature & Mountains, Modern Landmarks, Family Leisure)
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Editorial Travel Guide Aesthetic**: Warm emerald-and-champagne color palette with route-mapping visual language
- **Smooth Interactions**: Hover effects, tab filtering, and scroll-triggered animations

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + custom CSS
- **Routing**: Wouter (lightweight client-side router)
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Local Setup

### Prerequisites

Before you begin, ensure you have the following installed on your computer:

- **Node.js** (version 18 or later) — [Download here](https://nodejs.org/)
- **pnpm** (package manager) — Install globally with:
  ```bash
  npm install -g pnpm
  ```
  Or use your system package manager (Homebrew on macOS, apt on Ubuntu, etc.)

### Installation Steps

1. **Clone or download the project**

   If you have the project as a ZIP file, extract it to a folder on your computer. If you have access to the Git repository:
   ```bash
   git clone https://github.com/Samprithalder/voyage-uae
   cd voyage-uae
   ```

2. **Install dependencies**

   Navigate to the project folder and run:
   ```bash
   pnpm install
   ```

   This will download and install all required packages (React, Tailwind, Vite, etc.).

3. **Start the development server**

   ```bash
   pnpm dev
   ```

   The terminal will display output like:
   ```
   ➜  Local:   http://localhost:3000/
   ➜  Network: http://169.254.0.21:3000/
   ```

4. **Open in your browser**

   Open your web browser and navigate to **`http://localhost:3000/`**

   The page will automatically reload whenever you make changes to the code (hot module replacement).

### Stopping the Development Server

To stop the server, press **`Ctrl+C`** (or **`Cmd+C`** on macOS) in the terminal.

## Project Structure

```
voyage-uae/
├── client/
│   ├── public/              # Static files (favicon, robots.txt)
│   ├── src/
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx     # Main travel guide page
│   │   │   └── NotFound.tsx # 404 page
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts (theme, etc.)
│   │   ├── App.tsx          # Main app router
│   │   ├── main.tsx         # React entry point
│   │   ├── index.css        # Global styles and design tokens
│   │   ├── styles.css       # Voyage UAE custom styling
│   │   └── script.ts        # Itinerary generator logic
│   └── index.html           # HTML template
├── server/                  # Backend placeholder (not used in static mode)
├── shared/                  # Shared types and constants
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # This file
```

## Key Files Explained

### `client/src/pages/Home.tsx`
The main page component containing all sections: hero, about AI, landmarks, problems, solutions, itinerary generator, impact, and conclusion. This file handles user interactions like tab filtering and itinerary generation.

### `client/src/script.ts`
Contains the itinerary generation logic. Defines the list of UAE landmarks with their locations, interests, and descriptions. The `generateItinerary()` function creates customized travel plans based on user selections.

### `client/src/styles.css`
Custom styling for the Voyage UAE design system. Includes:
- Color palette (Voyage Emerald #064E3B, Champagne #F8E7C9)
- Typography system (DM Serif Display for headlines, Manrope for body)
- Route-guide visual language (mapped journey lines, route stops, coordinate labels)
- Responsive breakpoints for mobile, tablet, and desktop

### `client/src/index.css`
Global Tailwind CSS configuration and design tokens. Defines spacing, colors, shadows, and animation timing used throughout the site.

## Customization Guide

### Update Student Information

Edit the student details card in `client/src/pages/Home.tsx` (around line 167):

```tsx
<dl className="student-list">
  <div>
    <dt>Student name</dt>
    <dd>Your Name Here</dd>
  </div>
  <div>
    <dt>Grade &amp; section</dt>
    <dd>Grade 9 — Section A</dd>
  </div>
  <div>
    <dt>Roll number</dt>
    <dd>Your Roll Number</dd>
  </div>
</dl>
```

### Add or Modify Landmarks

Edit the `landmarks` array in `client/src/script.ts` to add new destinations or update descriptions:

```typescript
{
  name: "Your Landmark Name",
  emirate: "Abu Dhabi", // or other emirate
  interests: ["Culture & Heritage", "Nature & Mountains"], // pick from available interests
  note: "A brief description of what visitors will experience here.",
}
```

### Change Colors

The main colors are defined in `client/src/styles.css` as CSS variables:

```css
:root {
  --voyage-emerald: #064e3b;      /* Main brand color */
  --voyage-champagne: #f8e7c9;    /* Accent/highlight color */
  --voyage-paper: #f6f1e7;        /* Background color */
  /* ... other colors ... */
}
```

### Modify Copy and Headlines

All text content is in `client/src/pages/Home.tsx`. Search for the section you want to edit and update the text directly.

## Building for Production

To create an optimized production build:

```bash
pnpm build
```

This generates:
- Minified and optimized JavaScript and CSS
- Compressed assets
- Production-ready files in the `dist/` folder

To preview the production build locally:

```bash
pnpm preview
```

Then open `http://localhost:4173/` in your browser.

## Troubleshooting

### Port 3000 is already in use

If you get an error like "Port 3000 is already in use," you can specify a different port:

```bash
pnpm dev -- --port 3001
```

Then open `http://localhost:3001/` in your browser.

### Dependencies not installing

If `pnpm install` fails, try clearing the cache:

```bash
pnpm store prune
pnpm install
```

### Changes not reflecting in browser

Make sure the development server is running. If it's stuck, stop it with **Ctrl+C** and restart with `pnpm dev`.

### TypeScript errors

Run the type checker to see any issues:

```bash
pnpm check
```

## Browser Compatibility

Voyage UAE works on all modern browsers:
- Chrome/Chromium (version 90+)
- Firefox (version 88+)
- Safari (version 14+)
- Edge (version 90+)

## Performance Tips

- The site is optimized for fast loading with compressed images and efficient CSS
- Interactions use GPU-accelerated transforms for smooth 60fps animations
- The itinerary generator runs entirely in the browser with no server requests

## Accessibility

The site includes:
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast text for readability
- Focus indicators for keyboard users
- Respects `prefers-reduced-motion` user preference

## Deployment

The project is ready to deploy to any static hosting service:

- **Manus**: Use the built-in Publish button in the Management UI
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Push to a `gh-pages` branch
- **Any web server**: Upload the contents of the `dist/` folder

## Support & Questions

For questions about the project structure or how to modify it, refer to:
- The inline code comments in `client/src/pages/Home.tsx` and `client/src/script.ts`
- The design philosophy documented in `ideas.md`
- The Tailwind CSS documentation: https://tailwindcss.com/docs
- The React documentation: https://react.dev/

## License

This project is created for educational purposes as a Grade 9 Artificial Intelligence project.

---

**Last Updated**: July 31, 2026  
**Project Version**: 1.0.0
