import { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'

export const metadata = {
  title: 'Sistema de Agendamento Inteligente',
  description: 'Criado com Next.js e Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <Header />
        <main className="max-w-6xl mx-auto p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
