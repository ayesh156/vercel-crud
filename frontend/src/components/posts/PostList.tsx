import { Card, CardHeader, Button, Loading } from '../ui'
import type { Post } from '../../types'

interface PostListProps {
  posts: Post[]
  loading: boolean
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
}

export function PostList({ posts, loading, onEdit, onDelete }: PostListProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader title="Posts" />
        <Loading className="py-8" />
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title="Posts"
        subtitle={`${posts.length} post${posts.length !== 1 ? 's' : ''}`}
      />
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No posts yet. Create your first post!
        </p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {post.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        post.published
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  {post.content && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                      {post.content}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    By: {post.author?.name || 'Unknown'}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="secondary" onClick={() => onEdit(post)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      if (confirm('Delete this post?')) {
                        onDelete(post.id)
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
