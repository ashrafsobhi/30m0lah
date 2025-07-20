import type { TransactionType } from '@/lib/types';
import { ArrowRightLeft, CreditCard, DollarSign, Receipt, ShoppingBag, Smartphone } from 'lucide-react';
import React from 'react';

export const transactionTypeNames: Record<TransactionType, string> = {
    bill: 'دفع فاتورة',
    transfer: 'تحويل',
    recharge: 'شحن رصيد',
    card: 'شراء كارت',
    income: 'دخل',
    purchase: 'شراء',
};

export const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
        case 'bill':
            return <Receipt className="h-6 w-6" />;
        case 'transfer':
            return <ArrowRightLeft className="h-6 w-6" />;
        case 'recharge':
            return <Smartphone className="h-6 w-6" />;
        case 'card':
            return <CreditCard className="h-6 w-6" />;
        case 'income':
            return <DollarSign className="h-6 w-6" />;
        case 'purchase':
            return <ShoppingBag className="h-6 w-6" />;
        default:
            return <DollarSign className="h-6 w-6" />;
    }
}
