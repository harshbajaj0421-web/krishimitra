import { cn } from "@/lib/utils"

function band(score: number) {
  if (score >= 90) return { label: "Excellent", tone: "text-success" }
  if (score >= 75) return { label: "Good", tone: "text-primary" }
  if (score >= 60) return { label: "Fair", tone: "text-warning-foreground" }
  return { label: "Building", tone: "text-muted-foreground" }
}

export function TrustScore({
  score,
  size = "sm",
  showLabel = true,
  className,
}: {
  score: number
  size?: "sm" | "lg"
  showLabel?: boolean
  className?: string
}) {
  const { label, tone } = band(score)

  if (size === "lg") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="relative grid size-16 shrink-0 place-items-center">
          <svg viewBox="0 0 36 36" className="size-16 -rotate-90" aria-hidden>
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="currentColor"
              className={tone}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 97.4} 97.4`}
            />
          </svg>
          <span className="absolute text-lg font-semibold tabular">{score}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold">Trust score</span>
          <span className={cn("text-sm font-medium", tone)}>{label}</span>
          <span className="text-xs text-muted-foreground">
            Based on fulfilment, quality and disputes
          </span>
        </div>
      </div>
    )
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="relative h-1.5 w-14 overflow-hidden rounded-full bg-muted"
        aria-hidden
      >
        <span
          className={cn("absolute inset-y-0 left-0 rounded-full bg-current", tone)}
          style={{ width: `${score}%` }}
        />
      </span>
      <span className="text-xs font-medium tabular">
        {score}
        {showLabel ? <span className="text-muted-foreground"> / 100</span> : null}
      </span>
      <span className="sr-only">Trust score {score} out of 100, {label}</span>
    </span>
  )
}
