// Structured data rendered as a native <script> tag, per the Next.js JSON-LD guide.
// "<" is escaped so the payload cannot break out of the script element.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
