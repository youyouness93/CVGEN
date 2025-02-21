"use client"

import { JobDescriptionForm } from "@/components/job-description-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export function SubmitHandler() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: { jobTitle: string; jobDescription: string }) => {
    try {
      setIsLoading(true)

      // Envoyer les données à l'API
      const response = await fetch("/api/job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "Une erreur est survenue lors de l'analyse")
      }

      // Stocker les données dans le localStorage
      localStorage.setItem('jobData', JSON.stringify({
        ...responseData,
        jobTitle: data.jobTitle,
        jobDescription: data.jobDescription,
      }))

      // Afficher un toast de succès
      toast({
        title: "Analyse réussie !",
        description: "Nous allons maintenant générer votre CV optimisé.",
        duration: 3000,
      })

      // Rediriger vers la page de génération
      router.push("/create/generate")
    } catch (error) {
      console.error('Erreur:', error)
      
      // Afficher un toast d'erreur
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'analyse",
        duration: 5000,
      })

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return <JobDescriptionForm onSubmit={handleSubmit} isLoading={isLoading} />
}
