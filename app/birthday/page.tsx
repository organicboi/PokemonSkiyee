'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import BirthdayMiku from '../components/BirthdayMiku';

interface DailySurprise {
  id: number;
  date: string; // YYYY-MM-DD format
  title: string;
  message: string;
  emoji: string;
  type: 'love' | 'memory' | 'song' | 'gift' | 'poem' | 'dream';
  unlocked: boolean;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function BirthdayPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0
  });
  
  const [surprises, setSurprises] = useState<DailySurprise[]>([]);
  const [selectedSurprise, setSelectedSurprise] = useState<DailySurprise | null>(null);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [heartParticles, setHeartParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [floatingParticles, setFloatingParticles] = useState<FloatingParticle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Birthday target date using useMemo to prevent re-creation
  const birthdayDate = useMemo(() => {
    const date = new Date();
    date.setMonth(6); // July (0-indexed)
    date.setDate(26); // 26th day
    date.setHours(0, 0, 0, 0); // Midnight
    return date;
  }, []);

  // Helper function to get current date info
  const getCurrentDateInfo = useCallback(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed
    const currentDay = now.getDate();
    
    return {
      now,
      year: currentYear,
      month: currentMonth,
      day: currentDay,
      isJuly: currentMonth === 6, // July is month 6 (0-indexed)
      dateString: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`
    };
  }, []);

  // Generate floating particles
  const generateFloatingParticles = useCallback(() => {
    const particles: FloatingParticle[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10
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

  // Generate 12 days of surprises starting from July 14th using proper Date constructor
  const generateSurprises = useCallback((): DailySurprise[] => {
    const currentYear = new Date().getFullYear();
    const surpriseData = [
              { title: "Digital Love Letter", message: "My dearest Skiyeee, today begins our magical countdown! Every pixel of my heart beats for you. Like Miku&apos;s voice echoing through the digital realm, my love for you resonates endlessly. This is just the beginning of something beautiful! 💕", emoji: "💌", type: "love" as const },
      { title: "Memory Garden", message: "Do you remember our first conversation? It was like discovering a rare shiny Pokémon - unexpected, magical, and life-changing. Your words painted colors in my grayscale world, just like Miku&apos;s melodies bring life to silence. 🌺", emoji: "🌸", type: "memory" as const },
      { title: "Miku&apos;s Serenade", message: "🎵 &apos;In the digital sky where data flows like dreams, your love is the sweetest algorithm my heart has ever seen. Every day brings us closer to your special celebration!&apos; - A song composed just for you by Hatsune Miku herself! 🎵", emoji: "🎤", type: "song" as const },
      { title: "Virtual Bouquet", message: "Since I couldn&apos;t give you flowers that day, here&apos;s an eternal digital bouquet that will never wilt! Each bloom represents a moment I cherish with you. They&apos;re programmed to grow more beautiful each day, just like our connection! 🌹", emoji: "💐", type: "gift" as const },
      { title: "Poem of the Heart", message: "In circuits of light and streams of code,\nYour smile is the path my heart has showed.\nLike Miku dancing in neon dreams,\nYou&apos;re more wonderful than anything seems.\n\nEach day until your birthday bright,\nI&apos;ll love you more with all my might! ✨", emoji: "📜", type: "poem" as const },
      { title: "Digital Embrace", message: "Sending you the warmest virtual hug that transcends dimensions! Imagine Miku&apos;s gentle melody wrapping around you like a soft blanket. Even across the digital divide, my arms are always around you, my heart always with you. 🤗", emoji: "🫂", type: "love" as const },
      { title: "Halfway Magic", message: "We&apos;re halfway through our journey! Can you feel the excitement building? It&apos;s like the anticipation before Miku&apos;s biggest concert, but a thousand times more special because it&apos;s all for YOU! The best is yet to come! ⭐", emoji: "🎊", type: "memory" as const },
      { title: "Lullaby of Love", message: "🎶 Let me sing you a digital lullaby tonight. Close your eyes and imagine Miku&apos;s voice harmonizing with mine, creating a symphony of love that plays just for you. Sweet dreams, my birthday princess! 🎶", emoji: "🌙", type: "song" as const },
      { title: "Future Visions", message: "I dream of all the birthdays we&apos;ll celebrate together - each one more magical than the last! In my dreams, we&apos;re dancing with Miku in a world where love creates its own reality. This is just the beginning of our forever! 🌟", emoji: "🔮", type: "dream" as const },
      { title: "Almost There!", message: "The excitement is almost unbearable! Like waiting for the drop in your favorite song, the anticipation is building to something incredible! Tomorrow we&apos;ll be even closer to your special day! 🚀", emoji: "⚡", type: "love" as const },
      { title: "Final Countdown", message: "This is it - the final day before your birthday! My heart is racing faster than Miku&apos;s most energetic beat! Tonight, dream of all the wonderful surprises waiting for you tomorrow! 🎂", emoji: "🎁", type: "gift" as const },
      { title: "Birthday Eve", message: "Tomorrow is THE day! I can barely contain my excitement! Like Miku preparing for the performance of a lifetime, everything is ready for your special celebration! Sweet dreams, birthday girl - tomorrow we celebrate YOU! 🎉", emoji: "🌟", type: "dream" as const }
    ];

    return surpriseData.map((data, index) => {
      // Create date for each day using proper Date constructor
      const date = new Date(currentYear, 6, 14 + index); // July 14 + index, current year
      
      return {
        id: index + 1,
        date: date.toISOString().split('T')[0],
        title: data.title,
        message: data.message,
        emoji: data.emoji,
        type: data.type,
        unlocked: false
      };
    });
  }, []);

  // Calculate countdown and current day using proper JavaScript Date functions
  const updateCountdown = useCallback(() => {
    const dateInfo = getCurrentDateInfo();
    const { now } = dateInfo;
    const currentYear = now.getFullYear();
    
    // Ensure birthday date is set to the current year
    birthdayDate.setFullYear(currentYear);
    
    // If today is after July 26th, set birthday to next year
    if (now > birthdayDate) {
      birthdayDate.setFullYear(currentYear + 1);
    }
    
    // Calculate countdown to birthday
    const difference = birthdayDate.getTime() - now.getTime();
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const totalSeconds = Math.floor(difference / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds, totalSeconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });
    }

    // Calculate current day using JavaScript Date methods
    const currentDate = new Date(dateInfo.year, dateInfo.month, dateInfo.day); // Today at midnight
    const startDate = new Date(currentYear, 6, 14); // July 14, current year (month is 0-indexed)
    
    // Calculate days difference using Date methods
    const timeDiff = currentDate.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Ensure we're within the 12-day range (0-11)
    const currentDay = Math.max(0, Math.min(daysDiff, 11));
    setCurrentDayIndex(currentDay);
    
    // Debug logging for development
    console.log('Date Debug:', {
      dateInfo,
      now: now.toISOString(),
      currentDate: currentDate.toISOString(),
      startDate: startDate.toISOString(),
      daysDiff,
      currentDay: currentDay + 1,
      actualDate: `July ${14 + currentDay}, ${currentYear}`,
      isWithinRange: daysDiff >= 0 && daysDiff <= 11
    });
  }, [birthdayDate, getCurrentDateInfo]);

  // Update surprises unlock status
  const updateSurprises = useCallback(() => {
    setSurprises(prev => prev.map((surprise, index) => ({
      ...surprise,
      unlocked: index <= currentDayIndex
    })));
  }, [currentDayIndex]);

  // Initialize
  useEffect(() => {
    setSurprises(generateSurprises());
    setIsLoading(false);
    setCurrentYear(new Date().getFullYear());
    generateFloatingParticles();
  }, [generateSurprises, generateFloatingParticles]);

  // Update countdown every second
  useEffect(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [updateCountdown]);

  // Update surprises when current day changes
  useEffect(() => {
    updateSurprises();
  }, [updateSurprises]);

  // Generate floating hearts
  const generateHearts = useCallback(() => {
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setHeartParticles(prev => [...prev, ...newHearts]);
    
    // Remove hearts after animation
    setTimeout(() => {
      setHeartParticles(prev => prev.filter(heart => !newHearts.some(newHeart => newHeart.id === heart.id)));
    }, 4000);
  }, []);

  const handleSurpriseClick = (surprise: DailySurprise) => {
    if (surprise.unlocked) {
      setSelectedSurprise(surprise);
      setShowSurpriseModal(true);
      generateHearts();
    }
  };

  const getTodaysSurprise = () => {
    return surprises[currentDayIndex];
  };

  const getProgressPercentage = () => {
    return ((currentDayIndex + 1) / 12) * 100;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-cyan-300 mt-6 text-lg animate-pulse">Loading Miku&apos;s birthday magic...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 relative overflow-hidden">
      {/* Animated Background with Miku Theme */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${10 + mousePosition.y * 0.02}%`,
          }}
        ></div>
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-teal-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse"
          style={{
            right: `${15 + mousePosition.x * 0.015}%`,
            bottom: `${20 + mousePosition.y * 0.015}%`,
          }}
        ></div>
        
        {/* Floating Particles */}
        {floatingParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-cyan-400/20 rounded-full blur-sm animate-float"
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

      {/* Floating Hearts */}
      {heartParticles.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float-up pointer-events-none z-10"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
        >
          <div className="text-cyan-400 text-3xl animate-pulse">💎</div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-30">
        <Link
          href="/"
          className="group flex items-center space-x-3 bg-black/20 backdrop-blur-xl rounded-2xl px-6 py-3 text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:bg-black/30 border border-cyan-500/20 hover:border-cyan-400/40"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">←</span>
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-16 pb-8 sm:pt-24 sm:pb-12 px-4">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 bg-clip-text text-transparent mb-4 sm:mb-6 animate-pulse">
              Miku&apos;s Birthday Magic
            </h1>
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-2xl sm:text-4xl animate-bounce">🎤</div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-cyan-200/90 mb-4 sm:mb-6 font-light">A digital symphony of love</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-cyan-300/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm sm:text-lg">Day {currentDayIndex + 1} of 12</span>
            </div>
            <div className="hidden sm:block w-1 h-6 bg-cyan-400/30 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-sm sm:text-lg">July {14 + currentDayIndex}, {currentYear}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Countdown Display */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4">
          <div className="relative group w-full max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-black/30 backdrop-blur-2xl rounded-3xl p-4 sm:p-8 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
              <div className="text-center mb-4 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-cyan-100 mb-2 sm:mb-3">Until July 26th</h2>
                <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full mx-auto animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                {[
                  { value: timeLeft.days, label: 'Days', color: 'from-cyan-400 to-cyan-500', icon: '📅' },
                  { value: timeLeft.hours, label: 'Hours', color: 'from-teal-400 to-cyan-400', icon: '⏰' },
                  { value: timeLeft.minutes, label: 'Minutes', color: 'from-cyan-500 to-teal-400', icon: '⏱️' },
                  { value: timeLeft.seconds, label: 'Seconds', color: 'from-teal-500 to-cyan-500', icon: '⚡' }
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-lg sm:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">{item.value.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="text-cyan-200 text-xs sm:text-sm font-medium mb-1">{item.label}</div>
                    <div className="text-sm sm:text-xl">{item.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/20 backdrop-blur-2xl rounded-3xl p-4 sm:p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="text-lg sm:text-2xl animate-bounce">🎵</div>
                  <span className="text-cyan-200 text-base sm:text-xl font-medium">Journey Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400 font-bold text-lg sm:text-2xl">{Math.round(getProgressPercentage())}%</span>
                  <div className="text-sm sm:text-xl">✨</div>
                </div>
              </div>
              <div className="relative w-full bg-black/30 rounded-full h-3 sm:h-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 animate-pulse"></div>
                <div 
                  className="relative bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${getProgressPercentage()}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Today's Surprise */}
        {getTodaysSurprise() && (
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-teal-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/30 backdrop-blur-2xl rounded-3xl p-4 sm:p-8 border border-cyan-400/40 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-teal-400/5 animate-pulse"></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">{getTodaysSurprise().emoji}</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-cyan-100 mb-2 sm:mb-3">Today&apos;s Special</h3>
                  <p className="text-cyan-300 text-lg sm:text-xl mb-4 sm:mb-6 font-medium">{getTodaysSurprise().title}</p>
                  <button
                    onClick={() => handleSurpriseClick(getTodaysSurprise())}
                    className="relative group bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Open Today&apos;s Gift</span>
                      <span className="text-lg sm:text-xl">🎁</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Surprise Timeline */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-cyan-100 mb-3 sm:mb-4">12 Days of Miku Magic</h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {surprises.map((surprise, index) => {
              const isToday = index === currentDayIndex;
              const isUnlocked = surprise.unlocked;
              const isPast = index < currentDayIndex;
              
              return (
                <div
                  key={surprise.id}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isToday 
                      ? 'scale-105' 
                      : isPast
                      ? 'hover:scale-110'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => handleSurpriseClick(surprise)}
                >
                  <div className={`relative rounded-2xl p-3 sm:p-4 md:p-6 backdrop-blur-xl border transition-all duration-500 ${
                    isToday 
                      ? 'bg-gradient-to-br from-cyan-500/30 to-teal-500/30 border-cyan-400/60 shadow-lg shadow-cyan-500/25' 
                      : isPast
                      ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-cyan-400/40 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20'
                      : 'bg-black/20 border-cyan-400/20'
                  }`}>
                    
                    {/* Animated background for today's surprise */}
                    {isToday && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-2xl animate-pulse"></div>
                    )}
                    
                    <div className="relative z-10 text-center">
                      <div className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 ${isToday ? 'animate-bounce' : ''}`}>
                        {isUnlocked ? surprise.emoji : '🔒'}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-cyan-100 mb-1 sm:mb-2">Day {index + 1}</div>
                      <div className="text-xs text-cyan-300/80 leading-relaxed">
                        {isUnlocked ? surprise.title : 'Locked'}
                      </div>
                    </div>
                    
                    {/* Status indicators */}
                    {isToday && (
                      <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                        <span className="text-xs sm:text-sm">🎁</span>
                      </div>
                    )}
                    
                    {isPast && !isToday && (
                      <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xs sm:text-sm text-white">✓</span>
                      </div>
                    )}
                    
                    {/* Hover effect */}
                    {isUnlocked && (
                      <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Miku Section */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
            <div className="relative">
              <BirthdayMiku 
                isSpecialDay={timeLeft.totalSeconds <= 0}
                onSpecialClick={() => {
                  generateHearts();
                  setTimeout(() => {}, 3000);
                }}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Birthday Message */}
        {timeLeft.totalSeconds <= 0 && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-teal-400/30 rounded-3xl blur-2xl animate-pulse"></div>
              <div className="relative bg-black/30 backdrop-blur-2xl rounded-3xl p-6 sm:p-12 border border-cyan-400/50 text-center">
                <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-bounce">🎉</div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-100 mb-4 sm:mb-6">HAPPY BIRTHDAY!</h2>
                <p className="text-base sm:text-lg md:text-xl text-cyan-200 mb-6 sm:mb-8 leading-relaxed">
                  Today is your special day! I hope this 12-day journey filled your heart with joy. 
                  You deserve all the happiness in the world! 🎂✨
                </p>
                <div className="flex justify-center space-x-4 text-2xl sm:text-3xl md:text-4xl animate-pulse">
                  <span>💎</span>
                  <span>🎤</span>
                  <span>💖</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Surprise Modal */}
      {showSurpriseModal && selectedSurprise && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative group max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-teal-400/30 rounded-3xl blur-2xl"></div>
            <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-cyan-400/40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-teal-400/5 animate-pulse"></div>
              
              <div className="relative z-10 text-center">
                <div className="text-6xl sm:text-8xl mb-6 sm:mb-8 animate-bounce">{selectedSurprise.emoji}</div>
                
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-cyan-100 mb-2 sm:mb-3">Day {selectedSurprise.id}</h3>
                  <h4 className="text-xl sm:text-2xl text-cyan-300 mb-4 sm:mb-6 font-medium">{selectedSurprise.title}</h4>
                </div>
                
                <div className="bg-black/40 rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 border border-cyan-400/20">
                  <p className="text-cyan-200 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {selectedSurprise.message}
                  </p>
                </div>
                
                <button
                  onClick={() => setShowSurpriseModal(false)}
                  className="group bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Continue Journey</span>
                    <span className="text-lg sm:text-xl">✨</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 