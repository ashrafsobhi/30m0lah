'use client';
import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { Copy, Send } from 'lucide-react';

const cardDenominations = [5, 10, 15, 25, 50, 100];

export default function BuyCardsPage() {
    const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
    const [rechargeCode, setRechargeCode] = React.useState<string>('');
    const { toast } = useToast();

    const handleCardClick = (value: number) => {
        const code = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
        setRechargeCode(code);
        setSelectedCard(value);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(rechargeCode);
        toast({ title: "Copied!", description: "Recharge code copied to clipboard." });
    };
    
    const handleSend = () => {
        toast({ title: "Sent!", description: "Recharge code has been sent." });
    };

    return (
        <div>
            <PageHeader
                title="Buy Recharge Cards"
                description="Purchase mobile recharge cards instantly."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cardDenominations.map((value) => (
                    <Card key={value} className="text-center cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary" onClick={() => handleCardClick(value)}>
                        <CardHeader>
                            <CardTitle className='font-headline text-3xl text-primary'>{value}</CardTitle>
                            <CardDescription>EGP</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">Buy Now</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AlertDialog open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='font-headline'>Your Recharge Card</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have purchased a {selectedCard} EGP recharge card.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="my-4 p-4 bg-muted rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Recharge Code</p>
                        <p className="text-2xl font-bold tracking-widest font-code">{rechargeCode.replace(/(\d{4})/g, '$1 ').trim()}</p>
                    </div>
                    <AlertDialogFooter className='gap-2 sm:gap-0'>
                        <Button variant="outline" onClick={handleSend}>
                            <Send className="mr-2 h-4 w-4" />
                            Send to a friend
                        </Button>
                        <Button onClick={handleCopy}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Code
                        </Button>
                        <AlertDialogAction onClick={() => setSelectedCard(null)}>Done</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
