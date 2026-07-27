import type { Metadata } from 'next'
import Link from 'next/link'
import RichText from '@/components/RichText'
import ContactCard from '@/components/ContactCard'
import { getApplicantProfile, getMetafieldValue } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Cover Letter',
  description:
    'Cover letter for the Supplier Quality Engineer role at MacDon Industries Ltd. in Winnipeg, Manitoba.',
}

export default async function CoverLetterPage() {
  const profile = await getApplicantProfile()

  const fullName =
    getMetafieldValue(profile?.metadata?.full_name) || profile?.title || 'Applicant'
  const coverLetter = getMetafieldValue(profile?.metadata?.cover_letter)
  const targetRole =
    getMetafieldValue(profile?.metadata?.target_role) || 'Supplier Quality Engineer'
  const targetCompany =
    getMetafieldValue(profile?.metadata?.target_company) || 'MacDon Industries Ltd.'
  const location = getMetafieldValue(profile?.metadata?.location)
  const email = getMetafieldValue(profile?.metadata?.email)
  const phone = getMetafieldValue(profile?.metadata?.phone)

  const today = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <section className="relative overflow-hidden bg-steel-fade">
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-30" aria-hidden="true" />
        <div className="container-page relative py-14 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">
            Application letter
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Cover Letter
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300">
            Written specifically for the {targetRole} opening at {targetCompany} in Winnipeg,
            Manitoba.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <article className="panel p-8 sm:p-12">
            <header className="border-b border-steel-200 pb-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-extrabold tracking-tight text-steel-900">
                    {fullName}
                  </p>
                  {location && <p className="mt-1 text-sm text-steel-600">{location}</p>}
                  {email && <p className="text-sm text-steel-600">{email}</p>}
                  {phone && <p className="text-sm text-steel-600">{phone}</p>}
                </div>
                <p className="text-sm text-steel-500">{today}</p>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-steel-900">Hiring Team</p>
                <p className="text-sm text-steel-700">{targetCompany}</p>
                <p className="text-sm text-steel-700">Winnipeg, Manitoba, Canada</p>
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-accent-700">
                Re: {targetRole}
              </p>
            </header>

            <div className="pt-8">
              {coverLetter ? (
                <RichText content={coverLetter} />
              ) : (
                <p className="text-steel-600">
                  The cover letter has not been added yet. Add it to the{' '}
                  <span className="font-semibold">cover_letter</span> field on the Applicant
                  Profile object in Cosmic.
                </p>
              )}
            </div>

            <footer className="mt-10 border-t border-steel-200 pt-8">
              <p className="text-sm text-steel-600">Sincerely,</p>
              <p className="mt-2 text-lg font-bold tracking-tight text-steel-900">
                {fullName}
              </p>
            </footer>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ContactCard profile={profile} />
            <div className="panel p-7">
              <p className="eyebrow">Supporting material</p>
              <div className="mt-5 space-y-3">
                <Link href="/experience" className="btn-outline w-full">
                  Experience timeline
                </Link>
                <Link href="/qualifications" className="btn-outline w-full">
                  Qualifications
                </Link>
                <Link href="/about" className="btn-outline w-full">
                  Full profile
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}