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
  "rdr1.json": () => import("../app/links/rdr2.json").then((m) => m.default),
  "rdr2.json": () => import("../app/links/rdr2.json").then((m) => m.default),
  "spntiresmud.json": () => import("../app/links/spntiresmud.json").then((m) => m.default),
  "ultimatechickenhorse.json": () => import("../app/links/ultimatechickenhorse.json").then((m) => m.default),
}

export async function getAllGames(): Promise<Game[]> {
  try {
    // Load all game files
    const gamePromises = Object.values(gameFiles).map((importFn) => importFn())
    const games = await Promise.all(gamePromises)
    return games as Game[]
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
