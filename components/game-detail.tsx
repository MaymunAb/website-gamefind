"use client"

import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import type { Game } from "@/lib/games"

interface GameDetailProps {
  game: Game
}

export default function GameDetail({ game }: GameDetailProps) {
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center"
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
