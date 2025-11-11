import { Event, EventData } from '../../models/events'
import db from './connection'

//Create
export async function createEvent(eventData: EventData): Promise<Event> {
  const result = await db('events').insert(eventData).returning('*')
  console.log(result)
  return result[0]
}

//Read
export async function getEvents(): Promise<Event[]> {
  const result = await db('events').select()
  console.log(result)
  return result
}
//Update
export async function updateEvent(
  eventData: EventData,
  id: number,
): Promise<Event> {
  const result = await db('events')
    .where('id', id)
    .update(eventData)
    .returning('*')
  console.log(result)
  return result[0]
}
//Delete
export async function deleteEvent(id: number): Promise<Event> {
  const result = await db('events').where('id', id).delete().returning('*')
  console.log(result)
  return result[0]
}
