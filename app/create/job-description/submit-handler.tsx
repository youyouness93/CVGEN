"use client"

import { JobDescriptionForm } from "@/components/job-description-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/context/language-context"

export function SubmitHandler() {
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: { jobTitle: string; jobDescription: string }) => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || (language === 'fr' ? "Une erreur est survenue lors de l'analyse" : "An error occurred during analysis"))
      }

      localStorage.setItem('jobData', JSON.stringify({
        ...responseData,
        jobTitle: data.jobTitle,
        jobDescription: data.jobDescription,
      }))

      toast({
        title: language === 'fr' ? "Analyse réussie !" : "Analysis successful!",
        description: language === 'fr' ? "Nous allons maintenant générer votre CV optimisé." : "We will now generate your optimized CV.",
        duration: 3000,
      })

      router.push("/create/generate")
    } catch (error) {
      console.error(language === 'fr' ? 'Erreur:' : 'Error:', error)
      
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur" : "Error",
        description: error instanceof Error ? error.message : (language === 'fr' ? "Une erreur est survenue lors de l'analyse" : "An error occurred during analysis"),
        duration: 5000,
      })

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return <JobDescriptionForm onSubmit={handleSubmit} isLoading={isLoading} />
}
