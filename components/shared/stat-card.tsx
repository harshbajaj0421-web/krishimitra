import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export interface StatCardProps {
  label: string
  value: string
  hint?: string
  delta?: { value: string; trend: "up" | "down" | "flat"; note?: string }
  icon?: React.ComponentType<{ className?: string }>
  emphasis?: boolean
}

const trendMeta = {
  up: { icon: ArrowUpRight, tone: "text-success" },
  down: { icon: ArrowDownRight, tone: "text-destructive" },
  flat: { icon: ArrowRight, tone: "text-muted-foreground" },
} as const

export function StatCard({
  label,
  value,
  hint,
  delta,
  icon: Icon,
  emphasis,
}: StatCardProps) {
  const TrendIcon = delta ? trendMeta[delta.trend].icon : null

  return (
    <Card className={cn("gap-0 py-0", emphasis && "border-primary/25 bg-primary-subtle/40")}>
      <CardContent className="flex flex-col gap-3 px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[0.8125rem] font-medium text-muted-foreground">{label}</span>
          {Icon ? (
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <Icon className="size-4" />
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-[1.75rem] leading-none font-semibold tabular tracking-tight">
            {value}
          </span>
          {delta && TrendIcon ? (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold tabular",
                trendMeta[delta.trend].tone,
              )}
            >
              <TrendIcon className="size-3.5" aria-hidden />
              {delta.value}
            </span>
          ) : null}
        </div>
        {hint || delta?.note ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {hint}
            {hint && delta?.note ? " · " : ""}
            {delta?.note}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function StatCardSkeleton() {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex flex-col gap-3 px-5 py-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-3 w-36" />
      </CardContent>
    </Card>
  )
}
