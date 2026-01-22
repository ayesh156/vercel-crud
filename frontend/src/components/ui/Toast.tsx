interface ToastProps {
  toasts: Array<{
    id: number
    type: 'success' | 'error' | 'info'
    text: string
  }>
  onDismiss: (id: number) => void
}

const typeStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
}

export function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            ${typeStyles[toast.type]}
            text-white px-6 py-3 rounded-lg shadow-lg
            flex items-center justify-between gap-4
            min-w-[300px] animate-slide-in
          `}
        >
          <span>{toast.text}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
