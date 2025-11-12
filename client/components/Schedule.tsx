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
  type StringPair = { startTime: string; endTime: string }
  const dayStartEnd: StringPair[] = []
  const heightFactor = 100
  const widthFactor = 140
  if (schedule[0][0][0]) {
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
    //console.log(dayStartEnd)
    // console.log(Number(new Date(`1970-01-01T${dayStartEnd[0].endTime}Z`)))
    console.log(
      (Number(new Date(`1970-01-01T${dayStartEnd[0].endTime}Z`)) -
        Number(new Date(`1970-01-01T${dayStartEnd[0].startTime}Z`))) /
        50000,
    )
  }

  return (
    <div className="flex flex-col p-3 gap-2 color bg-green-400 rounded-lg">
      <h1>Schedule</h1>
      {schedule.map((day, dayIndex) => (
        <div key={dayIndex} className="p-3 gap-2 bg-blue-400 rounded-lg">
          <h2>{day[0][0] && day[0][0].day}</h2>
          <div
            className="flex flex-row p-3 gap-2"
            style={{ width: widthFactor * day.length + 80 }}
          >
            {day[0][0] &&
              day.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className="flex relative p-3 gap-2"
                  style={{
                    height:
                      (Number(
                        new Date(
                          `1970-01-01T${dayStartEnd[dayIndex].endTime}Z`,
                        ),
                      ) -
                        Number(
                          new Date(
                            `1970-01-01T${dayStartEnd[dayIndex].startTime}Z`,
                          ),
                        )) /
                      50000,
                  }}
                >
                  {col.map((slot) => (
                    <div
                      key={`${Object.values(slot)}`}
                      className={`box-border overflow-hidden absolute w-40 flex flex-col pb-1 pl-1 pr-1 gap-y-1 bg-orange-400 rounded-lg outline outline-solid outline-2`}
                      style={{
                        left: `${widthFactor * colIndex}px`,
                        top: `${heightFactor * inverseLerp(Number(new Date(`1970-01-01T${slot.startTime}Z`)), Number(new Date(`1970-01-01T${dayStartEnd[dayIndex].startTime}Z`)), Number(new Date(`1970-01-01T${dayStartEnd[dayIndex].endTime}Z`)))}%`,
                        height:
                          (Number(new Date(`1970-01-01T${slot.endTime}Z`)) -
                            60000 -
                            Number(new Date(`1970-01-01T${slot.startTime}Z`))) /
                          50000,
                        //top: `${heightFactor * (Number(new Date(`1970-01-01T${slot.startTime}Z`)) / (Number(new Date(`1970-01-01T${dayStartEnd[dayIndex].endTime}Z`)) - Number(new Date(`1970-01-01T${dayStartEnd[dayIndex].startTime}Z`))))}px`,
                      }}
                    >
                      <p>{slot.name}</p>
                      <p>
                        {slot.startTime} - {slot.endTime}
                      </p>
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

function inverseLerp(value: number, a: number, b: number) {
  // Handle the case where a and b are the same to avoid division by zero
  if (a === b) {
    return a === value ? 0 : value < a ? 0 : 1 // Or handle as an error, depending on requirements
  }

  const t = (value - a) / (b - a)

  // Clamp the result to ensure it stays within the 0-1 range,
  // as the value might be outside the a-b range.
  return Math.max(0, Math.min(1, t))
}

export default Schedule
