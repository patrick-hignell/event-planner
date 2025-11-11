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
