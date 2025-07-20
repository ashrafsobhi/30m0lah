
'use client';

import React from 'react';
import { ArrowRightLeft, CreditCard, Smartphone, Receipt, History, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { FeatureCard } from '@/components/feature-card';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { currentBalance } from '@/lib/balance';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { requestBalanceAction } from './actions';


export default function DashboardPage() {
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const features = [
        {
            title: "تحويل أموال",
            description: "أرسل الأموال لأي محفظة في مصر.",
            href: "/transfer",
            icon: <ArrowRightLeft className="h-6 w-6" />,
        },
        {
            title: "شحن رصيد",
            description: "اشحن رصيد أي رقم موبايل مباشرة.",
            href: "/recharge",
            icon: <Smartphone className="h-6 w-6" />,
        },
        {
            title: "شراء كروت",
            description: "اشترِ كروت شحن بفئات مختلفة.",
            href: "/cards",
            icon: <CreditCard className="h-6 w-6" />,
        },
        {
            title: "دفع فواتير",
            description: "ادفع فواتير الكهرباء، المياه، الغاز وغيرها.",
            href: "/bills",
            icon: <Receipt className="h-6 w-6" />,
        },
         {
            title: "سجل المعاملات",
            description: "اطلع على سجل مفصل لكل معاملاتك.",
            href: "/history",
            icon: <History className="h-6 w-6" />,
        },
        {
            title: "تحليلات ذكية",
            description: "احصل على نصائح ذكية لإدارة أموالك.",
            href: "/insights",
            icon: <Sparkles className="h-6 w-6" />,
        },
    ];

    const formattedBalance = new Intl.NumberFormat('ar-EG', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(currentBalance);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition(async () => {
            const formData = new FormData(event.currentTarget);
            const amount = formData.get('amount') as string;
            const result = await requestBalanceAction({ amount });
            if (result.success) {
                toast({
                    title: "تم إرسال طلبك",
                    description: "طلبك قيد المراجعة الآن.",
                });
                setIsDialogOpen(false);
            } else {
                 toast({
                    title: "حدث خطأ",
                    description: result.message,
                    variant: 'destructive'
                });
            }
        });
    }


    return (
        <div className="space-y-8">
            <PageHeader
                title="أهلاً بك في محفظة عملة"
                description="محفظتك الذكية لجميع الخدمات المالية في مكان واحد."
            />
            
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardDescription>الرصيد الحالي</CardDescription>
                        <CardTitle className="font-headline text-4xl text-primary">
                            {formattedBalance}
                            <span className="text-lg font-normal text-muted-foreground ml-1">ج.م</span>
                        </CardTitle>
                    </div>
                    <Button onClick={() => setIsDialogOpen(true)}>أضف رصيد</Button>
                </CardHeader>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.href}
                        title={feature.title}
                        description={feature.description}
                        href={feature.href}
                        icon={feature.icon}
                    />
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className='font-headline'>طلب إضافة رصيد</DialogTitle>
                            <DialogDescription>
                                أدخل المبلغ الذي تود إضافته إلى رصيدك. ستتم مراجعة طلبك.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="my-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount">المبلغ (ج.م)</Label>
                                <Input id="amount" name="amount" type="number" placeholder="0.00" required min="1" />
                            </div>
                        </div>
                        <DialogFooter>
                             <DialogClose asChild>
                                <Button type="button" variant="ghost" disabled={isPending}>إلغاء</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                إرسال الطلب
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
