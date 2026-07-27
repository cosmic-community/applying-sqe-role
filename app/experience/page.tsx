import type { Metadata } from 'next'
import Link from 'next/link'
import ExperienceCard from '@/components/ExperienceCard'
import SectionHeading from '@/components/SectionHeading'
import { getExperiences, getApplicantProfile, getMetafieldValue } from '@/lib/cosmic'
import { formatDateRange, totalYearsOfExperience } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Career timeline of quality engineering, supplier management, and manufacturing roles.',
}

export default async function ExperiencePage() {
  const [experiences, profile] = await Promise.all([
    getExperiences(),
    getApplicantProfile(),
  ])

  const years = totalYearsOfExperience(experiences)
  const targetRole =
    getMetafieldValue(profile?.metadata?.target_role) || 'Supplier Quality Engineer'

  return (
    <>
      <section className="relative overflow-hidden bg-steel-fade">
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-30" aria-hidden="true" />
        <div className="container-page relative py-14 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">
            Career timeline
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Professional Experience
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
            {years > 0
              ? `${years}+ years across quality engineering, supplier development, and manufacturing operations — mapped to the requirements of the ${targetRole} role.`
              : `Roles across quality engineering, supplier development, and manufacturing operations — mapped to the requirements of the ${targetRole} role.`}
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        {experiences.length === 0 ? (
          <div className="panel p-12 text-center">
            <h2 className="text-lg font-bold text-steel-900">No experience entries yet</h2>
            <p className="mt-2 text-steel-600">
              Add entries to the <span className="font-semibold">Experience</span> object type
              in Cosmic and they will appear here automatically.
            </p>
            <Link href="/" className="btn-outline mt-6">
              Back to overview
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div
              className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-steel-200 sm:block"
              aria-hidden="true"
            />
            <ol className="space-y-8">
              {experiences.map((experience) => {
                const isCurrent = Boolean(experience.metadata?.current_role)
                const range = formatDateRange(
                  experience.metadata?.start_date,
                  experience.metadata?.end_date,
                  isCurrent
                )
                return (
                  <li key={experience.id} className="relative sm:pl-12">
                    <span
                      className={`absolute left-0 top-7 hidden h-4 w-4 rounded-full border-2 border-white sm:block ${
                        isCurrent ? 'bg-accent-700' : 'bg-steel-400'
                      }`}
                      aria-hidden="true"
                    />
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-steel-500 sm:hidden">
                      {range}
                    </p>
                    <ExperienceCard experience={experience} />
                  </li>
                )
              })}
            </ol>
          </div>
        )}

        <div className="rule-measure my-14" />

        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Supporting evidence"
            title="Credentials that back this experience"
            description="Certifications, standards familiarity, and tooling proficiency relevant to supplier quality engineering."
          />
          <Link href="/qualifications" className="btn-outline">
            View qualifications
          </Link>
        </div>
      </section>
    </>
  )
}