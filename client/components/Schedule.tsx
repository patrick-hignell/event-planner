import { useQuery } from '@tanstack/react-query'
import { getEvents } from '../apis/events'
import { useEffect, useState } from 'react'
import { Event, TimeSlot } from '../../models/events'

function Schedule() {
  const [schedule, setSchedule] = useState<TimeSlot[][]>([[]])

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
      const orderedTimeSlots: TimeSlot[][] = orderTimeSlots([...timeSlots])
      console.log(orderedTimeSlots)
      setSchedule([...orderedTimeSlots])
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

  function orderTimeSlots(array: TimeSlot[]) {
    const arrayOfArrays: TimeSlot[][] = [[]]
    array.sort(
      (a, b) =>
        Number(new Date(`${a.day} ${a.startTime}:00`)) -
        Number(new Date(`${b.day} ${b.startTime}:00`)),
    )
    arrayOfArrays[0].push(array[0])
    for (let i = 1; i < array.length; i++) {
      for (let j = 0; j < arrayOfArrays.length; j++) {
        const latestTimeSlot = arrayOfArrays[j][arrayOfArrays[j].length - 1]
        console.log(
          Number(new Date(`${array[i].day} ${array[i].startTime}:00`)),
        )
        console.log(
          Number(
            new Date(`${latestTimeSlot.day} ${latestTimeSlot.endTime}:00`),
          ),
        )
        if (
          Number(new Date(`${array[i].day} ${array[i].startTime}:00`)) >
          Number(new Date(`${latestTimeSlot.day} ${latestTimeSlot.endTime}:00`))
        ) {
          arrayOfArrays[j].push(array[i])
          break
        }
        if (j === arrayOfArrays.length - 1) {
          arrayOfArrays.push([array[i]])
          break
        }
      }
    }
    return arrayOfArrays
  }

  if (isPending) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div className="flex flex-row p-3 gap-2">
      <h1>Schedule</h1>
      {schedule.map((column, index) => (
        <div key={index} className="flex flex-col p-3 gap-2">
          {column.map((slot) => (
            <div key={`${Object.values(slot)}`} className="">
              <p>Day: {slot.day}</p>
              <p>Start Time: {slot.startTime}</p>
              <p>End Time: {slot.endTime}</p>
              <p>Name: {slot.name}</p>
              <p>Location: {slot.location}</p>
              <br></br>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Schedule
