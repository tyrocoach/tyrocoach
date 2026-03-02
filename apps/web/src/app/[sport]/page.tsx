interface Props {
  params: Promise<{ sport: string }>
}

export default async function SportHubPage({ params }: Props) {
  const { sport } = await params
  return <h1>{sport}</h1>
}
