interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  const isDark = tone === 'dark'

  return (
    <div className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p
          className={
            isDark
              ? 'text-xs font-semibold uppercase tracking-[0.18em] text-accent-400'
              : 'eyebrow'
          }
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl ${
          isDark ? 'text-white' : 'text-steel-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base leading-relaxed ${
            isDark ? 'text-steel-300' : 'text-steel-600'
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`mt-5 h-1 w-14 rounded-full bg-accent-700 ${isCenter ? 'mx-auto' : ''}`}
      />
    </div>
  )
}