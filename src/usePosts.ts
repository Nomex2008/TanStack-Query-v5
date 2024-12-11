import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { IPost } from './post.types'

const getData = async () => {
    return axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
  }

  const initialData: {data: IPost[]} = {
    data: [
      {
        body: 'Initial body',
        id: 0,
        title: 'Initial title',
        userId: 0,
      }
    ]
  }

export function usePosts(isAuth: boolean) {
  const {data, error, isLoading, isSuccess, isError} = useQuery({
    queryKey: ['posts'], 
    queryFn: getData,
    select: data => data.data,
    enabled: isAuth,
    initialData,
    staleTime: 1000,
  })

  useEffect(() => {
    if(isSuccess) console.log('Data fetched successfully')
  },[isSuccess])

  useEffect(() => {
    if(isError) console.log('Error data fetched')
  },[isError])

  return {data, error, isLoading, isSuccess, isError}
}