import { useState, FormEvent } from 'react'
import { Button, Input, Card, CardHeader } from '../ui'
import type { User, CreateUserDto, UpdateUserDto } from '../../types'

interface UserFormProps {
  editingUser: User | null
  onSubmit: (data: CreateUserDto | UpdateUserDto) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function UserForm({
  editingUser,
  onSubmit,
  onCancel,
  loading,
}: UserFormProps) {
  const [name, setName] = useState(editingUser?.name || '')
  const [email, setEmail] = useState(editingUser?.email || '')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onSubmit({ name, email })
    if (!editingUser) {
      setName('')
      setEmail('')
    }
  }

  return (
    <Card>
      <CardHeader title={editingUser ? 'Edit User' : 'Create New User'} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
        <div className="flex gap-3">
          <Button type="submit" loading={loading} className="flex-1">
            {editingUser ? 'Update User' : 'Create User'}
          </Button>
          {editingUser && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}
