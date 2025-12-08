import Image from 'next/image';
import CTAButton from '@/components/ui/CTAButton';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden  pt-32 md:pt-40 pb-32">
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

          <div className="relative rounded-2xl w-full">
            {/* Radial gradient background */}
            <div className="absolute -inset-8 md:-inset-12 rounded-full bg-purple-200 blur-3xl opacity-50" />
            <Image
              src="/hero-picture.webp"
              alt="AI Assistant"
              width={360}
              height={332}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,..."
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
