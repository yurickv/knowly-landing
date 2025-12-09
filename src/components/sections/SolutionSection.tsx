import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function SolutionSection() {
  const solutions = [
    {
      title: 'Виробництво',
      items: [
        'стандарти операційних процесів',
        'інструкції для обладнання',
        'навчання та техніка безпеки',
      ],
    },
    {
      title: 'HoReCa',
      items: ['стандарти для персоналу', 'чек-листи', 'навчання новачків'],
    },
    {
      title: 'Логістика',
      items: [
        'інструктаж водіїв',
        'правила відвантаження',
        'операційні процеси',
      ],
    },
  ];

  return (
    <section id="solution" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-2xl sm:text-5xl font-bold text-center mb-12 text-[#0D0746]">
            Для кого?
          </h2>

          <AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((item, index) => (
                <Card
                  key={index}
                  className="transition-all duration-300 hover:shadow-lg rounded-[32px]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    border: '1px solid #D3CDFF',
                    background: '#FFFFFF',
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center items-center gap-4 mb-4">
                      <div
                        className="rounded-full w-8 h-8 "
                        style={{
                          background:
                            'linear-gradient(310.64deg, #9388FF 18.84%, #F2F0FF 91.01%)',
                          boxShadow: '0px 4px 16px 0px #9696FF',
                        }}
                      />
                      <h3 className="font-semibold text-lg ">{item.title}</h3>
                    </div>

                    <div className="text-gray-600 space-y-1">
                      {item.items.map((text, i) => (
                        <div key={i}>– {text}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
