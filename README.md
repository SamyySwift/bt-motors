# 🚗 BT Motors

A premium luxury car dealership website showcasing high-end vehicles with stunning animations and modern design.

![BT Motors](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.0.0-ff0055)

## ✨ Features

### 🎯 Core Features
- **Automatic Hero Carousel** - Rotating luxury car showcase with smooth transitions
- **Character-by-Character Text Reveal** - Scroll-based opacity animations on legacy section
- **Interactive Car Inventory** - Filterable collection with detailed vehicle modals
- **Service Pages** - Comprehensive automotive services and repair solutions
- **Custom Cursor** - Magnetic hover effects and interactive elements
- **Smooth Scrolling** - Lenis smooth scroll integration
- **Responsive Design** - Mobile-first approach with adaptive layouts

### 🎨 Design Highlights
- **Brand Colors** - Custom BT blue (#1DB9E5) accent throughout
- **Premium Typography** - Geist Sans & Syne font combination
- **Glass Morphism** - Modern backdrop blur effects
- **Micro-interactions** - Magnetic buttons and hover animations
- **Parallax Effects** - GSAP-powered scroll animations

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing

### Styling & Animation
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - React animation library
- **GSAP** - Advanced animations
- **Lenis** - Smooth scroll

### Tools & Libraries
- **Lucide React** - Icon system
- **Split Type** - Text splitting for animations
- **Class Variance Authority** - Component variants

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/SamyySwift/bt-motors.git

# Navigate to project directory
cd bt-motors

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
bt-motors/
├── public/
│   └── logo.png              # BT Motors logo
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx  # Custom cursor component
│   │   ├── LenisProvider.tsx # Smooth scroll provider
│   │   ├── MagneticButton.tsx # Magnetic hover effect
│   │   ├── Navbar.tsx        # Navigation bar
│   │   └── SectionHeading.tsx # Reusable heading
│   ├── pages/
│   │   ├── LandingPage.tsx   # Home page with carousel
│   │   ├── InventoryPage.tsx # Car inventory
│   │   ├── ServicesPage.tsx  # Services offered
│   │   ├── RepairPage.tsx    # Repair services
│   │   ├── AboutPage.tsx     # About company
│   │   └── InquiryPage.tsx   # Contact form
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript config
└── vite.config.ts            # Vite configuration
```

## 🎨 Custom Theme

The project uses a custom color palette centered around BT blue:

```css
--color-bt-blue: #1DB9E5;
--color-bt-blue-dark: #1696C1;
--color-apple-black: #1d1d1f;
--color-silver: #86868b;
--color-soft-gray: #f5f5f7;
```

## 🌟 Key Pages

### Landing Page
- Hero carousel with 5 luxury cars
- Legacy section with scroll-reveal text
- Horizontal car lineup
- Service showcase
- CTA sections

### Inventory Page
- Filterable car grid by brand
- Modal details for each vehicle
- Specifications display
- Inquiry integration

### Services & Repair
- Interactive service cards
- Pricing tiers
- Visual hotspot diagrams
- Service scheduling

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Tailwind Theme Extension
Custom fonts, colors, and utilities are configured in `tailwind.config.js` and `src/index.css` using the `@theme` directive.

### Environment
The project uses Vite's built-in environment handling. No `.env` file is currently required.

## 🎯 Features Implementation

### Auto Carousel
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentCarIndex((prev) => (prev + 1) % inventory.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);
```

### Character Reveal Animation
```typescript
const CharacterReveal = ({ text }: { text: string }) => {
  const characters = text.split("");
  return characters.map((char, index) => {
    const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
    return <motion.span style={{ opacity }}>{char}</motion.span>;
  });
};
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**SamyySwift**
- GitHub: [@SamyySwift](https://github.com/SamyySwift)

## 🙏 Acknowledgments

- Design inspiration from Apple and premium automotive brands
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Geist](https://vercel.com/font) and Google Fonts
- Images from [Unsplash](https://unsplash.com/)

---

<div align="center">
  <strong>Built with ❤️ for automotive excellence</strong>
  <br>
  <sub>BT Motors - Where Engineering Meets Art</sub>
</div>
