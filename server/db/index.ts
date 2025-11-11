import { Event, EventData } from '../../models/events'
import db from './connection'

//Create
//Read
export async function getEvents(): Promise<Event[]> {
  const result = db('events').select()
  console.log(result)
  return result
}
//Update
export async function updateEvent(
  eventData: EventData,
  id: number,
): Promise<number> {
  const result = db('events').where('id', id).update(eventData)
  console.log(result)
  return result
}
//Delete
