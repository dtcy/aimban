import { Calendar, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatInterface() {
  return (
    <div className="flex flex-col">
      {/* Operating hours section */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center text-blue-600">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="font-medium">평일 00:00~23:59</span>
          <Info className="h-5 w-5 ml-2 text-gray-400" />
        </div>
      </div>

      {/* Chat button section */}
      <div className="bg-white p-6 flex justify-between items-center">
        <Button className="bg-[#0f1d3c] hover:bg-[#1a2d54] text-white rounded-full py-6 px-8 flex items-center">
          <div className="bg-white rounded-full p-1 mr-2">
            <span className="text-[#0f1d3c] text-xl">💬</span>
          </div>
          <span className="text-lg">채팅 상담</span>
        </Button>
        <div className="bg-yellow-300 rounded-full p-4">
          <span className="text-2xl">💬</span>
        </div>
      </div>

      {/* Notice section */}
      <div className="bg-white p-4 mt-2 border-t border-b">
        <h3 className="font-bold text-xl mb-4">공지</h3>
        <p className="py-2">🥤 스타벅스 아메리카노 쿠폰 지급 이벤트</p>
      </div>

      {/* FAQ section */}
      <div className="bg-white p-4 mt-2">
        <h3 className="font-bold text-xl mb-4">자주 묻는 질문</h3>
        <div className="border rounded-lg p-3 mb-4">
          <Input
            placeholder="검색할 단어로 입력해 주세요."
            className="border-0 focus-visible:ring-0"
            // prefix={<span className="text-gray-400">🔍</span>}
          />
        </div>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>📘배송 일정을 확인하고 싶어요</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>🛒주문 상태를 알고 싶어요</span>
          </li>
        </ul>
      </div>

      {/* Chat conversation (second image) */}
      <div className="bg-gray-100 p-4 mt-4 hidden">
        <div className="bg-white rounded-full py-2 px-6 mx-auto w-fit mb-4">
          <span>2025년 4월 23일</span>
        </div>

        <div className="bg-[#0f1d3c] text-white rounded-full py-3 px-6 mx-auto w-fit mb-6">
          <span>1:1 채팅 상담 문의 드립니다.</span>
        </div>

        <div className="flex mb-4">
          <div className="bg-[#0f1d3c] rounded-full w-10 h-10 flex items-center justify-center mr-2">
            <span className="text-white font-bold text-xs">AI</span>
          </div>
          <div>
            <div className="text-sm mb-1">
              <span className="font-bold">아임반</span> <span className="text-gray-500">방금 전</span>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 max-w-xs">
              <p>안녕하세요, 고객님, 아임반 입니다😊</p>
              <p className="mt-2">1 주문자 성함 + 연락처</p>
              <p>2 문의 내용</p>
              <p className="mt-2">위 2가지 정보를 같이 남겨주시면 더욱 빠른 답변 받으실 수 있습니다.</p>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 max-w-xs mt-2">
              <p>빠르고 정확한 상담을 위해 고객님의 프로필을 입력해 주세요 😊</p>
              <Button className="bg-white text-black hover:bg-gray-100 rounded-md w-full mt-2">고객 프로필 입력</Button>
            </div>
          </div>
        </div>

        <div className="flex items-center border-t pt-4 mt-4">
          <Button variant="ghost" className="rounded-full p-2 mr-2">
            <span className="text-xl">+</span>
          </Button>
          <Input placeholder="메시지를 입력해주세요." className="rounded-full" />
          <Button variant="ghost" className="rounded-full p-2 ml-2">
            <span className="text-xl">➡️</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
