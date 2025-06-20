// In Next.js, we can use a special approach to import all JSON files from a directory
// This is more compatible with the v0 preview environment than direct file system access

export interface Game {
  id: string
  name: string
  description: string
  image: string
  downloadLink: string
}

// This is a workaround for the v0 preview environment
// In a real Next.js app, you would use the fs module or API routes to read the files
const gameFiles = {
  "gta4.json": () => import("../app/links/gta4.json").then((m) => m.default),
  "partypanic.json": () => import("../app/links/partypanic.json").then((m) => m.default),
  "stickfight.json": () => import("../app/links/stickfight.json").then((m) => m.default),
  "subnautica.json": () => import("../app/links/subnautica.json").then((m) => m.default),
  "pacify.json": () => import("../app/links/pacify.json").then((m) => m.default),
  "carmechanic.json": () => import("../app/links/carmechanic.json").then((m) => m.default),
  "rdr1.json": () => import("../app/links/rdr1.json").then((m) => m.default),
  "rdr2.json": () => import("../app/links/rdr2.json").then((m) => m.default),
  "spntiresmud.json": () => import("../app/links/spntiresmud.json").then((m) => m.default),
  "contentwarning.json": () => import("../app/links/contentwarning.json").then((m) => m.default),
  "drivebeyondhorizons.json": () => import("../app/links/drivebeyondhorizons.json").then((m) => m.default),
  "ets2.json": () => import("../app/links/ets2.json").then((m) => m.default),
  "gangbeasts.json": () => import("../app/links/gangbeasts.json").then((m) => m.default),
  "halflife1.json": () => import("../app/links/halflife1.json").then((m) => m.default),
  "halflife2.json": () => import("../app/links/halflife2.json").then((m) => m.default),
  "lethalcompany.json": () => import("../app/links/lethalcompany.json").then((m) => m.default),
  "mafia1.json": () => import("../app/links/mafia1.json").then((m) => m.default),
  "mafia2.json": () => import("../app/links/mafia2.json").then((m) => m.default),
  "muddyheights2.json": () => import("../app/links/muddyheights2.json").then((m) => m.default),
  "payday2.json": () => import("../app/links/payday2.json").then((m) => m.default),
  "peopleplayground.json": () => import("../app/links/peopleplayground.json").then((m) => m.default),
  "TheLongDrive.json": () => import("../app/links/TheLongDrive.json").then((m) => m.default),
  "ravenfield.json": () => import("../app/links/ravenfield.json").then((m) => m.default),
  "thewitcher1.json": () => import("../app/links/thewitcher1.json").then((m) => m.default),
  "thewitcher2.json": () => import("../app/links/thewitcher2.json").then((m) => m.default),
  "thewitcher3.json": () => import("../app/links/thewitcher3.json").then((m) => m.default),
  "sekiroshadows.json": () => import("../app/links/sekiroshadows.json").then((m) => m.default),
  "undertale.json": () => import("../app/links/undertale.json").then((m) => m.default),
  "whiteknuckle.json": () => import("../app/links/whiteknuckle.json").then((m) => m.default),
  "repo.json": () => import("../app/links/repo.json").then((m) => m.default),
  "drift86.json": () => import("../app/links/drift86.json").then((m) => m.default),
  "warband.json": () => import("../app/links/warband.json").then((m) => m.default),
  "bannerlord.json": () => import("../app/links/bannerlord.json").then((m) => m.default),
  "ultimatechickenhorse.json": () => import("../app/links/ultimatechickenhorse.json").then((m) => m.default),
  "dale.json": () => import("../app/links/dale.json").then((m) => m.default),
  "cssource.json": () => import("../app/links/cssource.json").then((m) => m.default),
  "cs16.json": () => import("../app/links/cs16.json").then((m) => m.default),
  "7launcher.json": () => import("../app/links/7launcher.json").then((m) => m.default),
  "assettocorsa.json": () => import("../app/links/assettocorsa.json").then((m) => m.default),
  "gtasa.json": () => import("../app/links/gtasa.json").then((m) => m.default),
  "13cuma.json": () => import("../app/links/13cuma.json").then((m) => m.default),
  "csgo.json": () => import("../app/links/csgo.json").then((m) => m.default),
}

// getAllGames fonksiyonunu güncelle ki admin oyunlarını da dahil etsin
export async function getAllGames(): Promise<Game[]> {
  try {
    // JSON dosyalarından oyunları yükle
    const gamePromises = Object.values(gameFiles).map((importFn) => importFn())
    const jsonGames = await Promise.all(gamePromises)

    // Admin oyunlarını yükle (sadece client-side'da)
    let adminGames: Game[] = []
    if (typeof window !== "undefined") {
      const { getAdminGames } = await import("./admin-games")
      adminGames = await getAdminGames()
    }

    // Tüm oyunları birleştir
    return [...(jsonGames as Game[]), ...adminGames]
  } catch (error) {
    console.error("Error loading games:", error)
    return []
  }
}

export async function getGameById(id: string): Promise<Game | null> {
  try {
    // Get all games and find the one with matching ID
    const allGames = await getAllGames()
    return allGames.find((game) => game.id === id) || null
  } catch (error) {
    console.error(`Error getting game with id ${id}:`, error)
    return null
  }
}

export async function searchGames(query: string): Promise<Game[]> {
  const allGames = await getAllGames()

  if (!query) {
    return allGames
  }

  // Filter games based on the search query
  return allGames.filter(
    (game) =>
      game.name.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase()),
  )
}
