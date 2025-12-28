'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface BackButtonProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
  variant?: 'floating' | 'inline';
  customClass?: string;
  fallbackUrl?: string; // Fallback URL if router.back() fails
}

export default function BackButton({ 
  position = 'top-left', 
  variant = 'floating', 
  customClass = '',
  fallbackUrl = '/' 
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Try to go back first, if that doesn't work, redirect to fallback
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  // Position classes for floating variant
  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'inline': '', // inline doesn't need positioning classes
  };

  if (variant === 'inline') {
    return (
      <button
        onClick={handleBack}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2F334F] text-[#D4AF37] hover:bg-[#1E2135] transition-colors ${customClass}`}
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back</span>
      </button>
    );
  }

  // Floating variant (default)
  return (
    <div className={`fixed z-50 ${positionClasses[position]}`}>
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={`group relative rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] p-1 shadow-2xl cursor-pointer ${customClass || 'w-12 h-12'}`}
        aria-label="Go back"
      >
        <div className="w-full h-full rounded-full bg-[#2F334F] flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-[#D4AF37] group-hover:text-white transition-colors" />
        </div>
      </motion.button>
    </div>
  );
}