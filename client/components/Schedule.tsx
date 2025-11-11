import { useQuery } from '@tanstack/react-query'
import { getEvents } from '../apis/events'

function Schedule() {
  const {
    data: events,
    isPending,
    error,
  } = useQuery({ queryKey: ['events'], queryFn: () => getEvents() })
  //const queryClient = useQueryClient()

  if (isPending) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      <h1>Schedule</h1>
      {events.map((event) => (
        <div key={event.id}>
          <p>{event.name}</p>
          <p>{event.host}</p>
          <p>{event.bio}</p>
          <p>Date: {event.dates}</p>
          <p>Location: {event.location}</p>
          <p>Price: {event.price}</p>
          <br></br>
        </div>
      ))}
    </div>
  )
}

export default Schedule
