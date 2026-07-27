import type { Metadata } from 'next'
import Link from 'next/link'
import QualificationCard from '@/components/QualificationCard'
import { getQualifications } from '@/lib/cosmic'
import { groupQualificationsByCategory } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Qualifications',
  description:
    'Certifications, standards, tools, education, and skills supporting the Supplier Quality Engineer application.',
}

export default async function QualificationsPage() {
  const qualifications = await getQualifications()
  const groups = groupQualificationsByCategory(qualifications)

  return (
    <>
      <section className="relative overflow-hidden bg-steel-fade">
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-30" aria-hidden="true" />
        <div className="container-page relative py-14 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">
            Credentials library
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Qualifications
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
            Certifications, quality standards, engineering tools, education, and technical
            skills — grouped by category for quick review.
          </p>

          {groups.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {groups.map((group) => (
                <a
                  key={group.category}
                  href={`#${encodeURIComponent(group.category.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-steel-300 transition-colors hover:bg-white/15 hover:text-white"
                >
                  {group.category} · {group.items.length}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        {groups.length === 0 ? (
          <div className="panel p-12 text-center">
            <h2 className="text-lg font-bold text-steel-900">No qualifications yet</h2>
            <p className="mt-2 text-steel-600">
              Add entries to the <span className="font-semibold">Qualifications</span> object
              type in Cosmic and they will appear here automatically.
            </p>
            <Link href="/" className="btn-outline mt-6">
              Back to overview
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {groups.map((group) => {
              const items = group.items
              if (!items || items.length === 0) {
                return null
              }

              const anchor = encodeURIComponent(
                group.category.toLowerCase().replace(/\s+/g, '-')
              )

              return (
                <div key={group.category} id={anchor} className="scroll-mt-24">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-extrabold tracking-tight text-steel-900">
                      {group.category}
                    </h2>
                    <span className="chip">{items.length} item{items.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="mt-3 h-1 w-14 rounded-full bg-accent-700" />

                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((qualification) => (
                      <QualificationCard
                        key={qualification.id}
                        qualification={qualification}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}