'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MagicalFlower from '../components/MagicalFlower';

export default function ApologyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [flowers, setFlowers] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [magicalFlowers, setMagicalFlowers] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mikuRevealed, setMikuRevealed] = useState(false);
  const [heartBeats, setHeartBeats] = useState(0);
  const [bloomedFlowers, setBloomedFlowers] = useState(0);

  const apologyMessage = `My dearest Skiyeeeee,

I know I didn't give you flowers when we met, and I can see the disappointment in your eyes. 

I want you to know that it wasn't because I didn't want to... I had planned something beautiful for you, but circumstances just didn't align that day.

Please forgive me for this moment of imperfection. 

I promise you, next time will be different. Next time, I'll give you not just flowers, but a surprise that's 100 times more beautiful, more meaningful, and more special than anything you could imagine.

You deserve all the beauty in the world, and I want to be the one to give it to you.

Will you forgive me?

With all my love and sincere apologies,
Your devoted admirer chimkandi❤️`;

  const steps = [
    "A message awaits you in the digital realm...",
    "Where hearts connect through pixels and dreams...",
    "Click the mysterious orb to begin your journey...",
    "Let Miku guide you through this heartfelt apology..."
  ];

  useEffect(() => {
    // Generate floating flowers
    const newFlowers = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5000
    }));
    setFlowers(newFlowers);

    // Generate magical clickable flowers
    const newMagicalFlowers = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70, // Keep away from edges
      y: 20 + Math.random() * 60
    }));
    setMagicalFlowers(newMagicalFlowers);

    // Start step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 2000);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  useEffect(() => {
    if (showMessage) {
      let index = 0;
      const typewriterInterval = setInterval(() => {
        if (index < apologyMessage.length) {
          setTypewriterText(apologyMessage.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typewriterInterval);
        }
      }, 50);

      return () => clearInterval(typewriterInterval);
    }
  }, [showMessage, apologyMessage]);

  const handleMysteriousOrbClick = () => {
    setMikuRevealed(true);
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  };

  const handleHeartClick = () => {
    setHeartBeats(prev => prev + 1);
  };

  const handleFlowerBloom = () => {
    setBloomedFlowers(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black relative overflow-hidden">
      {/* Floating Flowers Background */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute animate-float-up opacity-70"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            animationDelay: `${flower.delay}ms`,
            animationDuration: '15s'
          }}
        >
          <div className="text-pink-300 text-2xl transform rotate-12">🌸</div>
        </div>
      ))}

      {/* Magical Interactive Flowers */}
      {magicalFlowers.map((flower) => (
        <MagicalFlower
          key={flower.id}
          x={flower.x}
          y={flower.y}
          onBloom={handleFlowerBloom}
        />
      ))}

      {/* Mystical Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text mb-4">
            A Heartfelt Apology
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto rounded-full opacity-70"></div>
        </div>

        {/* Step-by-step Introduction */}
        {!mikuRevealed && (
          <div className="text-center mb-12 max-w-md">
            <div className="space-y-4">
              {steps.slice(0, currentStep + 1).map((step, index) => (
                <div
                  key={index}
                  className={`text-white/80 transition-all duration-1000 ${
                    index === currentStep ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            
            {bloomedFlowers > 0 && (
              <div className="mt-6 text-cyan-400 text-sm animate-fade-in">
                                 You&apos;ve awakened {bloomedFlowers} magical flower{bloomedFlowers > 1 ? 's' : ''}... 
                 {bloomedFlowers >= 3 ? ' The magic is growing stronger!' : ''}
              </div>
            )}
          </div>
        )}

        {/* Mysterious Orb / Miku */}
        <div className="relative mb-8">
          {!mikuRevealed ? (
            <div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 
                         cursor-pointer transform transition-all duration-500 hover:scale-110
                         shadow-2xl shadow-purple-500/50 animate-pulse"
              onClick={handleMysteriousOrbClick}
            >
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 
                            flex items-center justify-center">
                <div className="text-white text-2xl">✨</div>
              </div>
              <div className="absolute -inset-4 rounded-full border-2 border-pink-400/30 animate-ping"></div>
            </div>
          ) : (
            <div className="transform transition-all duration-1000 scale-100">
              <div className="relative">
                <div className="w-48 h-48 relative">
                  <Image
                    src="/images/homepage-bg/miku2.png"
                    alt="Hatsune Miku"
                    fill
                    className="object-contain animate-pulse"
                  />
                </div>
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-cyan-400/20 via-pink-400/20 to-purple-400/20 
                              animate-spin" style={{ animationDuration: '10s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Apology Message */}
        {showMessage && (
          <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-pink-400/30 
                         shadow-2xl shadow-pink-500/20">
            <div className="text-white/90 text-lg leading-relaxed whitespace-pre-line">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </div>
            
            {typewriterText.length >= apologyMessage.length && (
              <div className="mt-8 text-center space-y-4">
                <div
                  className="inline-block cursor-pointer transform transition-all duration-300 hover:scale-110"
                  onClick={handleHeartClick}
                >
                  <div className={`text-6xl ${heartBeats > 0 ? 'animate-bounce' : 'animate-pulse'}`}>
                    💖
                  </div>
                </div>
                
                {heartBeats > 0 && (
                  <div className="text-cyan-400 text-sm animate-fade-in">
                    Thank you for listening to my heart... {heartBeats} beat{heartBeats > 1 ? 's' : ''}
                  </div>
                )}
                
                <div className="flex justify-center space-x-4 mt-6">
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 
                             text-white font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 
                             hover:scale-105"
                  >
                    Return Home
                  </Link>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 
                             text-white font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 
                             hover:scale-105"
                  >
                    Experience Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Floating Hearts */}
        {showMessage && (
          <div className="fixed inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-up opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3000}ms`,
                  animationDuration: '12s'
                }}
              >
                <div className="text-pink-400 text-xl">💕</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation hint */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
} 