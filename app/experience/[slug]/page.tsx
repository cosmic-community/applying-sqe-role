// app/experience/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import ExperienceCard from '@/components/ExperienceCard'
import { getExperienceBySlug, getExperiences, getMetafieldValue } from '@/lib/cosmic'
import { formatDateRange, formatDuration, optimizedImage } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const experience = await getExperienceBySlug(slug)

  if (!experience) {
    return { title: 'Experience not found' }
  }

  const jobTitle =
    getMetafieldValue(experience.metadata?.job_title) || experience.title
  const company = getMetafieldValue(experience.metadata?.company)

  return {
    title: company ? `${jobTitle} · ${company}` : jobTitle,
    description:
      getMetafieldValue(experience.metadata?.achievements).slice(0, 155) ||
      `Details for the ${jobTitle} role.`,
    other: {
      'cosmic-context': JSON.stringify({
        object_id: experience.id,
        object_type: 'experience',
      }),
    },
  }
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const experience = await getExperienceBySlug(slug)

  if (!experience) {
    notFound()
  }

  const allExperiences = await getExperiences()
  const related = allExperiences
    .filter((item) => item && item.id !== experience.id)
    .slice(0, 2)

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
  const achievements = getMetafieldValue(experience.metadata?.achievements)
  const image = experience.metadata?.image

  return (
    <>
      <section className="relative overflow-hidden bg-steel-fade">
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-30" aria-hidden="true" />
        <div className="container-page relative py-14 sm:py-16">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-300 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5m0 0l5 5m-5-5l5-5" strokeLinecap="round" />
            </svg>
            All experience
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {jobTitle}
          </h1>
          {company && (
            <p className="mt-3 text-lg font-semibold text-accent-300">{company}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Current Role
              </span>
            )}
            {range && (
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-steel-300">
                {range}
              </span>
            )}
            {duration && (
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-steel-300">
                {duration}
              </span>
            )}
            {employmentType && (
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-steel-300">
                {employmentType}
              </span>
            )}
            {location && (
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-steel-300">
                {location}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        {image?.imgix_url && (
          <img
            src={optimizedImage(image.imgix_url, 1100, 480)}
            alt={company || jobTitle}
            width={1100}
            height={480}
            className="mb-12 h-[240px] w-full rounded-2xl object-cover shadow-panel sm:h-[400px]"
          />
        )}

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-steel-900">
              Responsibilities &amp; achievements
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-accent-700" />

            {achievements ? (
              <RichText content={achievements} className="mt-7" />
            ) : (
              <p className="mt-7 text-steel-600">
                No achievements have been recorded for this role yet.
              </p>
            )}

            {experience.content && experience.content.trim().length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold tracking-tight text-steel-900">
                  Additional notes
                </h3>
                <RichText content={experience.content} className="mt-5" />
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-7">
              <p className="eyebrow">Role at a glance</p>
              <dl className="mt-6 space-y-4 text-sm">
                {company && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                      Company
                    </dt>
                    <dd className="mt-1 font-semibold text-steel-900">{company}</dd>
                  </div>
                )}
                {location && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                      Location
                    </dt>
                    <dd className="mt-1 font-semibold text-steel-900">{location}</dd>
                  </div>
                )}
                {employmentType && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                      Employment type
                    </dt>
                    <dd className="mt-1 font-semibold text-steel-900">{employmentType}</dd>
                  </div>
                )}
                {range && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                      Dates
                    </dt>
                    <dd className="mt-1 font-semibold text-steel-900">{range}</dd>
                  </div>
                )}
                {duration && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                      Duration
                    </dt>
                    <dd className="mt-1 font-semibold text-steel-900">{duration}</dd>
                  </div>
                )}
              </dl>
              <Link href="/qualifications" className="btn-dark mt-7 w-full">
                Related qualifications
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <>
            <div className="rule-measure my-14" />
            <h2 className="text-xl font-bold tracking-tight text-steel-900">
              Other roles
            </h2>
            <div className="mt-6 space-y-6">
              {related.map((item) => (
                <ExperienceCard key={item.id} experience={item} showImage={false} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}