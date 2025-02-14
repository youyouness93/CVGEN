import { Header } from "@/components/header"
import { Steps } from "@/components/steps"
import { DataViewer } from "@/components/data-viewer"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Optimisation du CV</h1>
              <p className="text-muted-foreground">
                Votre CV va être optimisé en fonction de l'offre d'emploi
              </p>
            </div>

            <Steps
              steps={[
                {
                  id: "upload",
                  title: "CV",
                  status: "complete"
                },
                {
                  id: "description",
                  title: "Offre d'emploi",
                  status: "complete"
                },
                {
                  id: "generate",
                  title: "Génération",
                  status: "current"
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-white shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">CV Importé</h3>
                    <p className="text-sm text-muted-foreground">
                      Votre CV a été importé avec succès et les informations ont été extraites
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Description du Poste</h3>
                    <p className="text-sm text-muted-foreground">
                      Les exigences du poste ont été analysées et sont prêtes pour l'optimisation
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 bg-white shadow-sm">
              <div className="text-center space-y-4 max-w-xl mx-auto">
                <h2 className="text-xl font-semibold">Prêt pour l'Optimisation</h2>
                <p className="text-sm text-muted-foreground">
                  Notre système va maintenant analyser votre CV et l'optimiser en fonction des exigences du poste.
                  Le nouveau CV mettra en valeur vos compétences les plus pertinentes.
                </p>
                <div className="pt-4">
                  <DataViewer hideData={true} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
