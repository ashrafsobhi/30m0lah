
'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockTransactions } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Printer } from 'lucide-react';
import { Logo } from '@/components/logo';
import { transactionTypeNames } from '@/lib/transaction-utils';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import React from 'react';

const statusMap: { [key: string]: { text: string, variant: 'default' | 'secondary' | 'destructive', className: string } } = {
  Completed: { text: 'مكتملة', variant: 'default', className: 'bg-green-100 text-green-800' },
  Pending: { text: 'قيد الانتظar', variant: 'secondary', className: 'bg-yellow-100 text-yellow-800' },
  Failed: { text: 'فشلت', variant: 'destructive', className: 'bg-red-100 text-red-800' },
};

export default function InvoicePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const transaction = mockTransactions.find((tx) => tx.id === id);

  if (!transaction) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-lg font-semibold">المعاملة غير موجودة</p>
        <Button onClick={() => router.back()} className="mt-4">العودة للسجل</Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };
  
  const statusInfo = statusMap[transaction.status];

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 print:p-0">
        <style jsx global>{`
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                }
                .no-print {
                    display: none;
                }
                @page {
                    size: A4;
                    margin: 20mm;
                }
            }
        `}</style>

      <Card className="shadow-none border-0 print:shadow-none print:border-0">
        <CardHeader className="text-center space-y-4">
          <Logo className="mx-auto text-foreground" />
          <CardTitle className="font-headline text-2xl">إيصال معاملة</CardTitle>
          <CardDescription>الرقم المرجعي للمعاملة: {transaction.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-t border-b border-dashed py-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">الوصف:</span>
              <span className="font-semibold">{transaction.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">التاريخ:</span>
              <span className="font-semibold">{new Date(transaction.date).toLocaleDateString('ar-EG')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">نوع المعاملة:</span>
              <span className="font-semibold">{transactionTypeNames[transaction.type]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الحالة:</span>
              <Badge variant={statusInfo.variant} className={cn(statusInfo.className, "print:text-black print:border print:border-gray-400")}>{statusInfo.text}</Badge>
            </div>
          </div>
          <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
            <span className="text-lg font-semibold">المبلغ الإجمالي:</span>
            <span className={cn(
                'font-bold text-2xl font-code',
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
            )}>
                {transaction.amount.toFixed(2)}
                <span className="text-sm font-light text-muted-foreground ml-1">ج.م</span>
            </span>
          </div>
          <p className="text-center text-xs text-muted-foreground pt-4">
            شكراً لاستخدامك تطبيق عمولة. هذا إيصال إلكتروني ولا يتطلب توقيع.
          </p>
        </CardContent>
      </Card>
      
      <div className="mt-8 flex justify-center gap-4 no-print">
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowRight className="ml-2 h-4 w-4" />
            رجوع
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="ml-2 h-4 w-4" />
          طباعة الإيصال
        </Button>
      </div>
    </div>
  );
}
