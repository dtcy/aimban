"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState, useRef, useEffect } from "react"
import { Send, User, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: string
  content: string
  sender: "user" | "consultant"
  timestamp: Date
}

interface ChatSession {
  id: string
  userId: string
  userName: string
  status: "active" | "waiting" | "closed"
  startTime: Date
  messages: Message[]
}

export default function ConsultantChat() {
  const [activeSessions, setActiveSessions] = useState<ChatSession[]>([
    {
      id: "1",
      userId: "u1",
      userName: "Customer 1",
      status: "active",
      startTime: new Date(Date.now() - 15 * 60000),
      messages: [
        {
          id: "m1",
          content: "Hello, I need help with my order.",
          sender: "user",
          timestamp: new Date(Date.now() - 15 * 60000),
        },
        {
          id: "m2",
          content: "I'd be happy to help. Could you provide your order number?",
          sender: "consultant",
          timestamp: new Date(Date.now() - 14 * 60000),
        },
        {
          id: "m3",
          content: "It's #12345",
          sender: "user",
          timestamp: new Date(Date.now() - 13 * 60000),
        },
      ],
    },
    {
      id: "2",
      userId: "u2",
      userName: "Customer 2",
      status: "waiting",
      startTime: new Date(Date.now() - 5 * 60000),
      messages: [
        {
          id: "m4",
          content: "I have a question about your return policy.",
          sender: "user",
          timestamp: new Date(Date.now() - 5 * 60000),
        },
      ],
    },
  ])

  const [activeSessionId, setActiveSessionId] = useState<string>("1")
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeSession = activeSessions.find((session) => session.id === activeSessionId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeSessionId, activeSessions])

  const handleSend = () => {
    if (!input.trim() || !activeSession) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "consultant",
      timestamp: new Date(),
    }

    setActiveSessions(
      activeSessions.map((session) => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, newMessage],
          }
        }
        return session
      }),
    )

    setInput("")
  }

  const formatDuration = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins}m`
    } else {
      const hours = Math.floor(diffMins / 60)
      const mins = diffMins % 60
      return `${hours}h ${mins}m`
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-64 border-r p-4">
        <h2 className="font-semibold mb-4">Active Chats</h2>
        <div className="space-y-2">
          {activeSessions.map((session) => (
            <Card
              key={session.id}
              className={`cursor-pointer hover:bg-gray-50 ${activeSessionId === session.id ? "border-primary" : ""}`}
              onClick={() => setActiveSessionId(session.id)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{session.userName}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDuration(session.startTime)}
                    </div>
                  </div>
                  <Badge variant={session.status === "waiting" ? "destructive" : "outline"} className="text-xs">
                    {session.status === "waiting" ? "New" : "Active"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeSession ? (
          <>
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{activeSession.userName}</h2>
                    <p className="text-xs text-gray-500">
                      Started {activeSession.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Transfer
                  </Button>
                  <Button variant="outline" size="sm">
                    Close
                  </Button>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              {activeSession.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === "consultant" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[80%] ${
                      message.sender === "consultant"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.sender === "consultant" && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend()
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>

      <div className="w-64 border-l p-4">
        <Tabs defaultValue="user">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            {activeSession && (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">User Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-semibold">Name</p>
                        <p>{activeSession.userName}</p>
                      </div>
                      <div>
                        <p className="font-semibold">User ID</p>
                        <p>{activeSession.userId}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Session Started</p>
                        <p>{activeSession.startTime.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Previous Interactions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">No previous interactions found.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardContent className="p-4">
                <Textarea placeholder="Add notes about this conversation..." className="min-h-[200px]" />
                <Button className="mt-2 w-full">Save Notes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
