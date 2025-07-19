'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function TransferPage() {
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "تم إرسال الحوالة",
            description: "تم إرسال أموالك بنجاح.",
            variant: 'default',
        });
        (event.target as HTMLFormElement).reset();
    };

    return (
        <div>
            <PageHeader
                title="تحويل أموال"
                description="أرسل الأموال بأمان إلى أي محفظة إلكترونية في مصر."
            />
            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className='font-headline'>تحويل جديد</CardTitle>
                        <CardDescription>أدخل تفاصيل المستلم والمبلغ المراد إرساله.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="recipient">رقم موبايل المستلم</Label>
                            <Input id="recipient" type="tel" placeholder="مثال: 01xxxxxxxxx" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">المبلغ (ج.م)</Label>
                                <Input id="amount" type="number" placeholder="0.00" required min="1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="wallet">مزود المحفظة</Label>
                                <Select required>
                                    <SelectTrigger id="wallet">
                                        <SelectValue placeholder="اختر مزود الخدمة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vodafone">فودافون كاش</SelectItem>
                                        <SelectItem value="etisalat">اتصالات كاش</SelectItem>
                                        <SelectItem value="orange">أورنچ موني</SelectItem>
                                        <SelectItem value="we">WE Pay</SelectItem>
                                        <SelectItem value="other">أخرى</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                            <Textarea id="notes" placeholder="اكتب ملاحظة..." />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full md:w-auto mr-auto">
                            <Send className="ml-2 h-4 w-4" />
                            تحويل الآن
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
