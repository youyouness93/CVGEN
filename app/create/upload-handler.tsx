"use client"

import { FileUpload } from "@/components/file-upload"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function UploadHandler() {
  const router = useRouter()
  const [extractedText, setExtractedText] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileAccepted = async (file: File) => {
    try {
      setIsLoading(true)
      // Créer un FormData avec le fichier
      const formData = new FormData()
      formData.append("file", file)

      // Envoyer le fichier à l'API d'extraction
      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'extraction du CV')
      }

      // Afficher le texte extrait
      setExtractedText(data.rawText)

      // Stocker les données extraites dans le localStorage pour les utiliser plus tard
      localStorage.setItem('cvData', JSON.stringify(data))
    } catch (error) {
      console.error('Erreur de traitement:', error)
      throw new Error(error instanceof Error ? error.message : 'Erreur lors du traitement du fichier')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinue = () => {
    router.push("/create/job-description")
  }

  return (
    <div className="space-y-4">
      <FileUpload onFileAccepted={handleFileAccepted} />
      {isLoading && (
        <div className="text-center p-4">
          <div className="animate-pulse">Extraction du texte en cours...</div>
        </div>
      )}
      {extractedText && (
        <div className="mt-4 space-y-4">
          <div >
            
            
          </div>
          <div className="flex justify-end">
            <Button onClick={handleContinue}>
              Continuer vers la description du poste
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
