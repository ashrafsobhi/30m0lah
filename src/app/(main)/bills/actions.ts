// src/app/(main)/bills/actions.ts
'use server';

import { sendTelegramMessage } from '@/services/telegram';
import { z } from 'zod';

const BillPaymentSchema = z.object({
  service: z.string(),
  accountNumber: z.string(),
  amount: z.string(),
});

export async function payBillAction(formData: FormData) {
  try {
    const validatedData = BillPaymentSchema.parse({
      service: formData.get('service'),
      accountNumber: formData.get('accountNumber'),
      amount: formData.get('amount'),
    });

    const { service, accountNumber, amount } = validatedData;

    const message = `
*عملية دفع فاتورة جديدة*  बिल भुगतान प्रक्रिया
---
*الخدمة*: ${service}
*رقم الحساب*: ${accountNumber}
*المبلغ*: ${amount} ج.م
    `;

    await sendTelegramMessage(message);

    return { success: true, message: `تم دفع فاتورة ${service} بنجاح.` };
  } catch (error) {
    console.error('Error in payBillAction:', error);
    if (error instanceof z.ZodError) {
        return { success: false, message: "البيانات المدخلة غير صالحة." };
    }
    return { success: false, message: 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى.' };
  }
}
