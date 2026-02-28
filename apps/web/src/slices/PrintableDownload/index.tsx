import { PrismicLink } from '@prismicio/react'
import type { PrintableDownloadSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'

type Props = SliceComponentProps<PrintableDownloadSlice>

export default function PrintableDownload({ slice }: Props) {
  return (
    <section className="container-narrow py-6">
      <div className="flex items-center gap-6 rounded-xl border border-brand-lime bg-brand-lime/10 p-6">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-2xl text-white">
          📄
        </div>
        <div className="flex-1">
          {slice.primary.title && (
            <h3 className="font-semibold text-brand-dark">{slice.primary.title}</h3>
          )}
          {slice.primary.description && (
            <p className="mt-1 text-sm text-gray-600">{slice.primary.description}</p>
          )}
        </div>
        <PrismicLink
          field={slice.primary.file}
          className="btn-primary flex-shrink-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          {slice.primary.button_label ?? 'Download PDF'}
        </PrismicLink>
      </div>
    </section>
  )
}
