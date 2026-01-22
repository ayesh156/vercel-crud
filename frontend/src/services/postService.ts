import api from './api'
import type { Post, CreatePostDto, UpdatePostDto } from '../types'

export const postService = {
  // Get all posts
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts')
    return response.data
  },

  // Get single post
  getById: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`)
    return response.data
  },

  // Create post
  create: async (data: CreatePostDto): Promise<Post> => {
    const response = await api.post<Post>('/posts', data)
    return response.data
  },

  // Update post
  update: async (id: number, data: UpdatePostDto): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}`, data)
    return response.data
  },

  // Delete post
  delete: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`)
  },
}
