import Link from "next/link"

import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-[0.5rem] bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-[1.125rem]">
        <path
          d="M12 21V11"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M12 12.6C12 9.2 9.5 6.4 6 5.8c-.5 3.6 1.7 6.5 6 6.8Z"
          fill="currentColor"
        />
        <path
          d="M12 11.2c0-4 2.9-7.3 7-8-.6 4.2-2.9 7.6-7 8Z"
          fill="currentColor"
          opacity="0.72"
        />
      </svg>
    </span>
  )
}

export function Logo({
  href = "/",
  className,
  showWordmark = true,
  subtitle,
}: {
  href?: string
  className?: string
  showWordmark?: boolean
  subtitle?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <LogoMark />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="text-[0.9375rem] font-semibold tracking-tight">KrishiMitra</span>
          {subtitle ? (
            <span className="mt-0.5 text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
              {subtitle}
            </span>
          ) : null}
        </span>
      ) : (
        <span className="sr-only">KrishiMitra</span>
      )}
    </Link>
  )
}
