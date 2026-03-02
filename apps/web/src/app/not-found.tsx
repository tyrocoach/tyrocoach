import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={['container-narrow', styles.page].join(' ')}>
      <p className={styles.emoji}>⚽</p>
      <h1 className={styles.heading}>Page Not Found</h1>
      <p className={styles.subtext}>
        Looks like this page took a wrong turn. Let&apos;s get you back on the field.
      </p>
      <div className={styles.cta}>
        <Link href="/" className="btn-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
