import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "J.S Gaming Hub - Servidor de Jogos Retrô",
  description:
    "Acesse sua biblioteca de jogos clássicos de SNES, N64, PlayStation e Xbox. Compatível com todos os dispositivos.",
  keywords: "jogos retrô, emulador, SNES, N64, PlayStation, Xbox, gaming hub",
  authors: [{ name: "Jadson Silva", email: "jadsonreserva98@gmail.com" }],
  creator: "Jadson Silva",
  publisher: "J.S Gaming Hub",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#1e40af",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "J.S Gaming Hub - Servidor de Jogos Retrô",
    description: "Acesse sua biblioteca de jogos clássicos online",
    type: "website",
    locale: "pt_BR",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
