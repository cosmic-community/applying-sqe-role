import type { ApplicantProfile } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface ContactCardProps {
  profile: ApplicantProfile | null
  tone?: 'light' | 'dark'
}

export default function ContactCard({ profile, tone = 'light' }: ContactCardProps) {
  const email = getMetafieldValue(profile?.metadata?.email)
  const phone = getMetafieldValue(profile?.metadata?.phone)
  const location = getMetafieldValue(profile?.metadata?.location)
  const linkedin = getMetafieldValue(profile?.metadata?.linkedin_url)
  const resume = profile?.metadata?.resume

  const isDark = tone === 'dark'
  const wrapper = isDark
    ? 'rounded-2xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur-sm'
    : 'panel p-7'
  const labelClass = isDark
    ? 'text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-400'
    : 'text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-500'
  const valueClass = isDark
    ? 'mt-1 block text-sm font-semibold text-white break-words'
    : 'mt-1 block text-sm font-semibold text-steel-900 break-words'

  const rows: { label: string; value: string; href?: string }[] = []
  if (email) rows.push({ label: 'Email', value: email, href: `mailto:${email}` })
  if (phone) rows.push({ label: 'Phone', value: phone, href: `tel:${phone.replace(/\s+/g, '')}` })
  if (location) rows.push({ label: 'Location', value: location })
  if (linkedin) rows.push({ label: 'LinkedIn', value: 'View profile', href: linkedin })

  return (
    <div className={wrapper}>
      <p className={isDark ? 'text-xs font-semibold uppercase tracking-[0.18em] text-accent-400' : 'eyebrow'}>
        Get in touch
      </p>
      <h3 className={`mt-3 text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-steel-900'}`}>
        Contact details
      </h3>

      {rows.length === 0 ? (
        <p className={`mt-5 text-sm ${isDark ? 'text-steel-400' : 'text-steel-600'}`}>
          Contact information has not been added yet.
        </p>
      ) : (
        <dl className="mt-6 space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className={labelClass}>{row.label}</dt>
              <dd>
                {row.href ? (
                  <a
                    href={row.href}
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`${valueClass} transition-colors hover:text-accent-600`}
                  >
                    {row.value}
                  </a>
                ) : (
                  <span className={valueClass}>{row.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {resume?.url && (
        <a
          href={resume.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-7 w-full ${isDark ? 'btn-primary' : 'btn-dark'}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" strokeLinecap="round" />
          </svg>
          Download Resume
        </a>
      )}
    </div>
  )
}