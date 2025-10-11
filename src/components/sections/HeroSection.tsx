import { Button } from '@/components/ui/button';
import { Bot, ArrowRight } from 'lucide-react';
import { trackCTAClick } from '@/lib/analytics';
import Image from 'next/image';

interface HeroSectionProps {
  onCTAClick: () => void;
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const handleCTAClick = () => {
    trackCTAClick('hero_section', 'Спробувати безкоштовно');
    onCTAClick();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8 fade-in-section opacity-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              AI-асистент для вашої команди
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Отримуйте миттєві відповіді на робочі запитання та автоматично
              створюйте інструкції з досвіду ваших співробітників
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={handleCTAClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Спробувати безкоштовно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="fade-in-section opacity-0">
            <div className="rounded-2xl shadow-2xl w-full aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Image
                src="/hero.avif"
                alt="AI Assistant"
                width={1200}
                height={630}
                priority // для hero зображення
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,..."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
