import { useState } from 'react'
import { Event, EventData } from '../../models/events'

interface Props {
  event: Event
  onCreate: (newEvent: EventData) => void
  onDelete: (deleteEvent: number) => void
}

function EventEditor({ event, onCreate, onDelete }: Props) {
  // const blankEvent: Event = {
  //   id: 0,
  //   name: '',
  //   host: '',
  //   bio: '',
  //   dates: '',
  //   location: '',
  //   price: '',
  // }
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

  function handleClick(selectedMode: string) {
    setMode(selectedMode)
  }

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    inputType: string,
  ) {
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
        console.log('no input type found')
    }
  }

  function handleConfirm() {
    if (mode === 'create') {
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
      const passed = Object.entries(newEvent).every(([key, value]) => {
        if (value === '') {
          alertMessage = `Please enter ${key}`
          console.log(`Please enter ${key}`)
          return false
        }
        if (key === 'dates') {
          const datesPassed = value.split(';').every((entry: string) => {
            const date = entry.split(' ')
            if (date.length !== 4) {
              alertMessage =
                'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
              console.log('wrong no. of strings')
              return false
            }
            if (validMonths.includes(date[0]) === false) {
              alertMessage =
                'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
              console.log('wrong month')
              return false
            }
            if (
              /^\d{1},$/.test(date[1]) === false &&
              /^\d{2},$/.test(date[1]) === false
            ) {
              alertMessage =
                'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
              console.log('wrong day: ' + date[1])
              return false
            }
            if (/^\d{4}$/.test(date[2]) === false) {
              alertMessage =
                'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
              console.log('wrong year')
              return false
            }
            if (/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(date[3]) === false) {
              alertMessage =
                'Please enter dates in the correct format e.g. February 21, 2026 11:00-11:45. If entering multiple dates, separate with a semicolon ";"'
              console.log('wrong hours')
              return false
            }
            return true
          })
          return datesPassed
        } else {
          return true
        }
      })
      console.log(passed)
      if (passed) {
        onCreate(newEvent as EventData)
        setNewEvent(blankEventData)
        setMode('')
      } else {
        alert(alertMessage)
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
    <div className="w-[41rem] bg-purple-400 p-3 rounded-lg outline outline-solid outline-2">
      {mode === '' && (
        <div className="flex flex-col p-3 gap-2 rounded-lg bg-red-300 outline outline-solid outline-2 min-h-[11.5rem]">
          <p className="flex justify-between">
            <b>Name: </b>
            <span className="w-10/12">{event.name}</span>
          </p>
          <p className="flex justify-between">
            <b>Host: </b>
            <span className="w-10/12">{event.host}</span>
          </p>
          <p className="flex justify-between">
            <b>Bio: </b>
            <span className="w-10/12">{event.bio}</span>
          </p>
          <p className="flex justify-between">
            <b>Dates: </b>
            <span className="w-10/12">{event.dates}</span>
          </p>
          <p className="flex justify-between">
            <b>Location: </b>
            <span className="w-10/12">{event.location}</span>
          </p>
          <p className="flex justify-between">
            <b>Price: </b>
            <span className="w-10/12">{event.price}</span>
          </p>
        </div>
      )}
      {mode === 'create' && (
        <div className="flex flex-col p-3 gap-2 rounded-lg bg-red-300 outline outline-solid outline-2 min-h-[11.5rem]">
          <p className="flex justify-between">
            <label className="" htmlFor="name">
              <b>Name: </b>
            </label>
            <input
              className="bg-transparent  w-10/12 outline-none placeholder-gray-500"
              id="name"
              type="text"
              placeholder="Enter name"
              value={newEvent.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
          </p>
          <p className="flex justify-between">
            <label className="" htmlFor="host">
              <b>Host: </b>
            </label>
            <input
              className="bg-transparent  w-10/12 outline-none placeholder-gray-500"
              id="host"
              type="text"
              placeholder="Enter host"
              value={newEvent.host}
              onChange={(e) => handleInputChange(e, 'host')}
            />
          </p>
          <p className="flex justify-between">
            <label className="" htmlFor="bio">
              <b>Bio: </b>
            </label>
            <textarea
              className="bg-transparent  w-10/12 resize-none outline-none placeholder-gray-500"
              id="bio"
              placeholder="Enter bio"
              value={newEvent.bio}
              onChange={(e) => {
                handleInputChange(e, 'bio')
                autoResize(e)
              }}
            />
          </p>
          <p className="flex justify-between">
            <label className="" htmlFor="dates">
              <b>Dates: </b>
            </label>
            <input
              className="bg-transparent  w-10/12 outline-none placeholder-gray-500"
              id="dates"
              type="text"
              placeholder="Enter dates"
              value={newEvent.dates}
              onChange={(e) => handleInputChange(e, 'dates')}
            />
          </p>
          <p className="flex justify-between">
            <label className="" htmlFor="location">
              <b>Location: </b>
            </label>
            <input
              className="bg-transparent  w-10/12 outline-none placeholder-gray-500"
              id="location"
              type="text"
              placeholder="Enter location"
              value={newEvent.location}
              onChange={(e) => handleInputChange(e, 'location')}
            />
          </p>
          <p className="flex justify-between">
            <label className="" htmlFor="price">
              <b>Price: </b>
            </label>
            <input
              className="bg-transparent w-10/12 outline-none placeholder-gray-500 "
              id="price"
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
            onClick={() => handleClick('')}
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

export default EventEditor
