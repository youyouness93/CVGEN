"use client"

import { JobDescriptionForm } from "@/components/job-description-form"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SubmitHandler() {
  const router = useRouter()
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
        throw new Error(responseData.error || "Erreur lors de la sauvegarde")
      }

      // Stocker les données dans le localStorage
      localStorage.setItem('jobData', JSON.stringify(responseData))

      // Rediriger vers la page de génération
      router.push("/create/generate")
    } catch (error) {
      console.error('Erreur:', error)
      throw new Error("Erreur lors de la sauvegarde de la description")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <JobDescriptionForm onSubmit={handleSubmit} isLoading={isLoading} />
      {isLoading && (
        <div className="text-center p-4">
          <div className="animate-pulse">Sauvegarde en cours...</div>
        </div>
      )}
    </div>
  )
}
