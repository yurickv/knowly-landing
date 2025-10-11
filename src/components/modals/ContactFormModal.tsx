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
import { trackFormSubmit, event } from '@/lib/analytics';

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  company: string;
  contact: string;
  painPoint: string;
}

export default function ContactFormModal({
  open,
  onOpenChange,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    contact: '',
    painPoint: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Відстеження відкриття модалки
  const handleModalOpen = (isOpen: boolean) => {
    if (isOpen) {
      event({
        action: 'modal_opened',
        category: 'Contact Form',
        label: 'Contact Form Opened',
      });
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!formData.name || !formData.company || !formData.contact) {
      setError("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Помилка відправки форми');
      }

      // Відстеження успішної відправки
      trackFormSubmit(formData);

      alert(data.message || "Дякуємо! Ми зв'яжемося з вами найближчим часом.");

      onOpenChange(false);
      setFormData({ name: '', company: '', contact: '', painPoint: '' });
      setError(null);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Помилка відправки форми. Спробуйте ще раз.'
      );

      // Відстеження помилки
      event({
        action: 'form_error',
        category: 'Contact Form',
        label: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (error) setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleModalOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Отримати демо
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">
              Ім'я <span className="text-red-600">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ваше ім'я"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">
              Компанія <span className="text-red-600">*</span>
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Назва компанії"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">
              Email / Телефон <span className="text-red-600">*</span>
            </Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              placeholder="your@email.com або +380..."
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="painPoint">Найбільший Ваш головний біль</Label>
            <Textarea
              id="painPoint"
              value={formData.painPoint}
              onChange={(e) => handleChange('painPoint', e.target.value)}
              placeholder="Розкажіть про вашу найбільшу проблему з управлінням знаннями..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Відправка...
              </>
            ) : (
              <>
                Отримати демо
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
