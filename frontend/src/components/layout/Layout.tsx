import { NavLink } from 'react-router-dom'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Vercel CRUD
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                React + Next.js + PostgreSQL
              </p>
            </div>
            <nav className="flex gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`
                }
              >
                Users
              </NavLink>
              <NavLink
                to="/posts"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`
                }
              >
                Posts
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Built with React, Next.js, Prisma & PostgreSQL</p>
        <p className="mt-1">Deployed on Vercel</p>
      </footer>
    </div>
  )
}
