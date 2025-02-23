'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Home, History, User } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Header() {
  const { language } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-2 transform group-hover:scale-105 transition-all duration-200">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">CV Creator</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              {language === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <History className="h-4 w-4" />
              {language === 'fr' ? 'Historique' : 'History'}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-blue-50">
            <User className="h-5 w-5 text-blue-600" />
            <span className="sr-only">{language === 'fr' ? 'Menu' : 'Menu'}</span>
          </Button>
          <Button asChild size="lg" className="hidden md:inline-flex gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200">
            <Link href="/create">
              {language === 'fr' ? 'Optimiser ma carrière' : 'Optimize my career'}
              <FileText className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
