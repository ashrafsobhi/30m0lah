'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Smartphone } from 'lucide-react';
import React from 'react';

export default function RechargePage() {
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "تم الشحن بنجاح",
            description: "تم شحن رصيد رقم الموبايل.",
        });
        (event.target as HTMLFormElement).reset();
    };

    return (
        <div>
            <PageHeader
                title="شحن رصيد الموبايل"
                description="اشحن رصيد موبايلك فوراً."
            />
            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className='font-headline'>شحن مباشر</CardTitle>
                        <CardDescription>أدخل رقم الموبايل والمبلغ المراد شحنه.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="recipient">رقم الموبايل</Label>
                            <Input id="recipient" type="tel" placeholder="مثال: 01xxxxxxxxx" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">المبلغ (ج.م)</Label>
                                <Input id="amount" type="number" placeholder="مثال: 50" required min="5" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="network">شركة المحمول</Label>
                                <Select required>
                                    <SelectTrigger id="network">
                                        <SelectValue placeholder="اختر شركة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vodafone">فودافون</SelectItem>
                                        <SelectItem value="orange">أورنچ</SelectItem>
                                        <SelectItem value="etisalat">اتصالات</SelectItem>
                                        <SelectItem value="we">WE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full md:w-auto mr-auto">
                            <Smartphone className="ml-2 h-4 w-4" />
                            اشحن الآن
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
