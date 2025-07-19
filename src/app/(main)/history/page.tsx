import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockTransactions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
                    <Download className="ml-2 h-4 w-4" />
                    تصدير
                </Button>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline'>جميع المعاملات</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>التاريخ</TableHead>
                                    <TableHead>الوصف</TableHead>
                                    <TableHead>النوع</TableHead>
                                    <TableHead>الحالة</TableHead>
                                    <TableHead className="text-left">المبلغ (ج.م)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTransactions.map((tx) => {
                                  const statusInfo = statusMap[tx.status];
                                  return (
                                    <TableRow key={tx.id}>
                                        <TableCell className="font-medium whitespace-nowrap">{tx.date}</TableCell>
                                        <TableCell>{tx.description}</TableCell>
                                        <TableCell>{tx.type}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusInfo.variant} 
                                            className={cn(statusInfo.className)}>
                                                {statusInfo.text}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={cn(
                                            'text-left font-semibold font-code',
                                            tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                                        )}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                  )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
