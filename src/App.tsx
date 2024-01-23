import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  keepPreviousData 
} from '@tanstack/react-query'
import { fetchData, addData } from './api/data'

function App({userId}:{userId: string}): JSX.Element {
  const queryClient = useQueryClient()

  const {
    data, 
    fetchStatus,
    status, 
    isPending, 
    isFetching,
    error
  } = useQuery({ 
    queryKey: ['data', userId], 
    queryFn: fetchData,
    enabled: !!userId,
    placeholderData: keepPreviousData
  })

  const mutation = useMutation({
    mutationFn: addData,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['data', userId]})
      const prevData = queryClient.getQueryData(['data', userId])
      queryClient.setQueryData(['data', userId], newData)
      return { prevData, newData }
    },
    onError: (err, newData, context) => {
      console.log(err, newData)
      queryClient.setQueryData(['data', userId], context?.prevData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data', userId] })
    },
    onSettled: () => {
      console.log('whether error or success, this was called')
      queryClient.invalidateQueries({ queryKey: ['data', userId] })
    }
  })

  if (isPending) return (
    <button 
      onClick={(e) => {
        e.preventDefault()
        if (fetchStatus !== 'idle'){
          queryClient.cancelQueries({queryKey: ['data', userId]})
        } else {
          queryClient.refetchQueries({queryKey: ['data', userId]})
        }
      }}
    >
      {fetchStatus !== 'idle' ? 'Pending': 'Unpause'}
    </button>
  )
  if (isFetching) return <div>Refreshing...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      {status === 'success' ? data.name : 'No Data'}
      <br />
      <button onClick={() => mutation.mutateAsync()}>
        Add Data
      </button>
      {mutation.isPending ? 'Adding Data' : undefined}
      {mutation.error ? 
        <p onClick={() => mutation.reset()}>
          {mutation.error.message}
        </p>
        : 
        undefined
      }
      {mutation.isSuccess ? 'Data Added! 🤩' : undefined}
    </div>
  )
}

export default App