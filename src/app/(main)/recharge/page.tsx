'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Smartphone, Loader2 } from 'lucide-react';
import React from 'react';
import { rechargeAction } from './actions';

export default function RechargePage() {
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        startTransition(async () => {
            const result = await rechargeAction(formData);
            if (result.success) {
                toast({
                    title: "طلبك قيد التنفيذ",
                    description: result.message,
                });
                formRef.current?.reset();
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
                title="شحن رصيد الموبايل"
                description="اشحن رصيد موبايلك فوراً."
            />
            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} ref={formRef}>
                    <CardHeader>
                        <CardTitle className='font-headline'>شحن مباشر</CardTitle>
                        <CardDescription>أدخل رقم الموبايل والمبلغ المراد شحنه.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="recipient">رقم الموبايل</Label>
                            <Input id="recipient" name="recipient" type="tel" placeholder="مثال: 01xxxxxxxxx" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">المبلغ (ج.م)</Label>
                                <Input id="amount" name="amount" type="number" placeholder="مثال: 50" required min="5" step="0.01" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="network">شركة المحمول</Label>
                                <Select name="network" required>
                                    <SelectTrigger id="network">
                                        <SelectValue placeholder="اختر شركة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="فودافون">فودافون</SelectItem>
                                        <SelectItem value="أورنچ">أورنچ</SelectItem>
                                        <SelectItem value="اتصالات">اتصالات</SelectItem>
                                        <SelectItem value="WE">WE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full md:w-auto mr-auto" disabled={isPending}>
                            {isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Smartphone className="ml-2 h-4 w-4" />}
                            اشحن الآن
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
