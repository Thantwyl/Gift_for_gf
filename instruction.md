# Portfolio Development Instructions

## 1. Project Goal
Develop a personal portfolio website with both:
- User-side (public portfolio)
- Admin panel (for content management)

The system must support full CRUD operations for all portfolio sections.

## 2. Design Concept
- One-page scroll-based layout
- Inspired by:
  - https://kyawmyokhant.com/
  - https://heinthuyawin-portfolio.vercel.app/
  - https://thantwyl-portfolio.vercel.app/

- Smooth scrolling between sections
- Clean, modern, and professional UI

## 3. Technology Stack

### Frontend
- React.js (User Side)
- React.js (Admin Panel)
- Tailwind CSS (Responsive design)

### Backend / Services
- Firebase (Firestore for database)
- Firebase (Authentication for admin panel)
- Cloudinary (Image hosting)

### Configuration
- Use .env file to store:
- Firebase config
- Cloudinary credentials

### Deployment
- Vercel (Frontend hosting)

## 4. Portfolio Sections (User Side)

### 4.1 Home Section
- Profile image
- Name / Title
- Short introduction

### 4.2 About Section
- Personal information
- Educational background

### 4.3 Skills Section
- List of skills

### 4.4 Projects Section
Each project should include:
- Title
- Description
- Images (from Cloudinary)
- Optional links (GitHub / Live Demo)

### 4.5 Contact Section
- Email
- Phone
- Social media links
- Optional contact form

## 5. Admin Panel Features

Admin must be able to manage all sections:

### 5.1 Home Management
- Update profile image
- Edit name, title, introduction

### 5.2 About Management
- Edit personal info
- Update education

### 5.3 Skills Management
- Add skill
- Edit skill
- Delete skill

### 5.4 Projects Management
- Add project
- Upload images (Cloudinary)
- Edit project
- Delete project

### 5.5 Contact Management
- Update contact details

## 6. Data Flow

- Store all data in Firebase Firestore
- Store images in Cloudinary
- Save image URLs in Firestore
- Admin panel performs CRUD operations directly with Firebase

## 7. UI/UX Requirements

- Fully responsive:
  - Mobile
  - Tablet
  - Desktop

- Use Tailwind CSS for styling
- Smooth scrolling navigation
- Section-based layout

## 8. Environment Setup

Create .env file with:
- Firebase configuration
- Cloudinary API keys

Ensure .env is:
- Not pushed to GitHub
- Configured in Vercel during deployment

## 9. Deployment

- Deploy project on Vercel
- Configure environment variables in Vercel dashboard

## 10. Development Plan

Build step-by-step:

1. Setup project structure
2. Configure Firebase & Cloudinary
3. Build User Side:
   - Home
   - About
   - Skills
   - Projects
   - Contact
4. Build Admin Panel (CRUD for all sections)
5. Connect frontend with Firebase
6. Final testing
7. Deploy to Vercel

When development starts, follow a section-by-section approach and implement features incrementally.
