import { Card, CardContent } from '@/components/ui/card';
import { Clock, FileText, Users, BarChart3 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function PainSection() {
  const painPoints = [
    {
      icon: Clock,
      text: 'Менеджери постійно відповідають на одні й ті самі запитання',
    },
    {
      icon: FileText,
      text: 'Інструкції розкидані по чатах, Google Docs і нотатках',
    },
    {
      icon: Users,
      text: 'Досвідчені працівники йдуть — і разом із ними зникає знання',
    },
    {
      icon: BarChart3,
      text: 'Новачки вчаться тижнями, роблять типові помилки',
    },
  ];

  return (
    <section id="problems" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Знайомі проблеми?
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {painPoints.map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="rounded-lg bg-red-100 p-3">
                      <item.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <p className="text-gray-900 flex-1">{item.text}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
