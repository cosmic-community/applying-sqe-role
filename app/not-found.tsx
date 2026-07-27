import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <div className="panel mx-auto max-w-xl p-10 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-steel-900">
          Page not found
        </h1>
        <p className="mt-4 text-steel-600">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to overview
          </Link>
          <Link href="/experience" className="btn-outline">
            View experience
          </Link>
        </div>
      </div>
    </div>
  )
}