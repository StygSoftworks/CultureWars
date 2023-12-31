import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <Layout>
    <main className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-8">
        <Image
          src='/images/logo.webp' // Replace with the path to your game's logo image
          alt="Your Game Logo"
          width={200}
          height={200}
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Culture Wars!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The most sarcastic and tongue-in-cheek trading card game ever.
      </p>
      <p className="text-gray-700 text-xl mb-8">
        Do you have what it takes to mock, ridicule, and outwit your opponents?
      </p>
    </main>

    </Layout>
  )
}
