interface Props {
  params: Promise<{ sport: string; ageGroup: string; slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { sport, ageGroup, slug } = await params
  return <h1>{sport} / {ageGroup} / {slug}</h1>
}
