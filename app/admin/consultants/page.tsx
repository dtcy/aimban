import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ConsultantChat from "@/components/consultant-chat"

export default function ConsultantPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Consultant Dashboard</h1>
        <Button variant="outline">End Shift</Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Chat Console</CardTitle>
          <CardDescription>Manage your active chat sessions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ConsultantChat />
        </CardContent>
      </Card>
    </div>
  )
}
