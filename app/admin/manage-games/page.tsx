"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAdminGames, deleteAdminGame } from "@/lib/admin-games"
import type { Game } from "@/lib/games"

export default function ManageGames() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
      loadGames()
    } else {
      router.push("/admin")
    }
  }, [router])

  const loadGames = async () => {
    try {
      const adminGames = await getAdminGames()
      setGames(adminGames)
    } catch (error) {
      console.error("Oyunlar yüklenirken hata:", error)
    }
    setIsLoading(false)
  }

  const handleDelete = async (gameId: string) => {
    if (confirm("Bu oyunu silmek istediğinizden emin misiniz?")) {
      try {
        await deleteAdminGame(gameId)
        await loadGames() // Listeyi yenile
      } catch (error) {
        console.error("Oyun silinirken hata:", error)
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Dashboard'a Dön
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 ml-4">Oyunları Yönet</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : games.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">Henüz admin tarafından eklenen oyun yok.</p>
              <Link href="/admin/add-game">
                <Button>İlk Oyunu Ekle</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id}>
                <CardHeader className="pb-2">
                  <div className="relative h-32 w-full mb-2">
                    <Image
                      src={game.image || "/placeholder.svg?height=200&width=300"}
                      alt={game.name}
                      fill
                      className="object-cover rounded"
                      unoptimized
                    />
                  </div>
                  <CardTitle className="text-lg">{game.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">{game.description}</CardDescription>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(game.id)} className="flex-1">
                      <Trash2 className="mr-1 h-3 w-3" />
                      Sil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
