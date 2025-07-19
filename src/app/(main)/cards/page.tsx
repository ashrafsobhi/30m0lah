'use client';
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Loader2, Send } from 'lucide-react';
import { buyCardAction } from './actions';

const cardDenominations = [5, 10, 15, 25, 50, 100];

export default function BuyCardsPage() {
    const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
    const [isPending, startTransition] = React.useTransition();
    const { toast } = useToast();

    const handleCardClick = (value: number) => {
        setSelectedCard(value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition(async () => {
            const formData = new FormData(event.currentTarget);
            formData.append('cardValue', String(selectedCard));
            
            const result = await buyCardAction(formData);
            if (result.success) {
                toast({
                    title: "تم إرسال الطلب بنجاح",
                    description: result.message,
                });
                setSelectedCard(null);
            } else {
                toast({
                    title: "حدث خطأ",
                    description: result.message,
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <div>
            <PageHeader
                title="شراء كروت شحن"
                description="اشترِ كروت شحن الموبايل فوراً."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cardDenominations.map((value) => (
                    <Card key={value} className="text-center cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary" onClick={() => handleCardClick(value)}>
                        <CardHeader>
                            <CardTitle className='font-headline text-3xl text-primary'>{value}</CardTitle>
                            <CardDescription>جنيه</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">شراء الآن</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className='font-headline'>إرسال كارت شحن بقيمة {selectedCard} جنيه</DialogTitle>
                            <DialogDescription>
                                أدخل رقم الهاتف الذي سيتم إرسال الكارت إليه.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="my-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                                <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="01xxxxxxxxx" required />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost" disabled={isPending}>إلغاء</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                <Send className="ml-2 h-4 w-4" />
                                إرسال
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
