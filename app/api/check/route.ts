// app/api/check/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { carName, year, type } = await req.json();

  const prompt = `
차량명: ${carName}
연식: ${year}
차량 타입: ${type}

위 차량이 차량 콘솔쿠션과 호환 가능한지 알려줘.
호환된다면 이유를, 불가능하다면 그 이유도 설명해줘.
`;

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
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.statusText}`);
  }

  const data = await response.json();
  const message = data?.content?.[0]?.text || '응답을 가져오지 못했습니다.';

  return NextResponse.json({ result: message });
}
