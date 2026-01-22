interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'h-6 w-6',
  md: 'h-10 w-10',
  lg: 'h-16 w-16',
}

export function Loading({ size = 'md', className = '' }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizes[size]}
          animate-spin rounded-full 
          border-4 border-gray-200 
          border-t-blue-600
        `}
      />
    </div>
  )
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Loading size="lg" />
    </div>
  )
}
