import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockTransactions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HistoryPage() {
    return (
        <div>
            <PageHeader
                title="Transaction History"
                description="A detailed record of all your financial activities."
            >
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                </Button>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline'>All Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount (EGP)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTransactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell className="font-medium whitespace-nowrap">{tx.date}</TableCell>
                                        <TableCell>{tx.description}</TableCell>
                                        <TableCell>{tx.type}</TableCell>
                                        <TableCell>
                                            <Badge variant={tx.status === 'Completed' ? 'default' : tx.status === 'Pending' ? 'secondary' : 'destructive'} 
                                            className={cn(
                                                tx.status === 'Completed' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                                                tx.status === 'Pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                                                tx.status === 'Failed' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                                            )}>
                                                {tx.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={cn(
                                            'text-right font-semibold',
                                            tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                                        )}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
