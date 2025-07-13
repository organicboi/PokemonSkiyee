import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BirthdayMikuProps {
  isSpecialDay?: boolean;
  onSpecialClick?: () => void;
}

export default function BirthdayMiku({ isSpecialDay = false, onSpecialClick }: BirthdayMikuProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (isSpecialDay) {
      // Generate confetti for birthday
      const newConfetti = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#39c5bb', '#ff2a6d', '#ffcc00', '#9370db'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 2000
      }));
      setConfetti(newConfetti);
    }
  }, [isSpecialDay]);

  const handleClick = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 3000);
    if (onSpecialClick) onSpecialClick();
  };

  return (
    <div className="relative">
      {/* Confetti for birthday */}
      {isSpecialDay && confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-birthday-confetti pointer-events-none"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            animationDelay: `${piece.delay}ms`,
            color: piece.color
          }}
        >
          🎉
        </div>
      ))}

      {/* Main Miku Container */}
      <div 
        className={`relative rounded-2xl p-6 flex flex-col items-center cursor-pointer transition-all duration-500
                  ${isSpecialDay 
                    ? 'bg-gradient-to-br from-[var(--miku-teal)]/30 to-[var(--accent)]/20 animate-birthday-glow' 
                    : 'bg-[var(--miku-teal)]/20 hover:bg-[var(--miku-teal)]/30'
                  }
                  backdrop-blur-sm border border-[var(--miku-teal)]/30
                  ${isHovered ? 'scale-105' : ''}
                  ${isSpecialDay ? 'animate-birthday-bounce' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Miku Image */}
        <div className={`w-32 h-40 relative mb-4 ${isSpecialDay ? 'dancing animate-birthday-sparkle' : isHovered ? 'glowing' : 'floating'}`}>
          <Image 
            src="/images/homepage-bg/miku2.png" 
            alt="Birthday Miku" 
            fill
            className="object-contain"
            priority
          />
          
          {/* Special birthday crown */}
          {isSpecialDay && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-2xl animate-birthday-sparkle">
              👑
            </div>
          )}
        </div>
        
        {/* Miku Info */}
        <div className="text-center">
          <h3 className={`text-xl font-bold ${isSpecialDay ? 'text-[var(--pokemon-yellow)] animate-birthday-sparkle' : 'text-[var(--miku-teal)]'}`}>
            {isSpecialDay ? 'Birthday Princess Miku' : 'Hatsune Miku'}
          </h3>
          <span className="text-sm opacity-80 text-white/70">
            {isSpecialDay ? 'Birthday Celebration Singer' : 'Virtual Singer'}
          </span>
        </div>
        
        {/* Status Indicators */}
        <div className="mt-3 flex space-x-2">
          {[1, 2, 3].map((i) => (
            <span 
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300
                        ${isSpecialDay 
                          ? 'bg-[var(--pokemon-yellow)] animate-birthday-sparkle' 
                          : isHovered 
                            ? 'bg-[var(--miku-teal)]' 
                            : 'bg-white/50'
                        }`}
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
        
        {/* Special birthday message */}
        {isSpecialDay && (
          <div className="mt-4 text-center">
            <div className="text-xs text-[var(--pokemon-yellow)] font-medium animate-pulse">
              🎂 It&apos;s Birthday Time! 🎂
            </div>
          </div>
        )}
        
        {/* Click indicator */}
        <div className="mt-2 text-xs opacity-60 text-center">
          {isSpecialDay ? "Click for birthday magic!" : "Click to interact"}
        </div>
      </div>
      
      {/* Floating Hearts */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${20 + (i * 10)}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            >
              <div className="text-pink-400 text-lg animate-heart-beat">💖</div>
            </div>
          ))}
        </div>
      )}
      
      {/* Special glow effect for birthday */}
      {isSpecialDay && (
        <div className="absolute inset-0 rounded-2xl border-2 border-[var(--pokemon-yellow)]/50 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
} 