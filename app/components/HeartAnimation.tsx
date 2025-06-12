import { useState, useEffect } from 'react';

interface HeartAnimationProps {
  active: boolean;
}

type EmojiParticle = {
  id: number;
  left: string;
  speed: number;
  size: number;
  emoji: string;
  rotate: number;
};

const MUSIC_EMOJIS = ['❤️', '🎵', '🎶', '🎸', '🎤', '✨', '🎧', '💖', '💫', '🌟', '💕', '💓', '💞', '🎹', '🥁', '🎺'];

export default function HeartAnimation({ active }: HeartAnimationProps) {
  const [particles, setParticles] = useState<EmojiParticle[]>([]);
  
  useEffect(() => {
    console.log("HeartAnimation active state changed:", active);
    
    if (!active) {
      console.log("Clearing particles");
      setParticles([]);
      return;
    }
    
    console.log("Starting particle generation");
    const interval = setInterval(() => {
      // Get random emoji from the array
      const randomEmoji = MUSIC_EMOJIS[Math.floor(Math.random() * MUSIC_EMOJIS.length)];
      
      const newParticle = {
        id: Date.now() + Math.random(),
        left: `${Math.random() * 100}%`,
        speed: 2 + Math.random() * 3, // Faster animation
        size: 15 + Math.random() * 30,
        emoji: randomEmoji,
        rotate: Math.random() * 360
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Clean up old particles after some time
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 5000);
    }, 150); // Even faster generation of particles
    
    return () => {
      console.log("Cleaning up particle generation");
      clearInterval(interval);
    };
  }, [active]);
  
  if (!active || particles.length === 0) {
    console.log("Not rendering particles:", { active, particleCount: particles.length });
    return null;
  }
  
  console.log("Rendering particles:", particles.length);
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="absolute bottom-0 animate-float-up"
          style={{ 
            left: particle.left, 
            fontSize: `${particle.size}px`,
            animationDuration: `${particle.speed}s`,
            opacity: 0.9,
            transform: `rotate(${particle.rotate}deg)`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
} 