import express from 'express'
import * as db from '../db'

const router = express.Router()

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

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const newEventData = req.body
    const returnId = await db.updateEvent(newEventData, id)
    res.json(returnId)
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
