import request from 'superagent'
import { Event, EventData } from '../../models/events'

const rootURL = new URL('/api/v1', document.baseURI)

//Create
export async function addEvent(event: EventData) {
  const result = await request.post(`${rootURL}/events`).send(event)
  return result.body as Event
}

//Read
//Get all events
export async function getAllEvents() {
  const result = await request.get(`${rootURL}/events`)
  //console.log(result.body)
  return result.body as Event[]
}

//Update
export async function editEvent(event: Event): Promise<Event> {
  const response = await request
    .put(`${rootURL}/events/${event.id}`)
    .send(event)
  return response.body as Event
}

//Delete
export async function deleteEvent(id: number | string): Promise<void> {
  await request.delete(`${rootURL}/events/${id}`)
}
