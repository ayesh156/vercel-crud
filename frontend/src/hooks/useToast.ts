import { useState, useCallback } from 'react'

interface ToastMessage {
  id: number
  type: 'success' | 'error' | 'info'
  text: string
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((type: ToastMessage['type'], text: string) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, type, text }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const success = useCallback(
    (text: string) => showToast('success', text),
    [showToast]
  )

  const error = useCallback(
    (text: string) => showToast('error', text),
    [showToast]
  )

  const info = useCallback(
    (text: string) => showToast('info', text),
    [showToast]
  )

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return {
    toasts,
    showToast,
    success,
    error,
    info,
    dismiss,
  }
}
