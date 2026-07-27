'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error.message)
  }, [error])

  return (
    <div className="container-page py-24">
      <div className="panel mx-auto max-w-xl p-10 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-steel-900">
          We couldn&apos;t load this content
        </h1>
        <p className="mt-4 text-steel-600">
          There was a problem fetching data from Cosmic. Please check your environment
          variables and try again.
        </p>
        <button type="button" onClick={reset} className="btn-primary mt-8">
          Try again
        </button>
      </div>
    </div>
  )
}