export interface EventData {
  name: string
  host: string
  bio: string
  dates: string
  location: string
  price: string
}

export interface Event extends EventData {
  id: number
}

export interface TimeSlot {
  eventId: number
  day: string
  startTime: string
  endTime: string
  name: string
  location: string
  host?: string
  bio?: string
  price?: number[]
  priceDescription?: string[]
  currency?: string
}
