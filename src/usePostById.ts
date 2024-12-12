import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { postService } from './post.service'

export function usePost(id:number) {
  const {data, isLoading, isSuccess, isError, refetch} = useQuery({
    queryKey: ['post', id], 
    queryFn: () => postService.getPostById(id),
    select: data => data.data,
    enabled: !!id
  })

  useEffect(() => {
    if(isSuccess) console.log('Data fetched successfully')
  },[isSuccess])

  useEffect(() => {
    if(isError) console.log('Error data fetched')
  },[isError])

  refetch()

  return {post: data, isLoading}
}