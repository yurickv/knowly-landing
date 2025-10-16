import { google } from 'googleapis';

export interface ContactFormData {
  name: string;
  company: string;
  contact: string;
  painPoint?: string;
}

export async function sendToGoogleSheets(data: ContactFormData) {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);

  // 🔒 Використовуємо сучасний метод JWT замість deprecated `fromJSON`
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  // 🕓 Формат дати у вигляді "dd.MM.yyyy HH:mm"
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
