import { getAllGames } from "@/lib/games"
import GameList from "@/components/game-list"

export default async function Home() {
  const games = await getAllGames()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
          Azure GameFind
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">Free PC Games for free!</p>
        <div className="text-center">
          <a href="/admin" className="text-sm text-gray-500 hover:text-gray-700 underline">
            Admin Girişi
          </a>
        </div>
      </div>

      <GameList initialGames={games} />
    </main>
  )
}
