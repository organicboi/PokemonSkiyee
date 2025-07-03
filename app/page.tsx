'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pokemon from './components/Pokemon';
import Miku from './components/Miku';
import Mystery from './components/Mystery';
import Haunted from './components/Haunted';
import Message from './components/Message';
import HeartAnimation from './components/HeartAnimation';
import { pokemonData, mysteryData, hauntedData, personalMessage } from './data';

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [heartAnimation, setHeartAnimation] = useState(false);
  const [solvedMysteries, setSolvedMysteries] = useState(0);
  const [selectedTab, setSelectedTab] = useState('pokemon');
  const [pokemonRevealed, setPokemonRevealed] = useState<number[]>([]);
  
  const handlePokemonClick = (id: number, message: string = '') => {
    setCurrentMessage(message);
    setShowMessage(true);
    if (!pokemonRevealed.includes(id)) {
      setPokemonRevealed([...pokemonRevealed, id]);
    }
  };
  
  const handleMikuClick = () => {
    console.log("Heart animation toggled");
    setHeartAnimation(prev => !prev);
  };
  
  const handleMysteryComplete = (message: string) => {
    setSolvedMysteries(prev => prev + 1);
    setCurrentMessage(message);
    setShowMessage(true);
  };
  
  const allComplete = pokemonRevealed.length === pokemonData.length && solvedMysteries === mysteryData.length;
  
  const handleFinalMessage = () => {
    setCurrentMessage(personalMessage);
    setShowMessage(true);
    setHeartAnimation(true);
    setTimeout(() => setHeartAnimation(false), 10000);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 relative">
      {/* Navigation to Apology */}
      <div className="absolute top-4 right-4 z-20">
        <Link
          href="/apology"
          className="text-white/60 hover:text-pink-400 transition-colors duration-300 text-sm flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2"
        >
          <span>💌</span>
          <span>A Message</span>
        </Link>
      </div>
      
      {/* Background image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="/images/homepage-bg/pika.png" 
          alt="Pikachu Background" 
          fill
          className="object-contain opacity-10 lg:opacity-15"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <header className="flex flex-col items-center mb-8 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--pokemon-yellow)] to-[var(--miku-teal)] rounded-full opacity-70"></div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3 bg-gradient-to-r from-[var(--pokemon-yellow)] via-white to-[var(--miku-teal)] text-transparent bg-clip-text drop-shadow-sm">
            Reminiscence Haven
          </h1>
          <p className="text-sm md:text-base text-center text-white/80 px-4 max-w-md leading-relaxed">
            A little digital space for us to reconnect
          </p>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[var(--miku-teal)] to-[var(--pokemon-yellow)] rounded-full opacity-70"></div>
        </header>
        
        <nav className="grid grid-cols-3 gap-2 mb-6">
          <button 
            className={`py-2 rounded-full text-sm font-medium transition-colors
                       ${selectedTab === 'pokemon' 
                         ? 'bg-[var(--pokemon-yellow)] text-black' 
                         : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            onClick={() => setSelectedTab('pokemon')}
          >
            Pokémon
          </button>
          <button 
            className={`py-2 rounded-full text-sm font-medium transition-colors
                       ${selectedTab === 'mystery' 
                         ? 'bg-[var(--mystery-purple)] text-white' 
                         : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            onClick={() => setSelectedTab('mystery')}
          >
            Mysteries
          </button>
          <button 
            className={`py-2 rounded-full text-sm font-medium transition-colors
                       ${selectedTab === 'haunted' 
                         ? 'bg-[var(--scary-red)] text-white' 
                         : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            onClick={() => setSelectedTab('haunted')}
          >
            Spooky
          </button>
        </nav>
        
        <main className="flex-1">
          {selectedTab === 'pokemon' && (
            <div className="grid grid-cols-2 gap-4">
              {pokemonData.map(pokemon => (
                <Pokemon 
                  key={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  type={pokemon.type}
                  onClick={() => handlePokemonClick(pokemon.id, pokemon.message)}
                />
              ))}
              
              <div className="col-span-2 flex justify-center mt-4">
                <Miku onClick={handleMikuClick} />
              </div>
            </div>
          )}
          
          {selectedTab === 'mystery' && (
            <div className="grid grid-cols-1 gap-6">
              {mysteryData.map(mystery => (
                <Mystery 
                  key={mystery.id}
                  title={mystery.title}
                  hint={mystery.hint}
                  solution={mystery.solution}
                  image={mystery.image}
                  onSolve={() => handleMysteryComplete(mystery.message)}
                />
              ))}
            </div>
          )}
          
          {selectedTab === 'haunted' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hauntedData.map(item => (
                <Haunted 
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      
      {allComplete && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-30">
          <button 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--pokemon-yellow)] via-[var(--miku-teal)] to-[var(--accent)] text-black font-bold shadow-lg shadow-purple-500/20 animate-pulse"
            onClick={handleFinalMessage}
          >
            Open My Heart ❤️
          </button>
        </div>
      )}
      
      <Message 
        message={currentMessage}
        show={showMessage}
        onClose={() => setShowMessage(false)}
      />
      
      <HeartAnimation active={heartAnimation} />
    </div>
  );
}
