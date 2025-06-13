export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      {/* Fake Cloudflare Logo */}
      <img
        src="/cloudflare.png"
        alt="Cloudflare"
        width={220}
        height={80}
        className="mb-6"
      />

      {/* Sahte Uyarı */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        502 Bad Gateway
      </h1>

      <p className="text-gray-600 text-base md:text-lg max-w-xl mb-6">
        The web server reported a bad gateway error.
        <br />
        You: browser → Cloudflare → <span className="text-red-500">Host Error</span>
      </p>

      {/* Sahte Teknik Bilgi */}
      <div className="bg-gray-100 border border-gray-300 rounded p-4 text-left w-full max-w-md text-sm font-mono">
        <p><strong>Ray ID:</strong> #f4k3cl0udfl4r3</p>
        <p><strong>IP:</strong> 127.0.0.1</p>
        <p><strong>Location:</strong> Istanbul</p>
        <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
      </div>

      <p className="text-gray-400 text-xs mt-8">
        © 2025 Cloudflare, Inc.
      </p>
    </main>
  )
}
