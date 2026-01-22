import { useState } from 'react'
import { PostForm, PostList, Toast } from '../components'
import { usePosts, useUsers, useToast } from '../hooks'
import type { Post, CreatePostDto, UpdatePostDto } from '../types'

export function PostsPage() {
  const { posts, loading, createPost, updatePost, deletePost } = usePosts()
  const { users } = useUsers()
  const { toasts, success, error, dismiss } = useToast()
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data: CreatePostDto | UpdatePostDto) => {
    setSubmitting(true)
    try {
      if (editingPost) {
        await updatePost(editingPost.id, data as UpdatePostDto)
        success('Post updated successfully!')
        setEditingPost(null)
      } else {
        await createPost(data as CreatePostDto)
        success('Post created successfully!')
      }
    } catch (err) {
      error(err instanceof Error ? err.message : 'Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
  }

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id)
      success('Post deleted successfully!')
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to delete post')
    }
  }

  const handleCancel = () => {
    setEditingPost(null)
  }

  return (
    <div className="space-y-6">
      <Toast toasts={toasts} onDismiss={dismiss} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <PostForm
          editingPost={editingPost}
          users={users}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={submitting}
        />
        <PostList
          posts={posts}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
