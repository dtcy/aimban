import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  const db = `
  1. 방석 호환 가능한가요? 
  답변 : 방석 상품의 경우, 범용으로 준비되어 차종별로 나뉘는게 아닌 사이즈를 참고하시어 주문 권장드립니다
  시트와 등판 사이에 손을 넣어 보셨을 때 방석을 고정할 수 있는 H고리를 장착할 공간이 있으면 제품 이용이 가능합니다.
  제품 사이즈 안내해드릴테니 고객님 차량의 시트 실측해보신 후 구매하시는 것을 권장해드립니다.
  *프리시트 2세대 : 가로 50CM X 세로 53CM X 높이 7CM (쿠션 두께 2.5CM-마름모 센터기준)
  * 슬림방석 : 가로 54CM X 세로 52CM X 높이 1.2CM(쿠션 두께)

  6. 질문1. OO 차량과 OO 차량의 헤드레스트 호환이 가능한가요?
  질문 2. 원래 타던 차량이 아반떼 CN7 인데 이번에 차를 GV80 차량으로 변경하게 되었습니다. 기존에 아임반 헤드레스트 목쿠션을 구매하여 사용하고 있는데 새로 구매한 차량에 호환이 가능할까요?
  답변 : 헤드레스트 차량 간 호환 문의 시 헤드레스트의 경우 초기 주문시 해당 차량에 맞게 제작...
  `;

  const prompt = `
  """
  답변을 위한 데이터:
  ${db}
  
  사용자 질문: 
  ${message}

  이 질문에 대해 한국어로 상세히 설명해주세요.
  """`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const messageText = data?.content?.[0]?.text || '응답을 가져오지 못했습니다.';

    return NextResponse.json({ result: messageText });

  } catch (error) {
    return NextResponse.json({ result: 'API 요청 중 오류가 발생했습니다.' });
  }
}
