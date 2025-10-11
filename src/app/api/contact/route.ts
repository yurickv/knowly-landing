// ============================================
// app/api/contact/route.ts
// ============================================
import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  company: string;
  contact: string;
  painPoint: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Валідація
    if (!body.name || !body.company || !body.contact) {
      return NextResponse.json(
        { error: "Будь ласка, заповніть всі обов'язкові поля" },
        { status: 400 }
      );
    }

    // Валідація email або телефону
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-()]+$/;

    if (!emailRegex.test(body.contact) && !phoneRegex.test(body.contact)) {
      return NextResponse.json(
        { error: 'Невірний формат email або телефону' },
        { status: 400 }
      );
    }

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
  } catch (error) {
    console.error('Error processing contact form:', error);
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
    subject: `Нова заявка від ${data.name} (${data.company})`,
    html: `
      <h2>Нова заявка з лендінгу</h2>
      <p><strong>Ім'я:</strong> ${data.name}</p>
      <p><strong>Компанія:</strong> ${data.company}</p>
      <p><strong>Контакт:</strong> ${data.contact}</p>
      <p><strong>Головний біль:</strong></p>
      <p>${data.painPoint || 'Не вказано'}</p>
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

👤 Ім'я: ${data.name}
🏢 Компанія: ${data.company}
📞 Контакт: ${data.contact}
💬 Головний біль: ${data.painPoint || 'Не вказано'}
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

// ============================================
// Приклад інтеграції з Google Sheets
// ============================================
// npm install googleapis

import { google } from 'googleapis';

async function sendToGoogleSheets(data: ContactFormData) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  // 🕓 Форматуємо дату у вигляді "dd.MM.yyyy HH:mm"
  const now = new Date();
  const formattedDate = now
    .toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '');

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Заявки!A:E',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [
          formattedDate,
          data.name,
          data.company,
          data.contact,
          data.painPoint || '',
        ],
      ],
    },
  });
}

// ============================================
// Приклад інтеграції з базою даних (Prisma)
// ============================================
/*
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function saveToDatabase(data: ContactFormData) {
  await prisma.contactRequest.create({
    data: {
      name: data.name,
      company: data.company,
      contact: data.contact,
      painPoint: data.painPoint,
      createdAt: new Date(),
    },
  });
}
*/
