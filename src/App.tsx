import './App.css'
import { usePost } from './usePostById'
import {usePosts} from './usePosts'

const isAuth = true

function App() {
  const {post} = usePost(1)
  const {data, isLoading} = usePosts(isAuth)

  console.log(post)

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
