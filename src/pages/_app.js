import { Nunito } from 'next/font/google'
import '@/styles/globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={nunito.className}>
      <Component {...pageProps} />
    </main>
  )
}
