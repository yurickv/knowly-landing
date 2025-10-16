import { Bot } from 'lucide-react';
import Image from 'next/image';
import CTAButton from '@/components/ui/CTAButton';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(210,70%,58%)]/10 via-[hsl(210,20%,98%)] to-[hsl(160,84%,39%)]/10 pt-20 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              AI-асистент для вашої команди
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Отримуйте миттєві відповіді на робочі запитання та автоматично
              створюйте інструкції з досвіду ваших співробітників
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton label="Спробувати безкоштовно" variant="hero" />
            </div>
          </div>
          <div>
            <div className="rounded-2xl shadow-2xl w-full aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
              <Image
                src="/hero.avif"
                alt="AI Assistant"
                width={1200}
                height={630}
                priority
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
