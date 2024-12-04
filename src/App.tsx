import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import './App.css'

const getData = async () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts')
}

function App() {
  const {data, error, isLoading} = useQuery({
    queryKey: ['posts'], 
    queryFn: getData,
    select: data => data.data
  })

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
