import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "AromaPulse",
  description: "Intelligent chat platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
