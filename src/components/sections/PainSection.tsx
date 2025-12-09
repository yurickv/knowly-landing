import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/ui/AnimatedSection';
import IconContainer from '@/components/ui/IconContainer';

export default function PainSection() {
  const painPoints = [
    {
      iconSrc: '/icons/camera.png',
      iconAlt: 'Video icon',
      title: 'Відео-інструкції',
      text: 'Запишіть екран або відео з телефону. AI нарізує кадри і створить покроковий гайд.',
      rotation: 0,
      iconRotation: 45,
      bgGradient: 'linear-gradient(170.74deg, #7465FF 7.83%, #150D5E 93.91%)',
    },
    {
      iconSrc: '/icons/sms.png',
      iconAlt: 'Text icon',
      title: 'Текстовий редактор',
      text: 'Класичний редактор для тих, хто любить писати вручну. Зі зручним форматуванням.',
      rotation: 0,
      iconRotation: -2.57,
      bgColor: 'bg-white',
    },
    {
      iconSrc: '/icons/voice.png',
      iconAlt: 'Voice icon',
      title: 'Голосові нотатки',
      text: 'Немає часу писати? Надиктуйте задачу голосом. Ми транскрибуємо і перетворимо на документ.',
      rotation: 0,
      bgColor: 'bg-white',
    },
    {
      iconSrc: '/icons/file.png',
      iconAlt: 'Document icon',
      title: 'Документи та PDF',
      text: 'Завантажте старі регламенти, PDF-файли чи Word. AI проіндексує їх для розумного пошуку.',
      rotation: 0,
      iconRotation: 38,
      bgColor: 'bg-white',
    },
  ];

  return (
    <section id="problems" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-5xl font-bold text-center mb-12 text-[#0D0746]">
              Будь-який формат. Одна ідеальна база
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {painPoints.map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card
                  className={`h-[244px] lg:h-[280px] rounded-[32px] ${
                    index === 0
                      ? 'border-none text-white overflow-hidden relative'
                      : 'border border-[#D3CDFF] text-gray-900 overflow-hidden relative'
                  } ${item.bgColor || ''}`}
                  style={
                    item.bgGradient
                      ? { background: item.bgGradient }
                      : undefined
                  }
                >
                  {index === 0 && (
                    <div
                      className="absolute -right-8 top-14 -translate-y-1/2 rounded-full lg:-right-12 w-[99.52px] h-[101.91px] lg:w-[137.52px] lg:h-[140.83px]"
                      style={{
                        background:
                          'linear-gradient(170.74deg, #7465FF 7.83%, #150D5E 93.91%)',
                        boxShadow: '0px 4px 16px 0px #7061F9',
                      }}
                    />
                  )}
                  <CardContent className="p-6 sm:p-8 relative z-10">
                    <div className="flex gap-4 items-center">
                      <div className="mb-4">
                        <IconContainer
                          iconSrc={item.iconSrc}
                          iconAlt={item.iconAlt}
                          rotation={item.rotation}
                          iconRotation={item.iconRotation}
                          iconWidth={32}
                          iconHeight={32}
                        />
                      </div>
                      <h3
                        className={`text-xl lg:text-2xl font-semibold mb-3 ${
                          index === 0 ? 'text-white' : 'text-[#0D0746]'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className={`leading-relaxed ${
                        index === 0 ? 'text-white/90' : 'text-gray-600'
                      }`}
                    >
                      {item.text}
                    </p>
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
