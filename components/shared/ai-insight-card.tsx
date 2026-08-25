import { Sparkles } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AIInsight } from "@/types"

const severityRing = {
  opportunity: "border-primary/30",
  neutral: "border-border",
  caution: "border-warning/40",
} as const

export function ConfidenceMeter({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">Confidence</span>
      <span aria-hidden className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-3 w-1 rounded-full",
              index < Math.round(value / 20) ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </span>
      <span className="text-xs font-semibold tabular">{value}%</span>
    </span>
  )
}

export function AIInsightCard({
  insight,
  actions,
  className,
}: {
  insight: AIInsight
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <Card
      className={cn(
        "relative gap-0 overflow-hidden py-0",
        severityRing[insight.severity],
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <CardContent className="flex flex-col gap-5 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-subtle text-primary">
            <Sparkles className="size-[1.125rem]" aria-hidden />
          </span>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-base font-semibold">{insight.title}</h3>
              <span className="inline-flex h-5 items-center rounded-full bg-muted px-2 text-[0.6875rem] font-semibold tracking-wide text-muted-foreground uppercase">
                AI forecast
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {insight.body}
            </p>
          </div>
        </div>

        {insight.metrics?.length ? (
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
            {insight.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1 bg-card px-4 py-3">
                <dt className="text-xs text-muted-foreground">{metric.label}</dt>
                <dd className="text-sm font-semibold tabular">{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ConfidenceMeter value={insight.confidence} />
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Forecasts are model estimates based on mandi arrivals, platform demand and seasonality.
          They are indicative and not a guaranteed price or outcome.
        </p>
      </CardContent>
    </Card>
  )
}
