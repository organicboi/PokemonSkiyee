import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HauntedProps {
  title: string;
  image: string;
  description: string;
  onClick?: () => void;
}

export default function Haunted({ title, image, description, onClick }: HauntedProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Random glitch effect
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (onClick) onClick();
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 
                ${isGlitching ? 'glitch' : ''}`}
      style={{ 
        perspective: '1000px', 
        transformStyle: 'preserve-3d',
        height: '100%',
        minHeight: '220px'
      }}
    >
      {/* Card Front */}
      <div 
        className={`absolute inset-0 backface-hidden w-full h-full transition-all duration-500
                 ${isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'}`}
        onClick={handleClick}
      >
        <div className="relative w-full h-full">
          <Image 
            src={image} 
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            priority
            className={`object-cover transition-all duration-300 ${isGlitching ? 'scale-105 hue-rotate-15' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <div className="flex items-center">
              <div className="mr-2 w-6 h-6 rounded-full bg-[var(--scary-red)] flex items-center justify-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="text-sm opacity-90">Tap to reveal</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Back */}
      <div 
        className={`absolute inset-0 backface-hidden w-full h-full bg-black/95 transition-all duration-500
                 ${isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'}`}
      >
        <div className="flex flex-col items-center justify-center h-full p-5">
          <div className="w-16 h-1 bg-[var(--scary-red)] rounded-full mb-4 opacity-70"></div>
          <p className="text-base text-white/90 italic text-center mb-6 leading-relaxed transform scale-x-[-1]">{description}</p>
          <button 
            className="px-5 py-2 rounded-full bg-[var(--scary-red)] text-white text-sm font-medium
                     shadow-lg shadow-[var(--scary-red)]/30 hover:bg-[var(--scary-red)]/80 transition-colors transform scale-x-[-1]"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
      
      {/* Glitch Effect Overlay */}
      {isGlitching && (
        <div className="absolute inset-0 bg-[var(--scary-red)] opacity-10 z-10 pointer-events-none"></div>
      )}
      
      {/* Tap Hint for Mobile */}
      {!isFlipped && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md 
                      flex items-center justify-center z-10 animate-pulse pointer-events-none">
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg> */}
        </div>
      )}
    </div>
  );
} 