'use client';
import React, { useState, useTransition } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generateInsightsAction } from './actions';
import { Loader2, Sparkles, AlertCircle, Lightbulb } from 'lucide-react';
import { SpendingInsightsOutput } from '@/ai/flows/spending-insights';
import { SpendingChart } from '@/components/charts/spending-chart';

export default function InsightsPage() {
  const [isPending, startTransition] = useTransition();
  const [insights, setInsights] = useState<SpendingInsightsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = () => {
    startTransition(async () => {
      setError(null);
      setInsights(null);
      const result = await generateInsightsAction();
      if ('error' in result) {
        setError(result.error);
      } else {
        setInsights(result);
      }
    });
  };
  
  const chartData = insights ? Object.entries(insights.spendingCategories).map(([category, amount]) => ({ category, amount })) : [];

  return (
    <div>
      <PageHeader
        title="تحليلات الإنفاق الذكية"
        description="دع الذكاء الاصطناعي يحلل إنفاقك ويقدم لك نصائح مالية ذكية."
      />

      {!insights && !isPending && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium font-headline">هل أنت جاهز لفحصك المالي؟</h3>
          <p className="mt-1 text-sm text-muted-foreground">اضغط على الزر للحصول على تحليلات مخصصة لإنفاقك.</p>
          <Button onClick={handleGenerateInsights} className="mt-6">
            <Sparkles className="ml-2 h-4 w-4" />
            توليد التحليلات
          </Button>
        </div>
      )}


      {isPending && (
        <div className="flex items-center justify-center p-12 text-center">
          <Loader2 className="mr-4 h-8 w-8 animate-spin" />
          <div>
            <p className="font-semibold font-headline">جاري تحليل معاملاتك...</p>
            <p className="text-sm text-muted-foreground">الذكاء الاصطناعي يقوم بسحره.</p>
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insights && (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-primary/10 border-primary">
                    <CardHeader>
                        <CardTitle className="font-headline">الإنفاق الشهري المتوقع</CardTitle>
                        <CardDescription>تقدير لإجمالي إنفاقك لهذا الشهر.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-primary">{insights.predictedMonthlySpend.toFixed(2)} <span className="text-xl font-normal">ج.م</span></p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">نصائح الذكاء الاصطناعي</CardTitle>
                        <CardDescription>نصائح شخصية لتحسين صحتك المالية.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {insights.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start">
                                    <Lightbulb className="h-5 w-5 ml-3 mt-0.5 text-accent shrink-0"/>
                                    <span>{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <SpendingChart data={chartData} />

             <div className="text-center mt-8">
                <Button onClick={handleGenerateInsights} variant="outline">
                    <Sparkles className="ml-2 h-4 w-4" />
                    إعادة توليد التحليلات
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}
