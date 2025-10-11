// hooks/useAnalytics.ts
import { useEffect, useState, useRef } from 'react';
import { trackSectionView, event } from '@/lib/analytics';

// Хук для відстеження видимості секції
export const useSectionTracking = (sectionName: string) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSectionView(sectionName);
            hasTracked.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionName]);

  return sectionRef;
};

// Хук для відстеження кліків
export const useClickTracking = (eventName: string, category: string) => {
  const trackClick = (label?: string, value?: number) => {
    event({
      action: eventName,
      category,
      label,
      value,
    });
  };

  return trackClick;
};

// Хук для відстеження взаємодії з елементами
export const useInteractionTracking = () => {
  const trackHover = (elementName: string) => {
    event({
      action: 'hover',
      category: 'Interaction',
      label: elementName,
    });
  };

  const trackFocus = (elementName: string) => {
    event({
      action: 'focus',
      category: 'Interaction',
      label: elementName,
    });
  };

  const trackShare = (platform: string, content: string) => {
    event({
      action: 'share',
      category: 'Social',
      label: `${platform} - ${content}`,
    });

    // Facebook Pixel для соціальних дій
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Share', {
        platform,
        content_type: content,
      });
    }
  };

  return { trackHover, trackFocus, trackShare };
};

// Хук для відстеження помилок
export const useErrorTracking = () => {
  const trackError = (
    errorType: string,
    errorMessage: string,
    component?: string
  ) => {
    event({
      action: 'error',
      category: 'Error',
      label: `${errorType}${
        component ? ` - ${component}` : ''
      }: ${errorMessage}`,
    });

    // Додатково логуємо в консоль для розробки
    console.error(`Analytics Error: ${errorType}`, {
      message: errorMessage,
      component,
      timestamp: new Date().toISOString(),
    });
  };

  const trackAPIError = (
    endpoint: string,
    statusCode: number,
    message?: string
  ) => {
    event({
      action: 'api_error',
      category: 'API',
      label: `${endpoint} - ${statusCode}`,
      value: statusCode,
    });
  };

  return { trackError, trackAPIError };
};

// Хук для відстеження продуктивності
export const usePerformanceTracking = () => {
  useEffect(() => {
    // Відстеження Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          event({
            action: 'web_vitals',
            category: 'Performance',
            label: 'LCP',
            value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
          });
        });
        lcpObserver.observe({
          type: 'largest-contentful-paint',
          buffered: true,
        });
      } catch (e) {
        console.log('LCP observer not supported');
      }

      // FID (First Input Delay)
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            event({
              action: 'web_vitals',
              category: 'Performance',
              label: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
            });
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.log('FID observer not supported');
      }

      // CLS (Cumulative Layout Shift)
      let clsScore = 0;
      try {
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          });
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Відправляємо CLS при закритті сторінки
        window.addEventListener('beforeunload', () => {
          event({
            action: 'web_vitals',
            category: 'Performance',
            label: 'CLS',
            value: Math.round(clsScore * 1000),
          });
        });
      } catch (e) {
        console.log('CLS observer not supported');
      }
    }

    // Відстеження часу завантаження
    if (
      typeof window !== 'undefined' &&
      window.performance &&
      window.performance.timing
    ) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const timing = window.performance.timing;
          const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
          const domReadyTime =
            timing.domContentLoadedEventEnd - timing.navigationStart;
          const renderTime = timing.domComplete - timing.domLoading;

          event({
            action: 'page_timing',
            category: 'Performance',
            label: 'page_load',
            value: pageLoadTime,
          });

          event({
            action: 'page_timing',
            category: 'Performance',
            label: 'dom_ready',
            value: domReadyTime,
          });

          event({
            action: 'page_timing',
            category: 'Performance',
            label: 'render',
            value: renderTime,
          });
        }, 0);
      });
    }
  }, []);
};

// Хук для A/B тестування
export const useABTesting = (testName: string, variants: string[]) => {
  const [variant, setVariant] = useState<string>('');

  useEffect(() => {
    // Визначаємо варіант на основі збережених даних або випадково
    let selectedVariant = localStorage.getItem(`ab_test_${testName}`);

    if (!selectedVariant) {
      selectedVariant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem(`ab_test_${testName}`, selectedVariant);
    }

    setVariant(selectedVariant);

    // Відстежуємо участь в тесті
    event({
      action: 'ab_test_participation',
      category: 'AB Testing',
      label: `${testName} - ${selectedVariant}`,
    });

    // Відправляємо в GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'ab_test',
        testName,
        variant: selectedVariant,
      });
    }
  }, [testName, variants]);

  const trackConversion = (conversionType: string) => {
    event({
      action: 'ab_test_conversion',
      category: 'AB Testing',
      label: `${testName} - ${variant} - ${conversionType}`,
    });
  };

  return { variant, trackConversion };
};

// Приклад використання в компоненті
/*
import { useSectionTracking, useClickTracking, useInteractionTracking } from '@/hooks/useAnalytics';

export default function ExampleComponent() {
  const sectionRef = useSectionTracking('example_section');
  const trackClick = useClickTracking('button_click', 'UI');
  const { trackHover, trackShare } = useInteractionTracking();

  return (
    <section ref={sectionRef}>
      <button 
        onClick={() => trackClick('example_button')}
        onMouseEnter={() => trackHover('example_button')}
      >
        Click Me
      </button>
      <button onClick={() => trackShare('twitter', 'landing_page')}>
        Share on Twitter
      </button>
    </section>
  );
}
*/
