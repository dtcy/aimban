"use client"

import { useState, useEffect, useRef } from "react"
import type { ChatbotConfig, ChatMessage, ChatSession } from "@/lib/types"
import ChatbotButton from "./ChatbotButton"
import ChatbotWindow from "./ChatbotWindow"

interface ChatbotProps {
  chatbotId: string
  apiUrl: string
  defaultConfig?: Partial<ChatbotConfig>
}

export default function Chatbot({ chatbotId, apiUrl, defaultConfig }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ChatbotConfig>({
    chatbotId,
    theme: defaultConfig?.theme || "light",
    position: defaultConfig?.position || "bottom-right",
    primaryColor: defaultConfig?.primaryColor || "#4f46e5",
    welcomeMessage: defaultConfig?.welcomeMessage || "안녕하세요! 무엇을 도와드릴까요?",
  })
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [session] = useState<ChatSession>({
    id: generateSessionId(),
    startedAt: new Date().toISOString(),
  })
  const [configLoaded, setConfigLoaded] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // 세션 ID 생성
  function generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  // 챗봇 설정 로드
  useEffect(() => {
    if (configLoaded) return

    const loadConfig = async () => {
      try {
        const response = await fetch(`${apiUrl}/config?id=${chatbotId}`)
        const data = await response.json()

        if (data && data.config) {
          setConfig((prev) => ({
            ...prev,
            ...data.config,
          }))
        }

        setConfigLoaded(true)
      } catch (error) {
        console.error("Failed to load chatbot config:", error)
        setConfigLoaded(true)
      }
    }

    loadConfig()
  }, [apiUrl, chatbotId, configLoaded])

  // 웰컴 메시지 표시
  useEffect(() => {
    if (isOpen && messages.length === 0 && config.welcomeMessage && configLoaded) {
      setTimeout(() => {
        setMessages([
          {
            id: Date.now(),
            role: "assistant",
            content: config.welcomeMessage,
            timestamp: new Date().toISOString(),
          },
        ])
      }, 1000)
    }
  }, [isOpen, messages.length, config.welcomeMessage, configLoaded])

  // 챗봇 토글
  const toggleChatbot = () => {
    setIsOpen((prev) => !prev)

    // 열릴 때 입력 필드에 포커스
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }

  // 메시지 전송
  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])

    // 타이핑 표시
    setIsTyping(true)

    try {
      const response = await fetch(`${apiUrl}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatbotId,
          sessionId: session.id,
          message,
          history: [...messages, userMessage],
        }),
      })

      const data = await response.json()

      // 타이핑 표시 숨기기
      setIsTyping(false)

      // 응답 메시지 표시
      if (data && data.message) {
        const botMessage: ChatMessage = {
          id: Date.now(),
          role: "assistant",
          content: data.message,
          timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      setIsTyping(false)

      // 오류 메시지 표시
      const errorMessage: ChatMessage = {
        id: Date.now(),
        role: "assistant",
        content: "죄송합니다. 서버와 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    }
  }

  return (
    <div
      className="fixed z-50"
      style={{
        [config.position === "bottom-right" ? "right" : "left"]: "20px",
        bottom: "20px",
      }}
    >
      <ChatbotButton
        isOpen={isOpen}
        onClick={toggleChatbot}
        position={config.position}
        primaryColor={config.primaryColor}
      />

      <ChatbotWindow
        isOpen={isOpen}
        theme={config.theme}
        position={config.position}
        primaryColor={config.primaryColor}
        messages={messages}
        isTyping={isTyping}
        onClose={toggleChatbot}
        onSendMessage={sendMessage}
        inputRef={inputRef}
      />
    </div>
  )
}
