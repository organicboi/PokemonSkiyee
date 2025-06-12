import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface MikuProps {
  onClick?: () => void;
}

export default function Miku({ onClick }: MikuProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isClickInProgressRef = useRef(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  
  useEffect(() => {
    // Try to load the local audio file first
    const localAudioUrl = '/audio/mikuCropAudio.mp3';
    const fallbackAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    
    console.log('Attempting to load audio from:', localAudioUrl);
    
    // Create audio element
    const audio = new Audio();
    audioRef.current = audio;
    
    // Add specific error handler to log detailed errors
    const handleSpecificError = (e: ErrorEvent) => {
      console.error('Detailed audio error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
      });
    };
    
    // Set up event listeners for audio element
    if (audioRef.current) {
      // Set volume to ensure it's audible
      audioRef.current.volume = 0.7;
      
      // Make the audio loop for continuous playback
      audioRef.current.loop = true;
      
      // Add event listener for successful loading
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully and can play from:', audioRef.current?.src);
        setAudioLoaded(true);
      });
      
      // Add error handler for loading failures
      audioRef.current.addEventListener('error', (e) => {
        const err = e as ErrorEvent;
        console.error('Error loading audio file:', err);
        console.error('Audio error code:', audioRef.current?.error?.code);
        console.error('Audio error message:', audioRef.current?.error?.message);
        
        // Only try fallback if we're not already using it
        const currentSrc = audioRef.current?.src || '';
        if (!currentSrc.includes('soundhelix')) {
          console.log('Trying fallback audio URL');
          
          // Try the fallback URL
          if (audioRef.current) {
            audioRef.current.src = fallbackAudioUrl;
            audioRef.current.load();
          }
        }
      });
      
      window.addEventListener('error', handleSpecificError);
      
      // Set up event listener for when audio ends
      audioRef.current.addEventListener('ended', () => {
        console.log('Audio playback ended (this should not happen with looping)');
      });
      
      // Add more event listeners for debugging
      audioRef.current.addEventListener('playing', () => {
        console.log('Audio is now playing from source:', audioRef.current?.src);
      });
      
      audioRef.current.addEventListener('pause', () => {
        console.log('Audio was paused');
      });
      
      // Add timeupdate listener to check if audio is actually progressing
      audioRef.current.addEventListener('timeupdate', () => {
        // Log time every 5 seconds to avoid console spam
        if (Math.floor(audioRef.current?.currentTime || 0) % 5 === 0 && 
            Math.floor(audioRef.current?.currentTime || 0) > 0) {
          console.log('Audio time update:', audioRef.current?.currentTime);
        }
      });
      
      // Set the source and load the audio - Try with complete URL
      audioRef.current.src = window.location.origin + localAudioUrl;
      console.log('Setting audio source to:', audioRef.current.src);
      audioRef.current.load();
    }
    
    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        console.log('Cleaning up audio element');
        window.removeEventListener('error', handleSpecificError);
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Clear any pending timeouts
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);
  
  const handleClick = () => {
    console.log('Miku clicked, current playing state:', isPlaying);
    
    // Prevent rapid clicking
    if (isClickInProgressRef.current) {
      console.log('Click in progress, ignoring');
      return;
    }
    
    isClickInProgressRef.current = true;
    
    // Update state
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    // Play or pause the audio with error handling
    if (audioRef.current) {
      if (newPlayingState) {
        // Starting to play
        console.log('Attempting to play audio');
        
        // Using promise with error handling
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              console.log('Audio playback started successfully');
              if (onClick) onClick(); // Call onClick when starting to play
            })
            .catch(error => {
              console.error("Play error:", error);
              // Reset state on error
              setIsPlaying(false);
              
              // Try to play again - browsers often require a user gesture first
              const retryPlay = () => {
                if (audioRef.current) {
                  audioRef.current.play().catch(e => console.error("Retry play failed:", e));
                }
              };
              
              // Add a temporary button to retry playback if autoplay was blocked
              const tempButton = document.createElement('button');
              tempButton.textContent = 'Enable Audio';
              tempButton.style.position = 'fixed';
              tempButton.style.top = '10px';
              tempButton.style.right = '10px';
              tempButton.style.zIndex = '1000';
              tempButton.onclick = () => {
                retryPlay();
                tempButton.remove();
              };
              document.body.appendChild(tempButton);
            })
            .finally(() => {
              // Release click lock after a small delay
              clickTimeoutRef.current = setTimeout(() => {
                isClickInProgressRef.current = false;
              }, 300);
            });
        } else {
          console.log('Play promise was undefined');
          isClickInProgressRef.current = false;
        }
      } else {
        // Pausing
        try {
          console.log('Pausing audio');
          audioRef.current.pause();
          if (onClick) onClick(); // Call onClick when pausing
        } catch (error) {
          console.error("Pause error:", error);
        } finally {
          // Release click lock after a small delay
          clickTimeoutRef.current = setTimeout(() => {
            isClickInProgressRef.current = false;
          }, 300);
        }
      }
    } else {
      // Release click lock if no audio ref
      console.error('Audio reference is null');
      isClickInProgressRef.current = false;
      if (onClick) onClick();
    }
  };

  return (
    <div 
      className={`relative rounded-xl p-4 flex flex-col items-center bg-[#39c5bb] bg-opacity-20 backdrop-blur-sm
                border border-white/10 transform transition-all duration-300 cursor-pointer
                ${isPlaying ? 'scale-105' : ''}`}
      onClick={handleClick}
    >
      <div className={`w-28 h-36 relative mb-2 ${isPlaying ? 'glowing dancing' : 'floating'}`}>
        <Image 
          src="/images/homepage-bg/miku2.png" 
          alt="Hatsune Miku" 
          fill
          className="object-contain"
          priority
        />
      </div>
      
      <h3 className="text-lg font-bold">Hatsune Miku</h3>
      <span className="text-sm opacity-80">Virtual Singer</span>
      
      {isPlaying && (
        <div className="absolute inset-0 rounded-xl border-2 border-[#39c5bb] animate-pulse"></div>
      )}
      
      <div className="mt-2 flex space-x-2">
        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#39c5bb]' : 'bg-white/50'}`}></span>
        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#39c5bb]' : 'bg-white/50'}`}></span>
        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#39c5bb]' : 'bg-white/50'}`}></span>
      </div>
      
      {/* Audio indicator */}
      <div className="mt-2 text-xs opacity-60">
        {audioLoaded ? (isPlaying ? "♪ Now Playing ♪" : "Ready to Play") : "Loading Audio..."}
      </div>
    </div>
  );
} 