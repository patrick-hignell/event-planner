import { useEffect, useState } from 'react'
import { Event, EventData } from '../../models/events'

interface Props {
  event: Event
  onEdit: (editEvent: Event) => void
  onCreate: (newEvent: EventData) => void
  onDelete: (deleteEvent: number) => void
}

function EventEditor({ event, onCreate, onDelete, onEdit }: Props) {
  const blankEvent: Event = {
    id: 0,
    name: '',
    host: '',
    bio: '',
    dates: '',
    location: '',
    price: '',
  }
  const blankEventData: EventData = {
    name: '',
    host: '',
    bio: '',
    dates: '',
    location: '',
    price: '',
  }
  const [mode, setMode] = useState('')
  const [newEvent, setNewEvent] = useState<EventData>(blankEventData)
  const [editEvent, setEditEvent] = useState<Event>(blankEvent)

  useEffect(() => {
    setMode('')
    setNewEvent(blankEventData)
    setEditEvent(event)
  }, [event])

  useEffect(() => {
    document.querySelectorAll('textarea').forEach((area) => {
      area.style.height = 'auto' // Reset height to recalculate
      area.style.height = area.scrollHeight + 'px' // Set height to scrollHeight
    })
  }, [mode])

  function handleClick(selectedMode: string) {
    setMode(selectedMode)
  }

  function handleCancel() {
    setMode('')
    setNewEvent(blankEventData)
    setEditEvent(event)
  }

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    inputType: string,
  ) {
    if (mode === 'create')
      switch (inputType) {
        case 'name':
          setNewEvent({ ...newEvent, name: e.target.value })
          break
        case 'host':
          setNewEvent({ ...newEvent, host: e.target.value })
          break
        case 'bio':
          setNewEvent({ ...newEvent, bio: e.target.value })
          break
        case 'dates':
          setNewEvent({ ...newEvent, dates: e.target.value })
          break
        case 'location':
          setNewEvent({ ...newEvent, location: e.target.value })
          break
        case 'price':
          setNewEvent({ ...newEvent, price: e.target.value })
          break
        default:
        //console.log('no input type found')
      }
    if (mode === 'edit')
      switch (inputType) {
        case 'name':
          setEditEvent({ ...editEvent, name: e.target.value })
          break
        case 'host':
          setEditEvent({ ...editEvent, host: e.target.value })
          break
        case 'bio':
          setEditEvent({ ...editEvent, bio: e.target.value })
          break
        case 'dates':
          setEditEvent({ ...editEvent, dates: e.target.value })
          break
        case 'location':
          setEditEvent({ ...editEvent, location: e.target.value })
          break
        case 'price':
          setEditEvent({ ...editEvent, price: e.target.value })
          break
        default:
        //console.log('no input type found')
      }
  }

  function handleConfirm() {
    if (mode === 'edit') {
      const passed = checkEvent(editEvent)
      //console.log(passed)
      if (passed) {
        onEdit(editEvent as Event)
        setEditEvent(blankEvent)
        setMode('')
      }
    } else if (mode === 'create') {
      const passed = checkEvent(newEvent)
      //console.log(passed)
      if (passed) {
        onCreate(newEvent as EventData)
        setNewEvent(blankEventData)
        setMode('')
      }
    } else if (mode === 'delete') {
      if (event.id > 0) {
        onDelete(event.id)
        setMode('')
      } else {
        alert('Select an event to delete')
      }
    }
  }

  return (
    <div className="flex flex-col h-screen sticky top-0 bottom-0 w-[41rem] bg-purple-400 p-3 rounded-lg outline outline-solid outline-2">
      {mode === '' && (
        <div className="editor container">
          <p className="flex">
            <b className="w-1/6">Name: </b>
            <span className="editor name">{event.name}</span>
          </p>
          <p className="flex">
            <b className="w-1/6">Host: </b>
            <span className="editor host">{event.host}</span>
          </p>
          <p className="flex">
            <b className="w-1/6">Bio: </b>
            <span className="editor bio">{event.bio}</span>
          </p>
          <p className="flex">
            <b className="w-1/6">Dates: </b>
            <span className="editor dates">
              {event.dates.split(';').join('\n')}
            </span>
          </p>
          <p className="flex">
            <b className="w-1/6">Location: </b>
            <span className="editor location">{event.location}</span>
          </p>
          <p className="flex">
            <b className="w-1/6">Price: </b>
            <span className="editor price">{event.price}</span>
          </p>
        </div>
      )}
      {mode === 'edit' && (
        <div className="editor container">
          <p className="flex">
            <label className="w-1/6 b" htmlFor="editName">
              Name:
            </label>
            <input
              className="bg-transparent  editor name outline-none placeholder-gray-500"
              id="editName"
              type="text"
              placeholder="Enter name"
              value={editEvent.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="editHost">
              Host:
            </label>
            <input
              className="bg-transparent editor host outline-none placeholder-gray-500"
              id="editHost"
              type="text"
              placeholder="Enter host"
              value={editEvent.host}
              onChange={(e) => handleInputChange(e, 'host')}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="editBio">
              Bio:
            </label>
            <textarea
              className="bg-transparent  editor bio resize-none outline-none placeholder-gray-500"
              id="editBio"
              placeholder="Enter bio"
              value={editEvent.bio}
              onChange={(e) => {
                handleInputChange(e, 'bio')
                autoResize(e)
              }}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="editDates">
              Dates:
            </label>
            <input
              className="bg-transparent  editor dates outline-none placeholder-gray-500"
              id="editDates"
              type="text"
              placeholder="Enter dates"
              value={editEvent.dates}
              onChange={(e) => handleInputChange(e, 'dates')}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="editLocation">
              Location:
            </label>
            <input
              className="bg-transparent  editor location outline-none placeholder-gray-500"
              id="editLocation"
              type="text"
              placeholder="Enter location"
              value={editEvent.location}
              onChange={(e) => handleInputChange(e, 'location')}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="editPrice">
              Price:
            </label>
            <input
              className="bg-transparent editor price outline-none placeholder-gray-500 "
              id="editPrice"
              type="text"
              placeholder="Enter price"
              value={editEvent.price}
              onChange={(e) => handleInputChange(e, 'price')}
            />
          </p>
        </div>
      )}
      {mode === 'create' && (
        <div className="editor container">
          <p className="flex">
            <label className="w-1/6 b" htmlFor="createName">
              Name:
            </label>
            <input
              className="bg-transparent  editor name outline-none placeholder-gray-500"
              id="createName"
              type="text"
              placeholder="Enter name"
              value={newEvent.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="createHost">
              Host:
            </label>
            <input
              className="bg-transparent  editor host outline-none placeholder-gray-500"
              id="createHost"
              type="text"
              placeholder="Enter host"
              value={newEvent.host}
              onChange={(e) => handleInputChange(e, 'host')}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="createBio">
              Bio:
            </label>
            <textarea
              className="bg-transparent  editor bio resize-none outline-none placeholder-gray-500"
              id="createBio"
              placeholder="Enter bio"
              value={newEvent.bio}
              onChange={(e) => {
                handleInputChange(e, 'bio')
                autoResize(e)
              }}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="createDates">
              Dates:
            </label>
            <input
              className="bg-transparent  editor dates outline-none placeholder-gray-500"
              id="createDates"
              type="text"
              placeholder="Enter dates"
              value={newEvent.dates}
              onChange={(e) => handleInputChange(e, 'dates')}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="createLocation">
              Location:
            </label>
            <input
              className="bg-transparent  editor location outline-none placeholder-gray-500"
              id="createLocation"
              type="text"
              placeholder="Enter location"
              value={newEvent.location}
              onChange={(e) => handleInputChange(e, 'location')}
            />
          </p>
          <p className="flex">
            <label className="w-1/6 b" htmlFor="createPrice">
              Price:
            </label>
            <input
              className="bg-transparent editor price outline-none placeholder-gray-500 "
              id="createPrice"
              type="text"
              placeholder="Enter price"
              value={newEvent.price}
              onChange={(e) => handleInputChange(e, 'price')}
            />
          </p>
        </div>
      )}
      {mode === 'delete' && (
        <div className="flex flex-col p-3 gap-2 rounded-lg bg-red-300 outline outline-solid outline-2 min-h-[11.5rem]">
          {event.name.length > 0 ? (
            <p>Are you sure you want to delete the {event.name} event?</p>
          ) : (
            <p> Select an event to delete</p>
          )}
        </div>
      )}
      {mode === '' && (
        <div className="flex justify-around p-3 pb-0">
          <button
            onClick={() => handleClick('edit')}
            className="bg-red-400 rounded-lg p-3 w-28 outline outline-solid outline-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleClick('delete')}
            className="bg-red-400 rounded-lg p-3 w-28 outline outline-solid outline-2"
          >
            Delete
          </button>
          <button
            onClick={() => handleClick('create')}
            className="bg-red-400 rounded-lg p-3 w-28 outline outline-solid outline-2"
          >
            Create
          </button>
        </div>
      )}
      {mode !== '' && (
        <div className="flex justify-around p-3 pb-0">
          <button
            onClick={() => handleConfirm()}
            className="bg-red-400 rounded-lg p-3 w-28 outline outline-solid outline-2"
          >
            Confirm
          </button>
          <button
            onClick={() => handleCancel()}
            className="bg-red-400 rounded-lg p-3 w-28 outline outline-solid outline-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
  e.target.style.height = 'auto' // Reset height to recalculate
  e.target.style.height = e.target.scrollHeight + 'px' // Set height to scrollHeight
}

function checkEvent(testEvent: Event | EventData) {
  const validMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let alertMessage = ''
  const passed = Object.entries(testEvent).every(([key, value]) => {
    if (value === '') {
      alertMessage = `Please enter ${key}`
      //console.log(`Please enter ${key}`)
      return false
    }
    if (key === 'dates') {
      const datesPassed = value.split(';').every((entry: string) => {
        const date = entry.split(' ')
        if (date.length !== 4) {
          alertMessage =
            'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
          //console.log('wrong no. of strings')
          return false
        }
        if (validMonths.includes(date[0]) === false) {
          alertMessage =
            'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
          //console.log('wrong month')
          return false
        }
        if (
          /^\d{1},$/.test(date[1]) === false &&
          /^\d{2},$/.test(date[1]) === false
        ) {
          alertMessage =
            'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
          //console.log('wrong day: ' + date[1])
          return false
        }
        if (/^\d{4}$/.test(date[2]) === false) {
          alertMessage =
            'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
          //console.log('wrong year')
          return false
        }
        if (/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(date[3]) === false) {
          alertMessage =
            'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
          //console.log('wrong hours')
          return false
        }
        if (
          new Date(`1970-01-01T${date[3].split('-')[0]}Z`).getTime() ===
          new Date(`1970-01-01T${date[3].split('-')[1]}Z`).getTime()
        ) {
          alertMessage = 'The event must last at least one minute'
          //console.log('duration 0')
          return false
        }
        if (
          new Date(`1970-01-01T${date[3].split('-')[0]}Z`).getTime() >
          new Date(`1970-01-01T${date[3].split('-')[1]}Z`).getTime()
        ) {
          alertMessage = 'Please refrain from creating a temporal paradox'
          //console.log('hours end before they start')
          return false
        }
        //console.log(new Date(`1970-01-01T${date[3].split('-')[0]}Z`))
        //console.log(new Date(`1970-01-01T${date[3].split('-')[1]}Z`))
        //console.log(`${date[3].split('-')[0]}`)
        //console.log(`${date[3].split('-')[1]}`)
        return true
      })
      return datesPassed
    } else {
      return true
    }
  })

  if (!passed) alert(alertMessage)
  return passed
}

export default EventEditor
