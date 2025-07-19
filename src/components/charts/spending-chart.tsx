'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface SpendingChartProps {
  data: { category: string; amount: number }[];
}

const chartConfig = {
  amount: {
    label: 'المبلغ (ج.م)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function SpendingChart({ data }: SpendingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">الإنفاق حسب الفئة</CardTitle>
        <CardDescription>
          هنا تفصيل إنفاقك عبر الفئات المختلفة.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={data} layout="vertical" margin={{ right: 20, left: 20 }}>
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80}
            />
             <XAxis type="number" dataKey="amount" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={4} layout="vertical" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
