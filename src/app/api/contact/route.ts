// ============================================
// app/api/contact/route.ts
// ============================================
import { NextRequest, NextResponse } from 'next/server';
import { sendToGoogleSheets, ContactFormData } from '@/lib/sendToGoogleSheets';

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // ✅ Базова валідація
    if (!body.telegram) {
      return NextResponse.json(
        { error: "Будь ласка, вкажіть Telegram контакт" },
        { status: 400 }
      );
    }

    // ✅ Перевірка формату Telegram (нік або номер телефону)
    const telegramUsernameRegex = /^@?[a-zA-Z0-9_]{5,32}$/; // Нік з або без @
    const phoneFormatRegex = /^\+?[\d\s\-()]+$/; // Формат номера телефону

    let isValid = false;

    if (telegramUsernameRegex.test(body.telegram)) {
      isValid = true;
    } else if (phoneFormatRegex.test(body.telegram)) {
      // Перевіряємо кількість цифр у номері телефону
      const digitsOnly = body.telegram.replace(/\D/g, '');
      // Мінімум 10 цифр (локальні номери), максимум 15 (міжнародний стандарт E.164)
      isValid = digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Невірний формат Telegram (вкажіть нік або номер телефону)' },
        { status: 400 }
      );
    }

    // Старі перевірки (закоментовано)
    // if (!body.name || !body.company || !body.contact) {
    //   return NextResponse.json(
    //     { error: "Будь ласка, заповніть усі обов'язкові поля" },
    //     { status: 400 }
    //   );
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(body.contact) && !phoneRegex.test(body.contact)) {
    //   return NextResponse.json(
    //     { error: 'Невірний формат email або телефону' },
    //     { status: 400 }
    //   );
    // }

    // Тут можна додати різні інтеграції:

    // 1. Відправка email через SendGrid
    // await sendEmail(body);

    // 2. Збереження в базу даних
    // await saveToDatabase(body);

    // 3. Відправка в CRM (HubSpot, Salesforce)
    // await sendToCRM(body);

    // 4. Відправка в Telegram
    // await sendToTelegram(body);

    // 5. Відправка в Google Sheets
    await sendToGoogleSheets(body);

    // Для демо просто логуємо
    // console.log('Нова заявка:', body);

    return NextResponse.json(
      {
        success: true,
        message: "Дякуємо! Ми зв'яжемося з вами найближчим часом.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing contact form:', error);

    // 🔥 Детальніша обробка помилок Google API
    if (error.code === 403 || error.code === 401) {
      return NextResponse.json(
        { error: 'Помилка авторизації Google API' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}

// ============================================
// Приклад інтеграції з SendGrid
// ============================================
// npm install @sendgrid/mail

/*
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function sendEmail(data: ContactFormData) {
  const msg = {
    to: process.env.CONTACT_EMAIL!,
    from: process.env.FROM_EMAIL!,
    subject: `Нова заявка від ${data.telegram}`,
    html: `
      <h2>Нова заявка з лендінгу</h2>
      <p><strong>Telegram:</strong> ${data.telegram}</p>
      <p><strong>Коментар:</strong></p>
      <p>${data.comment || 'Не вказано'}</p>
    `,
  };

  await sgMail.send(msg);
}
*/

// ============================================
// Приклад інтеграції з Telegram Bot
// ============================================
/*
async function sendToTelegram(data: ContactFormData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;

  const message = `
🔔 Нова заявка з лендінгу!

📱 Telegram: ${data.telegram}
💬 Коментар: ${data.comment || 'Не вказано'}
  `.trim();

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  });
}
*/
