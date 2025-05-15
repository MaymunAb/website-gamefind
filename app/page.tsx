"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

interface Game {
  id: string
  name: string
  description: string
  image: string
  downloadLink: string
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from your API or JSON files
    // For demo purposes, we'll use sample data
    const sampleGames = [
      {
        id: "minecraft",
        name: "Minecraft",
        description: "A sandbox game where you can build anything you imagine.",
        image: "/games/minecraft.jpg",
        downloadLink: "https://example.com/download/minecraft",
      },
      {
        id: "fortnite",
        name: "Fortnite",
        description: "A battle royale game with building mechanics.",
        image: "/games/fortnite.jpg",
        downloadLink: "https://example.com/download/fortnite",
      },
      {
        id: "among-us",
        name: "Among Us",
        description: "Find the impostor among your crewmates.",
        image: "/games/among-us.jpg",
        downloadLink: "https://example.com/download/among-us",
      },
      {
        id: "valorant",
        name: "Valorant",
        description: "A tactical shooter with unique character abilities.",
        image: "/games/valorant.jpg",
        downloadLink: "https://example.com/download/valorant",
      },
      {
        id: "genshin-impact",
        name: "Genshin Impact",
        description: "An open-world action RPG with gacha mechanics.",
        image: "/games/genshin-impact.jpg",
        downloadLink: "https://example.com/download/genshin-impact",
      },
    ]

    setGames(sampleGames)
    setIsLoading(false)
  }, [])

  const filteredGames = games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
          Azure GameFind
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your destination for free game downloads. Browse our collection and find your next gaming adventure.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="search-input pl-10"
          placeholder="Search for games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <Link href={`/games/${game.id}`} key={game.id}>
                <div className="game-card h-full flex flex-col">
                  <div className="relative h-48 w-full">
                    <Image
                      src={game.image || "/placeholder.svg"}
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
      )}
    </main>
  )
}
