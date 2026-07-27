import Link from 'next/link'
import type { ApplicantProfile } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getInitials, optimizedImage } from '@/lib/utils'

interface HeroProps {
  profile: ApplicantProfile | null
}

export default function Hero({ profile }: HeroProps) {
  const fullName =
    getMetafieldValue(profile?.metadata?.full_name) || profile?.title || 'Applicant'
  const headline = getMetafieldValue(profile?.metadata?.headline)
  const targetRole =
    getMetafieldValue(profile?.metadata?.target_role) || 'Supplier Quality Engineer'
  const targetCompany =
    getMetafieldValue(profile?.metadata?.target_company) || 'MacDon Industries Ltd.'
  const location = getMetafieldValue(profile?.metadata?.location)
  const photo = profile?.metadata?.photo
  const resume = profile?.metadata?.resume
  const workAuthorized = Boolean(profile?.metadata?.work_authorized)
  const willingToTravel = Boolean(profile?.metadata?.willing_to_travel)

  return (
    <section className="relative overflow-hidden bg-steel-fade">
      <div className="absolute inset-0 bg-blueprint bg-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-700/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-700/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-200">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              Application in progress
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {fullName}
            </h1>

            {headline && (
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-steel-300">
                {headline}
              </p>
            )}

            <div className="mt-8 rounded-xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-steel-400">
                Applying for
              </p>
              <p className="mt-2 text-xl font-bold text-white">{targetRole}</p>
              <p className="mt-1 text-sm font-medium text-accent-300">{targetCompany}</p>
              {location && (
                <p className="mt-3 flex items-center gap-2 text-sm text-steel-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" strokeLinecap="round" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {location}
                </p>
              )}
            </div>

            {(workAuthorized || willingToTravel) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {workAuthorized && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    ✓ Authorized to work in Canada
                  </span>
                )}
                {willingToTravel && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300">
                    ✈ Willing to travel to suppliers
                  </span>
                )}
              </div>
            )}

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/experience" className="btn-primary">
                View Experience
              </Link>
              <Link href="/cover-letter" className="btn-ghost-light">
                Read Cover Letter
              </Link>
              {resume?.url && (
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-light"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" strokeLinecap="round" />
                  </svg>
                  Resume
                </a>
              )}
            </div>
          </div>

          <div className="animate-fade-in lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[320px]">
              <div
                className="absolute -inset-3 rounded-3xl border border-white/10"
                aria-hidden="true"
              />
              {photo?.imgix_url ? (
                <img
                  src={optimizedImage(photo.imgix_url, 320, 400)}
                  alt={fullName}
                  width={320}
                  height={400}
                  className="relative h-[400px] w-full rounded-2xl object-cover shadow-lift"
                />
              ) : (
                <div className="relative flex h-[400px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-6xl font-extrabold text-white/70">
                  {getInitials(fullName)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}