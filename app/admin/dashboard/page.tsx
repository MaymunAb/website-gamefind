"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, LogOut, Gamepad2 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2 h-5 w-5" />
                Yeni Oyun Ekle
              </CardTitle>
              <CardDescription>Siteye yeni oyun ekleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/add-game">
                <Button className="w-full">Oyun Ekle</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Oyunları Yönet
              </CardTitle>
              <CardDescription>Mevcut oyunları görüntüleyin ve düzenleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/manage-games">
                <Button className="w-full" variant="outline">
                  Oyunları Görüntüle
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ana Siteye Dön</CardTitle>
              <CardDescription>Ana siteyi ziyaret edin</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button className="w-full" variant="secondary">
                  Ana Sayfa
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
