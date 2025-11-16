import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as API from '../apis/events.ts'

export function useEvents() {
  // return useQuery({
  const query = useQuery({
    queryKey: ['events'],
    queryFn: () => API.getAllEvents(),
  })

  return {
    ...query,
    add: useAddEvent(),
    delete: useDeleteEvent(),
    edit: useEditEvent(),
  }
}

export function useEventMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  return mutation
}

export function useAddEvent() {
  return useEventMutation(API.addEvent)
}

export function useDeleteEvent() {
  return useEventMutation(API.deleteEvent)
}

export function useEditEvent() {
  return useEventMutation(API.editEvent)
}
