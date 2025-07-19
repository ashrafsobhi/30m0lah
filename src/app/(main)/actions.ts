// src/app/(main)/actions.ts
'use server';

import { sendTelegramMessage } from '@/services/telegram';
import { z } from 'zod';

const RequestBalanceSchema = z.object({
  amount: z.string(),
});

export async function requestBalanceAction(formData: FormData) {
  try {
    const validatedData = RequestBalanceSchema.parse({
      amount: formData.get('amount'),
    });

    const { amount } = validatedData;

    const message = `
*طلب إضافة رصيد جديد*
---
*المبلغ المطلوب*: ${amount} ج.م

الرجاء مراجعة الطلب وتحديث الرصيد يدوياً في ملف \`src/lib/balance.ts\`.
    `;

    await sendTelegramMessage(message);

    return { success: true };
  } catch (error) {
    console.error('Error in requestBalanceAction:', error);
    if (error instanceof z.ZodError) {
        return { success: false, message: "المبلغ المدخل غير صالح." };
    }
    return { success: false, message: 'فشل إرسال الطلب. يرجى المحاولة مرة أخرى.' };
  }
}
