import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockTransactions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getTransactionIcon, transactionTypeNames } from '@/lib/transaction-utils';

const statusMap: { [key: string]: { text: string, variant: 'default' | 'secondary' | 'destructive', className: string } } = {
  Completed: { text: 'مكتملة', variant: 'default', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  Pending: { text: 'قيد الانتظار', variant: 'secondary', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  Failed: { text: 'فشلت', variant: 'destructive', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
};


export default function HistoryPage() {
    return (
        <div>
            <PageHeader
                title="سجل المعاملات"
                description="سجل مفصل لجميع أنشطتك المالية."
            >
                <Button variant="outline">
                    <Filter className="ml-2 h-4 w-4" />
                    فلترة
                </Button>
            </PageHeader>
            <div className="space-y-4">
                {mockTransactions.map((tx) => {
                    const statusInfo = statusMap[tx.status];
                    const Icon = getTransactionIcon(tx.type);
                    return (
                        <Card key={tx.id} className="transition-shadow hover:shadow-md">
                           <CardContent className="p-4 flex items-center gap-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                   {Icon}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{tx.description}</p>
                                    <p className="text-sm text-muted-foreground">{tx.date} - {transactionTypeNames[tx.type]}</p>
                                </div>
                                <div className="text-left flex-shrink-0">
                                   <p className={cn(
                                        'font-bold text-lg font-code',
                                        tx.amount > 0 ? 'text-green-600' : 'text-red-600 dark:text-red-500'
                                    )}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                        <span className="text-sm font-light text-muted-foreground ml-1">ج.م</span>
                                    </p>
                                    <Badge variant={statusInfo.variant} className={cn("mt-1 w-full justify-center", statusInfo.className)}>
                                        {statusInfo.text}
                                    </Badge>
                                </div>
                           </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
