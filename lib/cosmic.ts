import { createBucketClient } from '@cosmicjs/sdk'
import type { ApplicantProfile, Experience, Qualification } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

/**
 * Normalizes any metafield value into a safe display string.
 * Some legacy select values arrive as { key, value } objects which would
 * crash React if rendered directly.
 */
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

const OBJECT_PROPS = ['id', 'title', 'slug', 'content', 'metadata', 'type'] as const

/** Fetch the single applicant profile object */
export async function getApplicantProfile(): Promise<ApplicantProfile | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'applicant-profile' })
      .props([...OBJECT_PROPS])
      .depth(1)

    const objects = (response.objects ?? []) as ApplicantProfile[]
    const first = objects[0]
    return first ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch applicant profile')
  }
}

/** Fetch all experience entries, newest start date first */
export async function getExperiences(): Promise<Experience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'experience' })
      .props([...OBJECT_PROPS])
      .depth(1)

    const experiences = (response.objects ?? []) as Experience[]

    return experiences.slice().sort((a, b) => {
      const aCurrent = a?.metadata?.current_role ? 1 : 0
      const bCurrent = b?.metadata?.current_role ? 1 : 0
      if (aCurrent !== bCurrent) return bCurrent - aCurrent

      const dateA = new Date(a?.metadata?.start_date || '').getTime()
      const dateB = new Date(b?.metadata?.start_date || '').getTime()
      const safeA = Number.isNaN(dateA) ? 0 : dateA
      const safeB = Number.isNaN(dateB) ? 0 : dateB
      return safeB - safeA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch experience entries')
  }
}

/** Fetch a single experience entry by slug */
export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'experience', slug })
      .props([...OBJECT_PROPS])
      .depth(1)

    const experience = response.object as Experience | undefined
    return experience ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch experience entry')
  }
}

/** Fetch all qualifications */
export async function getQualifications(): Promise<Qualification[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'qualifications' })
      .props([...OBJECT_PROPS])
      .depth(1)

    const qualifications = (response.objects ?? []) as Qualification[]

    return qualifications.slice().sort((a, b) => {
      const yearA = Number(getMetafieldValue(a?.metadata?.year)) || 0
      const yearB = Number(getMetafieldValue(b?.metadata?.year)) || 0
      if (yearA !== yearB) return yearB - yearA
      return (a?.title ?? '').localeCompare(b?.title ?? '')
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch qualifications')
  }
}

/** Fetch a single qualification by slug */
export async function getQualificationBySlug(slug: string): Promise<Qualification | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'qualifications', slug })
      .props([...OBJECT_PROPS])
      .depth(1)

    const qualification = response.object as Qualification | undefined
    return qualification ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch qualification')
  }
}