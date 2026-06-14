import React from 'react';

interface CroissantLogoProps {
  className?: string;
  size?: string | number;
}

export default function CroissantLogo({ className = '', size = '100%' }: CroissantLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Luxurious Multi-stop Golden Radial & Linear Gradients for the Shio-pan */}
        <linearGradient id="gold-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="25%" stopColor="#F5D061" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="85%" stopColor="#AA7C11" />
          <stop offset="100%" stopColor="#8A5E00" />
        </linearGradient>
        
        <linearGradient id="gold-fill-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.06} />
          <stop offset="50%" stopColor="#F5D061" stopOpacity={0.12} />
          <stop offset="100%" stopColor="#FFF4D0" stopOpacity={0.03} />
        </linearGradient>
      </defs>

      {/* Background shape subtle glow */}
      <path
        d="M15,55 C12,45 22,25 40,20 C55,16 75,22 83,38 C90,52 82,62 75,65 C64,70 34,70 15,55 Z"
        fill="url(#gold-fill-grad)"
        className="transition-all duration-700"
      />

      {/* The curved golden segments of the artisanal salt butter roll (Shio pan / Croissant) */}
      <g stroke="url(#gold-line-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-95">
        
        {/* Core Center Segment (Segment 1 - central fat ring) */}
        <path d="M43.5 19.5 C48 16.5, 52 16.5, 56.5 19.5 C61.5 23, 61 38, 56 46.5 C51.5 54, 48.5 54, 44 46.5 C39 38, 38.5 23, 43.5 19.5 Z" />
        
        {/* Curved inner folds for center texture */}
        <path d="M48 21.5 C50.5 20, 52 20, 54.5 21.5" strokeWidth="1.6" />
        <path d="M46 32 C50 30, 52 30, 56 32" strokeWidth="1.6" />
        <path d="M45.5 41.5 C48.5 40.5, 51.5 40.5, 54.5 41.5" strokeWidth="1.6" />

        {/* Right Inner Segment (Segment 2 - wrapped layer) */}
        <path d="M56.5 20 C60.2 18, 64 21, 66.5 26.5 C69.5 33, 67.5 42, 63 46 C60 48.5, 57.5 48, 55 44" />
        <path d="M60.5 27 C62.5 26, 64 27.5, 65 31" strokeWidth="1.5" />
        <path d="M59 37 C61.5 36.5, 62.5 37.5, 63.5 41" strokeWidth="1.5" />

        {/* Left Inner Segment (Segment 3 - wrapped layer) */}
        <path d="M43.5 20 C39.8 18, 36 21, 33.5 26.5 C30.5 33, 32.5 42, 37 46 C40 48.5, 42.5 48, 45 44" />
        <path d="M39.5 27 C37.5 26, 36 27.5, 35 31" strokeWidth="1.5" />
        <path d="M41 37 C38.5 36.5, 37.5 37.5, 36.5 41" strokeWidth="1.5" />

        {/* Right Outer Segment (Segment 4) */}
        <path d="M66.5 26.5 C70 26, 73.5 29, 74.5 35.5 C75.5 42, 72.5 48, 68 49.5 C65.5 50.5, 63.5 49, 62 46.5" />
        
        {/* Left Outer Segment (Segment 5) */}
        <path d="M33.5 26.5 C30 26, 26.5 29, 25.5 35.5 C24.5 42, 27.5 48, 32 49.5 C34.5 50.5, 36.5 49, 38 46.5" />

        {/* Right Crescent Tip (Segment 6) */}
        <path d="M74.5 35.5 C78 37, 80.5 41.5, 79.5 47 C78.5 52.5, 73.5 55 70 52.5 C68 51, 67.5 49, 67.5 47.5" />

        {/* Left Crescent Tip (Segment 7) */}
        <path d="M25.5 35.5 C22 37, 19.5 41.5, 20.5 47 C21.5 52.5, 26.5 55, 30 52.5 C32 51, 32.5 49, 32.5 47.5" />

        {/* Tail wrap accent (connecting endpoints) */}
        <path d="M30 52.5 M70 52.5" />
      </g>

      {/* Decorative stars / 5:00 AM celestial morning sparkle from the logo */}
      <g fill="url(#gold-line-grad)" className="opacity-90">
        {/* Classic celestial 4-point star on the top right */}
        <path d="M 83,23 Q 83,27 87,27 Q 83,27 83,31 Q 83,27 79,27 Q 83,27 83,23 Z" />
        
        {/* Small soft sparkle on the left */}
        <circle cx="16" cy="36" r="1.5" />
        <circle cx="13" cy="45" r="0.8" />
        
        {/* Flaky gourmet sea salt crystal details representing "鹽之花頌歌" */}
        <rect x="48" y="58" width="2" height="2" transform="rotate(25 48 58)" rx="0.5" />
        <rect x="36" y="56" width="1.5" height="1.5" transform="rotate(15 36 56)" rx="0.3" />
        <rect x="62" y="55" width="2.2" height="2.2" transform="rotate(45 62 55)" rx="0.5" />
        <rect x="53" y="62" width="1.8" height="1.8" transform="rotate(10 53 62)" rx="0.4" />
      </g>
    </svg>
  );
}
