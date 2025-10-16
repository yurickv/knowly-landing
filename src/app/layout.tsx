import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  metadataBase: new URL('https://www.knowly.com.ua'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://www.knowly.com.ua',
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
  // verification: {
  //   google: 'your-google-verification-code',
  // },
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
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
            screenshot: 'https://www.knowly.com.ua/screenshot.jpg',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '50',
            },
          })}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <ToastContainer position="top-right" autoClose={4000} />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=${gtmId}'+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />

        {/* Facebook Pixel */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />

        {/* Google Analytics (через GTM) */}
        <Script
          id="ga-setup"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </body>
    </html>
  );
}
