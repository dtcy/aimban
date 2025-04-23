"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Save, Code, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HtmlEditorProps {
  initialHtml: string
  onSave: (html: string) => void
}

export default function HtmlEditor({ initialHtml, onSave }: HtmlEditorProps) {
  const [html, setHtml] = useState(initialHtml)
  const [view, setView] = useState<"preview" | "code">("preview")
  const previewRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setHtml(initialHtml)
  }, [initialHtml])

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(e.target.value)
  }

  const handlePreviewEdit = () => {
    if (previewRef.current) {
      const updatedHtml = previewRef.current.innerHTML
      setHtml(updatedHtml)
    }
  }

  const handleSave = () => {
    if (view === "preview" && previewRef.current) {
      const updatedHtml = previewRef.current.innerHTML
      setHtml(updatedHtml)
      onSave(updatedHtml)
    } else {
      onSave(html)
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Tabs value={view} onValueChange={(value) => setView(value as "preview" | "code")}>
          <div className="flex justify-between items-center p-4 border-b">
            <TabsList>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="h-4 w-4 mr-2" />
                HTML Code
              </TabsTrigger>
            </TabsList>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <TabsContent value="preview" className="m-0">
            <div
              ref={previewRef}
              contentEditable={true}
              className="min-h-[400px] p-4 focus:outline-none"
              dangerouslySetInnerHTML={{ __html: html }}
              onBlur={handlePreviewEdit}
            />
          </TabsContent>

          <TabsContent value="code" className="m-0">
            <textarea
              ref={textareaRef}
              value={html}
              onChange={handleCodeChange}
              className="w-full min-h-[400px] p-4 font-mono text-sm focus:outline-none resize-none"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
