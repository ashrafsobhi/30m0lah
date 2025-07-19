import { ArrowRightLeft, CreditCard, History, Receipt, Smartphone, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { FeatureCard } from '@/components/feature-card';

export default function DashboardPage() {
    const features = [
        {
            title: "Transfer Money",
            description: "Send money to any e-wallet in Egypt.",
            href: "/transfer",
            icon: <ArrowRightLeft className="h-6 w-6" />,
        },
        {
            title: "Mobile Recharge",
            description: "Directly top-up any mobile number.",
            href: "/recharge",
            icon: <Smartphone className="h-6 w-6" />,
        },
        {
            title: "Buy Cards",
            description: "Purchase recharge cards of various values.",
            href: "/cards",
            icon: <CreditCard className="h-6 w-6" />,
        },
        {
            title: "Bill Payments",
            description: "Pay for electricity, water, gas, and more.",
            href: "/bills",
            icon: <Receipt className="h-6 w-6" />,
        },
        {
            title: "Transaction History",
            description: "View a detailed record of all your transactions.",
            href: "/history",
            icon: <History className="h-6 w-6" />,
        },
        {
            title: "AI Spending Insights",
            description: "Get smart suggestions to manage your finances.",
            href: "/insights",
            icon: <Sparkles className="h-6 w-6" />,
        },
    ];

    return (
        <div>
            <PageHeader
                title="Welcome to 3omla Wallet"
                description="Your smart e-wallet for all daily financial services in one place."
            />
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
