"use client"

import type React from "react"

import { useEffect, useRef, type RefObject } from "react"
import type { ChatMessage } from "@/lib/types"
import { LucideMinus, LucideSend, LucideMessageCircle } from "lucide-react"

interface ChatbotWindowProps {
  isOpen: boolean
  theme: string
  position: string
  primaryColor: string
  messages: ChatMessage[]
  isTyping: boolean
  onClose: () => void
  onSendMessage: (message: string) => void
  inputRef: RefObject<HTMLInputElement>
}

export default function ChatbotWindow({
  isOpen,
  theme,
  position,
  primaryColor,
  messages,
  isTyping,
  onClose,
  onSendMessage,
  inputRef,
}: ChatbotWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // 스크롤 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // 메시지가 추가되거나 타이핑 상태가 변경될 때 스크롤
  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isTyping, isOpen])

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (inputRef.current && inputRef.current.value.trim()) {
      onSendMessage(inputRef.current.value)
      inputRef.current.value = ""
    }
  }

  // 입력 필드 키 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed bottom-20 w-80 sm:w-96 h-96 rounded-lg shadow-xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
        position === "bottom-left" ? "origin-bottom-left" : "origin-bottom-right"
      } ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
      style={{
        [position === "bottom-right" ? "right" : "left"]: "0",
        transform: isOpen ? "scale(1)" : "scale(0.9)",
        opacity: isOpen ? 1 : 0,
      }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <LucideMessageCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-medium text-white">고객 지원</h3>
        </div>
        <button onClick={onClose} className="text-white focus:outline-none" aria-label="챗봇 최소화">
          <LucideMinus className="w-5 h-5" />
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className={`flex-1 p-4 overflow-y-auto ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        {messages.map((message) => (
          <div key={message.id} className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] py-2 px-4 rounded-lg ${
                message.role === "user"
                  ? `text-white rounded-br-none`
                  : `${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} rounded-bl-none`
              }`}
              style={{
                backgroundColor: message.role === "user" ? primaryColor : undefined,
              }}
            >
              {message.content}
            </div>
          </div>
        ))}

        {/* 타이핑 표시 */}
        {isTyping && (
          <div className="flex mb-3">
            <div className={`py-2 px-4 rounded-lg rounded-bl-none ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <div className="flex space-x-1">
                <div className="chatbot-typing-dot"></div>
                <div className="chatbot-typing-dot"></div>
                <div className="chatbot-typing-dot"></div>
              </div>
            </div>
          </div>
        )}

        {/* 스크롤 참조 */}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`p-4 border-t ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
      >
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            placeholder="메시지를 입력하세요..."
            className={`flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                : "bg-white border-gray-300 text-gray-800 focus:ring-indigo-500"
            }`}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-r-lg focus:outline-none disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            <LucideSend className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
