import Image from 'next/image';
import CTAButton from '@/components/ui/CTAButton';
import InfoCard from '../ui/InfoCard';
import IconContainer from '../ui/IconContainer';

export default function HeroSection() {
  return (
    <section className="relative mt-[85px] lg:mt-[130px] mb-60 lg:mb-30 container mx-auto">
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
              <CTAButton label="Забронювати демо" variant="hero" />
              <p className="text-[#534D8C] font-medium mt-3 md:mt-4">
                Залишилось 7 місць у програмі бета-тестування
              </p>
            </div>
          </div>

          <div className="relative w-full lg:col-span-1">
            <IconContainer
              iconSrc="/icons/camera.png"
              iconAlt="Camera"
              rotation={44.26}
              iconRotation={-44.26}
              iconWidth={40}
              iconHeight={40}
              priority={true}
              className="absolute top-0 left-10 lg:-top-40 z-20"
            />
            <IconContainer
              iconSrc="/icons/sms.png"
              iconAlt="Sms icon"
              rotation={-2.57}
              iconRotation={-2.57}
              iconWidth={30}
              iconHeight={30}
              priority={true}
              className="absolute top-0 lg:-top-50 left-1/2 z-20"
            />
            <IconContainer
              iconSrc="/icons/file.png"
              iconAlt="file icon"
              rotation={44.39}
              iconRotation={-48.39}
              iconWidth={56}
              iconHeight={56}
              priority={true}
              className="absolute top-20 lg:-top-20 left-1/3 z-20"
            />
            <IconContainer
              iconSrc="/icons/foto.png"
              iconAlt="foto icon"
              rotation={-3.36}
              iconRotation={-3.36}
              iconWidth={30}
              iconHeight={30}
              priority={true}
              className="absolute top-15 lg:-top-30 left-3/5 z-20"
            />

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
        className="md:w-[366px] w-[278px] absolute -bottom-60 lg:-bottom-20 z-20 lg:z-20 -rotate-12 right-30 lg:right-45 text-base"
      />
      <InfoCard
        title="Порядок оформлення відвантаження..."
        className="w-[200px] md:w-[206px] text-xs absolute -bottom-35 lg:bottom-20 z-30 lg:z-10 rotate-12 right-2"
      />
      <InfoCard
        title="Стандарт приготування страви:"
        className="w-[200px] md:w-[206px] text-xs absolute -bottom-60 lg:-bottom-20 z-10 rotate-6 lg:-rotate-6 right-0 lg:right-10"
      />
    </section>
  );
}
