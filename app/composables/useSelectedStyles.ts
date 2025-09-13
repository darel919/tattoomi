export const useSelectedStyles = () => {
  const route = useRoute()
  const router = useRouter()
  
  const selectedStylesState = useState('selectedStyles', () => {
    const s = route.query?.style ?? route.query?.styles
    if (!s) return []
    return String(s).split(',').filter(Boolean)
  })

  const selectedStyles = computed({
    get: () => selectedStylesState.value,
    set: (v) => { selectedStylesState.value = v }
  })

  // Watch for route query changes and update selected styles
  const initializeWatcher = () => {
    return watch(() => route.query, (q) => {
      const s = q?.style ?? q?.styles
      selectedStylesState.value = s ? String(s).split(',').filter(Boolean) : []
    }, { immediate: true })
  }

  const handleToggleSelectedStyle = (style: { styleName: string }) => {
    const styleName = style.styleName
    const current = selectedStyles.value.slice()
    const newStyles = current.includes(styleName)
      ? current.filter(s => s !== styleName)
      : [...current, styleName]

    const newQuery = { ...route.query }
    if (newStyles.length > 0) {
      newQuery.style = newStyles.join(',')
    } else {
      delete newQuery.style
    }
    delete newQuery.filter
    delete newQuery.styles
    selectedStylesState.value = newStyles
    router.replace({ query: newQuery })
  }

  return {
    selectedStyles,
    selectedStylesState,
    handleToggleSelectedStyle,
    initializeWatcher
  }
}