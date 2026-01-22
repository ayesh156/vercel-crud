import api from './api'
import type { User, CreateUserDto, UpdateUserDto } from '../types'

export const userService = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users')
    return response.data
  },

  // Get single user
  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  },

  // Create user
  create: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post<User>('/users', data)
    return response.data
  },

  // Update user
  update: async (id: number, data: UpdateUserDto): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, data)
    return response.data
  },

  // Delete user
  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
