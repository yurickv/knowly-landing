import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from '@/components/GoogleTagManager';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap', // швидше показує текст
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'AI-Асистент для вашої команди | Автоматизація робочих процесів',
  description:
    'Отримуйте миттєві відповіді на робочі запитання та автоматично створюйте інструкції з досвіду ваших співробітників. Безкоштовний пробний період 30 днів.',
  keywords:
    'AI асистент, автоматизація, Telegram бот, база знань, управління знаннями, корпоративний чат-бот',
  authors: [{ name: 'AI-Асистент' }],
  creator: 'AI-Асистент',
  publisher: 'AI-Асистент',
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://yourdomain.com',
    title: 'AI-Асистент для вашої команди',
    description:
      'Отримуйте миттєві відповіді на робочі запитання та автоматично створюйте інструкції з досвіду ваших співробітників',
    siteName: 'AI-Асистент',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI-Асистент для бізнесу',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Асистент для вашої команди',
    description: 'Автоматизуйте відповіді на робочі запитання за допомогою AI',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="uk">
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* Structured Data для SEO */}
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'AI-Асистент',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'UAH',
              description: 'Безкоштовний пробний період 30 днів',
            },
            operatingSystem: 'Web, Telegram',
            description:
              'AI-асистент для автоматизації відповідей на робочі запитання',
            screenshot: 'https://yourdomain.com/screenshot.jpg',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '50',
            },
          })}
        </Script>
      </head>
      <body className={inter.className}>
        {gtmId && <GoogleTagManagerNoScript gtmId={gtmId} />}
        {children}
      </body>
    </html>
  );
}
