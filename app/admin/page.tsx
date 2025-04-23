"use client"

import { useState } from "react"
import { BarChart, Users, MessageSquare, Clock, Bot, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Consultant {
  id: string
  name: string
  email: string
  status: "online" | "offline" | "busy"
  activeChats: number
}

interface ChatSession {
  id: string
  userId: string
  userName: string
  startTime: Date
  status: "active" | "completed" | "transferred"
  handledBy: "ai" | "consultant"
  consultantName?: string
}

export default function AdminPage() {
  const [consultants] = useState<Consultant[]>([
    { id: "1", name: "Jane Smith", email: "jane@example.com", status: "online", activeChats: 2 },
    { id: "2", name: "John Doe", email: "john@example.com", status: "busy", activeChats: 3 },
    { id: "3", name: "Alice Johnson", email: "alice@example.com", status: "offline", activeChats: 0 },
  ])

  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      userId: "u1",
      userName: "Customer 1",
      startTime: new Date(Date.now() - 30 * 60000),
      status: "active",
      handledBy: "consultant",
      consultantName: "Jane Smith",
    },
    {
      id: "2",
      userId: "u2",
      userName: "Customer 2",
      startTime: new Date(Date.now() - 15 * 60000),
      status: "active",
      handledBy: "ai",
    },
    {
      id: "3",
      userId: "u3",
      userName: "Customer 3",
      startTime: new Date(Date.now() - 120 * 60000),
      status: "completed",
      handledBy: "ai",
    },
    {
      id: "4",
      userId: "u4",
      userName: "Customer 4",
      startTime: new Date(Date.now() - 90 * 60000),
      status: "transferred",
      handledBy: "consultant",
      consultantName: "John Doe",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "transferred":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5% from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2m</div>
            <p className="text-xs text-muted-foreground">-8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Resolution Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+4% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="consultants" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="consultants">Consultants</TabsTrigger>
          <TabsTrigger value="chats">Active Chats</TabsTrigger>
        </TabsList>

        <TabsContent value="consultants">
          <Card>
            <CardHeader>
              <CardTitle>Consultant Management</CardTitle>
              <CardDescription>Manage your team of consultants and their availability.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active Chats</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultants.map((consultant) => (
                    <TableRow key={consultant.id}>
                      <TableCell className="font-medium">{consultant.name}</TableCell>
                      <TableCell>{consultant.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(consultant.status)} mr-2`} />
                          <span className="capitalize">{consultant.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{consultant.activeChats}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button>Add Consultant</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chats">
          <Card>
            <CardHeader>
              <CardTitle>Active Chat Sessions</CardTitle>
              <CardDescription>Monitor and manage ongoing chat sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Handled By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chatSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.userName}</TableCell>
                      <TableCell>{session.startTime.toLocaleTimeString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusColor(session.status)} text-white`}>
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {session.handledBy === "ai" ? (
                          <span className="flex items-center">
                            <Bot className="h-4 w-4 mr-1" /> AI
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" /> {session.consultantName}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
