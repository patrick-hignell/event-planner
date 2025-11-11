import { useQuery } from '@tanstack/react-query'
import { getEvents } from '../apis/events'
import { useEffect, useState } from 'react'
import { Event, TimeSlot } from '../../models/events'

function Schedule() {
  const [schedule, setSchedule] = useState<TimeSlot[]>([])

  const {
    data: events,
    isPending,
    error,
  } = useQuery({ queryKey: ['events'], queryFn: () => getEvents() })
  //const queryClient = useQueryClient()

  useEffect(() => {
    if (events) {
      const timeSlots: TimeSlot[] = []
      events.forEach((event) => {
        timeSlots.push(...eventToTimeSlot(event))
      })
      timeSlots.sort(
        (a, b) =>
          Number(new Date(`${a.day} ${a.startTime}:00`)) -
          Number(new Date(`${b.day} ${b.startTime}:00`)),
      )
      setSchedule([...timeSlots])
    }
  }, [events])

  function eventToTimeSlot(event: Event) {
    const tempTimeSlots: TimeSlot[] = []
    event.dates.split(';').forEach((timeSlot) => {
      tempTimeSlots.push({
        eventId: event.id,
        day: timeSlot.slice(0, timeSlot.indexOf(':') - 2).trimEnd(),
        startTime: timeSlot.slice(
          timeSlot.indexOf(':') - 2,
          timeSlot.indexOf(':') + 3,
        ),
        endTime: timeSlot.slice(timeSlot.indexOf('-') + 1),
        name: event.name,
        location: event.location,
      })
    })
    return tempTimeSlots
  }

  if (isPending) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      <h1>Schedule</h1>
      {schedule.map((slot) => (
        <div key={`${slot.eventId}${slot.day}${slot.startTime}`}>
          <p>Day: {slot.day}</p>
          <p>Start Time: {slot.startTime}</p>
          <p>End Time: {slot.endTime}</p>
          <p>Name: {slot.name}</p>
          <p>Location: {slot.location}</p>
          <br></br>
        </div>
      ))}
    </div>
  )
}

export default Schedule
