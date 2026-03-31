const KEY = 'scout_mastered_v1'

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    localStorage.setItem('__test__', '1')
    localStorage.removeItem('__test__')
    return localStorage
  } catch {
    return null
  }
}

export function getMastered(): Set<number> {
  const storage = getStorage()
  if (!storage) return new Set()
  try {
    const raw = storage.getItem(KEY)
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set()
  } catch {
    return new Set()
  }
}

export function addMastered(ids: number[]): void {
  const storage = getStorage()
  if (!storage) return
  const current = getMastered()
  for (const id of ids) current.add(id)
  storage.setItem(KEY, JSON.stringify([...current]))
}

export function clearMastered(): void {
  const storage = getStorage()
  if (!storage) return
  storage.removeItem(KEY)
}

export function isLocalStorageAvailable(): boolean {
  return getStorage() !== null
}
