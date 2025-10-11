import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { trackCTAClick, trackSectionView } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

interface OfferSectionProps {
  onCTAClick: () => void;
}

export default function OfferSection({ onCTAClick }: OfferSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSectionView('offer_section');
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
    trackCTAClick('offer_section', 'Отримати демо');
    onCTAClick();
  };

  return (
    <section
      ref={sectionRef}
      id="offer"
      className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8 fade-in-section opacity-0">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ми шукаємо компанії для пілотного запуску
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Отримайте доступ до AI-асистента безкоштовно на 30 днів і
            подивіться, як зменшиться кількість запитань уже з першого тижня
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleCTAClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
            >
              Отримати демо
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            ✅ Безкоштовно на 14 днів • ✅ Без кредитної картки • ✅ Підтримка
            24/7
          </p>
        </div>
      </div>
    </section>
  );
}
