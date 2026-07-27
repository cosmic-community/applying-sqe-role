import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getApplicantProfile, getMetafieldValue } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: {
    default: 'Applying SQE Role | MacDon Industries Ltd.',
    template: '%s | Applying SQE Role',
  },
  description:
    'A digital application package for the Supplier Quality Engineer (SQE) role at MacDon Industries Ltd. in Winnipeg, Manitoba, Canada.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  const profile = await getApplicantProfile()

  const fullName =
    getMetafieldValue(profile?.metadata?.full_name) || profile?.title || 'Applicant'
  const targetRole =
    getMetafieldValue(profile?.metadata?.target_role) || 'Supplier Quality Engineer'
  const targetCompany =
    getMetafieldValue(profile?.metadata?.target_company) || 'MacDon Industries Ltd.'
  const email = getMetafieldValue(profile?.metadata?.email)
  const phone = getMetafieldValue(profile?.metadata?.phone)
  const linkedin = getMetafieldValue(profile?.metadata?.linkedin_url)
  const location = getMetafieldValue(profile?.metadata?.location)

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6a66a5519c05ffa1ada045da"></script>
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header
            fullName={fullName}
            targetRole={targetRole}
            targetCompany={targetCompany}
          />
          <main className="flex-1">{children}</main>
          <Footer
            fullName={fullName}
            email={email}
            phone={phone}
            linkedinUrl={linkedin}
            location={location}
            targetCompany={targetCompany}
          />
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}