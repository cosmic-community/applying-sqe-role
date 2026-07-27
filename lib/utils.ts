import type { Experience, Qualification } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export function parseDate(value?: string): Date | null {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function formatMonthYear(value?: string): string {
  const parsed = parseDate(value)
  if (!parsed) return value ?? ''
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatDateRange(
  start?: string,
  end?: string,
  current?: boolean
): string {
  const startLabel = formatMonthYear(start)
  if (current) {
    return startLabel ? `${startLabel} — Present` : 'Present'
  }
  const endLabel = formatMonthYear(end)
  if (startLabel && endLabel) return `${startLabel} — ${endLabel}`
  return startLabel || endLabel || ''
}

export function formatDuration(
  start?: string,
  end?: string,
  current?: boolean
): string {
  const startDate = parseDate(start)
  if (!startDate) return ''
  const endDate = current ? new Date() : parseDate(end) ?? new Date()

  let months =
    (endDate.getUTCFullYear() - startDate.getUTCFullYear()) * 12 +
    (endDate.getUTCMonth() - startDate.getUTCMonth())
  if (months < 0) months = 0

  const years = Math.floor(months / 12)
  const remaining = months % 12

  const parts: string[] = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (remaining > 0) parts.push(`${remaining} mo${remaining > 1 ? 's' : ''}`)
  if (parts.length === 0) return '< 1 mo'
  return parts.join(' ')
}

export function totalYearsOfExperience(experiences: Experience[]): number {
  if (!experiences || experiences.length === 0) return 0

  let earliest: number | null = null
  let latest: number | null = null

  for (const experience of experiences) {
    if (!experience || !experience.metadata) continue

    const start = parseDate(experience.metadata.start_date)
    if (start) {
      const time = start.getTime()
      if (earliest === null || time < earliest) earliest = time
    }

    const endDate = experience.metadata.current_role
      ? new Date()
      : parseDate(experience.metadata.end_date)
    if (endDate) {
      const time = endDate.getTime()
      if (latest === null || time > latest) latest = time
    }
  }

  if (earliest === null) return 0
  const end = latest ?? Date.now()
  const years = (end - earliest) / (1000 * 60 * 60 * 24 * 365.25)
  if (years <= 0) return 0
  return Math.max(1, Math.round(years))
}

export function getInitials(name?: string): string {
  if (!name) return 'SQE'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'SQE'
  const first = parts[0]
  const last = parts.length > 1 ? parts[parts.length - 1] : undefined
  const firstChar = first ? first.charAt(0) : ''
  const lastChar = last ? last.charAt(0) : ''
  return `${firstChar}${lastChar}`.toUpperCase() || 'SQE'
}

/** Group qualifications by their category label */
export function groupQualificationsByCategory(
  qualifications: Qualification[]
): { category: string; items: Qualification[] }[] {
  const groups: Record<string, Qualification[]> = {}
  const order: string[] = []

  for (const qualification of qualifications) {
    if (!qualification) continue
    const rawCategory = getMetafieldValue(qualification.metadata?.category)
    const category = rawCategory.trim().length > 0 ? rawCategory : 'Other'

    const existing = groups[category]
    if (existing) {
      existing.push(qualification)
    } else {
      groups[category] = [qualification]
      order.push(category)
    }
  }

  const result: { category: string; items: Qualification[] }[] = []
  for (const category of order) {
    const items = groups[category]
    if (!items || items.length === 0) continue
    result.push({ category, items })
  }
  return result
}

/** Maps a proficiency label to a 0-100 percentage for the meter bar */
export function proficiencyToPercent(proficiency: unknown): number {
  const label = getMetafieldValue(proficiency).toLowerCase()
  if (!label) return 0
  if (label.includes('expert') || label.includes('master')) return 100
  if (label.includes('advanced') || label.includes('lead')) return 85
  if (label.includes('proficient') || label.includes('intermediate')) return 68
  if (label.includes('working') || label.includes('practitioner')) return 55
  if (label.includes('basic') || label.includes('beginner') || label.includes('familiar')) return 35
  const numeric = Number(label.replace(/[^0-9.]/g, ''))
  if (!Number.isNaN(numeric) && numeric > 0 && numeric <= 100) return numeric
  return 60
}

/** Builds an imgix-optimized URL at 2x for retina displays */
export function optimizedImage(
  imgixUrl: string,
  width: number,
  height: number,
  fit: string = 'crop'
): string {
  return `${imgixUrl}?w=${width * 2}&h=${height * 2}&fit=${fit}&auto=format,compress`
}