import AnimatedSection from '@/components/ui/AnimatedSection';
import CTAButton from '@/components/ui/CTAButton';

export default function FinalCTASection() {
  return (
    <section
      id="final-cta"
      className="py-20 bg-gradient-to-r from-[hsl(210,70%,58%)] via-[hsl(210,70%,58%)]/90 to-[hsl(160,84%,39%)] text-[hsl(0,0%,100%)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Звільніть менеджерів від нескінченних питань
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Створіть систему, де кожен працівник знає, що робити
            </p>
          </AnimatedSection>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              label="Отримати ранній доступ"
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
