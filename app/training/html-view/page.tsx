"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import HtmlEditor from "@/components/html-editor"

export default function HtmlViewPage() {
  const [html, setHtml] = useState<string>("")
  const [fileName, setFileName] = useState<string>("training-data")

  // In a real app, you would load this from a database or API
  useEffect(() => {
    // Simulating loading HTML from storage
    const storedHtml = localStorage.getItem("trainingHtml")
    if (storedHtml) {
      setHtml(storedHtml)
    } else {
      // Default HTML if none is stored
      setHtml(`
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What are your business hours?</td>
              <td>Our business hours are Monday to Friday, 9 AM to 5 PM.</td>
              <td>General</td>
            </tr>
            <tr>
              <td>How do I reset my password?</td>
              <td>You can reset your password by clicking on the 'Forgot Password' link on the login page.</td>
              <td>Account</td>
            </tr>
          </tbody>
        </table>
      `)
    }
  }, [])

  const handleSave = (updatedHtml: string) => {
    setHtml(updatedHtml)
    // In a real app, you would save this to a database or API
    localStorage.setItem("trainingHtml", updatedHtml)
    alert("HTML content saved successfully!")
  }

  const handleExport = () => {
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/training">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">HTML Training Data Editor</h1>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export HTML
        </Button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-6">
          Edit your training data directly in HTML format. You can modify the table structure, add or remove rows, and
          edit cell contents.
        </p>
      </div>

      <HtmlEditor initialHtml={html} onSave={handleSave} />

      <style jsx global>{`
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }
        
        th, td {
          border: 1px solid #e2e8f0;
          padding: 0.5rem;
          text-align: left;
        }
        
        th {
          background-color: #f8fafc;
          font-weight: 600;
        }
        
        tr:nth-child(even) {
          background-color: #f8fafc;
        }
        
        tr:hover {
          background-color: #edf2f7;
        }
      `}</style>
    </div>
  )
}
