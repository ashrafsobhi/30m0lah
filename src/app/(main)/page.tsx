import { ArrowRightLeft, CreditCard, Download, Smartphone, Receipt, History, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { FeatureCard } from '@/components/feature-card';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    const features = [
        {
            title: "تحويل أموال",
            description: "أرسل الأموال لأي محفظة في مصر.",
            href: "/transfer",
            icon: <ArrowRightLeft className="h-6 w-6" />,
        },
        {
            title: "شحن رصيد",
            description: "اشحن رصيد أي رقم موبايل مباشرة.",
            href: "/recharge",
            icon: <Smartphone className="h-6 w-6" />,
        },
        {
            title: "شراء كروت",
            description: "اشترِ كروت شحن بفئات مختلفة.",
            href: "/cards",
            icon: <CreditCard className="h-6 w-6" />,
        },
        {
            title: "دفع فواتير",
            description: "ادفع فواتير الكهرباء، المياه، الغاز وغيرها.",
            href: "/bills",
            icon: <Receipt className="h-6 w-6" />,
        },
         {
            title: "سجل المعاملات",
            description: "اطلع على سجل مفصل لكل معاملاتك.",
            href: "/history",
            icon: <History className="h-6 w-6" />,
        },
        {
            title: "تحليلات ذكية",
            description: "احصل على نصائح ذكية لإدارة أموالك.",
            href: "/insights",
            icon: <Sparkles className="h-6 w-6" />,
        },
    ];

    return (
        <div className="space-y-8">
            <PageHeader
                title="أهلاً بك في محفظة عملة"
                description="محفظتك الذكية لجميع خدماتك المالية في مكان واحد."
            />
            
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardDescription>الرصيد الحالي</CardDescription>
                        <CardTitle className="font-headline text-4xl text-primary">
                            ٥,٢٥٠.٧٥
                            <span className="text-lg font-normal text-muted-foreground ml-1">ج.م</span>
                        </CardTitle>
                    </div>
                    <Button>أضف رصيد</Button>
                </CardHeader>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.href}
                        title={feature.title}
                        description={feature.description}
                        href={feature.href}
                        icon={feature.icon}
                    />
                ))}
            </div>
        </div>
    );
}
