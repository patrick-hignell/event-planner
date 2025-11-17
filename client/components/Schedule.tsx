import { useEffect, useState } from 'react'
import { Event, EventData, TimeSlot } from '../../models/events'
import EventEditor from './EventEditor'
import { useEvents } from '../hooks/useEvents'

function Schedule() {
  const blankEvent: Event = {
    id: 0,
    name: '',
    host: '',
    bio: '',
    dates: '',
    location: '',
    price: '',
  }
  const [schedule, setSchedule] = useState<TimeSlot[][][]>([[[]]])
  const [selectedEvent, setSelectedEvent] = useState<Event>(blankEvent)

  const {
    data: events,
    isPending,
    isError,
    error,
    delete: deleteEvent,
    add: addEvent,
    edit: editEvent,
  } = useEvents()
  //const queryClient = useQueryClient()

  useEffect(() => {
    if (events) {
      const timeSlots: TimeSlot[] = []
      events.forEach((event) => {
        timeSlots.push(...eventToTimeSlot(event))
      })
      const orderedTimeSlots: TimeSlot[][][] = orderTimeSlots([...timeSlots])
      //console.log(orderedTimeSlots)
      setSchedule([...orderedTimeSlots])
    }
  }, [events])

  function eventToTimeSlot(event: Event) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Full weekday name (e.g., "Monday")
      day: 'numeric', // Day of the month (e.g., "17")
      month: 'short', // Full month name (e.g., "November")
      year: 'numeric', // Full year (e.g., "2025")
    }
    const tempTimeSlots: TimeSlot[] = []
    event.dates.split(';').forEach((timeSlot) => {
      tempTimeSlots.push({
        eventId: event.id,
        day: new Date(
          timeSlot.slice(0, timeSlot.indexOf(':') - 2).trimEnd(),
        ).toLocaleString('en-NZ', options),
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

  if (isPending) return <h2>Is Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  type StringPair = { startTime: string; endTime: string }
  const dayStartEnd: StringPair[] = []
  const dayHours: string[][] = []
  let maxDayLength = 0
  const heightFactor = 100
  const widthFactor = 175
  const offset = 46
  if (schedule[0][0][0]) {
    schedule.forEach((day, index) => {
      dayHours.push([])
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
    // console.log(
    //   (Number(new Date(`1970-01-01T${dayStartEnd[0].endTime}Z`)) -
    //     Number(new Date(`1970-01-01T${dayStartEnd[0].startTime}Z`))) /
    //     3600000,
    // )

    // dayStartEnd.forEach((day) =>
    //   dayHours.push(
    //     (Number(new Date(`1970-01-01T${day.endTime}Z`)) -
    //       Number(new Date(`1970-01-01T${day.startTime}Z`))) /
    //       3600000,
    //   ),
    // )

    dayStartEnd.forEach((day, index) => {
      const tempStart = day.startTime.slice(0, -2) + '00'
      let tempEnd = ''
      day.endTime.slice(-2) === '00'
        ? (tempEnd = day.endTime)
        : (tempEnd = (Number(day.endTime.slice(0, 2)) + 1).toString() + ':00')
      const length =
        (Number(new Date(`1970-01-01T${tempEnd}Z`)) -
          Number(new Date(`1970-01-01T${tempStart}Z`))) /
        3600000
      //console.log(tempStart)
      //console.log(tempEnd)
      //console.log(length)
      for (let i = 0; i < length + 1; i++) {
        let tempTime = (Number(tempStart.slice(0, 2)) + i).toString() + ':00'
        if (tempTime.length < 5) {
          tempTime = '0' + tempTime
          //console.log('temptime: ' + tempTime)
        }
        dayHours[index].push(tempTime)
      }
      // (
      //   Number(new Date(`1970-01-01T${tempStart}Z`)) -
      //     Number(new Date(`1970-01-01T${tempEnd}Z`)),
      // ) / 3600000
      //console.log('hour length')
      // console.log(
      //   (Number(new Date(`1970-01-01T09:58Z`)) -
      //     60000 -
      //     Number(new Date(`1970-01-01T09:00Z`))) /
      //     50000,
      // )
      // console.log('hour length: ')
      // console.log(
      //   (Number(new Date(`1970-01-01T10:00Z`)) -
      //     Number(new Date(`1970-01-01T09:00Z`))) /
      //     3600000,
      // )
    })

    //console.log(dayHours)
    schedule.forEach((day) => {
      if (day.length > maxDayLength) maxDayLength = day.length
    })
  }

  function handleClick(eventId: number) {
    const event = events?.find((event) => event.id === eventId)
    if (event) setSelectedEvent(event)
    //console.log(event)
  }

  function handleEdit(newEvent: Event) {
    editEvent.mutate(newEvent)
    setSelectedEvent(blankEvent)
  }

  function handleCreate(newEvent: EventData) {
    addEvent.mutate(newEvent)
    setSelectedEvent(blankEvent)
  }

  function handleDelete(id: number | string) {
    deleteEvent.mutate(id)
    setSelectedEvent(blankEvent)
  }

  return (
    <div className="flex lg:flex-row flex-col gap-4 justify-start lg:pl-3">
      <EventEditor
        event={selectedEvent}
        onEdit={handleEdit}
        onCreate={handleCreate}
        onDelete={() => handleDelete(selectedEvent.id)}
      />
      <div className="flex flex-col lg:p-3 gap-2 color bg-green-400 rounded-lg outline outline-solid outline-2">
        {schedule.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="p-3 gap-2 bg-blue-400 rounded-lg outline outline-solid outline-2 overflow-x-scroll"
          >
            <h2 className="text-[110%]">
              {day[0][0] && formatDate(day[0][0].day)}
            </h2>
            <div
              className="grid grid-cols-1 grid-rows-1 p-3 gap-2"
              style={{ width: widthFactor * day.length + 82 }}
            >
              {day[0][0] && (
                <div className="col-start-1 row-start-1 relative mr-10 rounded-lg">
                  {dayHours[dayIndex].map((hour, index) => (
                    <p
                      key={hour}
                      className={`text-sm indent-1 rounded-md mb-[0px] ${index < dayHours[dayIndex].length - 1 ? `outline-black outline-dotted outline-2` : ``}`}
                      style={{
                        height:
                          index < dayHours[dayIndex].length - 1 ? 70.8 : 7.08,
                        width: widthFactor * maxDayLength + 60,
                        //top: `${heightFactor * (Number(new Date(`1970-01-01T${slot.startTime}Z`)) / (Number(new Date(`1970-01-01T${dayStartEnd[dayIndex].endTime}Z`)) - Number(new Date(`1970-01-01T${dayStartEnd[dayIndex].startTime}Z`))))}px`,
                      }}
                    >
                      {hour}
                    </p>
                  ))}
                </div>
              )}
              {day[0][0] &&
                day.map((col, colIndex) => (
                  <div
                    key={colIndex}
                    className="col-start-1 row-start-1 flex relative p-3 gap-2"
                    style={{
                      height: (dayHours[dayIndex].length - 1) * 70.8,
                      // ((Number(
                      //   new Date(`1970-01-01T${dayHours[dayIndex][0]}Z`),
                      // ) -
                      //   Number(
                      //     new Date(
                      //       `1970-01-01T${dayHours[dayIndex][dayHours[dayIndex].length - 1]}Z`,
                      //     ),
                      //   )) /
                      //   3600000) *
                      // 70.8,
                    }}
                  >
                    {col.map((slot) => (
                      <button
                        onClick={() => handleClick(slot.eventId)}
                        key={`${Object.values(slot)}`}
                        className={`z-10 box-border overflow-hidden absolute w-40 flex flex-col pb-1 pl-1 pr-1 gap-y-2 bg-orange-400 rounded-lg outline outline-solid outline-2`}
                        style={{
                          left: `${widthFactor * colIndex + offset}px`,
                          top: `${heightFactor * inverseLerp(Number(new Date(`1970-01-01T${slot.startTime}Z`)), Number(new Date(`1970-01-01T${dayHours[dayIndex][0]}Z`)), Number(new Date(`1970-01-01T${dayHours[dayIndex][dayHours[dayIndex].length - 1]}Z`)))}%`,
                          height:
                            ((Number(new Date(`1970-01-01T${slot.endTime}Z`)) -
                              60000 -
                              Number(
                                new Date(`1970-01-01T${slot.startTime}Z`),
                              )) /
                              3600000) *
                            70.8,
                          //top: `${heightFactor * (Number(new Date(`1970-01-01T${slot.startTime}Z`)) / (Number(new Date(`1970-01-01T${dayStartEnd[dayIndex].endTime}Z`)) - Number(new Date(`1970-01-01T${dayStartEnd[dayIndex].startTime}Z`))))}px`,
                        }}
                      >
                        <p>{slot.name}</p>
                        <p>
                          {slot.startTime} - {slot.endTime}
                        </p>
                        <br></br>
                      </button>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
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

function formatDate(date: string) {
  const dateArray = date.split(' ')
  dateArray[0] = dateArray[0].toUpperCase()
  dateArray[1] = dateArray[1] + nthNumber(Number(dateArray[1]))
  dateArray[2] = dateArray[2].toUpperCase()
  return dateArray.join(' ')
}

function nthNumber(number: number) {
  if (number > 3 && number < 21) return 'th'
  switch (number % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export default Schedule
