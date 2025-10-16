import { CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function BenefitsSection() {
  const benefits = [
    {
      problem: 'Втрата часу на консультації',
      solution: 'Працівники самі отримують відповіді',
    },
    {
      problem: 'Розкидана інформація',
      solution: 'Єдина база знань у Telegram',
    },
    {
      problem: 'Повільна адаптація',
      solution: 'Новачки вникають удвічі швидше',
    },
    {
      problem: "Втрата корпоративної пам'яті",
      solution: 'Знання залишаються у системі',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 ">
            Переваги AI-асистента
          </h2>
          <div className="overflow-x-auto ">
            <AnimatedSection>
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-semibold text-gray-900 border-b border-gray-200">
                      Проблема
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-semibold text-gray-900 border-b border-gray-200">
                      Як вирішує AI-асистент
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {benefits.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-600">{row.problem}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="font-medium text-gray-900">
                            {row.solution}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
