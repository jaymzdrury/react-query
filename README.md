## React Query

<img src="https://images.unsplash.com/photo-1527409335569-f0e5c91fa707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="React" width="350" />

### Setup

`pnpm add @tanstack/react-query`

***

_mutate_ and _mutateAsync_

do the same thing, mutateAsync awaits response, which looks a little better

```JavaScript
    <button onClick={() => mutation.mutateAsync()}>
        Add Data
    </button>
```

_invalidateQueries_

checks to see if query needs to be invalidated, then refetches if so

```JavaScript
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data', userId] })
    },
```

_placeholderData_ 

renders cached data while actual query fetches in background

```JavaScript
    useQuery({ 
        ...
        placeholderData: keepPreviousData
    })
```
_disabled_

query is disabled if no userId

```JavaScript
    useQuery({ 
        ...
        enabled: !!userId,
    })
```
