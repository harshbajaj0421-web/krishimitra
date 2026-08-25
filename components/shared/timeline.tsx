import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import type { TraceEvent } from "@/types"

export function Timeline({ events }: { events: TraceEvent[] }) {
  return (
    <ol className="flex flex-col">
      {events.map((event, index) => {
        const isLast = index === events.length - 1
        return (
          <li key={event.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border-2",
                  event.done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-dashed border-border bg-card text-muted-foreground",
                )}
              >
                {event.done ? (
                  <Check className="size-3.5" aria-hidden />
                ) : (
                  <span className="size-1.5 rounded-full bg-current" aria-hidden />
                )}
              </span>
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    "w-0.5 flex-1",
                    event.done ? "bg-primary/30" : "bg-border",
                  )}
                />
              ) : null}
            </div>
            <div className={cn("flex flex-col gap-1", isLast ? "pb-0" : "pb-6")}>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                <span className="text-sm font-semibold">{event.label}</span>
                <span className="text-xs text-muted-foreground tabular">{event.timestamp}</span>
              </div>
              <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                {event.detail}
              </p>
              <span className="text-xs text-muted-foreground">{event.actor}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export function Stepper({
  steps,
  current,
}: {
  steps: string[]
  current: number
}) {
  return (
    <ol className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
      {steps.map((step, index) => {
        const done = index < current
        const active = index === current
        return (
          <li key={step} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary bg-primary-subtle text-primary",
                !done && !active && "border-border bg-card text-muted-foreground",
              )}
            >
              {done ? <Check className="size-3.5" aria-hidden /> : index + 1}
            </span>
            <span
              className={cn(
                "text-[0.8125rem] font-medium whitespace-nowrap",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step}
            </span>
            {index < steps.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "hidden h-px flex-1 sm:block",
                  done ? "bg-primary/40" : "bg-border",
                )}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
