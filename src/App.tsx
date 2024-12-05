import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import './App.css'

const isAuth = true

const getData = async () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts')
}

function App() {
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

  console.log(error)

  return (
    <>
      <h1>React Query</h1>

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
