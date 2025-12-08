'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ContactFormModal = dynamic(
  () => import('@/components/modals/ContactFormModal'),
  { ssr: false }
);

interface CTAButtonProps {
  label: string;
  variant?: 'default' | 'hero' | 'offer' | 'final';
  className?: string;
}

export default function CTAButton({
  label,
  variant = 'default',
  className = '',
}: CTAButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);

    // Відстеження відкриття модалки
    if (typeof window !== 'undefined') {
      // Google Tag Manager подія
      window.dataLayer?.push({
        event: 'cta_click',
        button_text: label,
      });

      // Facebook Pixel подія
      window.fbq?.('trackCustom', 'CTA_Click', { button: label });
    }
  };

  const getButtonClassName = () => {
    switch (variant) {
      case 'offer':
        return `bg-[hsl(160,84%,39%)] text-[hsl(0,0%,100%)] hover:bg-[hsl(160,84%,39%)/0.9] 
                shadow-[0_4px_20px_-4px_hsl(160,84%,39%/0.3)] hover:shadow-[0_8px_30px_-6px_hsl(160,84%,39%/0.4)] 
                hover:scale-105 transition-all duration-300 px-8 py-6 `;
      case 'final':
        return 'bg-white text-black hover:bg-gray-100 px-8 py-6 ';
      case 'hero':
        return 'px-8 py-6 ';
      default:
        return '';
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={`${getButtonClassName()} ${className}`}
      >
        {label}
      </Button>

      {modalOpen && (
        <ContactFormModal open={modalOpen} onOpenChange={setModalOpen} />
      )}
    </>
  );
}
