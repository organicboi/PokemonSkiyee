'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pokemon from './components/Pokemon';
import Miku from './components/Miku';
import Mystery from './components/Mystery';
import Haunted from './components/Haunted';
import Message from './components/Message';
import HeartAnimation from './components/HeartAnimation';
import { pokemonData, mysteryData, hauntedData, personalMessage } from './data';

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [heartAnimation, setHeartAnimation] = useState(false);
  const [solvedMysteries, setSolvedMysteries] = useState(0);
  const [selectedTab, setSelectedTab] = useState('pokemon');
  const [pokemonRevealed, setPokemonRevealed] = useState<number[]>([]);
  const [floatingParticles, setFloatingParticles] = useState<FloatingParticle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Generate floating particles
  useEffect(() => {
    const particles: FloatingParticle[] = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 3,
        duration: Math.random() * 8 + 8
      });
    }
    setFloatingParticles(particles);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
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

  const getTabIcon = (tab: string) => {
    switch(tab) {
      case 'pokemon': return '⚡';
      case 'mystery': return '🔮';
      case 'haunted': return '👻';
      default: return '✨';
    }
  };

  const getProgressPercentage = () => {
    const totalItems = pokemonData.length + mysteryData.length;
    const completedItems = pokemonRevealed.length + solvedMysteries;
    return (completedItems / totalItems) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${15 + mousePosition.x * 0.02}%`,
            top: `${5 + mousePosition.y * 0.02}%`,
          }}
        ></div>
        <div 
          className="absolute w-60 h-60 bg-gradient-to-r from-cyan-400/15 to-purple-400/15 rounded-full blur-2xl animate-pulse"
          style={{
            right: `${10 + mousePosition.x * 0.015}%`,
            bottom: `${15 + mousePosition.y * 0.015}%`,
          }}
        ></div>
        
        {/* Floating Particles */}
        {floatingParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-purple-400/20 rounded-full blur-sm animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Background Pokemon */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="/images/homepage-bg/pika.png" 
          alt="Pikachu Background" 
          fill
          className="object-contain opacity-5 lg:opacity-10"
          priority
        />
      </div>
      
      {/* Navigation Links */}
      <div className="absolute top-6 right-6 z-30 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Link
          href="/birthday"
          className="group flex items-center space-x-2 bg-black/20 backdrop-blur-xl rounded-2xl px-4 py-2 text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:bg-black/30 border border-cyan-500/20 hover:border-cyan-400/40 text-sm"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">🎂</span>
          <span className="font-medium">Birthday</span>
        </Link>
        <Link
          href="/apology"
          className="group flex items-center space-x-2 bg-black/20 backdrop-blur-xl rounded-2xl px-4 py-2 text-pink-300 hover:text-pink-100 transition-all duration-300 hover:bg-black/30 border border-pink-500/20 hover:border-pink-400/40 text-sm"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">💌</span>
          <span className="font-medium">Message</span>
        </Link>
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center pt-20 pb-8 sm:pt-24 sm:pb-12">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 animate-pulse">
              Reminiscence Haven
            </h1>
            <div className="absolute -top-2 -right-2 text-2xl sm:text-3xl animate-bounce">✨</div>
          </div>
          <p className="text-lg sm:text-xl text-purple-200/90 mb-6 font-light max-w-2xl mx-auto">
            A magical digital space where memories come alive
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-400/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-purple-200 text-sm font-medium">Journey Progress</span>
                <span className="text-purple-400 font-bold">{Math.round(getProgressPercentage())}%</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Navigation Tabs */}
        <nav className="flex justify-center mb-8">
          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-2 border border-purple-400/20">
            <div className="flex space-x-2">
              {[
                { key: 'pokemon', label: 'Pokémon', color: 'from-yellow-400 to-orange-400' },
                { key: 'mystery', label: 'Mysteries', color: 'from-purple-400 to-indigo-400' },
                { key: 'haunted', label: 'Spooky', color: 'from-red-400 to-pink-400' }
              ].map((tab) => (
                <button 
                  key={tab.key}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    selectedTab === tab.key 
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedTab(tab.key)}
                >
                  <span className="text-base">{getTabIcon(tab.key)}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 pb-20">
          <div className="max-w-6xl mx-auto">
            {selectedTab === 'pokemon' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {pokemonData.map(pokemon => (
                    <div key={pokemon.id} className="group">
                      <Pokemon 
                        name={pokemon.name}
                        image={pokemon.image}
                        type={pokemon.type}
                        onClick={() => handlePokemonClick(pokemon.id, pokemon.message)}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-teal-400/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative">
                      <Miku onClick={handleMikuClick} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'mystery' && (
              <div className="space-y-6">
                {mysteryData.map(mystery => (
                  <div key={mystery.id} className="group">
                    <Mystery 
                      title={mystery.title}
                      hint={mystery.hint}
                      solution={mystery.solution}
                      image={mystery.image}
                      onSolve={() => handleMysteryComplete(mystery.message)}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {selectedTab === 'haunted' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {hauntedData.map(item => (
                  <div key={item.id} className="group">
                    <Haunted 
                      title={item.title}
                      image={item.image}
                      description={item.description}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Final Message Button */}
      {allComplete && (
        <div className="fixed bottom-6 left-4 right-4 flex justify-center z-30">
          <button 
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg"
            onClick={handleFinalMessage}
          >
            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center space-x-2">
              <span>Open My Heart</span>
              <span className="text-xl animate-pulse">❤️</span>
            </span>
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
