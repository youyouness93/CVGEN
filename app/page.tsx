import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ArrowRight, CheckCircle, FileText } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Créez votre CV adapté à chaque offre d&apos;emploi en quelques clics
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Optimisez vos chances d&apos;obtenir un entretien avec un CV personnalisé grâce à l&apos;intelligence
              artificielle.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/create">
                  Commencer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">Comment ça marche ?</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Un processus simple en trois étapes pour obtenir votre CV optimisé
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <h3 className="mt-4 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

const steps = [
  {
    title: "Importez votre CV",
    description: "Téléversez votre CV actuel au format PDF ou DOCX",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: "Ajoutez l'offre d'emploi",
    description: "Copiez-collez la description du poste qui vous intéresse",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  {
    title: "Générez votre CV optimisé",
    description: "Notre IA adapte votre CV pour maximiser sa pertinence",
    icon: <ArrowRight className="h-6 w-6" />,
  },
]

