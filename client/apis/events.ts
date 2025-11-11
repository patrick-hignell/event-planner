import request from 'superagent'
import { Event } from '../../models/events'

const rootURL = new URL('/api/v1', document.baseURI)

//Create
//Read
//Get all events
export async function getEvents() {
  const result = await request.get(`${rootURL}/events`)
  //console.log(result.body)
  return result.body as Event[]
}

//Update
//Delete
