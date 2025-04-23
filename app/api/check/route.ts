import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.CLAUDE_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 300,
      messages: [{ role: 'user', content: message }],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ result: 'API 호출에 실패했습니다.' });
  }

  const data = await response.json();
  const messageText = data?.content?.[0]?.text || '응답을 가져오지 못했습니다.';

  return NextResponse.json({ result: messageText });
}
