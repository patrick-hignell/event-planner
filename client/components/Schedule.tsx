import { useQuery } from '@tanstack/react-query'
import { getEvents } from '../apis/events'
import { useEffect, useState } from 'react'
import { Event, TimeSlot } from '../../models/events'

function Schedule() {
  const [schedule, setSchedule] = useState<TimeSlot[][][]>([[[]]])

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
      const orderedTimeSlots: TimeSlot[][][] = orderTimeSlots([...timeSlots])
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
    const arrayOfArrays: TimeSlot[][][] = [[[]]]
    array.sort(
      (a, b) =>
        Number(new Date(`${a.day} ${a.startTime}:00`)) -
        Number(new Date(`${b.day} ${b.startTime}:00`)),
    )
    arrayOfArrays[0][0].push(array[0])
    for (let i = 1; i < array.length; i++) {
      if (Date.parse(array[i - 1].day) !== Date.parse(array[i].day)) {
        arrayOfArrays.push([[array[i]]])
      } else {
        for (
          let j = 0;
          j < arrayOfArrays[arrayOfArrays.length - 1].length;
          j++
        ) {
          const latestTimeSlot =
            arrayOfArrays[arrayOfArrays.length - 1][j][
              arrayOfArrays[arrayOfArrays.length - 1][j].length - 1
            ]
          console.log(latestTimeSlot)
          console.log(
            Number(new Date(`${array[i].day} ${array[i].startTime}:00`)),
          )
          console.log(
            Number(
              new Date(`${latestTimeSlot.day} ${latestTimeSlot.endTime}:00`),
            ),
          )
          if (
            Number(new Date(`${array[i].day} ${array[i].startTime}:00`)) >=
            Number(
              new Date(`${latestTimeSlot.day} ${latestTimeSlot.endTime}:00`),
            )
          ) {
            arrayOfArrays[arrayOfArrays.length - 1][j].push(array[i])
            break
          }
          if (j === arrayOfArrays[arrayOfArrays.length - 1].length - 1) {
            arrayOfArrays[arrayOfArrays.length - 1].push([array[i]])
            break
          }
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

  if (schedule[0][0][0]) {
    type StringPair = { startTime: string; endTime: string }
    const dayStartEnd: StringPair[] = []
    schedule.forEach((day, index) => {
      dayStartEnd.push({
        startTime: day[0][0].startTime,
        endTime: day[0][0].endTime,
      })
      day.forEach((col) => {
        if (
          new Date(`1970-01-01T${col[0].startTime}Z`) <
          new Date(`1970-01-01T${dayStartEnd[index].startTime}Z`)
        ) {
          dayStartEnd[index].startTime = col[0].startTime
        }
        if (
          new Date(`1970-01-01T${col[col.length - 1].endTime}Z`) >
          new Date(`1970-01-01T${dayStartEnd[index].endTime}Z`)
        ) {
          dayStartEnd[index].endTime = col[col.length - 1].endTime
        }
      })
    })
    console.log(dayStartEnd)
  }

  return (
    <div className="flex flex-col p-3 gap-2 color bg-green-400 rounded-lg">
      <h1>Schedule</h1>
      {schedule.map((day, index) => (
        <div key={index} className="p-3 gap-2 bg-blue-400 rounded-lg">
          <h2>{day[0][0] && day[0][0].day}</h2>
          <div className="flex flex-row p-3 gap-2">
            {day.map((column, index) => (
              <div key={index} className="flex flex-col p-3 gap-2">
                {column.map((slot) => (
                  <div
                    key={`${Object.values(slot)}`}
                    className="flex flex-col p-3 gap-2 bg-orange-400 rounded-lg outline outline-solid outline-2"
                  >
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
        </div>
      ))}
    </div>
  )
}

export default Schedule
