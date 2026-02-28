'use client'

import { useEffect, useRef } from 'react'
import type { AdPlacementSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'

type Props = SliceComponentProps<AdPlacementSlice>

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

const adSizes = {
  leaderboard: { width: 728, height: 90, className: 'h-[90px] max-w-[728px]' },
  rectangle: { width: 336, height: 280, className: 'h-[280px] max-w-[336px]' },
  skyscraper: { width: 160, height: 600, className: 'h-[600px] max-w-[160px]' },
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
      <section className="container-narrow py-4">
        <div
          className={`mx-auto flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400 ${size.className}`}
        >
          Ad Slot — {slot}
        </div>
      </section>
    )
  }

  return (
    <section className="container-narrow py-4">
      <div className="mx-auto flex justify-center">
        <ins
          ref={adRef}
          className={`adsbygoogle ${size.className}`}
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
