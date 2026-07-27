import Link from 'next/link'

interface FooterProps {
  fullName: string
  email?: string
  phone?: string
  linkedinUrl?: string
  location?: string
  targetCompany?: string
}

export default function Footer({
  fullName,
  email,
  phone,
  linkedinUrl,
  location,
  targetCompany,
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-steel-200 bg-steel-900 text-steel-300">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              Application Package
            </p>
            <p className="mt-3 text-lg font-bold text-white">{fullName}</p>
            {location && <p className="mt-1 text-sm text-steel-400">{location}</p>}
            {targetCompany && (
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-400">
                Prepared for the hiring team at {targetCompany}.
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
              Sections
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  Profile &amp; Summary
                </Link>
              </li>
              <li>
                <Link href="/experience" className="transition-colors hover:text-white">
                  Experience Timeline
                </Link>
              </li>
              <li>
                <Link href="/qualifications" className="transition-colors hover:text-white">
                  Qualifications
                </Link>
              </li>
              <li>
                <Link href="/cover-letter" className="transition-colors hover:text-white">
                  Cover Letter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-steel-500">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="transition-colors hover:text-white">
                    {phone}
                  </a>
                </li>
              )}
              {linkedinUrl && (
                <li>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    LinkedIn Profile
                  </a>
                </li>
              )}
              {!email && !phone && !linkedinUrl && (
                <li className="text-steel-500">Contact details coming soon.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {fullName}. All rights reserved.
          </p>
          <p>Content managed with Cosmic.</p>
        </div>
      </div>
    </footer>
  )
}