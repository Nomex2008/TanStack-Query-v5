import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import './App.css'
import { IPost } from './post.types'
import { usePost } from './usePostById'
import {usePosts} from './usePosts'

const isAuth = true

function App() {
  const queryClient = useQueryClient()
  const {post} = usePost(1)
  const {data, isLoading} = usePosts(isAuth)

  const {mutate, isPending} = useMutation({
    mutationKey: ['add post'],
    mutationFn: async (newPost: Omit<IPost, 'id'>) => axios.post('https://jsonplaceholder.typicode.com/posts', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']})
    }
  })

  console.log(post)

  return (
    <>
      <h1>React Query</h1>

      <button onClick={() => {
        mutate({
          body: 'New body',
          title: 'New title',
          userId: 1,
        })
      }}>{isPending ? 'Loading' : 'Create'}</button>

      <button onClick={() => {
        queryClient.invalidateQueries({queryKey: ['posts']})
      }}>Invalidate Posts</button>

      <div>
        {isLoading
        ? 'Loading...'
        : data?.length
        ? data.map((post: any) => (
          <div key = {post.id}>{post.title}</div>
        )) 
        : 'Not found' }
      </div>
    </>
  )
}

export default App
