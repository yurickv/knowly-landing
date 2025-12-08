'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import CTAButton from '@/components/ui/CTAButton';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 md:top-4 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between border border-[#D3CDFF] rounded-[24px] bg-white backdrop-blur-md py-2.5 md:py-4 px-3 md:px-6 ">
        {/* Logo */}
        <div className="flex-shrink-0">
          {/* Desktop Logo */}
          <div className="hidden md:block">
            <Image
              src="/logo-large-black.webp"
              alt="Knowly"
              width={142}
              height={45}
              priority
              className=""
            />
          </div>
          {/* Mobile Logo */}
          <div className="block md:hidden">
            <Image
              src="/logo-small.webp"
              alt="Knowly"
              width={102}
              height={24}
              priority
              className=""
            />
          </div>
        </div>

        {/* CTA Button */}
        <div>
          <CTAButton
            label="Забронювати демо"
            variant="default"
            className={`transition-all duration-300 bg-[#150D5E] hover:bg-[#534D8C] py-4 px-4 
                md:px-6 rounded-[16px] text-base md:text-xl font-semibold leading-normal min-h-[54px]`}
          />
        </div>
      </div>
    </header>
  );
}
