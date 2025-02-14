"use client"

import { Header } from "@/components/header"
import { JobDescriptionForm } from "@/components/job-description-form"
import { Steps } from "@/components/steps"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function JobDescriptionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: { jobTitle: string; jobDescription: string }) => {
    try {
      setIsLoading(true)
      console.log('Sauvegarde des données du job:', data)
      
      // Sauvegarder les données dans le localStorage
      localStorage.setItem('jobData', JSON.stringify(data))
      
      // Rediriger vers la page de génération
      router.push('/create/generate')
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-6 md:py-10">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Description du poste</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Entrez les détails du poste pour lequel vous postulez
              </p>
            </div>

            <Steps
              steps={[
                { id: "upload", title: "Import du CV", status: "complete" },
                { id: "description", title: "Description", status: "current" },
                { id: "generate", title: "Génération", status: "upcoming" },
              ]}
            />

            <div className="mx-auto max-w-2xl space-y-8">
              <JobDescriptionForm onSubmit={onSubmit} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
