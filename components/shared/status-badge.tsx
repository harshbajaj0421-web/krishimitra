import { BadgeCheck, Clock, ShieldAlert, ShieldX, ShieldQuestion } from "lucide-react"

import { cn } from "@/lib/utils"
import type { DemandLevel, ListingStatus, OrderStatus, VerificationStatus } from "@/types"

const toneClasses = {
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning-foreground",
  info: "bg-info-subtle text-info",
  danger: "bg-danger-subtle text-destructive",
  neutral: "bg-muted text-muted-foreground",
  brand: "bg-primary-subtle text-primary",
} as const

export type Tone = keyof typeof toneClasses

function Pill({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

const orderStatusMap: Record<OrderStatus, { label: string; tone: Tone }> = {
  pending: { label: "Pending", tone: "warning" },
  confirmed: { label: "Confirmed", tone: "brand" },
  "in-transit": { label: "In transit", tone: "info" },
  delivered: { label: "Delivered", tone: "success" },
  disputed: { label: "Disputed", tone: "danger" },
  cancelled: { label: "Cancelled", tone: "neutral" },
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, tone } = orderStatusMap[status]
  return (
    <Pill tone={tone}>
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-current"
      />
      {label}
    </Pill>
  )
}

const listingStatusMap: Record<ListingStatus, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "neutral" },
  active: { label: "Active", tone: "success" },
  reserved: { label: "Reserved", tone: "info" },
  "sold-out": { label: "Sold out", tone: "neutral" },
  expired: { label: "Expired", tone: "danger" },
}

export function ListingStatusBadge({ status }: { status: ListingStatus }) {
  const { label, tone } = listingStatusMap[status]
  return (
    <Pill tone={tone}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </Pill>
  )
}

const demandMap: Record<DemandLevel, { label: string; tone: Tone; bars: number }> = {
  low: { label: "Low", tone: "neutral", bars: 1 },
  moderate: { label: "Moderate", tone: "info", bars: 2 },
  high: { label: "High", tone: "warning", bars: 3 },
  "very-high": { label: "Very high", tone: "danger", bars: 4 },
}

export function DemandBadge({ level }: { level: DemandLevel }) {
  const { label, tone, bars } = demandMap[level]
  return (
    <Pill tone={tone}>
      <span aria-hidden className="flex items-end gap-0.5">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={cn(
              "w-0.5 rounded-full bg-current",
              bar <= bars ? "opacity-100" : "opacity-25",
            )}
            style={{ height: `${2 + bar * 2}px` }}
          />
        ))}
      </span>
      {label}
    </Pill>
  )
}

const verificationMap: Record<
  VerificationStatus,
  { label: string; tone: Tone; icon: typeof BadgeCheck }
> = {
  verified: { label: "Verified", tone: "success", icon: BadgeCheck },
  "in-progress": { label: "Verification in progress", tone: "warning", icon: Clock },
  "needs-attention": { label: "Needs attention", tone: "warning", icon: ShieldAlert },
  rejected: { label: "Rejected", tone: "danger", icon: ShieldX },
  "not-started": { label: "Not verified", tone: "neutral", icon: ShieldQuestion },
}

export function VerificationBadge({
  status,
  compact = false,
}: {
  status: VerificationStatus
  compact?: boolean
}) {
  const { label, tone, icon: Icon } = verificationMap[status]
  return (
    <Pill tone={tone}>
      <Icon className="size-3.5" aria-hidden />
      {compact ? (status === "verified" ? "Verified" : label) : label}
    </Pill>
  )
}

export function GradeBadge({ grade }: { grade: "A" | "B" | "C" }) {
  return (
    <Pill tone={grade === "A" ? "brand" : "neutral"} className="tabular">
      Grade {grade}
    </Pill>
  )
}

export { Pill }
