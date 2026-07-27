interface RichTextProps {
  content?: string
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content || content.trim().length === 0) {
    return null
  }

  const looksLikeHtml =
    /<\/?(p|div|ul|ol|li|h[1-6]|br|strong|em|b|i|a|blockquote|table|span)[\s/>]/i.test(content)

  if (looksLikeHtml) {
    return (
      <div
        className={`prose max-w-none prose-headings:text-steel-900 prose-p:text-steel-700 prose-li:text-steel-700 prose-strong:text-steel-900 prose-a:text-accent-700 ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)

  if (blocks.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, blockIndex) => {
        const lines = block
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)

        if (lines.length === 0) return null

        const isList = lines.every((line) => /^([-*•]|\d+[.)])\s+/.test(line))

        if (isList) {
          return (
            <ul key={blockIndex} className="space-y-2.5">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="flex gap-3 text-steel-700">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-accent-700" />
                  <span className="leading-relaxed">
                    {line.replace(/^([-*•]|\d+[.)])\s+/, '')}
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        const isHeading = /^#{1,6}\s+/.test(block)
        if (isHeading) {
          return (
            <h3
              key={blockIndex}
              className="text-lg font-bold tracking-tight text-steel-900"
            >
              {block.replace(/^#{1,6}\s+/, '')}
            </h3>
          )
        }

        return (
          <p key={blockIndex} className="leading-relaxed text-steel-700">
            {block}
          </p>
        )
      })}
    </div>
  )
}