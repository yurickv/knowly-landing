import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CTAButton from '../ui/CTAButton';
import Image from 'next/image';

export default function TrustSection() {
  return (
    <section id="trust" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <Card
            className="border-none overflow-hidden relative rounded-[32px] 
            pt-[56px] lg:pt-[84px] px-10 pb-20 lg:pb-23
          bg-[linear-gradient(170.74deg,#7465FF_7.83%,#150D5E_93.91%)]"
          >
            <CardContent className=" text-center space-y-4 relative">
              <Image
                src="/trust-picture.png"
                alt="Trust decoration"
                width={200}
                height={200}
                className="absolute -bottom-40 lg:-bottom-40 -left-20 lg:-left-10 z-0 "
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold sr-only">
                  Пропозиція для перших користувачів спробувати AI Knowly
                  консультанта для працівників компанії
                </h3>
                <p className="text-xl lg:text-3xl text-white mb-[52px] lg:mb-9 max-w-[690px] mx-auto leading-snug">
                  Хочете перевірити на своїх даних? <br />
                  <span>Надішліть нам одне відео або інструкцію</span>
                </p>
                <CTAButton label="Забронювати демо" variant="final" />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}
