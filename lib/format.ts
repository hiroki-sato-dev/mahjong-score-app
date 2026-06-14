export function formatSignedP(value: number, unit = 'P'): string {
  if (value > 0) return `+${value}${unit}`
  if (value < 0) return `${value}${unit}`
  return `0${unit}`
}

export function toneOf(value: number): 'pos' | 'neg' | 'neutral' {
  if (value > 0) return 'pos'
  if (value < 0) return 'neg'
  return 'neutral'
}
