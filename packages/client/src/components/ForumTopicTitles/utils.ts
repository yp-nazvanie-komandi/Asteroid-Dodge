export function stringAvatar(rawName?: string) {
  const name = (rawName ?? '').trim()
  const initial = name ? name[0].toUpperCase() : '?'

  return initial
}
