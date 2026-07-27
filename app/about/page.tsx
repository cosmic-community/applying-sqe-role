import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import RichText from '@/components/RichText'
import ContactCard from '@/components/ContactCard'
import { getApplicantProfile, getExperiences, getQualifications, getMetafieldValue } from '@/lib/cosmic'
import { getInitials, optimizedImage, totalYearsOfExperience } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'Professional profile and summary for the Supplier Quality Engineer application at MacDon Industries Ltd.',
}

export default async function AboutPage() {
  const [profile, experiences, qualifications] = await Promise.all([
    getApplicantProfile(),
    getExperiences(),
    getQualifications(),
  ])

  const fullName =
    getMetafieldValue(profile?.metadata?.full_name) || profile?.title || 'Applicant'
  const headline = getMetafieldValue(profile?.metadata?.headline)
  const summary = getMetafieldValue(profile?.metadata?.summary)
  const targetRole = getMetafieldValue(profile?.metadata?.target_role)
  const targetCompany = getMetafieldValue(profile?.metadata?.target_company)
  const location = getMetafieldValue(profile?.metadata?.location)
  const photo = profile?.metadata?.photo
  const workAuthorized = Boolean(profile?.metadata?.work_authorized)
  const willingToTravel = Boolean(profile?.metadata?.willing_to_travel)
  const years = totalYearsOfExperience(experiences)

  return (
    <>
      <section className="border-b border-steel-200 bg-white">
        <div className="container-page py-14 sm:py-16">
          <p className="eyebrow">Applicant profile</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
            {fullName}
          </h1>
          {headline && <p className="mt-4 max-w-2xl text-lg text-steel-600">{headline}</p>}

          <div className="mt-6 flex flex-wrap gap-2">
            {targetRole && <span className="chip-accent">Target: {targetRole}</span>}
            {targetCompany && <span className="chip">{targetCompany}</span>}
            {location && <span className="chip">{location}</span>}
            {years > 0 && <span className="chip">{years}+ years experience</span>}
            {workAuthorized && <span className="chip">Work authorized</span>}
            {willingToTravel && <span className="chip">Open to travel</span>}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {photo?.imgix_url ? (
              <img
                src={optimizedImage(photo.imgix_url, 800, 420)}
                alt={fullName}
                width={800}
                height={420}
                className="h-[260px] w-full rounded-2xl object-cover shadow-panel sm:h-[380px]"
              />
            ) : (
              <div className="flex h-[260px] w-full items-center justify-center rounded-2xl border border-steel-200 bg-steel-100 text-5xl font-extrabold text-steel-400 sm:h-[380px]">
                {getInitials(fullName)}
              </div>
            )}

            <div className="mt-10">
              <SectionHeading eyebrow="Summary" title="Professional summary" />
              {summary ? (
                <RichText content={summary} className="mt-7" />
              ) : (
                <p className="mt-7 text-steel-600">
                  A professional summary has not been added yet.
                </p>
              )}
            </div>

            <div className="rule-measure my-10" />

            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                href="/experience"
                className="panel group p-6 transition-shadow hover:shadow-lift"
              >
                <p className="eyebrow">Experience</p>
                <p className="mt-3 text-2xl font-extrabold text-steel-900">
                  {experiences.length}
                </p>
                <p className="mt-1 text-sm text-steel-600">
                  Roles documented with achievements
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
                  View timeline
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m0 0l-5-5m5 5l-5 5" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/qualifications"
                className="panel group p-6 transition-shadow hover:shadow-lift"
              >
                <p className="eyebrow">Qualifications</p>
                <p className="mt-3 text-2xl font-extrabold text-steel-900">
                  {qualifications.length}
                </p>
                <p className="mt-1 text-sm text-steel-600">
                  Certifications, standards, tools &amp; education
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
                  View credentials
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m0 0l-5-5m5 5l-5 5" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ContactCard profile={profile} />
            <div className="panel p-7">
              <p className="eyebrow">Readiness</p>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] font-bold text-white ${
                      workAuthorized ? 'bg-emerald-600' : 'bg-steel-300'
                    }`}
                  >
                    {workAuthorized ? '✓' : '–'}
                  </span>
                  <span className="text-steel-700">
                    {workAuthorized
                      ? 'Authorized to work in Canada'
                      : 'Work authorization not specified'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] font-bold text-white ${
                      willingToTravel ? 'bg-emerald-600' : 'bg-steel-300'
                    }`}
                  >
                    {willingToTravel ? '✓' : '–'}
                  </span>
                  <span className="text-steel-700">
                    {willingToTravel
                      ? 'Willing to travel for supplier audits and site visits'
                      : 'Travel availability not specified'}
                  </span>
                </li>
              </ul>
              <Link href="/cover-letter" className="btn-primary mt-7 w-full">
                Read cover letter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}