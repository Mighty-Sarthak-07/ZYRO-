# Zyro Energy

This is a premium scrollytelling product website for a beverage brand called Zyro Energy. The site showcases four distinct drinks using cinematic animations and seamless transitions. 

Inspired by high-end product pages and modern advertising, the core focus here is on storytelling, high-fidelity visuals, and smooth user interaction.

## Features

* Scroll-based canvas animation using image sequence rendering
* Four drink variants: Masala Cola, Berry Blast, Blue Bolt, and Jeera Soda
* Smooth switching between drinks without page reloads
* Dynamic background gradients that adapt to the selected product
* Navbar product switcher
* Bottom pill navigation selector
* Smooth animations using Framer Motion
* Responsive design across all devices
* High-performance optimized rendering

## Tech Stack

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* HTML5 Canvas

## Folder Structure

* `/app` - Next.js App Router pages and layouts
* `/components` - Reusable UI components and animated elements
* `/data` - Product information and configuration
* `/public` - Static assets and animation frames

The animation relies on image sequences. The product frames are stored in these directories:

* `/public/zyrocan`
* `/public/zyropurple`
* `/public/zyroblue`
* `/public/zyrogreen`

Each folder contains 120 `.webp` frames that the canvas uses to render the sequence.

## Setup Instructions

1. Clone the repository
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build the project for production:
   ```bash
   npm run build
   ```
5. Export static files if needed

## How It Works

The core of the experience is built around scroll-based interactions. As the user scrolls, the scroll progress directly controls the current frame of the animation sequence. The HTML5 Canvas dynamically renders these images to give the illusion of a 3D object moving through space.

When a user switches products, the application updates the global state, swaps the active image sequence, and reloads the animation seamlessly. Framer Motion handles the enter and exit animations for UI elements.

## Customization

* **Add a new drink:** Define a new product object in the data folder and provide the corresponding image sequence in the public directory.
* **Colors and gradients:** Update the Tailwind configuration or the product data file to change the background gradients that map to specific drinks.
* **Replace animations:** Swap out the 120 `.webp` frames in any of the public folders to change the 3D sequence.

## Performance Notes

To ensure a smooth 60fps scrolling experience, the site uses `requestAnimationFrame` for rendering updates. It also preloads the image frames sequence so there is no flickering or loading delay during the scroll interaction.

## Author

This project was built as a creative frontend experiment to combine scroll animation with product storytelling.
