import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NFT Collect Master',
}

export default function Home() {
  return (
    <main>
      <div className="min-h-[400px] grid content-center">
        <div className="w-fit h-fit">
          <div className="text-teal-500 text-8xl font-black">NFT Collect Master</div>
        </div>
      </div>
    </main>
  )
}
