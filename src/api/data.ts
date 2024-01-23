import {QueryKey} from '@tanstack/react-query'

export interface Data {
    name: string
}

const data: Data[] = [
    {name: 'Name with id 0'},
    {name: 'Name with id 1'},
    {name: 'Name with id 2'}
]

export const fetchData: ({queryKey}:{queryKey: QueryKey}) => 
Promise<Data> = async ({queryKey}:{queryKey: QueryKey}) => {

    const [_key, userId] = queryKey 
    console.log(_key, userId)

    await new Promise((resolve) => setTimeout(resolve,2500))
    const filteredData: Data = data[Number(userId)]
    return filteredData

}

export const addData = async () => {
    await new Promise((resolve) => setTimeout(resolve,1000))
    data.unshift({name: 'This is a new name'})
}

