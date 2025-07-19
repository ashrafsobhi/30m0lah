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

export default function TransferPage() {
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "Transfer Initiated",
            description: "Your money has been sent successfully.",
            variant: 'default',
        });
        (event.target as HTMLFormElement).reset();
    };

    return (
        <div>
            <PageHeader
                title="Transfer Money"
                description="Send money securely to any e-wallet in Egypt."
            />
            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className='font-headline'>New Transfer</CardTitle>
                        <CardDescription>Enter the recipient's details and the amount to send.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="recipient">Recipient's Mobile Number</Label>
                            <Input id="recipient" type="tel" placeholder="e.g., 01xxxxxxxxx" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (EGP)</Label>
                                <Input id="amount" type="number" placeholder="0.00" required min="1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="wallet">Wallet Provider</Label>
                                <Select required>
                                    <SelectTrigger id="wallet">
                                        <SelectValue placeholder="Select a provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                                        <SelectItem value="etisalat">Etisalat Cash</SelectItem>
                                        <SelectItem value="orange">Orange Money</SelectItem>
                                        <SelectItem value="we">WE Pay</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full md:w-auto ml-auto">
                            <Send className="mr-2 h-4 w-4" />
                            Send Money
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
