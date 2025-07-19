// src/app/(main)/transfer/actions.ts
'use server';

import { sendTelegramMessage } from '@/services/telegram';
import { z } from 'zod';

const TransferSchema = z.object({
    recipient: z.string().regex(/^01[0125][0-9]{8}$/, "رقم المستلم غير صحيح"),
    amount: z.string(),
    wallet: z.string(),
    notes: z.string().optional(),
});

export async function transferAction(formData: FormData) {
  try {
    const validatedData = TransferSchema.parse({
      recipient: formData.get('recipient'),
      amount: formData.get('amount'),
      wallet: formData.get('wallet'),
      notes: formData.get('notes'),
    });

    const { recipient, amount, wallet, notes } = validatedData;

    const message = `
*عملية تحويل أموال جديدة*
---
*إلى رقم*: ${recipient}
*المبلغ*: ${amount} ج.م
*مزود المحفظة*: ${wallet}
*ملاحظات*: ${notes || 'لا يوجد'}
    `;

    await sendTelegramMessage(message);

    return { success: true, message: `تم إرسال طلب تحويل بقيمة ${amount} جنيه إلى الرقم ${recipient}.` };
  } catch (error) {
    console.error('Error in transferAction:', error);
    if (error instanceof z.ZodError) {
        return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: 'فشلت عملية التحويل. يرجى المحاولة مرة أخرى.' };
  }
}
