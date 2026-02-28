import Link from 'next/link'

const sports = [{ label: 'Soccer', href: '/soccer' }]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-green">Tyro</span>
          <span className="text-2xl font-bold text-brand-dark">Coach</span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {sports.map((sport) => (
            <Link
              key={sport.href}
              href={sport.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-brand-green"
            >
              {sport.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
