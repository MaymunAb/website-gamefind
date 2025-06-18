import type { Game } from "./games"

// Admin tarafından eklenen oyunları localStorage'da saklayacağız
// Gerçek bir uygulamada bu veriler bir veritabanında saklanır

const ADMIN_GAMES_KEY = "adminGames"

export async function getAdminGames(): Promise<Game[]> {
  try {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem(ADMIN_GAMES_KEY)
    if (!stored) return []

    return JSON.parse(stored)
  } catch (error) {
    console.error("Admin oyunları yüklenirken hata:", error)
    return []
  }
}

export async function addAdminGame(game: Game): Promise<void> {
  try {
    if (typeof window === "undefined") return

    const existingGames = await getAdminGames()
    const updatedGames = [...existingGames, game]

    localStorage.setItem(ADMIN_GAMES_KEY, JSON.stringify(updatedGames))
  } catch (error) {
    console.error("Admin oyunu eklenirken hata:", error)
    throw error
  }
}

export async function deleteAdminGame(gameId: string): Promise<void> {
  try {
    if (typeof window === "undefined") return

    const existingGames = await getAdminGames()
    const updatedGames = existingGames.filter((game) => game.id !== gameId)

    localStorage.setItem(ADMIN_GAMES_KEY, JSON.stringify(updatedGames))
  } catch (error) {
    console.error("Admin oyunu silinirken hata:", error)
    throw error
  }
}

export async function updateAdminGame(gameId: string, updatedGame: Partial<Game>): Promise<void> {
  try {
    if (typeof window === "undefined") return

    const existingGames = await getAdminGames()
    const gameIndex = existingGames.findIndex((game) => game.id === gameId)

    if (gameIndex === -1) {
      throw new Error("Oyun bulunamadı")
    }

    existingGames[gameIndex] = { ...existingGames[gameIndex], ...updatedGame }
    localStorage.setItem(ADMIN_GAMES_KEY, JSON.stringify(existingGames))
  } catch (error) {
    console.error("Admin oyunu güncellenirken hata:", error)
    throw error
  }
}
