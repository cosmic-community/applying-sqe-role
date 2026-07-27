// A Cosmic file/media metafield value
export interface CosmicFile {
  url: string
  imgix_url: string
}

// Base Cosmic object shape
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at?: string
  modified_at?: string
}

// 👤 Applicant Profile
export interface ApplicantProfile extends CosmicObject {
  type: 'applicant-profile'
  metadata: {
    full_name?: string
    headline?: string
    target_role?: string
    target_company?: string
    photo?: CosmicFile
    summary?: string
    cover_letter?: string
    email?: string
    phone?: string
    location?: string
    linkedin_url?: string
    resume?: CosmicFile
    work_authorized?: boolean
    willing_to_travel?: boolean
  }
}

// 💼 Experience
export interface Experience extends CosmicObject {
  type: 'experience'
  metadata: {
    job_title?: string
    company?: string
    location?: string
    employment_type?: unknown
    start_date?: string
    current_role?: boolean
    end_date?: string
    achievements?: string
    image?: CosmicFile
  }
}

// 🎓 Qualifications
export interface Qualification extends CosmicObject {
  type: 'qualifications'
  metadata: {
    name?: string
    category?: unknown
    issuer?: string
    year?: string | number
    proficiency?: unknown
    description?: string
    image?: CosmicFile
  }
}

// Generic Cosmic list response
export interface CosmicListResponse<T> {
  objects: T[]
  total?: number
  limit?: number
  skip?: number
}

// Type guards
export function isExperience(obj: CosmicObject): obj is Experience {
  return obj.type === 'experience'
}

export function isQualification(obj: CosmicObject): obj is Qualification {
  return obj.type === 'qualifications'
}