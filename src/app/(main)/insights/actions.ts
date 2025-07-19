'use server';

import { getSpendingInsights, SpendingInsightsOutput } from '@/ai/flows/spending-insights';
import { mockTransactions } from '@/lib/mock-data';

export async function generateInsightsAction(): Promise<SpendingInsightsOutput | { error: string }> {
  try {
    const transactionHistoryString = mockTransactions
      .map(
        (t) =>
          `Date: ${t.date}, Description: ${t.description}, Amount: ${t.amount.toFixed(2)} EGP, Category: ${t.category}`
      )
      .join('\n');

    const insights = await getSpendingInsights({
      transactionHistory: transactionHistoryString,
    });
    
    return insights;

  } catch (error) {
    console.error('Error generating insights:', error);
    return { error: 'Failed to generate spending insights. Please try again.' };
  }
}
