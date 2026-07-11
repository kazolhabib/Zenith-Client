# Zenith Client

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-latest-orange.svg)](https://vitejs.dev/)

Zenith Client is the premium, state-of-the-art frontend application for the **Zenith Luxury Accommodation & Membership Ecosystem**. Crafted with modern design philosophies, it features glassmorphism, responsive bento layouts, vibrant dark themes, and smooth transition animations to deliver a true luxury booking experience.

---

## ✨ Key Features

### 🌟 Immersive Luxury UI/UX
- **Modern Design**: Dark-themed user interfaces utilizing glassmorphism, clean layouts, and customized typography.
- **Dynamic Animations**: Smooth interactive motion powered by `framer-motion` for transitions, modals, and lists.
- **Micro-interactions**: Responsive hover effects, ratings, and state changes for buttons and cards.

### 🏢 Property Exploration & Details
- **Interactive Explore**: Browse luxury villas and lofts with dynamic sorting, filtering, and availability dates.
- **Detailed Carousel Views**: Immersive view of multiple property images, room specs (guests, bedrooms, beds, baths), and detailed host insights.

### 💳 Elite Membership & Stripe Payments
- **VIP Pricing Tiers**: Select and unlock elite tiers (**Silver Club** and **Gold VIP**) to gain access to exclusive privileges.
- **Stripe Checkout**: Direct redirect to secure Stripe-hosted checkout pages to process subscription memberships.
- **Verification Pages**: Dedicated success and cancellation routes that dynamically verify payments and instantly upgrade user profiles in the application state.

### 📊 Bento-Style Dashboard
- **Personalized Stats**: Interactive graphs (`recharts`) showcasing travel history, active bookings, and total spent.
- **Inline Editing (React Portals)**: Modify listings seamlessly with an overlay modal that prevents page transitions and handles dynamic image gallery links.
- **Reservations & Bookings**: Real-time status tags ('Pending', 'Confirmed', 'Rejected') with automatic total spent adjustments and refund tracking.

---

## 🛠️ Technology Stack

- **Core**: React 19, TypeScript
- **Bundler**: Vite
- **Styling**: Vanilla TailwindCSS with Custom CSS variables for luxury gradients (`#f65600` brand color)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts (Responsive Area and Bar Charts)
- **Portal Rendering**: React Portals (`createPortal` for clean modal mounting)
- **HTTP Client**: Axios (configured with intercepts for token authorization)

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### 🔧 Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd typescript-projects
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 📂 Project Structure

```
src/
├── assets/         # Images, logo assets
├── components/     # Reusable layout and page sub-components (Navbar, Pricing, UserStats, etc.)
├── config/         # API setup (axios client)
├── context/        # Global Auth and State Providers
├── data/           # Static data and mock fallback lists
├── pages/          # Complete page components (Home, Explore, Dashboard, PaymentSuccess)
└── App.tsx         # Main router and route definitions
```