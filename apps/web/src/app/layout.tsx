import './globals.css'
import SiteHeader from '@/components/SiteHeader'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <article className="page-layout">
          <main className="content-well">{children}</main>
          <aside className="ad-rail">{/* Ad placements */}</aside>
        </article>
      </body>
    </html>
  )
}
