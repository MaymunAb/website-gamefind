import Image from "next/image"
import Link from "next/link"

interface GameCardProps {
  id: string
  name: string
  description: string
  image: string
}

export default function GameCard({ id, name, description, image }: GameCardProps) {
  return (
    <Link href={`/games/${id}`}>
      <div className="game-card h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
            unoptimized // For demo purposes
          />
        </div>
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-600 line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  )
}
