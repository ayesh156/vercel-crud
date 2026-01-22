import { Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import { UsersPage, PostsPage } from './pages'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
