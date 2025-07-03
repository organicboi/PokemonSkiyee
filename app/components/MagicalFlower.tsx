import { useState, useEffect } from 'react';

interface MagicalFlowerProps {
  x: number;
  y: number;
  onBloom?: () => void;
}

export default function MagicalFlower({ x, y, onBloom }: MagicalFlowerProps) {
  const [isBlooomed, setIsBloomed] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isBlooomed) {
      // Generate sparkles around the flower
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60,
        delay: Math.random() * 1000
      }));
      setSparkles(newSparkles);
      
      if (onBloom) {
        onBloom();
      }
    }
  }, [isBlooomed, onBloom]);

  const handleClick = () => {
    setIsBloomed(true);
  };

  return (
    <div 
      className="absolute cursor-pointer transform transition-all duration-500"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={handleClick}
    >
      {/* Flower */}
      <div className={`relative transition-all duration-1000 ${isBlooomed ? 'scale-150' : 'scale-100'}`}>
        {/* Petals */}
        <div className="relative w-8 h-8">
          {/* Outer petals */}
          <div className={`absolute inset-0 transition-all duration-1000 ${isBlooomed ? 'scale-125 opacity-100' : 'scale-75 opacity-80'}`}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full rotate-0"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full rotate-45"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full rotate-90"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full rotate-135"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full rotate-180"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full rotate-225"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full rotate-270"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full rotate-315"></div>
          </div>
          
          {/* Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-300 rounded-full"></div>
        </div>
        
        {/* Sparkles */}
        {isBlooomed && sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-sparkle"
            style={{
              left: `${sparkle.x}px`,
              top: `${sparkle.y}px`,
              animationDelay: `${sparkle.delay}ms`
            }}
          >
            <div className="text-yellow-300 text-xs">✨</div>
          </div>
        ))}
        
        {/* Glow effect */}
        {isBlooomed && (
          <div className="absolute inset-0 rounded-full bg-pink-400/20 animate-ping"></div>
        )}
      </div>
    </div>
  );
} 