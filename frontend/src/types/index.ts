// Re-export shared types for frontend use
export interface User {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt?: string
  posts?: Post[]
}

export interface Post {
  id: number
  title: string
  content: string | null
  published: boolean
  authorId: number
  author?: Pick<User, 'id' | 'name' | 'email'>
  createdAt: string
  updatedAt?: string
}

export interface CreateUserDto {
  name: string
  email: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
}

export interface CreatePostDto {
  title: string
  content?: string
  authorId: number
  published?: boolean
}

export interface UpdatePostDto {
  title?: string
  content?: string
  published?: boolean
}
