import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="max-w-md mx-auto w-full bg-white flex flex-col h-screen">
        <div className="flex items-center p-4 border-b">
          <Button variant="ghost" className="p-2">
            <span className="text-2xl">←</span>
          </Button>
          <div className="flex-1"></div>
          <Button variant="ghost" className="p-2">
            <span className="text-2xl">⤢</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
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
                <Button className="bg-white text-black hover:bg-gray-100 rounded-md w-full mt-2">
                  고객 프로필 입력
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex items-center">
            <Button variant="ghost" className="rounded-full p-2 mr-2">
              <span className="text-xl">+</span>
            </Button>
            <Input placeholder="메시지를 입력해주세요." className="rounded-full" />
            <Button variant="ghost" className="rounded-full p-2 ml-2">
              <span className="text-xl">➡️</span>
            </Button>
          </div>
        </div>

        {/* <div className="text-center py-2 text-sm text-gray-500 bg-gray-100">
          POWERED BY <span className="font-semibold">🗣️Happytalk</span>
        </div> */}
      </div>
    </div>
  )
}
