"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Logo } from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const links = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For farmers", href: "/#for-farmers" },
  { label: "For buyers", href: "/#for-buyers" },
  { label: "Logistics", href: "/#logistics" },
  { label: "Traceability", href: "/#traceability" },
]

export function PublicHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="md"
            className="hidden sm:inline-flex"
            render={<Link href="/login" />}
          >
            Sign in
          </Button>
          <Button size="md" render={<Link href="/register" />}>
            Join KrishiMitra
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon-md" className="lg:hidden">
                  <Menu />
                  <span className="sr-only">Open navigation</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-3" />
                <Button
                  variant="outline"
                  size="md"
                  render={<Link href="/login" onClick={() => setOpen(false)} />}
                >
                  Sign in
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
