import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Home, History, User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold">CV Creator</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Accueil
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <History className="h-4 w-4" />
              Historique
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <User className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/create">Générer mon CV</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

