interface Props {
  params: Promise<{ sport: string; ageGroup: string }>
}

export default async function AgeGroupPage({ params }: Props) {
  const { sport, ageGroup } = await params
  return <h1>{sport} / {ageGroup}</h1>
}
