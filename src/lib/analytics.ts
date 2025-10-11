export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Відстеження переглядів сторінок
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Відстеження подій
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Також відправляємо в GTM DataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'custom_event',
      eventAction: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    });
  }
};

// Відстеження конверсій
export const trackConversion = (
  eventName: string,
  data?: Record<string, any>
) => {
  // Google Analytics
  event({
    action: eventName,
    category: 'Conversion',
    label: JSON.stringify(data),
  });

  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, data);
  }

  // GTM DataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'conversion',
      conversionType: eventName,
      conversionData: data,
    });
  }
};

// Відстеження кліків на CTA кнопки
export const trackCTAClick = (location: string, buttonText: string) => {
  event({
    action: 'cta_click',
    category: 'Engagement',
    label: `${location} - ${buttonText}`,
  });

  // Facebook Pixel - ViewContent для CTA кліків
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: location,
      content_type: 'cta_button',
    });
  }
};

// Відстеження скролу сторінки
export const trackScrollDepth = (percentage: number) => {
  event({
    action: 'scroll',
    category: 'Engagement',
    label: `${percentage}%`,
    value: percentage,
  });
};

// Відстеження часу на сторінці
export const trackTimeOnPage = (seconds: number) => {
  event({
    action: 'time_on_page',
    category: 'Engagement',
    label: `${seconds} seconds`,
    value: seconds,
  });
};

// Відстеження відправки форми
export const trackFormSubmit = (formData: {
  name: string;
  company: string;
  contact: string;
}) => {
  trackConversion('Lead', {
    content_name: 'Contact Form',
    company: formData.company,
    value: 1,
    currency: 'UAH',
  });

  // Додатково для Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'CompleteRegistration', {
      content_name: 'Demo Request',
      status: true,
    });
  }
};

// Відстеження взаємодії з секціями
export const trackSectionView = (sectionName: string) => {
  event({
    action: 'section_view',
    category: 'Page Interaction',
    label: sectionName,
  });
};
