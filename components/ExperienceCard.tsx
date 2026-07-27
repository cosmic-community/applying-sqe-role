import Link from 'next/link'
import type { Experience } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDateRange, formatDuration, optimizedImage } from '@/lib/utils'

interface ExperienceCardProps {
  experience: Experience
  showImage?: boolean
}

export default function ExperienceCard({
  experience,
  showImage = true,
}: ExperienceCardProps) {
  if (!experience) return null

  const jobTitle =
    getMetafieldValue(experience.metadata?.job_title) || experience.title || 'Role'
  const company = getMetafieldValue(experience.metadata?.company)
  const location = getMetafieldValue(experience.metadata?.location)
  const employmentType = getMetafieldValue(experience.metadata?.employment_type)
  const isCurrent = Boolean(experience.metadata?.current_role)
  const range = formatDateRange(
    experience.metadata?.start_date,
    experience.metadata?.end_date,
    isCurrent
  )
  const duration = formatDuration(
    experience.metadata?.start_date,
    experience.metadata?.end_date,
    isCurrent
  )
  const image = experience.metadata?.image

  return (
    <article className="panel group overflow-hidden transition-shadow duration-300 hover:shadow-lift">
      <div className="flex flex-col gap-0 sm:flex-row">
        {showImage && image?.imgix_url && (
          <div className="sm:w-52 sm:flex-none">
            <img
              src={optimizedImage(image.imgix_url, 208, 208)}
              alt={company || jobTitle}
              width={208}
              height={208}
              className="h-40 w-full object-cover sm:h-full"
            />
          </div>
        )}

        <div className="flex-1 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-snug tracking-tight text-steel-900">
                <Link
                  href={`/experience/${experience.slug}`}
                  className="transition-colors hover:text-accent-700"
                >
                  {jobTitle}
                </Link>
              </h3>
              {company && (
                <p className="mt-1 text-sm font-semibold text-accent-700">{company}</p>
              )}
            </div>
            {isCurrent && (
              <span className="inline-flex flex-none items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Current Role
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {range && <span className="chip">{range}</span>}
            {duration && <span className="chip">{duration}</span>}
            {employmentType && <span className="chip">{employmentType}</span>}
            {location && <span className="chip">{location}</span>}
          </div>

          <Link
            href={`/experience/${experience.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-steel-800 transition-colors hover:text-accent-700"
          >
            View responsibilities &amp; achievements
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14m0 0l-5-5m5 5l-5 5" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}