import Link from "next/link"
import { Logo } from "@/components/shared/logo"

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "For Farmers", href: "/farmer" },
      { label: "For Buyers", href: "/marketplace" },
      { label: "Logistics", href: "/marketplace" },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { label: "Price Forecasts", href: "/farmer/prices" },
      { label: "Crop Advisory", href: "/farmer/advisory" },
      { label: "Mandi Rates", href: "/farmer/prices" },
      { label: "Trust Scores", href: "/marketplace" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", href: "/" },
      { label: "Grievance Redressal", href: "/" },
      { label: "Terms of Service", href: "/" },
      { label: "Privacy Policy", href: "/" },
    ],
  },
]

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              A direct farm-to-buyer trade network with AI price intelligence,
              verified logistics and escrow-backed payments. Built for Indian
              agriculture.
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Bharat · 18 states · 412 mandis
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 lg:gap-x-16">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-foreground">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} KrishiMitra Agritech Pvt. Ltd. All rights
            reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Prices are indicative. Trade at your own diligence.
          </p>
        </div>
      </div>
    </footer>
  )
}
