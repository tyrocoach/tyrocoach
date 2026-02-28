import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-narrow py-24 text-center">
      <p className="text-6xl">⚽</p>
      <h1 className="mt-6 text-3xl font-bold text-brand-dark">Page Not Found</h1>
      <p className="mt-3 text-gray-500">
        Looks like this page took a wrong turn. Let&apos;s get you back on the field.
      </p>
      <Link href="/" className="btn-primary mt-8 inline-block">
        ← Back to Home
      </Link>
    </div>
  )
}
