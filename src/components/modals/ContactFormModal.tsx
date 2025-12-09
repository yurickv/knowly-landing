'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  telegram: string;
  comment: string;
  // Старі поля (закоментовано)
  // name: string;
  // company: string;
  // contact: string;
  // painPoint: string;
}

// Константи для валідації
const MAX_LENGTHS = {
  telegram: 100,
  comment: 500,
  // Старі ліміти (закоментовано)
  // name: 100,
  // company: 100,
  // contact: 100,
  // painPoint: 500,
};

export default function ContactFormModal({
  open,
  onOpenChange,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    telegram: '',
    comment: '',
    // Старі поля (закоментовано)
    // name: '',
    // company: '',
    // contact: '',
    // painPoint: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<FormData>>({});

  // Функція валідації Telegram (нік або номер телефону)
  const validateTelegram = (telegram: string) => {
    // Нік Telegram: з або без @, від 5 до 32 символів
    const telegramUsernameRegex = /^@?[a-zA-Z0-9_]{5,32}$/;

    // Номер телефону: перевіряємо формат і кількість цифр
    const phoneFormatRegex = /^\+?[\d\s\-()]+$/;
    if (phoneFormatRegex.test(telegram)) {
      // Видаляємо всі нецифрові символи і перевіряємо довжину
      const digitsOnly = telegram.replace(/\D/g, '');
      // Мінімум 10 цифр (локальні номери), максимум 15 (міжнародний стандарт E.164)
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }

    return telegramUsernameRegex.test(telegram);
  };

  // Старі функції валідації (закоментовано)
  // const validateEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePhone = (phone: string) => {
  //   const phoneRegex = /^\+?3?8?0?\d{9}$/;
  //   return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
  // };

  // const validateContact = (contact: string) => {
  //   return validateEmail(contact) || validatePhone(contact);
  // };

  // Відстеження відкриття модалки
  const handleModalOpen = (isOpen: boolean) => {
    if (!isOpen) {
      // Очищаємо помилки при закритті
      setFieldErrors({});
      setError(null);
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async () => {
    setError(null);
    const errors: Partial<FormData> = {};

    // Валідація полів
    if (!formData.telegram) {
      errors.telegram = "Telegram є обов'язковим";
    } else if (formData.telegram.length > MAX_LENGTHS.telegram) {
      errors.telegram = `Telegram не може бути довшим за ${MAX_LENGTHS.telegram} символів`;
    } else if (!validateTelegram(formData.telegram)) {
      errors.telegram =
        'Введіть коректний Telegram нік (@username) або номер телефону';
    }

    if (formData.comment && formData.comment.length > MAX_LENGTHS.comment) {
      errors.comment = `Коментар не може бути довшим за ${MAX_LENGTHS.comment} символів`;
    }

    // Старі валідації (закоментовано)
    // if (!formData.name) {
    //   errors.name = "Ім'я є обов'язковим";
    // } else if (formData.name.length > MAX_LENGTHS.name) {
    //   errors.name = `Ім'я не може бути довшим за ${MAX_LENGTHS.name} символів`;
    // }

    // if (!formData.company) {
    //   errors.company = "Компанія є обов'язковою";
    // } else if (formData.company.length > MAX_LENGTHS.company) {
    //   errors.company = `Назва компанії не може бути довшою за ${MAX_LENGTHS.company} символів`;
    // }

    // if (!formData.contact) {
    //   errors.contact = "Email або телефон є обов'язковим";
    // } else if (formData.contact.length > MAX_LENGTHS.contact) {
    //   errors.contact = `Контакт не може бути довшим за ${MAX_LENGTHS.contact} символів`;
    // } else if (!validateContact(formData.contact)) {
    //   errors.contact = 'Введіть коректний email або номер телефону';
    // }

    // if (
    //   formData.painPoint &&
    //   formData.painPoint.length > MAX_LENGTHS.painPoint
    // ) {
    //   errors.painPoint = `Опис не може бути довшим за ${MAX_LENGTHS.painPoint} символів`;
    // }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Будь ласка, виправте помилки у формі');
      toast.error('Будь ласка, виправте помилки у формі');
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Помилка відправки форми');
      }

      // GTM
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submit',
          form_name: 'contact_form',
        });
      }

      // Facebook Pixel
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }

      toast.success(
        data.message || "Дякуємо! Ми зв'яжемося з вами найближчим часом."
      );

      onOpenChange(false);
      setFormData({ telegram: '', comment: '' });
      setError(null);
      setFieldErrors({});
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Помилка відправки форми. Спробуйте ще раз.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    // Обмеження довжини вводу
    const maxLength = MAX_LENGTHS[field];
    if (value.length > maxLength) {
      return; // Не дозволяємо вводити більше символів
    }

    setFormData({
      ...formData,
      [field]: value,
    });

    // Очищаємо помилки для поточного поля
    if (fieldErrors[field]) {
      setFieldErrors({
        ...fieldErrors,
        [field]: undefined,
      });
    }
    if (error) setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleModalOpen}>
      <DialogContent className="sm:max-w-[500px] ios-form-fix text-[#0D0746] ">
        {/* Додаємо стилі для фіксу iOS zoom */}
        <style jsx global>{`
          /* Фікс для iOS - забороняємо зум при фокусі на інпутах */
          .ios-form-fix input[type='text'],
          .ios-form-fix input[type='email'],
          .ios-form-fix input[type='tel'],
          .ios-form-fix input[type='number'],
          .ios-form-fix input[type='password'],
          .ios-form-fix input[type='url'],
          .ios-form-fix input:not([type]),
          .ios-form-fix textarea,
          .ios-form-fix select {
            font-size: 16px !important; /* Критично: мінімум 16px для iOS */
            -webkit-text-size-adjust: 100%;
            touch-action: manipulation; /* Забороняє double-tap zoom */
          }

          /* Додаткові стилі для покращення UX на мобільних */
          @media (max-width: 640px) {
            .ios-form-fix {
              -webkit-overflow-scrolling: touch;
            }

            /* Забезпечуємо, що модалка не виходить за межі viewport */
            .ios-form-fix {
              max-height: calc(100vh - 2rem);
              margin: 1rem;
            }
          }

          /* Фікс для Safari - запобігаємо автозаповненню з неправильними стилями */
          .ios-form-fix input:-webkit-autofill,
          .ios-form-fix input:-webkit-autofill:hover,
          .ios-form-fix input:-webkit-autofill:focus,
          .ios-form-fix textarea:-webkit-autofill,
          .ios-form-fix textarea:-webkit-autofill:hover,
          .ios-form-fix textarea:-webkit-autofill:focus {
            -webkit-text-fill-color: inherit;
            transition: background-color 5000s ease-in-out 0s;
            font-size: 16px !important;
          }

          /* Стилі для лічильників символів */
          .ios-form-fix .text-xs {
            transition: color 0.2s ease;
          }

          /* Коли наближається до ліміту */
          .ios-form-fix input:focus ~ .text-xs,
          .ios-form-fix textarea:focus ~ .text-xs {
            color: #6b7280;
          }

          /* Стилі для помилок */
          .ios-form-fix .border-red-500 {
            border-color: #ef4444 !important;
          }

          .ios-form-fix .border-red-500:focus {
            outline-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
          }
        `}</style>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Забронювати демо
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="telegram">
                Telegram <span className="text-red-600">*</span>
              </Label>
            </div>
            <Input
              id="telegram"
              type="text"
              value={formData.telegram}
              onChange={(e) => handleChange('telegram', e.target.value)}
              placeholder="@username або +380XXXXXXXXX"
              disabled={isSubmitting}
              required
              autoComplete="off"
              className={`text-base ${
                fieldErrors.telegram ? 'border-red-500' : ''
              }`}
              maxLength={MAX_LENGTHS.telegram}
            />
            {fieldErrors.telegram && (
              <p className="text-sm text-red-600 mt-1">
                {fieldErrors.telegram}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="comment">Коментар</Label>
            </div>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
              placeholder="Поділіться Вашою проблемою"
              rows={4}
              disabled={isSubmitting}
              className={`text-base resize-none ${
                fieldErrors.comment ? 'border-red-500' : ''
              }`}
              maxLength={MAX_LENGTHS.comment}
            />
            {fieldErrors.comment && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.comment}</p>
            )}
          </div>

          {/* Старі поля (закоментовано) */}
          {/* <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="name">
                Ім'я
              </Label>
            </div>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ваше ім'я"
              disabled={isSubmitting}
              required
              autoComplete="name"
              className={`text-base ${
                fieldErrors.name ? 'border-red-500' : ''
              }`}
              maxLength={MAX_LENGTHS.name}
            />
            {fieldErrors.name && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>
            )}
          </div> */}

          {/* <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="company">
                Компанія
              </Label>
            </div>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Назва компанії"
              disabled={isSubmitting}
              required
              autoComplete="organization"
              className={`text-base ${
                fieldErrors.company ? 'border-red-500' : ''
              }`}
              maxLength={MAX_LENGTHS.company}
            />
            {fieldErrors.company && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.company}</p>
            )}
          </div> */}

          {/* <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="contact">
                Email / Телефон <span className="text-red-600">*</span>
              </Label>
            </div>
            <Input
              id="contact"
              type="text"
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              placeholder="your@email.com або +380..."
              disabled={isSubmitting}
              required
              autoComplete="email"
              className={`text-base ${
                fieldErrors.contact ? 'border-red-500' : ''
              }`}
              inputMode="email"
              maxLength={MAX_LENGTHS.contact}
            />
            {fieldErrors.contact && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.contact}</p>
            )}
          </div> */}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#150D5E] hover:bg-[#534D8C] text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Відправка...
              </>
            ) : (
              <>
                Забронювати демо
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Натискаючи кнопку, ви погоджуєтесь з{' '}
            <a href="/privacy" className="underline hover:text-gray-700">
              політикою конфіденційності
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
