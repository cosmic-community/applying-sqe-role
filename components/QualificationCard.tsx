import Link from 'next/link'
import type { Qualification } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { optimizedImage, proficiencyToPercent } from '@/lib/utils'

interface QualificationCardProps {
  qualification: Qualification
}

export default function QualificationCard({ qualification }: QualificationCardProps) {
  if (!qualification) return null

  const name =
    getMetafieldValue(qualification.metadata?.name) ||
    qualification.title ||
    'Qualification'
  const category = getMetafieldValue(qualification.metadata?.category)
  const issuer = getMetafieldValue(qualification.metadata?.issuer)
  const year = getMetafieldValue(qualification.metadata?.year)
  const proficiency = getMetafieldValue(qualification.metadata?.proficiency)
  const percent = proficiencyToPercent(qualification.metadata?.proficiency)
  const image = qualification.metadata?.image

  return (
    <article className="panel flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-lift">
      <div className="flex items-start gap-4">
        {image?.imgix_url ? (
          <img
            src={optimizedImage(image.imgix_url, 56, 56)}
            alt={name}
            width={56}
            height={56}
            className="h-14 w-14 flex-none rounded-lg border border-steel-200 bg-white object-contain p-1.5"
          />
        ) : (
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-steel-100 text-steel-500">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3l8 4-8 4-8-4 8-4z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" strokeLinecap="round" />
            </svg>
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-snug tracking-tight text-steel-900">
            <Link
              href={`/qualifications/${qualification.slug}`}
              className="transition-colors hover:text-accent-700"
            >
              {name}
            </Link>
          </h3>
          {issuer && <p className="mt-1 truncate text-sm text-steel-600">{issuer}</p>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {category && <span className="chip-accent">{category}</span>}
        {year && <span className="chip">{year}</span>}
      </div>

      {proficiency && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-steel-600">
            <span className="uppercase tracking-[0.14em]">Proficiency</span>
            <span className="text-steel-800">{proficiency}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-steel-200">
            <div
              className="h-full rounded-full bg-accent-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-auto pt-5">
        <Link
          href={`/qualifications/${qualification.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-800 transition-colors hover:text-accent-700"
        >
          Details
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14m0 0l-5-5m5 5l-5 5" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </article>
  )
}