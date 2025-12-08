import Image from 'next/image';
import CTAButton from '@/components/ui/CTAButton';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden mt-[85px] lg:mt-[100px] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 rounded-[24px] overflow-hidden lg:mt-6">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8 lg:col-span-2 mt-5 lg:mt-[50px]">
            <h1 className="text-3xl sm:text-4xl lg:text-[72px] font-bold leading-snug text-[#0D0746]">
              Перетворюйте хаос у структуровану <br />
              <span className="bg-gradient-to-t from-[#150D5E] from-[8.72%] to-[#7062EE] to-[63.22%] bg-clip-text text-transparent">
                Базу Знань
              </span>
            </h1>
            <p className="text-sm sm:text-xl text-[#534D8C] max-w-2xl leading-snug mt-[14px] md:mt-10">
              Завантажуйте відео, голосові нотатки та документи - AI перетворить
              їх на впорядковану Базу Знань із миттєвим пошуком.
            </p>
            <div className="flex flex-col justify-center lg:justify-start mt-9 md:mt-20 lg:mt-[107px]">
              <CTAButton label="Спробувати безкоштовно" variant="hero" />
              <p className="text-[#534D8C] font-medium mt-3 md:mt-4">
                Залишилось 7 місць у програмі бета-тестування
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl w-full lg:col-span-1">
            {/* Radial gradient background */}
            <div className="absolute top-1/3 -translate-y-1/2 -right-1/3 w-full aspect-square rounded-full bg-indigo-400 blur-3xl opacity-50" />
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
