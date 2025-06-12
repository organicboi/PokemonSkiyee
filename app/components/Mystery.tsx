import { useState } from 'react';
import Image from 'next/image';

interface MysteryProps {
  title: string;
  hint: string;
  solution: string;
  image: string;
  onSolve?: () => void;
}

export default function Mystery({ title, hint, solution, image, onSolve }: MysteryProps) {
  const [guess, setGuess] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toLowerCase().trim() === solution.toLowerCase().trim()) {
      setIsRevealed(true);
      if (onSolve) onSolve();
    } else {
      setIsIncorrect(true);
      setShowHint(true);
      setTimeout(() => setIsIncorrect(false), 800);
    }
  };

  return (
    <div className="relative rounded-xl p-5 flex flex-col items-center bg-gradient-to-br from-[var(--mystery-purple)]/30 to-[var(--mystery-purple)]/10 
                backdrop-blur-md border border-white/20 shadow-lg shadow-[var(--mystery-purple)]/20
                transform transition-all duration-300 hover:shadow-[var(--mystery-purple)]/30">
      <div className={`w-full aspect-[3/2] relative mb-4 overflow-hidden rounded-xl ${isRevealed ? '' : 'filter blur-sm'}`}>
        <Image 
          src={image} 
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-all duration-500 hover:scale-105"
        />
        
        {!isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <span className="text-5xl font-bold text-white/80 glowing">?</span>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-white">{title}</h3>
      
      {!isRevealed ? (
        <form onSubmit={handleSubmit} className="mt-3 w-full">
          <div className={`relative transition-all duration-300 ${isIncorrect ? 'glitch' : ''}`}>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 rounded-lg border border-white/30 text-white 
                      placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--mystery-purple)]
                      transition-all duration-300"
              placeholder="Solve the mystery..."
            />
          </div>
          
          {showHint && (
            <div className="mt-3 p-3 text-sm text-white/90 bg-[var(--mystery-purple)]/20 rounded-lg border border-[var(--mystery-purple)]/30">
              <span className="font-semibold">Hint:</span> {hint}
            </div>
          )}
          
          <div className="flex space-x-3 mt-4">
            <button 
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[var(--mystery-purple)] to-[var(--accent)] 
                        text-white font-medium shadow-md shadow-[var(--accent)]/20 
                        hover:shadow-lg hover:shadow-[var(--accent)]/30 hover:translate-y-[-2px]
                        active:translate-y-[1px] transition-all duration-300"
            >
              Solve Mystery
            </button>
            
            <button 
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20
                        transition-all duration-300 text-sm font-medium"
            >
              {showHint ? 'Hide Hint' : 'Get Hint'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-4 text-center bg-[var(--mystery-purple)]/20 p-4 rounded-lg border border-[var(--mystery-purple)]/30 w-full">
          <p className="text-lg font-medium text-white">Mystery solved! 🎉</p>
          <p className="text-md mt-2 italic text-white/80">{solution}</p>
        </div>
      )}
    </div>
  );
} 