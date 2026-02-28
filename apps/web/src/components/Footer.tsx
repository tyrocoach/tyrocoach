import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-gray-100 bg-gray-50">
      {/* Leaderboard ad */}
      <div className="container-wide py-4">
        <div className="mx-auto flex h-[90px] max-w-[728px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm text-gray-400">
          Advertisement
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-1">
              <span className="text-lg font-bold text-brand-green">Tyro</span>
              <span className="text-lg font-bold text-brand-dark">Coach</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Practical coaching tips for parents who&apos;ve been roped into coaching their
              kids&apos; sports teams.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Sports
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/soccer"
                  className="text-sm text-gray-600 transition hover:text-brand-green"
                >
                  Youth Soccer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/soccer/u8"
                  className="text-sm text-gray-600 transition hover:text-brand-green"
                >
                  U8 Soccer
                </Link>
              </li>
              <li>
                <Link
                  href="/soccer/u10"
                  className="text-sm text-gray-600 transition hover:text-brand-green"
                >
                  U10 Soccer
                </Link>
              </li>
              <li>
                <Link
                  href="/soccer/u12"
                  className="text-sm text-gray-600 transition hover:text-brand-green"
                >
                  U12 Soccer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
          <p>© {year} TyroCoach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
