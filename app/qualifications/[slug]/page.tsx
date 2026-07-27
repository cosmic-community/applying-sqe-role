// app/qualifications/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import QualificationCard from '@/components/QualificationCard'
import { getQualificationBySlug, getQualifications, getMetafieldValue } from '@/lib/cosmic'
import { optimizedImage, proficiencyToPercent } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const qualification = await getQualificationBySlug(slug)

  if (!qualification) {
    return { title: 'Qualification not found' }
  }

  const name = getMetafieldValue(qualification.metadata?.name) || qualification.title

  return {
    title: name,
    description:
      getMetafieldValue(qualification.metadata?.description).slice(0, 155) ||
      `Details for ${name}.`,
    other: {
      'cosmic-context': JSON.stringify({
        object_id: qualification.id,
        object_type: 'qualifications',
      }),
    },
  }
}

export default async function QualificationDetailPage({ params }: PageProps) {
  const { slug } = await params
  const qualification = await getQualificationBySlug(slug)

  if (!qualification) {
    notFound()
  }

  const all = await getQualifications()
  const category = getMetafieldValue(qualification.metadata?.category)

  const related = all
    .filter((item) => {
      if (!item || item.id === qualification.id) return false
      if (!category) return true
      return getMetafieldValue(item.metadata?.category) === category
    })
    .slice(0, 3)

  const name =
    getMetafieldValue(qualification.metadata?.name) || qualification.title || 'Qualification'
  const issuer = getMetafieldValue(qualification.metadata?.issuer)
  const year = getMetafieldValue(qualification.metadata?.year)
  const proficiency = getMetafieldValue(qualification.metadata?.proficiency)
  const percent = proficiencyToPercent(qualification.metadata?.proficiency)
  const description = getMetafieldValue(qualification.metadata?.description)
  const image = qualification.metadata?.image

  return (
    <>
      <section className="relative overflow-hidden bg-steel-fade">
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-30" aria-hidden="true" />
        <div className="container-page relative py-14 sm:py-16">
          <Link
            href="/qualifications"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-300 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5m0 0l5 5m-5-5l5-5" strokeLinecap="round" />
            </svg>
            All qualifications
          </Link>

          <div className="mt-6 flex flex-wrap items-start gap-6">
            {image?.imgix_url && (
              <img
                src={optimizedImage(image.imgix_url, 88, 88, 'clip')}
                alt={name}
                width={88}
                height={88}
                className="h-[88px] w-[88px] flex-none rounded-xl border border-white/15 bg-white/95 object-contain p-2"
              />
            )}
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {name}
              </h1>
              {issuer && <p className="mt-3 text-lg font-semibold text-accent-300">{issuer}</p>}
              <div className="mt-5 flex flex-wrap gap-2">
                {category && (
                  <span className="rounded-full border border-accent-400/30 bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-200">
                    {category}
                  </span>
                )}
                {year && (
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-steel-300">
                    {year}
                  </span>
                )}
                {proficiency && (
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-steel-300">
                    {proficiency}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-steel-900">Overview</h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-accent-700" />

            {description ? (
              <RichText content={description} className="mt-7" />
            ) : (
              <p className="mt-7 text-steel-600">
                No description has been added for this qualification yet.
              </p>
            )}

            {qualification.content && qualification.content.trim().length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold tracking-tight text-steel-900">
                  Additional notes
                </h3>
                <RichText content={qualification.content} className="mt-5" />
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-7">
              <p className="eyebrow">Credential details</p>
              <dl className="mt-6 space-y-4 text-sm">
                {issuer && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                      Issuer
                    </dt>
                    <dd className="mt-1 font-semibold text-steel-900">{issuer}</dd>
                  </div>
                )}
                {category && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                      Category
                    </dt>
                    <dd className="mt-1 font-semibold text-steel-900">{category}</dd>
                  </div>
                )}
                {year && (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                      Year
                    </dt>
                    <dd className="mt-1 font-semibold text-steel-900">{year}</dd>
                  </div>
                )}
              </dl>

              {proficiency && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-steel-600">
                    <span className="uppercase tracking-[0.14em]">Proficiency</span>
                    <span className="text-steel-900">{proficiency}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-steel-200">
                    <div
                      className="h-full rounded-full bg-accent-700"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )}

              <Link href="/experience" className="btn-dark mt-7 w-full">
                Where I applied it
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <>
            <div className="rule-measure my-14" />
            <h2 className="text-xl font-bold tracking-tight text-steel-900">
              {category ? `More in ${category}` : 'Other qualifications'}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <QualificationCard key={item.id} qualification={item} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}