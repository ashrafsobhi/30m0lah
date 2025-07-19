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
        title="AI Spending Insights"
        description="Let our AI analyze your spending and provide you with smart financial advice."
      />

      {!insights && !isPending && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium font-headline">Ready for your financial check-up?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Click the button to get your personalized spending insights.</p>
          <Button onClick={handleGenerateInsights} className="mt-6">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Insights
          </Button>
        </div>
      )}


      {isPending && (
        <div className="flex items-center justify-center p-12 text-center">
          <Loader2 className="mr-4 h-8 w-8 animate-spin" />
          <div>
            <p className="font-semibold font-headline">Analyzing your transactions...</p>
            <p className="text-sm text-muted-foreground">Our AI is working its magic.</p>
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insights && (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-primary/10 border-primary">
                    <CardHeader>
                        <CardTitle className="font-headline">Predicted Monthly Spend</CardTitle>
                        <CardDescription>An estimate of your total spending for this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-primary">{insights.predictedMonthlySpend.toFixed(2)} <span className="text-xl font-normal">EGP</span></p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">AI Suggestions</CardTitle>
                        <CardDescription>Personalized tips to improve your financial health.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {insights.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start">
                                    <Lightbulb className="h-5 w-5 mr-3 mt-0.5 text-accent shrink-0"/>
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
                    <Sparkles className="mr-2 h-4 w-4" />
                    Regenerate Insights
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}
