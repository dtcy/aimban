"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Save, FileText, Download, Plus, Trash2 } from "lucide-react"
import * as XLSX from "xlsx"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ExcelSheet {
  name: string
  htmlContent: string
  rawData: any[][]
}

export default function TrainingPage() {
  const [sheets, setSheets] = useState<ExcelSheet[]>([])
  const [activeSheet, setActiveSheet] = useState<string>("")
  const [htmlContent, setHtmlContent] = useState<string>("")
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const htmlEditorRef = useRef<HTMLDivElement>(null)

  // Convert Excel file to HTML
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        const newSheets: ExcelSheet[] = []

        // Process each sheet in the workbook
        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName]

          // Convert to HTML
          const html = XLSX.utils.sheet_to_html(worksheet, {
            id: `table-${sheetName}`,
            editable: true,
          })

          // Get raw data for later use
          const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];


          newSheets.push({
            name: sheetName,
            htmlContent: html,
            rawData: rawData,
          })
        })

        setSheets(newSheets)

        if (newSheets.length > 0) {
          setActiveSheet(newSheets[0].name)
          setHtmlContent(newSheets[0].htmlContent)
        }
      } catch (error) {
        console.error("Error processing Excel file:", error)
        alert("Error processing Excel file. Please check the file format.")
      }
    }

    reader.readAsArrayBuffer(file)
  }

  // Switch between sheets
  const handleSheetChange = (sheetName: string) => {
    setActiveSheet(sheetName)
    const sheet = sheets.find((s) => s.name === sheetName)
    if (sheet) {
      setHtmlContent(sheet.htmlContent)
    }
  }

  // Save edited HTML content
  const saveHtmlChanges = () => {
    if (htmlEditorRef.current) {
      const updatedHtml = htmlEditorRef.current.innerHTML

      // Update the sheets state with the new HTML content
      setSheets(sheets.map((sheet) => (sheet.name === activeSheet ? { ...sheet, htmlContent: updatedHtml } : sheet)))

      setHtmlContent(updatedHtml)
      setIsEditing(false)
    }
  }

  // Export HTML to file
  const exportHtml = () => {
    const sheet = sheets.find((s) => s.name === activeSheet)
    if (!sheet) return

    const blob = new Blob([sheet.htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeSheet}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Create a new empty sheet
  const createNewSheet = () => {
    const newSheetName = `Sheet${sheets.length + 1}`
    const emptyTableHtml = `
      <table id="table-${newSheetName}">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
          <tr>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
          </tr>
        </tbody>
      </table>
    `

    const newSheet: ExcelSheet = {
      name: newSheetName,
      htmlContent: emptyTableHtml,
      rawData: [
        ["Column 1", "Column 2", "Column 3"],
        ["Data 1", "Data 2", "Data 3"],
        ["Data 4", "Data 5", "Data 6"],
      ],
    }

    setSheets([...sheets, newSheet])
    setActiveSheet(newSheetName)
    setHtmlContent(emptyTableHtml)
  }

  // Delete current sheet
  const deleteCurrentSheet = () => {
    if (sheets.length <= 1) {
      alert("Cannot delete the only sheet. Create a new one first.")
      return
    }

    const updatedSheets = sheets.filter((sheet) => sheet.name !== activeSheet)
    setSheets(updatedSheets)

    if (updatedSheets.length > 0) {
      setActiveSheet(updatedSheets[0].name)
      setHtmlContent(updatedSheets[0].htmlContent)
    } else {
      setActiveSheet("")
      setHtmlContent("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Training Data Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Excel
          </Button>
          <Input type="file" ref={fileInputRef} className="hidden" accept=".xlsx, .xls" onChange={handleExcelUpload} />

          <Button variant="outline" onClick={exportHtml} disabled={!activeSheet}>
            <Download className="h-4 w-4 mr-2" />
            Export HTML
          </Button>

          <Button variant="outline" onClick={createNewSheet}>
            <Plus className="h-4 w-4 mr-2" />
            New Sheet
          </Button>
        </div>
      </div>

      {sheets.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Excel to HTML Conversion</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? saveHtmlChanges() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    "Edit HTML"
                  )}
                </Button>

                <Button variant="outline" onClick={deleteCurrentSheet}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Sheet
                </Button>
              </div>
            </div>
            <CardDescription>
              {sheets.length > 1 ? "Select a sheet to view and edit" : "View and edit your Excel data as HTML"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {sheets.length > 1 && (
              <div className="mb-4">
                <Tabs value={activeSheet} onValueChange={handleSheetChange}>
                  <TabsList className="mb-4">
                    {sheets.map((sheet) => (
                      <TabsTrigger key={sheet.name} value={sheet.name}>
                        <FileText className="h-4 w-4 mr-2" />
                        {sheet.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            )}

            <div className="border rounded-lg p-4 bg-white">
              <div
                ref={htmlEditorRef}
                contentEditable={isEditing}
                className={`excel-html-container ${isEditing ? "border-2 border-primary p-2" : ""}`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{ minHeight: "400px" }}
              />
            </div>

            {isEditing && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="text-sm font-medium mb-2">Editing Tips:</h3>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Click on cells to edit their content</li>
                  <li>You can add or remove rows and columns by editing the HTML structure</li>
                  <li>Click "Save Changes" when you're done editing</li>
                  <li>The HTML structure will be preserved when you export</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Excel Data Loaded</h3>
            <p className="text-muted-foreground text-center mb-4">
              Upload an Excel file to convert it to HTML, or create a new sheet to start from scratch.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Excel
              </Button>
              <Button variant="outline" onClick={createNewSheet}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Sheet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">
            <Plus className="h-4 w-4 mr-2" />
            Add to Training Dataset
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Training Dataset</DialogTitle>
            <DialogDescription>Confirm adding this data to your AI training dataset</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="dataset-name">Dataset Name</Label>
              <Input id="dataset-name" placeholder="Enter a name for this dataset" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataset-category">Category</Label>
              <Input id="dataset-category" placeholder="E.g., Customer Support, Product Info" />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add to Training Data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .excel-html-container table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }
        
        .excel-html-container th,
        .excel-html-container td {
          border: 1px solid #e2e8f0;
          padding: 0.5rem;
          text-align: left;
        }
        
        .excel-html-container th {
          background-color: #f8fafc;
          font-weight: 600;
        }
        
        .excel-html-container tr:nth-child(even) {
          background-color: #f8fafc;
        }
        
        .excel-html-container tr:hover {
          background-color: #edf2f7;
        }
      `}</style>
    </div>
  )
}
