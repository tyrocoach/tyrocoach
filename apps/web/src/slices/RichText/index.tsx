import { PrismicRichText } from '@prismicio/react'
import type { RichTextSlice } from '@/prismicio-types'
import type { SliceComponentProps } from '@prismicio/react'

type Props = SliceComponentProps<RichTextSlice>

export default function RichText({ slice }: Props) {
  return (
    <section className="container-narrow py-4">
      <div className="prose prose-lg prose-green max-w-none">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </section>
  )
}
