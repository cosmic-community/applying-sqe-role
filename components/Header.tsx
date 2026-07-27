'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getInitials } from '@/lib/utils'

interface HeaderProps {
  fullName: string
  targetRole: string
  targetCompany: string
}

const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Overview' },
  { href: '/about', label: 'Profile' },
  { href: '/experience', label: 'Experience' },
  { href: '/qualifications', label: 'Qualifications' },
  { href: '/cover-letter', label: 'Cover Letter' },
]

export default function Header({ fullName, targetRole, targetCompany }: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <header className="sticky top-0 z-40 border-b border-steel-200 bg-white/90 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-steel-900 text-sm font-bold text-white">
              {getInitials(fullName)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold leading-tight text-steel-900">
                {fullName}
              </span>
              <span className="block truncate text-[11px] font-medium uppercase tracking-[0.14em] text-accent-700">
                {targetRole} · {targetCompany}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-steel-600 transition-colors hover:bg-steel-100 hover:text-steel-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-steel-200 text-steel-700 transition-colors hover:bg-steel-100 lg:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-steel-200 bg-white lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-steel-700 transition-colors hover:bg-steel-100 hover:text-steel-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}