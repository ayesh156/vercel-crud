import { useState, useEffect, useCallback } from 'react'
import { postService } from '../services'
import type { Post, CreatePostDto, UpdatePostDto } from '../types'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await postService.getAll()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }, [])

  const createPost = useCallback(async (data: CreatePostDto) => {
    const post = await postService.create(data)
    setPosts((prev) => [post, ...prev])
    return post
  }, [])

  const updatePost = useCallback(async (id: number, data: UpdatePostDto) => {
    const post = await postService.update(id, data)
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...post } : p)))
    return post
  }, [])

  const deletePost = useCallback(async (id: number) => {
    await postService.delete(id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
    createPost,
    updatePost,
    deletePost,
  }
}
