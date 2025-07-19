// src/app/(main)/cards/actions.ts
'use server';

import { sendTelegramMessage } from '@/services/telegram';
import { z } from 'zod';

const BuyCardSchema = z.object({
    cardValue: z.string(),
    phoneNumber: z.string().regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح"),
});

export async function buyCardAction(formData: FormData) {
  try {
    const validatedData = BuyCardSchema.parse({
      cardValue: formData.get('cardValue'),
      phoneNumber: formData.get('phoneNumber'),
    });

    const { cardValue, phoneNumber } = validatedData;

    const message = `
*عملية شراء كارت شحن جديدة*
---
*قيمة الكارت*: ${cardValue} ج.م
*رقم الهاتف*: ${phoneNumber}
    `;

    await sendTelegramMessage(message);

    return { success: true, message: `تم إرسال طلب شراء كارت بقيمة ${cardValue} جنيه.` };
  } catch (error) {
    console.error('Error in buyCardAction:', error);
     if (error instanceof z.ZodError) {
        return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: 'فشلت عملية الشراء. يرجى المحاولة مرة أخرى.' };
  }
}
