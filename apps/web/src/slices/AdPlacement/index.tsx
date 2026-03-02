'use client'

import { useEffect, useRef } from 'react'
import type { AdPlacementSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'
import styles from './AdPlacement.module.css'

type Props = SliceComponentProps<AdPlacementSlice>

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

const adSizes = {
  leaderboard: { width: 728, height: 90, sizeClass: styles.leaderboard },
  rectangle: { width: 336, height: 280, sizeClass: styles.rectangle },
  skyscraper: { width: 160, height: 600, sizeClass: styles.skyscraper },
} as const

export default function AdPlacement({ slice }: Props) {
  const adRef = useRef<HTMLModElement>(null)
  const slot = (slice.primary.ad_slot as keyof typeof adSizes) ?? 'rectangle'
  const size = adSizes[slot] ?? adSizes.rectangle

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // AdSense not loaded in dev
    }
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return (
      <section className={['container-narrow', styles.section].join(' ')}>
        <div className={[styles.devPlaceholder, size.sizeClass].join(' ')}>
          Ad Slot — {slot}
        </div>
      </section>
    )
  }

  return (
    <section className={['container-narrow', styles.section].join(' ')}>
      <div className={styles.adWrapper}>
        <ins
          ref={adRef}
          className={['adsbygoogle', size.sizeClass].join(' ')}
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${slot.toUpperCase()}`]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </section>
  )
}
