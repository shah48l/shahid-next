# Shahid J Portfolio

A polished, animated developer portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and GSAP.

This project is designed as a modern personal brand site for Shahid J, highlighting backend engineering, APIs, machine learning work, and selected projects through a high-motion, premium UI.

## Overview

The site combines production-focused engineering content with a visually rich frontend experience:

- A large animated hero section with interactive typography and terminal-style presentation
- A custom header with Gooey navigation and audio controls
- Skills, experience, projects, education, and contact sections driven by a single portfolio data source
- ReactBits-inspired motion components, spotlight cards, and star-border styling
- Responsive behavior tuned for desktop and mobile

## Tech Stack

- Next.js 16.2.3
- React 19.2.4
- TypeScript 5
- Tailwind CSS v4
- GSAP
- ESLint 9

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev     # Start the local dev server
npm run build   # Create a production build
npm run start   # Run the production server
npm run lint    # Run ESLint
```

## Project Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Hero.tsx
│   ├── JazzToggle.tsx
│   ├── Loader.tsx
│   ├── Nav.tsx
│   ├── Sections.tsx
│   ├── Terminal.tsx
│   └── reactbits/
│       ├── GooeyNav.jsx
│       ├── SpotlightCard.jsx
│       ├── StarBorder.jsx
│       └── ...
├── data/
│   └── portfolio.ts
├── hooks/
│   └── useGsap.ts
└── lib/
    └── audio.ts
```

## Customizing Content

Most portfolio content is centralized in:

- [src/data/portfolio.ts](/Users/shahidj/Downloads/shahid-next/src/data/portfolio.ts:1)

Update that file to edit:

- Personal details
- Social links
- Stats
- Skills
- Experience
- Projects
- Education
- Tech logo strip

## Design Notes

This portfolio leans into an intentional visual system rather than a default template:

- Self-hosted Google fonts through `next/font`
- Animated section reveals with GSAP
- Spotlight and star-border card treatments
- Ambient audio controls with a local music asset
- Layered backgrounds, glow accents, and tactile button styling

## Production Readiness

The codebase is set up with a production deployment flow in mind:

- App Router architecture with a clean `src/` layout
- Typed data source for portfolio content
- Local audio asset for reliable playback in production
- Responsive layout across desktop and mobile
- Linting support via ESLint

Before deploying, it is still a good idea to:

- Run `npm run lint`
- Run `npm run build`
- Verify metadata and social preview settings
- Review external asset dependencies such as icon/logo CDNs

## Deployment

The app can be deployed on any platform that supports Next.js, including:

- Vercel
- Netlify
- Render
- Docker-based infrastructure

Typical production flow:

```bash
npm install
npm run build
npm run start
```

## Credits

Music used in the interface:

- "Lobby Time" by Kevin MacLeod (`incompetech.com`)

License attribution should follow the official Incompetech requirements for that track.

## License

This project is licensed under the MIT License unless you choose to apply a different license for your personal portfolio.
