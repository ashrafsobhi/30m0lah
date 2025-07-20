// src/app/(main)/bills/actions.ts
'use server';

import { currentBalance } from '@/lib/balance';
import { sendTelegramMessage } from '@/services/telegram';
import { z } from 'zod';

const BillPaymentSchema = z.object({
  service: z.string().min(1),
  accountNumber: z.string().min(1),
  amount: z.string().transform(Number).pipe(z.number().positive("المبلغ يجب أن يكون رقماً موجباً")),
});

export async function payBillAction(input: unknown) {
  try {
    const validatedData = BillPaymentSchema.parse(input);

    const { service, accountNumber, amount } = validatedData;
    
    if (currentBalance < amount) {
        return { success: false, message: 'رصيدك غير كافٍ لإتمام هذه العملية.' };
    }

    const message = `
*عملية دفع فاتورة جديدة*
---
*الخدمة*: ${service}
*رقم الحساب*: ${accountNumber}
*المبلغ*: ${amount} ج.م
    `;

    await sendTelegramMessage(message);

    return { success: true, message: `طلبك قيد التنفيذ، ستصلك رسالة تأكيد.` };
  } catch (error) {
    console.error('Error in payBillAction:', error);
    if (error instanceof z.ZodError) {
        return { success: false, message: "البيانات المدخلة غير صالحة." };
    }
    return { success: false, message: 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى.' };
  }
}
