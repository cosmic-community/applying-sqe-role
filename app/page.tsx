import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import ExperienceCard from '@/components/ExperienceCard'
import QualificationCard from '@/components/QualificationCard'
import RichText from '@/components/RichText'
import ContactCard from '@/components/ContactCard'
import { getApplicantProfile, getExperiences, getQualifications, getMetafieldValue } from '@/lib/cosmic'
import { totalYearsOfExperience } from '@/lib/utils'

export default async function HomePage() {
  const [profile, experiences, qualifications] = await Promise.all([
    getApplicantProfile(),
    getExperiences(),
    getQualifications(),
  ])

  const summary = getMetafieldValue(profile?.metadata?.summary)
  const targetRole =
    getMetafieldValue(profile?.metadata?.target_role) || 'Supplier Quality Engineer'
  const targetCompany =
    getMetafieldValue(profile?.metadata?.target_company) || 'MacDon Industries Ltd.'

  const years = totalYearsOfExperience(experiences)
  const featuredExperiences = experiences.slice(0, 3)
  const featuredQualifications = qualifications.slice(0, 6)

  const stats: { label: string; value: string }[] = [
    { label: 'Years of experience', value: years > 0 ? `${years}+` : '—' },
    { label: 'Roles documented', value: String(experiences.length) },
    { label: 'Qualifications', value: String(qualifications.length) },
    {
      label: 'Target location',
      value: 'Winnipeg, MB',
    },
  ]

  return (
    <>
      <Hero profile={profile} />

      {/* Stats strip */}
      <section className="border-b border-steel-200 bg-white">
        <div className="container-page">
          <dl className="grid grid-cols-2 divide-steel-200 sm:grid-cols-4 sm:divide-x">
            {stats.map((stat) => (
              <div key={stat.label} className="px-2 py-7 text-center sm:px-6">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-extrabold tracking-tight text-steel-900 sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Summary */}
      {summary && (
        <section className="container-page py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Professional summary"
                title={`Why I'm a strong fit for ${targetRole}`}
              />
              <RichText content={summary} className="mt-7" />
              <Link href="/about" className="btn-outline mt-8">
                Full profile
              </Link>
            </div>
            <div className="lg:pt-4">
              <ContactCard profile={profile} />
            </div>
          </div>
        </section>
      )}

      {/* Experience highlights */}
      <section className="border-y border-steel-200 bg-white py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Career highlights"
              title="Relevant quality &amp; supplier experience"
              description="Roles that directly map to supplier quality engineering: audits, PPAP, corrective actions, and cross-functional manufacturing support."
            />
            <Link href="/experience" className="btn-outline">
              View full timeline
            </Link>
          </div>

          <div className="mt-10 space-y-6">
            {featuredExperiences.length === 0 ? (
              <div className="panel p-10 text-center text-steel-600">
                No experience entries have been added yet.
              </div>
            ) : (
              featuredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Credentials"
            title="Certifications, standards &amp; tools"
            description="Formal qualifications and hands-on tooling that support quality systems work in an agricultural equipment manufacturing environment."
          />
          <Link href="/qualifications" className="btn-outline">
            All qualifications
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredQualifications.length === 0 ? (
            <div className="panel col-span-full p-10 text-center text-steel-600">
              No qualifications have been added yet.
            </div>
          ) : (
            featuredQualifications.map((qualification) => (
              <QualificationCard key={qualification.id} qualification={qualification} />
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-steel-fade">
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-30" aria-hidden="true" />
        <div className="container-page relative py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Next step"
                title={`Ready to discuss the ${targetRole} role`}
                description={`Thank you for reviewing this application package for ${targetCompany}. The full cover letter outlines my motivation, relevant supplier quality experience, and what I would bring to the team in Winnipeg.`}
                tone="dark"
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/cover-letter" className="btn-primary">
                  Read the cover letter
                </Link>
                <Link href="/qualifications" className="btn-ghost-light">
                  Review credentials
                </Link>
              </div>
            </div>
            <div>
              <ContactCard profile={profile} tone="dark" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}