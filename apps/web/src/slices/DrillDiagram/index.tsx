import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import type { DrillDiagramSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'

type Props = SliceComponentProps<DrillDiagramSlice>

export default function DrillDiagram({ slice }: Props) {
  return (
    <section className="container-narrow py-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        {slice.primary.drill_name && (
          <div className="border-b border-gray-200 bg-brand-green px-4 py-2">
            <h3 className="font-semibold text-white">{slice.primary.drill_name}</h3>
          </div>
        )}
        {slice.primary.image?.url && (
          <div className="relative">
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}
        {slice.primary.description && (
          <div className="p-4">
            <div className="prose prose-sm max-w-none text-gray-700">
              <PrismicRichText field={slice.primary.description} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
