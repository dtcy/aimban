"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navigation = [
    { name: "홈", href: "/" },
    { name: "상품", href: "/products" },
    { name: "상담하기", href: "/chat" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className=" w-full flex items-center justify-between h-16 px-4 md:px-8">
  {/* 왼쪽: 모바일 메뉴 + 로고 */}
  <div className="flex items-center gap-4">
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex flex-col gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="ml-4 text-lg font-medium hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>

    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/logo-line.png"
        alt="Aroma Pulse Logo"
        width={150}
        height={0}
        style={{ height: "auto" , width : "auto"}}
        priority
      />
    </Link>
  </div>

  {/* 중앙: 데스크탑 메뉴 */}
  <div className="hidden md:flex gap-8">
    {navigation.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={`text-sm font-medium transition-colors hover:text-primary ${
          pathname === item.href ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {item.name}
      </Link>
    ))}
  </div>

  {/* 우측: 장바구니 + 유저 */}
  <div className="flex items-center gap-4">
    <Link href="/checkout">
      <Button variant="ghost" size="icon" aria-label="장바구니">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    </Link>

    {session ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="사용자 메뉴">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/dashboard">마이페이지</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Link href="/dashboard/orders">주문내역</Link>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => signOut()}>로그아웃</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <Button asChild variant="default">
        <Link href="/login">로그인</Link>
      </Button>
    )}
  </div>
</nav>

    </header>
  )
}
