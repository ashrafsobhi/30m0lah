import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    className?: string;
}

export function FeatureCard({ icon, title, description, href, className }: FeatureCardProps) {
    return (
        <Link href={href} className="flex">
            <Card className={cn("w-full transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary", className)}>
                <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {icon}
                    </div>
                    <CardTitle className="font-headline">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="mb-4">{description}</CardDescription>
                    <div className="flex items-center text-sm font-semibold text-primary">
                        اذهب إلى {title} <ArrowLeft className="mr-2 h-4 w-4" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
