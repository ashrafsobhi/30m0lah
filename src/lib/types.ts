export type TransactionType = 'bill' | 'transfer' | 'recharge' | 'card' | 'income' | 'purchase';

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: 'طعام' | 'مواصلات' | 'تسوق' | 'فواتير' | 'ترفيه' | 'أخرى' | 'دخل';
  status: 'Completed' | 'Pending' | 'Failed';
};
