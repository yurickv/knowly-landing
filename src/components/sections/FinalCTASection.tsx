import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { trackCTAClick, trackSectionView } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

interface FinalCTASectionProps {
  onCTAClick: () => void;
}

export default function FinalCTASection({ onCTAClick }: FinalCTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSectionView('final_cta_section');
            hasTracked.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCTAClick = () => {
    trackCTAClick('final_cta_section', 'Отримати ранній доступ');
    onCTAClick();
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-[hsl(210,70%,58%)] via-[hsl(210,70%,58%)]/90 to-[hsl(160,84%,39%)] text-[hsl(0,0%,100%)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8 fade-in-section opacity-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Звільніть менеджерів від нескінченних питань
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Створіть систему, де кожен працівник знає, що робити
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleCTAClick}
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg"
            >
              Отримати ранній доступ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
