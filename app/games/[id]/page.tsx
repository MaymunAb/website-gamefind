import { getGameById } from "@/lib/games"
import GameDetail from "@/components/game-detail"
import { notFound } from "next/navigation"

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await getGameById(decodeURIComponent(params.id))

  if (!game) {
    notFound()
  }

  return <GameDetail game={game} />
}
