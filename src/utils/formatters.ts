/**
 * Format an ISO date string to a readable date.
 * e.g. "2024-03-15" → "15 Mar 2024"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

/**
 * Format a weight in kg to a readable string.
 * e.g. 24500 → "24,500 kg"
 */
export function formatWeight(kg: number): string {
  return `${kg.toLocaleString('en-US')} kg`
}

/**
 * Format a number as a percentage string.
 * e.g. 0.756 → "75.6%"
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Format utilization fraction to percent display.
 * e.g. 75.6 → "75.6%"
 */
export function formatUtilization(percent: number): string {
  return `${percent.toFixed(1)}%`
}

/**
 * Return a relative time string from an ISO date.
 * e.g. "2 days ago"
 */
export function formatRelativeTime(isoString: string): string {
  const now = Date.now()
  const then = new Date(isoString).getTime()
  const diffMs = now - then
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 1) return '1 month ago'
  return `${diffMonths} months ago`
}

/**
 * Format container position as a readable string.
 * e.g. Block A, Row 3, Col 5, L2
 */
export function formatPosition(block: string, row: number, column: number, level: number): string {
  return `Block ${block} · Row ${row} · Col ${column} · L${level}`
}
