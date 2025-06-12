import { useState, useEffect } from 'react';

interface MessageProps {
  message: string;
  show: boolean;
  onClose?: () => void;
}

export default function Message({ message, show, onClose }: MessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    setIsVisible(show);
    if (show) {
      setIndex(0);
      setDisplayedMessage('');
    }
  }, [show]);
  
  useEffect(() => {
    if (!isVisible || index >= message.length) return;
    
    const timeout = setTimeout(() => {
      setDisplayedMessage(prev => prev + message[index]);
      setIndex(index + 1);
    }, 50);
    
    return () => clearTimeout(timeout);
  }, [isVisible, index, message]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
      <div className="relative bg-gradient-to-b from-purple-900 to-black max-w-md w-full rounded-xl p-5 border border-white/20 shadow-xl shadow-purple-500/20">
        <div className="absolute -top-3 -right-3 -left-3 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></div>
        
        <div className="h-60 overflow-auto text-white/90 text-sm leading-relaxed">
          <p className="whitespace-pre-line">
            {displayedMessage}
            <span className="animate-pulse">|</span>
          </p>
        </div>
        
        {index >= message.length && (
          <div className="mt-4 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-[var(--accent)] text-white text-sm hover:bg-opacity-80 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 