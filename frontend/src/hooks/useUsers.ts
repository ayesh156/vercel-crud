import { useState, useEffect, useCallback } from 'react'
import { userService } from '../services'
import type { User, CreateUserDto, UpdateUserDto } from '../types'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await userService.getAll()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [])

  const createUser = useCallback(async (data: CreateUserDto) => {
    const user = await userService.create(data)
    setUsers((prev) => [user, ...prev])
    return user
  }, [])

  const updateUser = useCallback(async (id: number, data: UpdateUserDto) => {
    const user = await userService.update(id, data)
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...user } : u)))
    return user
  }, [])

  const deleteUser = useCallback(async (id: number) => {
    await userService.delete(id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
