interface Toast {
  id: number
  status: string
  message: string
}

export const toasts = ref<Toast[]>([])

/**
 * Composable for managing toast notifications globally.
 * Provides a toast function to display messages with different statuses.
 * Toasts are automatically dismissed after 5 seconds.
 *
 * @returns {Object} An object containing the toast function
 * @returns {Function} toast - Function to add a new toast notification
 */
export const useToast = () => {
  /**
   * Adds a toast notification with the specified status and message.
   * The toast will be displayed globally and auto-dismiss after 5 seconds.
   *
   * @param {('error' | 'warning' | 'ok' | 'info')} status - The status of the toast, determining its color
   * @param {string} message - The message to display in the toast
   */
  const toast = (status: 'error' | 'warning' | 'ok' | 'info', message: string) => {
    const id = Date.now()
    toasts.value.push({ id, status, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 5000)
  }

  /**
   * Removes a toast immediately by id.
   * @param {number} id
   */
  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toast, removeToast
  }
}
