import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function TrustSection() {
  return (
    <section id="trust" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-blue-200 bg-blue-50 fade-in-section opacity-0">
            <CardContent className="p-8 sm:p-12 text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 p-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">
                Створено практиками для практиків
              </h3>
              <p className="text-lg text-gray-600">
                Розроблено підприємцями, які керують 50+ працівниками у доставці
                їжі.
              </p>
              <p className="text-lg text-gray-600">
                Ми самі пройшли через хаос щоденних питань — тепер зробили
                рішення, яке працює.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
