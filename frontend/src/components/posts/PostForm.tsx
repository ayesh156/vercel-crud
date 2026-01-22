import { useState, FormEvent, useEffect } from 'react'
import { Button, Input, TextArea, Select, Card, CardHeader } from '../ui'
import type { Post, User, CreatePostDto, UpdatePostDto } from '../../types'

interface PostFormProps {
  editingPost: Post | null
  users: User[]
  onSubmit: (data: CreatePostDto | UpdatePostDto) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function PostForm({
  editingPost,
  users,
  onSubmit,
  onCancel,
  loading,
}: PostFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [published, setPublished] = useState(false)

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title)
      setContent(editingPost.content || '')
      setPublished(editingPost.published)
    } else {
      setTitle('')
      setContent('')
      setAuthorId('')
      setPublished(false)
    }
  }, [editingPost])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editingPost) {
      await onSubmit({ title, content, published })
    } else {
      await onSubmit({
        title,
        content,
        authorId: parseInt(authorId),
        published,
      })
    }
    if (!editingPost) {
      setTitle('')
      setContent('')
      setAuthorId('')
      setPublished(false)
    }
  }

  const userOptions = users.map((u) => ({ value: u.id, label: u.name }))

  return (
    <Card>
      <CardHeader title={editingPost ? 'Edit Post' : 'Create New Post'} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
        <TextArea
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content..."
          rows={4}
        />
        {!editingPost && (
          <Select
            label="Author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            options={userOptions}
            placeholder="Select an author"
            required
          />
        )}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label
            htmlFor="published"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            Published
          </label>
        </div>
        <div className="flex gap-3">
          <Button type="submit" loading={loading} className="flex-1">
            {editingPost ? 'Update Post' : 'Create Post'}
          </Button>
          {editingPost && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}
