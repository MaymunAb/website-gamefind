export interface Game {
  id: string
  name: string
  description: string
  image: string
  downloadLink: string
}

export async function getAllGames(): Promise<Game[]> {
  // In a real implementation, this would read all JSON files from the /links directory
  // For demo purposes, we're returning sample data

  return [
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
    // Add more sample games here
  ]
}

export async function getGameById(id: string): Promise<Game | null> {
  // In a real implementation, this would read the specific JSON file from the /links directory
  // For demo purposes, we're returning sample data

  const games = await getAllGames()
  return games.find((game) => game.id === id) || null
}
