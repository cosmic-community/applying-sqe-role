# Applying SQE Role

![App Preview](https://imgix.cosmicjs.com/ec3d9090-8951-11f1-a539-158ba0e078f0-autopilot-photo-1581091226825-a6a2a5aee158-1785112037384.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive job-application microsite built with Next.js 16 and [Cosmic](https://www.cosmicjs.com), tailored for applying to the **Supplier Quality Engineer (SQE)** role at **MacDon Industries Ltd., Winnipeg, Manitoba, Canada**.

It turns your Cosmic content — applicant profile, experience history, and qualifications — into a fast, credible digital application package with a career timeline, credentials library, cover letter page, and downloadable resume.

## Features

- 🏭 **Targeted hero** naming the exact role and company, with work authorization and travel-readiness badges
- 📈 **Auto-calculated stats** — total years of experience, role count, and credential count derived from content
- 🧭 **Career timeline** with milestone rail, current-role highlighting, and per-role detail pages
- 🎓 **Qualifications hub** grouped by category with proficiency meters and detail pages
- ✉️ **Cover letter page** formatted as a professional business letter
- 📄 **Resume download** and quick contact actions (email, phone, LinkedIn)
- 🖼️ **Optimized imagery** via imgix parameters at 2× resolution for crisp retina rendering
- 🔍 **SEO metadata** generated per page, including dynamic detail routes
- 🛡️ **Server-side data fetching** — Cosmic credentials never reach the browser
- 📱 **Fully responsive** design with an accessible mobile navigation
- 🧱 **Markdown/HTML aware rendering** for achievements, summaries, and the cover letter
- ✅ **Strict TypeScript** with pre-build type checking to prevent deployment failures

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a66a5519c05ffa1ada045dc&clone_repository=6a66a7a89c05ffa1ada04631)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Applying SQE role 
at MacDon Industries Ltd., in Winnipeg, Manitoba, Canada"

### Code Generation Prompt

> Build a Next.js application for a website called "Applying SQE role". The content is managed in Cosmic CMS with the following object types: applicant-profile, experience, qualifications. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: Applying SQE role at MacDon Industries Ltd., in Winnipeg, Manitoba, Canada

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **[Next.js 16](https://nextjs.org)** — App Router, Server Components, Server-side data fetching
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)** — strict mode with `noUncheckedIndexedAccess`
- **[Tailwind CSS](https://tailwindcss.com)** + `@tailwindcss/typography`
- **[Cosmic](https://www.cosmicjs.com)** — headless CMS via `@cosmicjs/sdk` ([docs](https://www.cosmicjs.com/docs))
- **imgix** — image optimization through Cosmic's `imgix_url`
- **Bun** — package manager and runtime

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.0+ (or Node.js 20+)
- A Cosmic account with a bucket containing the `applicant-profile`, `experience`, and `qualifications` object types

### Installation

1. Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd applying-sqe-role
bun install
```

2. Add your Cosmic credentials as environment variables:

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

> You can find these in your Cosmic dashboard under **Bucket Settings → API Access**.

3. Start the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
bun run dev          # Start the dev server
bun run build        # Type-check, then build for production
bun run start        # Run the production server
bun run type-check   # Run TypeScript validation only
bun run lint         # Run ESLint
```

## Cosmic SDK Examples

Create the client once and reuse it (server-side only):

```typescript
// lib/cosmic.ts
import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})
```

Fetch the applicant profile (singleton pattern):

```typescript
const response = await cosmic.objects
  .find({ type: 'applicant-profile' })
  .props(['id', 'title', 'slug', 'metadata', 'type'])
  .depth(1)

const profile = response.objects[0] ?? null
```

Fetch and sort experience entries (newest first) — the SDK no longer supports a `.sort()` method, so sorting is done in-app:

```typescript
const response = await cosmic.objects
  .find({ type: 'experience' })
  .props(['id', 'title', 'slug', 'metadata', 'type'])
  .depth(1)

const experiences = response.objects.sort((a, b) => {
  const dateA = new Date(a.metadata?.start_date || '').getTime()
  const dateB = new Date(b.metadata?.start_date || '').getTime()
  return dateB - dateA
})
```

Handle empty results — Cosmic returns a **404** rather than an empty array:

```typescript
try {
  const response = await cosmic.objects.find({ type: 'qualifications' }).depth(1)
  return response.objects
} catch (error) {
  if (hasStatus(error) && error.status === 404) {
    return []
  }
  throw new Error('Failed to fetch qualifications')
}
```

Fetch a single object by slug:

```typescript
const response = await cosmic.objects
  .findOne({ type: 'experience', slug })
  .props(['id', 'title', 'slug', 'metadata', 'type'])
  .depth(1)

const experience = response.object
```

## Cosmic CMS Integration

This app reads from three object types in your bucket.

### 👤 Applicant Profile (`applicant-profile`)

| Metafield | Used for |
| --- | --- |
| `full_name`, `headline` | Hero heading and subheading, site branding |
| `target_role`, `target_company` | Application banner and cover letter recipient |
| `photo` | Hero portrait and profile page image |
| `summary` | Professional summary section |
| `cover_letter` | Dedicated `/cover-letter` page |
| `email`, `phone`, `location`, `linkedin_url` | Contact card and footer |
| `resume` | Resume download buttons |
| `work_authorized`, `willing_to_travel` | Readiness badges in the hero |

### 💼 Experience (`experience`)

`job_title`, `company`, `location`, `employment_type`, `start_date`, `end_date`, `current_role`, `achievements`, `image` power the timeline on `/experience` and each `/experience/[slug]` detail page. Total years of experience on the homepage is calculated automatically from the earliest start date.

### 🎓 Qualifications (`qualifications`)

`name`, `category`, `issuer`, `year`, `proficiency`, `description`, `image` power `/qualifications`, where entries are grouped by category, and each `/qualifications/[slug]` detail page.

### Notes on data handling

- All Cosmic requests use `depth(1)` so connected objects resolve in one call.
- Every metafield value is normalized through a `getMetafieldValue()` helper so legacy `{ key, value }` shapes never break React rendering.
- All requests run in Server Components — no credentials are shipped to the client.

## Deployment Options

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` under **Settings → Environment Variables**.
4. Deploy — the `prebuild` script runs a full TypeScript check first.

### Netlify

1. Connect the repository at [app.netlify.com](https://app.netlify.com).
2. Build command: `bun run build` — Publish directory: `.next`
3. Install the Next.js runtime plugin.
4. Add the same three environment variables under **Site settings → Environment variables**.

### Self-hosted

```bash
bun install
bun run build
bun run start
```

Set the environment variables in your process manager or container configuration before starting.
<!-- README_END -->