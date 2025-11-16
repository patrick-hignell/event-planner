import { Event } from '../../models/events'

function EventEditor(event: Event) {
  return (
    <div className="w-[34rem] bg-purple-400 p-3 rounded-lg outline outline-solid outline-2">
      <div className="flex flex-col p-3 gap-2 rounded-lg bg-red-300 outline outline-solid outline-2">
        <p>
          <b>Name: </b>
          {event.name}
        </p>
        <p>
          <b>Host: </b>
          {event.host}
        </p>
        <p>
          <b>Bio: </b>
          {event.bio}
        </p>
        <p>
          <b>Dates: </b>
          {event.dates}
        </p>
        <p>
          <b>Location: </b>
          {event.location}
        </p>
        <p>
          <b>Price: </b>
          {event.price}
        </p>
      </div>
      <div className="flex justify-around p-3 pb-0">
        <button className="bg-red-400 rounded-lg p-3 w-28 outline outline-solid outline-2">
          Edit
        </button>
        <button className="bg-red-400 rounded-lg p-3 w-28 outline outline-solid outline-2">
          Delete
        </button>
        <button className="bg-red-400 rounded-lg p-3 w-28 outline outline-solid outline-2">
          Create
        </button>
      </div>
    </div>
  )
}

export default EventEditor
