// src/app/(main)/recharge/actions.ts
'use server';

import { sendTelegramMessage } from '@/services/telegram';
import { z } from 'zod';

const RechargeSchema = z.object({
    phoneNumber: z.string().regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح"),
    amount: z.string(),
    network: z.string(),
});

export async function rechargeAction(formData: FormData) {
  try {
    const validatedData = RechargeSchema.parse({
      phoneNumber: formData.get('recipient'),
      amount: formData.get('amount'),
      network: formData.get('network'),
    });

    const { phoneNumber, amount, network } = validatedData;

    const message = `
*عملية شحن رصيد جديدة*
---
*رقم الهاتف*: ${phoneNumber}
*المبلغ*: ${amount} ج.م
*الشركة*: ${network}
    `;

    await sendTelegramMessage(message);

    return { success: true, message: `تم إرسال طلب شحن بقيمة ${amount} جنيه إلى الرقم ${phoneNumber}.` };
  } catch (error) {
    console.error('Error in rechargeAction:', error);
    if (error instanceof z.ZodError) {
        return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: 'فشلت عملية الشحن. يرجى المحاولة مرة أخرى.' };
  }
}
