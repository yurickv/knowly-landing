'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import HeroSection from '@/components/sections/HeroSection';
import PainSection from '@/components/sections/PainSection';
import SolutionSection from '@/components/sections/SolutionSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import OfferSection from '@/components/sections/OfferSection';
import TrustSection from '@/components/sections/TrustSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import Footer from '@/components/sections/Footer';
import ContactFormModal from '@/components/modals/ContactFormModal';
import {
  pageview,
  trackScrollDepth,
  trackTimeOnPage,
  event,
} from '@/lib/analytics';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();
  const scrollDepthTracked = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(Date.now());

  // Відстеження переглядів сторінки
  useEffect(() => {
    pageview(pathname);

    // Відправка події початку сеансу
    event({
      action: 'session_start',
      category: 'Engagement',
      label: 'Landing Page',
    });
  }, [pathname]);

  // Відстеження скролу
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      const milestones = [25, 50, 75, 90, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !scrollDepthTracked.current.has(milestone)
        ) {
          trackScrollDepth(milestone);
          scrollDepthTracked.current.add(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Відстеження часу на сторінці
  useEffect(() => {
    const intervals = [10, 30, 60, 120, 180]; // секунди
    const timers: NodeJS.Timeout[] = [];

    intervals.forEach((seconds) => {
      const timer = setTimeout(() => {
        trackTimeOnPage(seconds);
      }, seconds * 1000);
      timers.push(timer);
    });

    // Відстеження при закритті сторінки
    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      event({
        action: 'session_end',
        category: 'Engagement',
        label: 'Time on page',
        value: timeSpent,
      });
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  // Анімації при скролі
  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!prefersReduced) {
              entry.target.classList.add('animate-fade-in-up');
            }
            entry.target.classList.remove('opacity-0');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleCTAClick = () => {
    setModalOpen(true);
    event({
      action: 'modal_trigger',
      category: 'Engagement',
      label: 'Contact Form Modal',
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection onCTAClick={handleCTAClick} />
      <PainSection />
      <SolutionSection />
      <BenefitsSection />
      <OfferSection onCTAClick={handleCTAClick} />
      <TrustSection />
      <FinalCTASection onCTAClick={handleCTAClick} />
      <Footer />

      <ContactFormModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
}
