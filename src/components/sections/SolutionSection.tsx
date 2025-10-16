import { Card, CardContent } from '@/components/ui/card';
import { Bot, Brain, BookOpen, BarChart3 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function SolutionSection() {
  const solutions = [
    {
      icon: Bot,
      title: 'AI-бот у Telegram',
      text: 'Відповідає на робочі запитання миттєво, 24/7',
    },
    {
      icon: Brain,
      title: 'Auto-SOP',
      text: 'Створює інструкції автоматично з реальних діалогів',
    },
    {
      icon: BookOpen,
      title: 'База знань',
      text: 'Централізує всю інформацію компанії в одному місці',
    },
    {
      icon: BarChart3,
      title: 'Аналітика',
      text: 'Показує, які питання виникають найчастіше',
    },
  ];

  return (
    <section id="solution" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 ">
            Рішення, яке працює
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 ">
            Ваш AI-асистент у Telegram
          </p>{' '}
          <AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-6">
              {solutions.map((item, index) => (
                <Card
                  key={index}
                  className="border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg "
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="rounded-lg bg-blue-100 p-3 w-fit mb-4">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
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
