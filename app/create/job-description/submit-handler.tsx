"use client"

import { JobDescriptionForm } from "@/components/job-description-form"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
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
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Description du poste</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Entrez les détails du poste pour lequel vous postulez
        </p>
      </div>
      <JobDescriptionForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}
