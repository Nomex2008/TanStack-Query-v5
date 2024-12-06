import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'

const getData = async () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
  }

export function usePosts(isAuth: boolean) {
  const {data, error, isLoading, isSuccess, isError} = useQuery({
    queryKey: ['posts'], 
    queryFn: getData,
    select: data => data.data,
    enabled: isAuth
  })

  useEffect(() => {
    if(isSuccess) console.log('Data fetched successfully')
  },[isSuccess])

  useEffect(() => {
    if(isError) console.log('Error data fetched')
  },[isError])

  return {data, error, isLoading, isSuccess, isError}
}