import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DemandBadge, GradeBadge, VerificationBadge } from "@/components/shared/status-badge"
import { TrustScore } from "@/components/shared/trust-score"
import { count, currency } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Listing } from "@/types"

export function ProductCard({
  listing,
  className,
}: {
  listing: Listing
  className?: string
}) {
  const soldOut = listing.status === "sold-out"

  return (
    <Card
      className={cn(
        "group gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md",
        className,
      )}
    >
      <Link
        href={`/product/${listing.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Image
          src={listing.image || "/placeholder.svg"}
          alt={`${listing.variety} ${listing.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-[1.03]",
            soldOut && "opacity-60 saturate-50",
          )}
        />
        <span className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <GradeBadge grade={listing.grade} />
          {soldOut ? (
            <span className="inline-flex h-6 items-center rounded-full bg-foreground/85 px-2.5 text-xs font-medium text-background">
              Sold out
            </span>
          ) : null}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[0.9375rem] leading-snug font-semibold">
              <Link
                href={`/product/${listing.slug}`}
                className="outline-none hover:text-primary focus-visible:underline"
              >
                {listing.name}
              </Link>
            </h3>
            <DemandBadge level={listing.demand} />
          </div>
          <p className="text-xs text-muted-foreground">
            {listing.variety} · {listing.category}
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xl leading-none font-semibold tabular">
              {currency(listing.pricePerKg)}
              <span className="text-[0.8125rem] font-normal text-muted-foreground"> / kg</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {soldOut ? "No stock available" : `${count(listing.quantity)} ${listing.unit} available`}
            </span>
          </div>
          {listing.negotiable && !soldOut ? (
            <span className="inline-flex h-6 items-center rounded-full bg-secondary px-2.5 text-xs font-medium text-secondary-foreground">
              Negotiable
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2.5 border-t pt-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[0.8125rem] font-medium">{listing.seller.name}</span>
            <VerificationBadge status={listing.seller.verification} compact />
          </div>
          <div className="flex items-center justify-between gap-2">
            <TrustScore score={listing.seller.trustScore} showLabel={false} />
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden />
              {listing.distanceKm} km
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="md" className="flex-1" disabled={soldOut} render={soldOut ? undefined : <Link href={`/product/${listing.slug}`} />}>
            {soldOut ? "Unavailable" : "View listing"}
          </Button>
          <Button size="md" variant="outline" className="flex-1" disabled={soldOut}>
            Request quote
          </Button>
        </div>
      </div>
    </Card>
  )
}
