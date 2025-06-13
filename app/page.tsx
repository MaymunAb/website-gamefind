import Image from "next/image"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      {/* Fake Cloudflare Logo */}
      <Image
        src="/cloudflare.png" // public klasörüne bir fake logo yerleştirmen gerekiyor
        alt="Cloudflare"
        width={200}
        height={60}
        className="mb-8"
      />

      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        500 | Sunucu Hatası!
      </h1>
      <p className="text-gray-600 text-lg">
        Sunucumuz şu anda yanıt vermiyor. Lütfen daha sonra tekrar deneyin.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Cloudflare Ray ID: #149ak39flla145
      </p>
    </main>
  )
}
