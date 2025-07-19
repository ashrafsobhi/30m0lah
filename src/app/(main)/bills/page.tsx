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
import { Flame, Droplets, Zap, Wifi, Phone, Landmark } from 'lucide-react';

const billServices = [
    { name: 'Electricity', icon: <Zap className="h-8 w-8" /> },
    { name: 'Water', icon: <Droplets className="h-8 w-8" /> },
    { name: 'Gas', icon: <Flame className="h-8 w-8" /> },
    { name: 'Internet', icon: <Wifi className="h-8 w-8" /> },
    { name: 'Mobile', icon: <Phone className="h-8 w-8" /> },
    { name: 'Government', icon: <Landmark className="h-8 w-8" /> },
];

export default function BillsPage() {
    const [selectedService, setSelectedService] = React.useState<string | null>(null);
    const { toast } = useToast();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "Payment Successful",
            description: `Your ${selectedService} bill has been paid.`,
        });
        setSelectedService(null);
    };

    return (
        <div>
            <PageHeader
                title="Bill Payments"
                description="Easily pay all your bills from one place."
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
                            <DialogTitle className='font-headline'>Pay {selectedService} Bill</DialogTitle>
                            <DialogDescription>
                                Enter your billing details to complete the payment.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="my-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">Account/Subscriber Number</Label>
                                <Input id="accountNumber" type="text" placeholder="Enter number" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (EGP)</Label>
                                <Input id="amount" type="number" placeholder="0.00" required min="1" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Pay Now</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
