"use client"

import { FileUpload } from "@/components/file-upload"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function UploadHandler() {
  const router = useRouter()
  const [extractedText, setExtractedText] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

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
      setUploadComplete(true)

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
    <div className="space-y-8">
      <FileUpload onFileAccepted={handleFileAccepted} />
      
      {/* Continue Button */}
      {uploadComplete && (
        <div className="relative">
          <div className="absolute inset-0.5 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl blur opacity-10"></div>
          <div className="relative bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-blue-600 to-green-600 dark:from-green-400 dark:via-blue-400 dark:to-green-400 mb-2">
                  CV importé avec succès !
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Passez à l'étape suivante pour décrire le poste que vous visez
                </p>
              </div>
              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200 group"
              >
                Continuer
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
