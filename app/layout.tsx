import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { LanguageProvider } from '@/context/language-context'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "CV Creator - Créez votre CV adapté en quelques clics",
  description: "Générez un CV personnalisé pour chaque offre d'emploi grâce à l'IA",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-full bg-background font-sans antialiased", inter.variable)}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}