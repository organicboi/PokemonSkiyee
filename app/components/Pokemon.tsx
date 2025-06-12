import { useState } from 'react';
import Image from 'next/image';

interface PokemonProps {
  name: string;
  image: string;
  type: string;
  onClick?: () => void;
}

export default function Pokemon({ name, image, type, onClick }: PokemonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const typeColors = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    psychic: 'bg-pink-400',
    ghost: 'bg-purple-600',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-300',
    default: 'bg-gray-400',
  };
  
  const bgColor = typeColors[type as keyof typeof typeColors] || typeColors.default;

  return (
    <div 
      className={`relative rounded-xl p-4 flex flex-col items-center ${bgColor} bg-opacity-20 backdrop-blur-sm
                border border-white/10 transform transition-all duration-300 cursor-pointer
                ${isHovered ? 'scale-105 shadow-lg shadow-white/10' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="floating glowing w-20 h-20 relative mb-2">
        <Image 
          src={image} 
          alt={name} 
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      
      <h3 className="text-lg font-bold capitalize">{name}</h3>
      <span className="text-sm capitalize opacity-80">{type}</span>
      
      {isHovered && (
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
      )}
    </div>
  );
} 