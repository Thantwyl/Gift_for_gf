# Shunn Portfolio

- A one-page, modern personal portfolio built with React + Vite and Tailwind CSS. The site is fully responsive (mobile, tablet, desktop) and includes an admin panel to manage content stored in Firebase Firestore. Images are hosted on Cloudinary.

## Project goals
- Public-facing portfolio (Home, About, Skills, Projects, Contact) with smooth scrolling and polished UI.
- Admin panel for full CRUD over all sections and image uploads.

## Design
- One-page, section-based layout inspired by clean portfolio examples.
- Smooth animations via Framer Motion and a light/dark theme toggle.

## Features (high level)
- Responsive layout with mobile-first optimizations
- Animated hero, skills, and project cards
- Projects with image gallery and external resource links
- Contact section with admin-controlled "Why work with me" bullets
- Admin panel for managing content and uploading images

## Tech stack
- Frontend: React, Vite, Tailwind CSS
- Animations: Framer Motion
- Icons: react-icons / lucide-react
- Backend/services: Firebase Firestore (data), Firebase Auth (admin), Cloudinary (image hosting)

## Project structure (where to find things)
- Public pages/components: `src/components/public` and `src/pages/public`
- Admin pages: `src/pages/admin` (CRUD UIs for sections)
- Services: `src/services/firestore.js` (data helpers), `src/services/cloudinary.js` (image uploads)
