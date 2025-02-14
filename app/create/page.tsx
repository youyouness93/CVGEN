import { Header } from "@/components/header"
import { UploadHandler } from "./upload-handler"

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-6 md:py-10">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Importez votre CV</h1>
              <p className="text-muted-foreground">Téléversez votre CV actuel pour commencer la personnalisation</p>
            </div>

            <UploadHandler />
          </div>
        </div>
      </main>
    </div>
  )
}

