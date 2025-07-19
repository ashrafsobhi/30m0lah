'use client';
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Flame, Droplets, Zap, Wifi, Phone, Landmark, Loader2 } from 'lucide-react';
import { payBillAction } from './actions';

const billServices = [
    { name: 'الكهرباء', icon: <Zap className="h-8 w-8" /> },
    { name: 'المياه', icon: <Droplets className="h-8 w-8" /> },
    { name: 'الغاز', icon: <Flame className="h-8 w-8" /> },
    { name: 'الإنترنت', icon: <Wifi className="h-8 w-8" /> },
    { name: 'الموبايل', icon: <Phone className="h-8 w-8" /> },
    { name: 'خدمات حكومية', icon: <Landmark className="h-8 w-8" /> },
];

export default function BillsPage() {
    const [selectedService, setSelectedService] = React.useState<string | null>(null);
    const [isPending, startTransition] = React.useTransition();
    const { toast } = useToast();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition(async () => {
            const formData = new FormData(event.currentTarget);
            formData.append('service', selectedService!);
            const result = await payBillAction(formData);

            if (result.success) {
                toast({
                    title: "تم إرسال الطلب بنجاح",
                    description: result.message,
                });
                setSelectedService(null);
            } else {
                toast({
                    title: "حدث خطأ",
                    description: result.message,
                    variant: 'destructive',
                });
            }
        });
    };

    return (
        <div>
            <PageHeader
                title="دفع الفواتير"
                description="ادفع جميع فواتيرك بسهولة من مكان واحد."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {billServices.map((service) => (
                    <Card key={service.name} className="flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary" onClick={() => setSelectedService(service.name)}>
                        <div className="mb-4 text-primary">{service.icon}</div>
                        <h3 className="font-semibold font-headline">{service.name}</h3>
                    </Card>
                ))}
            </div>

            <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className='font-headline'>دفع فاتورة {selectedService}</DialogTitle>
                            <DialogDescription>
                                أدخل تفاصيل الفاتورة لإتمام عملية الدفع.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="my-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">رقم الحساب / المشترك</Label>
                                <Input id="accountNumber" name="accountNumber" type="text" placeholder="أدخل الرقم" required />
                            </div>
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
                                ادفع الآن
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
