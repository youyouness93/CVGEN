import { Header } from "@/components/header"
import { SubmitHandler } from "./submit-handler"
import { Steps } from "@/components/steps"

export default function JobDescriptionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-6 md:py-10">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Description du poste</h1>
              <p className="text-muted-foreground">
                Entrez les informations du poste pour lequel vous souhaitez adapter votre CV
              </p>
            </div>

            <Steps
              steps={[
                { id: "upload", title: "Import du CV", status: "complete" },
                { id: "description", title: "Description", status: "current" },
                { id: "generate", title: "Génération", status: "upcoming" },
              ]}
            />

            <SubmitHandler />
          </div>
        </div>
      </main>
    </div>
  )
}

