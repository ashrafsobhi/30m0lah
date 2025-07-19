// src/ai/flows/spending-insights.ts
'use server';
/**
 * @fileOverview An AI agent that provides insights into spending habits.
 *
 * - getSpendingInsights - A function that analyzes transaction history and provides spending insights.
 * - SpendingInsightsInput - The input type for the getSpendingInsights function.
 * - SpendingInsightsOutput - The return type for the getSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpendingInsightsInputSchema = z.object({
  transactionHistory: z.string().describe('A detailed history of the user\'s financial transactions, including dates, amounts, and categories.'),
});
export type SpendingInsightsInput = z.infer<typeof SpendingInsightsInputSchema>;

const SpendingInsightsOutputSchema = z.object({
  predictedMonthlySpend: z.number().describe('The predicted monthly spending amount based on the transaction history.'),
  spendingCategories: z.record(z.string(), z.number()).describe('A breakdown of spending by category (e.g., food, transportation, entertainment) and the amount spent in each category.'),
  suggestions: z.array(z.string()).describe('Personalized suggestions for managing finances better, such as reducing spending in certain categories or setting budget limits.'),
});
export type SpendingInsightsOutput = z.infer<typeof SpendingInsightsOutputSchema>;

export async function getSpendingInsights(input: SpendingInsightsInput): Promise<SpendingInsightsOutput> {
  return spendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'spendingInsightsPrompt',
  input: {schema: SpendingInsightsInputSchema},
  output: {schema: SpendingInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's transaction history and provide insights into their spending habits.

Transaction History:
{{{transactionHistory}}}

Based on this transaction history, provide the following:

*   Predicted Monthly Spend: Estimate the user's total spending for the current month.
*   Spending Categories: Identify the main categories where the user spends money and the amount spent in each category.
*   Suggestions: Offer personalized suggestions to help the user manage their finances better, such as reducing spending in certain areas or setting budget limits.

Format your output as a JSON object matching the schema.
`,
});

const spendingInsightsFlow = ai.defineFlow(
  {
    name: 'spendingInsightsFlow',
    inputSchema: SpendingInsightsInputSchema,
    outputSchema: SpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
