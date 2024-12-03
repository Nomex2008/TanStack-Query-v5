import { useQuery } from '@tanstack/react-query'
import './App.css'

const getData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')

  return response.json()
}

function App() {
  const {data, error, isLoading} = useQuery({
    queryKey: ['posts'], 
    queryFn: getData
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
