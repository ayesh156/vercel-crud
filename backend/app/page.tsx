export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">🚀 API Server Running</h1>
      <p className="text-gray-400 mb-8">
        This is the backend API server. Use the frontend app to interact.
      </p>
      
      <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Available Endpoints:</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-blue-400">Users API</h3>
            <ul className="text-sm text-gray-400 ml-4">
              <li>GET /api/users</li>
              <li>POST /api/users</li>
              <li>GET /api/users/:id</li>
              <li>PUT /api/users/:id</li>
              <li>DELETE /api/users/:id</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-green-400">Posts API</h3>
            <ul className="text-sm text-gray-400 ml-4">
              <li>GET /api/posts</li>
              <li>POST /api/posts</li>
              <li>GET /api/posts/:id</li>
              <li>PUT /api/posts/:id</li>
              <li>DELETE /api/posts/:id</li>
            </ul>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        Frontend: http://localhost:3000 | Backend: http://localhost:3001
      </p>
    </main>
  )
}
