import express from 'express'
import * as db from '../db'

const router = express.Router()
//Create
//POST localhost:3000/api/v1/events
router.post('/', async (req, res) => {
  try {
    const newEventData = req.body
    const newEvent = await db.createEvent(newEventData)
    res.status(200).json(newEvent)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})
//Read
// GET localhost:3000/api/v1/events
router.get('/', async (req, res) => {
  try {
    const events = await db.getEvents()
    res.json(events)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

//Update
// PUT localhost:3000/api/v1/events/:id
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const newEventData = req.body
    const newEvent = await db.updateEvent(newEventData, id)
    res.status(200).json(newEvent)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const deletedEvent = await db.deleteEvent(id)
    res.status(204).json(deletedEvent)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

export default router
