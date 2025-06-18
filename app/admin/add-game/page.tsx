"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { addAdminGame } from "@/lib/admin-games"

export default function AddGame() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    image: "",
    downloadLink: "",
  })

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Oyun ID'sini otomatik oluştur
      const gameId = gameData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50)

      const newGame = {
        id: gameId,
        name: gameData.name,
        description: gameData.description,
        image: gameData.image,
        downloadLink: gameData.downloadLink,
      }

      await addAdminGame(newGame)
      setSuccess(true)

      // Form'u temizle
      setGameData({
        name: "",
        description: "",
        image: "",
        downloadLink: "",
      })

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Oyun eklenirken hata:", error)
    }

    setIsLoading(false)
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
          <h1 className="text-2xl font-bold text-gray-900 ml-4">Yeni Oyun Ekle</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Oyun Bilgileri
            </CardTitle>
            <CardDescription>Yeni oyun eklemek için aşağıdaki bilgileri doldurun</CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Oyun başarıyla eklendi!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Oyun Adı *</Label>
                <Input
                  id="name"
                  type="text"
                  value={gameData.name}
                  onChange={(e) => setGameData({ ...gameData, name: e.target.value })}
                  placeholder="Örn: GTA 5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Oyun Açıklaması *</Label>
                <Textarea
                  id="description"
                  value={gameData.description}
                  onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
                  placeholder="Oyun hakkında detaylı açıklama yazın..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Oyun Fotoğrafı URL'si *</Label>
                <Input
                  id="image"
                  type="url"
                  value={gameData.image}
                  onChange={(e) => setGameData({ ...gameData, image: e.target.value })}
                  placeholder="https://example.com/game-image.jpg"
                  required
                />
                <p className="text-sm text-gray-500">Oyunun kapak fotoğrafının URL'sini girin</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downloadLink">İndirme Linki *</Label>
                <Input
                  id="downloadLink"
                  type="url"
                  value={gameData.downloadLink}
                  onChange={(e) => setGameData({ ...gameData, downloadLink: e.target.value })}
                  placeholder="https://example.com/download-link"
                  required
                />
                <p className="text-sm text-gray-500">Oyunun indirileceği link</p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Ekleniyor..." : "Oyunu Ekle"}
                </Button>
                <Link href="/admin/dashboard">
                  <Button type="button" variant="outline">
                    İptal
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
