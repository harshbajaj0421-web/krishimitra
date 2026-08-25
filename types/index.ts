export type Role = "farmer" | "fpo" | "buyer" | "transporter" | "admin"

export type VerificationStatus =
  | "not-started"
  | "in-progress"
  | "verified"
  | "needs-attention"
  | "rejected"

export type ListingStatus = "draft" | "active" | "reserved" | "sold-out" | "expired"

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in-transit"
  | "delivered"
  | "disputed"
  | "cancelled"

export type Grade = "A" | "B" | "C"

export type DemandLevel = "low" | "moderate" | "high" | "very-high"

export type Unit = "kg" | "quintal" | "tonne" | "crate" | "dozen"

export interface Seller {
  id: string
  name: string
  type: "farmer" | "fpo"
  district: string
  state: string
  verification: VerificationStatus
  trustScore: number
  memberSince: string
  totalOrders: number
  avatar?: string
}

export interface Listing {
  id: string
  slug: string
  name: string
  category: string
  variety: string
  grade: Grade
  image: string
  gallery: string[]
  pricePerKg: number
  minPricePerKg: number
  negotiable: boolean
  quantity: number
  unit: Unit
  status: ListingStatus
  demand: DemandLevel
  seller: Seller
  distanceKm: number
  harvestDate: string
  availableFrom: string
  availableUntil: string
  perishability: "low" | "medium" | "high"
  packaging: string
  pickupLocation: string
  description: string
  views: number
  quoteRequests: number
}

export interface Order {
  id: string
  buyer: string
  buyerType: "consumer" | "processor" | "retailer" | "exporter"
  product: string
  quantity: number
  unit: Unit
  value: number
  status: OrderStatus
  placedOn: string
  deliveryDate: string
  destination: string
  transporter?: string
  paymentStatus: "pending" | "escrow" | "released" | "refunded"
}

export interface TrendPoint {
  label: string
  actual?: number
  forecast?: number
}

export interface PricePoint {
  label: string
  mandi: number
  krishimitra: number
}

export interface SalesPoint {
  label: string
  revenue: number
  orders: number
}

export interface AIInsight {
  id: string
  title: string
  body: string
  confidence: number
  severity: "opportunity" | "neutral" | "caution"
  metrics?: { label: string; value: string }[]
}

export interface Shipment {
  id: string
  orderId: string
  product: string
  transporter: string
  vehicle: string
  from: string
  to: string
  distanceKm: number
  etaHours: number
  progress: number
  stage: "assigned" | "pickup" | "in-transit" | "out-for-delivery" | "delivered"
}

export interface TraceEvent {
  label: string
  detail: string
  timestamp: string
  actor: string
  done: boolean
}

export interface Review {
  id: string
  author: string
  role: string
  rating: number
  date: string
  body: string
}

export interface EarningsRow {
  id: string
  orderId: string
  product: string
  gross: number
  logistics: number
  platformFee: number
  net: number
  settledOn: string
  status: "settled" | "in-escrow" | "processing"
}
