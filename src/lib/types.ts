export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Transfer' | 'Recharge' | 'Bill Payment' | 'Card Purchase' | 'Income';
  category: 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Entertainment' | 'Other' | 'Income';
  status: 'Completed' | 'Pending' | 'Failed';
};
