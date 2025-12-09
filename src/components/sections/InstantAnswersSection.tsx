import AnimatedSection from '@/components/ui/AnimatedSection';
import Image from 'next/image';

export default function InstantAnswersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-5xl font-bold text-[#0D0746] max-w-[522px]">
                  <span className="bg-gradient-to-t from-[#150D5E] to-[#7062EE] bg-clip-text text-transparent">
                    Миттєві відповіді,{' '}
                  </span>
                  <br />а не просто &quot;список файлів&quot;
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Більше не потрібно відкривати десятки файлів. AI сам знаходить
                  потрібне та формулює відповідь.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-[522px] h-full">
                    <div
                      className="w-full h-full rounded-3xl shadow-2xl overflow-hidden"
                      style={{
                        background: '#F5F5F5',
                        border: '1px solid #E5E5E5',
                      }}
                    >
                      <div
                        className="h-16 flex items-center justify-between px-6"
                        style={{ background: '#6456E4' }}
                      >
                        <div className="">
                          <Image
                            src="/logo-white.png"
                            alt="Send"
                            width={122}
                            height={40}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-white/80 hover:text-white rotate-90">
                            ⋯
                          </button>
                          <button className="text-white/80 hover:text-white">
                            ✕
                          </button>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 h-[calc(100%-8rem)]">
                        <div className="flex justify-end">
                          <div
                            className="max-w-[80%] px-4 py-3 rounded-t-2xl rounded-l-2xl"
                            style={{ background: '#6456E4' }}
                          >
                            <p className="text-white text-sm">
                              Як оформити повернення?
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-start">
                          <div className="max-w-[85%] px-4 py-3 rounded-t-2xl rounded-r-2xl bg-white border border-gray-200">
                            <p className="text-gray-800 text-sm leading-relaxed">
                              Згідно з відео-інструкцією від Олега та
                              PDF-регламентом №5, зробіть наступне: ...
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 rounded-b-3xl">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Напишіть щось..."
                            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            readOnly
                          />
                          <Image
                            src="/smile.png"
                            alt="Send"
                            width={96}
                            height={42}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
