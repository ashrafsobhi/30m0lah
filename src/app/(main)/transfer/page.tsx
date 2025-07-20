'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { transferAction } from './actions';

export default function TransferPage() {
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();
    const formRef = React.useRef<HTMLFormElement>(null);
    const [wallet, setWallet] = React.useState('');


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
             const data = {
                recipient: formData.get('recipient') as string,
                amount: formData.get('amount') as string,
                wallet: wallet,
                notes: formData.get('notes') as string,
             };
             const result = await transferAction(data);
             if (result.success) {
                toast({
                    title: "طلبك قيد التنفيذ",
                    description: result.message,
                });
                formRef.current?.reset();
                setWallet('');
            } else {
                 toast({
                    title: "حدث خطأ",
                    description: result.message,
                    variant: 'destructive'
                });
            }
        });
    };

    return (
        <div>
            <PageHeader
                title="تحويل أموال"
                description="أرسل الأموال بأمان إلى أي محفظة إلكترونية في مصر."
            />
            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} ref={formRef}>
                    <CardHeader>
                        <CardTitle className='font-headline'>تحويل جديد</CardTitle>
                        <CardDescription>أدخل تفاصيل المستلم والمبلغ المراد إرساله.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="recipient">رقم موبايل المستلم</Label>
                            <Input id="recipient" name="recipient" type="tel" placeholder="مثال: 01xxxxxxxxx" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">المبلغ (ج.م)</Label>
                                <Input id="amount" name="amount" type="number" placeholder="0.00" required min="1" step="0.01" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="wallet">مزود المحفظة</Label>
                                <Select name="wallet" required value={wallet} onValueChange={setWallet}>
                                    <SelectTrigger id="wallet">
                                        <SelectValue placeholder="اختر مزود الخدمة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="فودافون كاش">فودافون كاش</SelectItem>
                                        <SelectItem value="اتصالات كاش">اتصالات كاش</SelectItem>
                                        <SelectItem value="أورنچ موني">أورنچ موني</SelectItem>
                                        <SelectItem value="WE Pay">WE Pay</SelectItem>
                                        <SelectItem value="أخرى">أخرى</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                            <Textarea id="notes" name="notes" placeholder="اكتب ملاحظة..." />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full md:w-auto mr-auto" disabled={isPending}>
                             {isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Send className="ml-2 h-4 w-4" />}
                            تحويل الآن
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
