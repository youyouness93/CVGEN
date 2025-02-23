import { Header } from "@/components/header"
import { DownloadHandler } from "./download-handler"

export default function DownloadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-6 md:py-10">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Téléchargez votre CV</h1>
              <p className="text-muted-foreground">Votre CV a été optimisé et est prêt à être téléchargé</p>
            </div>

            <DownloadHandler />
          </div>
        </div>
      </main>
    </div>
  )
}

