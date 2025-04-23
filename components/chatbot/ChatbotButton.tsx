"use client"

import { LucideMessageCircle, LucideX } from "lucide-react"

interface ChatbotButtonProps {
  isOpen: boolean
  onClick: () => void
  position: string
  primaryColor: string
}

export default function ChatbotButton({ isOpen, onClick, position, primaryColor }: ChatbotButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none"
      style={{ backgroundColor: primaryColor }}
      aria-label={isOpen ? "챗봇 닫기" : "챗봇 열기"}
    >
      {isOpen ? <LucideX className="w-6 h-6" /> : <LucideMessageCircle className="w-6 h-6" />}
    </button>
  )
}
