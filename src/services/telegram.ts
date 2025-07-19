// src/services/telegram.ts
'use server';

export async function sendTelegramMessage(message: string): Promise<{ ok: boolean }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram bot token or chat ID is not configured in .env file.');
    throw new Error('Telegram service is not configured.');
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    if (!result.ok) {
        console.error('Failed to send Telegram message:', result);
    }
    return { ok: result.ok };
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw new Error('Failed to send message to Telegram.');
  }
}
