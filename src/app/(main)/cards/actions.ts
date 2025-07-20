// src/app/(main)/cards/actions.ts
'use server';

import { currentBalance } from '@/lib/balance';
import { sendTelegramMessage } from '@/services/telegram';
import { z } from 'zod';

const BuyCardSchema = z.object({
    cardValue: z.string().transform(Number).pipe(z.number().positive()),
    phoneNumber: z.string().regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح"),
});

export async function buyCardAction(input: unknown) {
  try {
    const validatedData = BuyCardSchema.parse(input);

    const { cardValue, phoneNumber } = validatedData;

    if (currentBalance < cardValue) {
        return { success: false, message: 'رصيدك غير كافٍ لإتمام هذه العملية.' };
    }

    const message = `
*عملية شراء كارت شحن جديدة*
---
*قيمة الكارت*: ${cardValue} ج.م
*رقم الهاتف*: ${phoneNumber}
    `;

    await sendTelegramMessage(message);

    return { success: true, message: `طلبك قيد التنفيذ، ستصلك رسالة تأكيد.` };
  } catch (error) {
    console.error('Error in buyCardAction:', error);
     if (error instanceof z.ZodError) {
        return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: 'فشلت عملية الشراء. يرجى المحاولة مرة أخرى.' };
  }
}
