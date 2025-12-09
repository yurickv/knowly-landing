import Image from 'next/image';
import CTAButton from '@/components/ui/CTAButton';
import InfoCard from '../ui/InfoCard';

export default function HeroSection() {
  return (
    <section className="relative mt-[85px] lg:mt-[130px] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 rounded-[24px] md:overflow-hidden lg:mt-6">
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

          <div className="relative w-full lg:col-span-1">
            {/* Radial gradient background */}
            <div
              className="absolute top-3/4 lg:top-1/3 -translate-y-1/2 lg:-right-1/3 w-full aspect-square rounded-full 
            bg-indigo-400 blur-3xl opacity-50 z-0"
            />
            <Image
              src="/hero-picture.webp"
              alt="AI Assistant"
              width={360}
              height={332}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,..."
              className="relative z-10 lg:-mt-32 rotate-6 "
            />
          </div>
        </div>
      </div>

      <InfoCard
        title="Інструкція з обслуговування обладнання: покрокові гайди, згенеровані з вашого відео"
        big={true}
        className="md:w-[366px] w-[278px] absolute -bottom-20 lg:bottom-40 z-20 lg:z-20 -rotate-12 right-30 lg:right-60 text-base"
      />
      <InfoCard
        title="Порядок оформлення відвантаження..."
        className="w-[200px] md:w-[206px] text-xs absolute bottom-10 lg:bottom-80 z-30 lg:z-10 rotate-12 right-10"
      />
      <InfoCard
        title="Стандарт приготування страви:"
        className="w-[200px] md:w-[206px] text-xs absolute -bottom-20 lg:bottom-40 z-10 rotate-6 lg:-rotate-6 right-0 lg:right-20"
      />
    </section>
  );
}
