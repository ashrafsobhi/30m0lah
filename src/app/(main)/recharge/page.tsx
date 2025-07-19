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
            title: "Recharge Successful",
            description: "The mobile number has been recharged.",
        });
        (event.target as HTMLFormElement).reset();
    };

    return (
        <div>
            <PageHeader
                title="Mobile Recharge"
                description="Top up your mobile balance instantly."
            />
            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className='font-headline'>Direct Recharge</CardTitle>
                        <CardDescription>Enter the mobile number and amount to recharge.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="recipient">Mobile Number</Label>
                            <Input id="recipient" type="tel" placeholder="e.g., 01xxxxxxxxx" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (EGP)</Label>
                                <Input id="amount" type="number" placeholder="e.g., 50" required min="5" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="network">Mobile Network</Label>
                                <Select required>
                                    <SelectTrigger id="network">
                                        <SelectValue placeholder="Select a network" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vodafone">Vodafone</SelectItem>
                                        <SelectItem value="orange">Orange</SelectItem>
                                        <SelectItem value="etisalat">Etisalat</SelectItem>
                                        <SelectItem value="we">WE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full md:w-auto ml-auto">
                            <Smartphone className="mr-2 h-4 w-4" />
                            Recharge Now
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
