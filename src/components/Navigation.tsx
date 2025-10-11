'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-bold text-xl">AI-Асистент</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('problems')}
              className="hover:text-blue-600 transition-colors"
            >
              Проблеми
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="hover:text-blue-600 transition-colors"
            >
              Рішення
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="hover:text-blue-600 transition-colors"
            >
              Переваги
            </button>
            <Button
              onClick={() => scrollToSection('offer')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Спробувати
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button
              onClick={() => scrollToSection('problems')}
              className="block w-full text-left py-2"
            >
              Проблеми
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="block w-full text-left py-2"
            >
              Рішення
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="block w-full text-left py-2"
            >
              Переваги
            </button>
            <Button
              onClick={() => scrollToSection('offer')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Спробувати
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
