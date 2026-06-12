import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const next = value instanceof Function ? value(prev) : value
      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }, [key])

  return [storedValue, setValue]
}

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

export function useInView(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(ref) } },
      { threshold }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return { ref: setRef, inView }
}

export function trackActivity() {
  try {
    const today = new Date().toISOString().split('T')[0]
    const saved = localStorage.getItem('luck1y_activity')
    const activity = saved ? JSON.parse(saved) : {}
    activity[today] = (activity[today] || 0) + 1
    localStorage.setItem('luck1y_activity', JSON.stringify(activity))
    window.dispatchEvent(new Event('activity-updated'))
  } catch (e) {
    console.error(e)
  }
}
