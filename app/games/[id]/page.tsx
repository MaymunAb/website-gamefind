"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"

interface GameData {
  id: string
  name: string
  description: string
  image: string
  downloadLink: string
}

export default function GamePage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<GameData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from your API or JSON files in the /links directory
    // For demo purposes, we'll use sample data
    const sampleGames: Record<string, GameData> = {
      minecraft: {
        id: "minecraft",
        name: "Minecraft",
        description:
          'Minecraft is a sandbox video game developed by Mojang Studios. The game was created by Markus "Notch" Persson in the Java programming language. Players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures or earthworks. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.',
        image: "/games/minecraft.jpg",
        downloadLink: "https://example.com/download/minecraft",
      },
      fortnite: {
        id: "fortnite",
        name: "Fortnite",
        description:
          "Fortnite is an online video game developed by Epic Games and released in 2017. It is available in three distinct game mode versions that otherwise share the same general gameplay and game engine: Fortnite Battle Royale, a free-to-play battle royale game in which up to 100 players fight to be the last person standing; Fortnite: Save the World, a cooperative hybrid tower defense-shooter and survival game in which up to four players fight off zombie-like creatures and defend objects with traps and fortifications they can build; and Fortnite Creative, in which players are given complete freedom to create worlds and battle arenas.",
        image: "/games/fortnite.jpg",
        downloadLink: "https://example.com/download/fortnite",
      },
      "among-us": {
        id: "among-us",
        name: "Among Us",
        description:
          "Among Us is an online multiplayer social deduction game developed and published by American game studio Innersloth. The game was inspired by the party game Mafia and the science fiction horror film The Thing. The game allows for cross-platform play, first released on iOS and Android devices in June 2018 and on Windows later that year in November. The game was then ported to the Nintendo Switch in December 2020, and on PlayStation 4, PlayStation 5, Xbox One and Xbox Series X/S in December 2021.",
        image: "/games/among-us.jpg",
        downloadLink: "https://example.com/download/among-us",
      },
      valorant: {
        id: "valorant",
        name: "Valorant",
        description:
          "Valorant is a free-to-play first-person hero shooter developed and published by Riot Games, for Microsoft Windows. First teased under the codename Project A in October 2019, the game began a closed beta period with limited access on April 7, 2020, followed by an official release on June 2, 2020. The development of the game started in 2014. Valorant takes inspiration from the Counter-Strike series of tactical shooters, borrowing several mechanics such as the buy menu, spray patterns, and inaccuracy while moving.",
        image: "/games/valorant.jpg",
        downloadLink: "https://example.com/download/valorant",
      },
      "genshin-impact": {
        id: "genshin-impact",
        name: "Genshin Impact",
        description:
          "Genshin Impact is an action role-playing game developed and published by miHoYo. The game features an open-world environment and action-based battle system using elemental magic and character-switching, and uses gacha game monetization for players to obtain new characters, weapons, and other resources. The game is free-to-play and is available on PlayStation 4, PlayStation 5, Android, iOS, and Windows.",
        image: "/games/genshin-impact.jpg",
        downloadLink: "https://example.com/download/genshin-impact",
      },
    }

    setTimeout(() => {
      if (sampleGames[params.id]) {
        setGame(sampleGames[params.id])
      }
      setIsLoading(false)
    }, 500) // Simulate loading
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the game you're looking for.</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${game.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex-grow flex flex-col bg-black bg-opacity-70 text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
            <ArrowLeft className="mr-2" /> Back to Home
          </Link>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{game.name}</h1>

            <div className="bg-black bg-opacity-50 p-6 rounded-lg mb-12">
              <h2 className="text-2xl font-semibold mb-4">About the Game</h2>
              <p className="text-lg leading-relaxed">{game.description}</p>
            </div>

            <div className="text-center py-8">
              <a
                href={game.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="download-button inline-flex items-center"
              >
                <Download className="mr-2" /> Download Now
              </a>
              <p className="mt-4 text-sm text-gray-400">By downloading, you agree to our terms and conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
