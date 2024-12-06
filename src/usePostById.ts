import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { IPost } from './post.types'

const getData = async (id: number) => {
    return axios.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

export function usePost(id:number) {
  const {data, isLoading, isSuccess, isError} = useQuery({
    queryKey: ['post', id], 
    queryFn: () => getData(id),
    select: data => data.data,
    enabled: !!id
  })

  useEffect(() => {
    if(isSuccess) console.log('Data fetched successfully')
  },[isSuccess])

  useEffect(() => {
    if(isError) console.log('Error data fetched')
  },[isError])

  return {post: data, isLoading}
}