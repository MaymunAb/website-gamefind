'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
        <img
          src="/cloudflare.png"
          alt="Cloudflare"
          width={220}
          height={80}
          className="mb-6"
        />
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          502 | Yükleniyor...
        </h1>
        <p className="text-gray-600 text-lg">
          Sunucu yanıt vermiyor. Otomatik olarak yeniden deneniyor...
        </p>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <img
        src="/cloudflare.png"
        alt="Cloudflare"
        width={220}
        height={80}
        className="mb-6"
      />

      <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
        502 | Bad Gateway
      </h1>

      <p className="text-gray-700 text-base md:text-lg max-w-xl mb-6">
        Sunucu şu anda <span className="font-semibold text-red-500">panik modunda</span>. Stabil olmayan sunucu dosyaları tespit edildi.
        <br />
        Lütfen kahveni al ve hiçbir şey yapmadan bekle.
      </p>

      <div className="bg-black text-green-400 text-left w-full max-w-md p-4 font-mono text-sm rounded">
        {`{ error: "BAD GATEWAY", code: 502 }`}
      </div>

      <p className="text-gray-400 text-xs mt-8">
        Cloudflare Node vFake-TR | Ray ID: #ki3f8ja1d | LocalHost: İP HAZIR DEĞİL VEYA KULLANILAMAZ!
      </p>
    </main>
  )
}
