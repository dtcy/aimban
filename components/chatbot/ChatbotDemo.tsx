"use client"

import { useState, useEffect } from "react"
import Chatbot from "./Chatbot"

export default function ChatbotDemo() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Chatbot
      chatbotId="DEMO_CHATBOT_ID"
      apiUrl="/api"
      defaultConfig={{
        theme: "light",
        position: "bottom-right",
        primaryColor: "#4f46e5",
        welcomeMessage: "안녕하세요! 무엇을 도와드릴까요?",
      }}
    />
  )
}
