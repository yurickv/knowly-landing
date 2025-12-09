import AnimatedSection from '@/components/ui/AnimatedSection';
import InfoCard from '@/components/ui/InfoCard';

export default function ExamplesSection() {
  const examples = [
    {
      title: 'Інструкція з обслуговування обладнання: покрокові гайди, згенеровані з вашого відео.',
    },
    {
      title: 'Порядок оформлення відвідувачів',
    },
    {
      title: 'Правила техніки безпеки: швидкі відповіді на питання працівників',
    },
    {
      title: 'Процедура онбордингу нових співробітників',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Приклади використання
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Створюйте бази знань з будь-якого типу контенту
          </p>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examples.map((example, index) => (
                <InfoCard
                  key={index}
                  title={example.title}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
