export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'تحويل' | 'شحن رصيد' | 'دفع فاتورة' | 'شراء بالبطاقة' | 'دخل';
  category: 'طعام' | 'مواصلات' | 'تسوق' | 'فواتير' | 'ترفيه' | 'أخرى' | 'دخل';
  status: 'Completed' | 'Pending' | 'Failed';
};
