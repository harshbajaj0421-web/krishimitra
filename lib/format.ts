const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

const number = new Intl.NumberFormat("en-IN")

export function currency(value: number) {
  return inr.format(value)
}

export function compactCurrency(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return inr.format(value)
}

export function quantity(value: number, unit: string) {
  return `${number.format(value)} ${unit}`
}

export function count(value: number) {
  return number.format(value)
}

export function shortDate(value: string) {
  if (!value || value === "—") return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
