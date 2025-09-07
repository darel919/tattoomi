function toNumberTimestamp(value: number | string) {
  // Accept unix seconds (10-digit) or milliseconds (13-digit)
  const v = Number(value)
  if (Number.isNaN(v)) return Date.now()
  // if looks like seconds, convert to ms
  return v < 1e12 ? v * 1000 : v
}

function getDiffMs(from: number, to = Date.now()) {
  return to - from
}

function formatTimeAgoFromMs(ms: number) {
  const seconds = Math.floor(ms / 1000)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds} sec${seconds === 1 ? '' : 's'} ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

export function formatTimeAgo(value: number | string | Date) {
  const ts = value instanceof Date ? value.getTime() : toNumberTimestamp(value as number | string)
  return formatTimeAgoFromMs(getDiffMs(ts))
}

export function useTimeAgo(initialValue: number | string | Date) {
  const timestamp = initialValue
  const timeAgo = ref(formatTimeAgo(timestamp))
  let timer: ReturnType<typeof setInterval> | null = null

  function update() {
    const ts = timestamp instanceof Date ? timestamp.getTime() : toNumberTimestamp(timestamp as number | string)
    timeAgo.value = formatTimeAgoFromMs(getDiffMs(ts))
  }

  onMounted(() => {
    // update once and then every 30 seconds
    update()
    timer = setInterval(update, 30_000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
    timer = null
  })

  return { timeAgo, update }
}

export default useTimeAgo
