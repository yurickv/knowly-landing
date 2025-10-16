import AnimatedSection from '@/components/ui/AnimatedSection';
import CTAButton from '@/components/ui/CTAButton';

export default function OfferSection() {
  return (
    <section
      id="offer"
      className="py-20 bg-gradient-to-br from-[hsl(160,84%,39%)]/10 via-[hsl(210,20%,98%)] to-[hsl(210,70%,58%)]/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ми шукаємо компанії для пілотного запуску
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Отримайте доступ до AI-асистента безкоштовно на 14 днів і
            подивіться, як зменшиться кількість запитань уже з першого тижня
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton label="Отримати демо" variant="offer" />
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
