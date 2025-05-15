"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import type { Game } from "@/lib/games"

interface GameListProps {
  initialGames: Game[]
}

export default function GameList({ initialGames }: GameListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGames = initialGames.filter(
    (game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className="relative max-w-md mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search for games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <Link href={`/games/${encodeURIComponent(game.id)}`} key={game.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={game.image || "/placeholder.svg?height=400&width=600"}
                    alt={game.name}
                    fill
                    className="object-cover"
                    unoptimized // For demo purposes
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-bold mb-2">{game.name}</h2>
                  <p className="text-gray-600 line-clamp-3">{game.description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No games found matching "{searchTerm}"</h3>
            <p className="mt-2">Try a different search term or browse our collection.</p>
          </div>
        )}
      </div>
    </>
  )
}
