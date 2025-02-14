"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { CVPDF } from "./cv-pdf"
import { Loader2 } from "lucide-react"

interface DataViewerProps {
  hideData?: boolean;
}

export function DataViewer({ hideData = false }: DataViewerProps) {
  const [cvData, setCvData] = useState<any>(null)
  const [jobData, setJobData] = useState<any>(null)
  const [optimizedCV, setOptimizedCV] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showPDF, setShowPDF] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Charger les données du localStorage
    const savedCvData = localStorage.getItem("cvData")
    const savedJobData = localStorage.getItem("jobData")
    const savedOptimizedCV = localStorage.getItem("optimizedData")

    if (savedCvData) {
      setCvData(JSON.parse(savedCvData))
    }
    if (savedJobData) {
      setJobData(JSON.parse(savedJobData))
    }
    if (savedOptimizedCV) {
      setOptimizedCV(JSON.parse(savedOptimizedCV))
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isAnalyzing) {
      // Démarrer à 0
      setProgress(0)
      
      // Augmenter progressivement jusqu'à 90%
      interval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 2
          return newProgress >= 90 ? 90 : newProgress
        })
      }, 100)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isAnalyzing])

  const analyzeCV = async () => {
    try {
      setIsAnalyzing(true)
      setError(null)

      const cvDataStr = localStorage.getItem("cvData")
      const jobDataStr = localStorage.getItem("jobData")

      console.log('Données envoyées à l\'API:', {
        cvData: cvDataStr ? JSON.parse(cvDataStr) : null,
        jobData: jobDataStr ? JSON.parse(jobDataStr) : null
      })

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvData: cvDataStr,
          jobData: jobDataStr,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de l'analyse")
      }

      const optimizedData = await response.json()
      console.log('Réponse de l\'API:', optimizedData)
      
      localStorage.setItem("optimizedData", JSON.stringify(optimizedData))
      setOptimizedCV(optimizedData)
      setProgress(100)
    } catch (error) {
      console.error("Erreur complète:", error)
      setError("Une erreur est survenue lors de l'analyse")
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false)
      }, 500)
    }
  }

  if (!cvData && !jobData) {
    return <div>Aucune donnée disponible</div>
  }

  if (hideData) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={analyzeCV}
          disabled={isAnalyzing || !cvData || !jobData}
          className="w-full max-w-md"
        >
          {isAnalyzing ? "Analyse en cours..." : "Optimiser le CV"}
        </Button>
        
        {isAnalyzing && (
          <div className="w-full max-w-md space-y-2">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300 ease-out rounded-full"
                style={{ 
                  width: `${progress}%`,
                  transition: "all 300ms ease-out"
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{Math.round(progress)}%</span>
              <span>
                {progress < 90 
                  ? "Analyse et optimisation de votre CV en cours..." 
                  : progress === 100 
                    ? "Analyse terminée !"
                    : "Finalisation de l'analyse..."}
              </span>
            </div>
          </div>
        )}

        {optimizedCV && !isAnalyzing && (
          <Button 
            onClick={() => setShowPDF(true)}
            variant="secondary"
            className="w-full max-w-md"
          >
            Générer le PDF
          </Button>
        )}

        {showPDF && optimizedCV && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-5xl bg-white p-6 rounded-lg">
              <div className="flex justify-end mb-4">
                <Button variant="ghost" onClick={() => setShowPDF(false)}>
                  Fermer
                </Button>
              </div>
              <CVPDF data={optimizedCV} />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {!showPDF && (
        <>
          {cvData && (
            <div className="p-4 border rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-2">Données du CV Original</h2>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                {JSON.stringify(cvData, null, 2)}
              </pre>
            </div>
          )}

          {jobData && (
            <div className="p-4 border rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-2">Description du poste</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Titre du poste : </span>
                  {jobData.jobTitle}
                </div>
                <div>
                  <span className="font-medium">Description : </span>
                  <p className="whitespace-pre-wrap">{jobData.jobDescription}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-600">
              {error}
            </div>
          )}

          {optimizedCV && (
            <div className="p-4 border rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-2">CV Optimisé</h2>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                {JSON.stringify(optimizedCV, null, 2)}
              </pre>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              onClick={analyzeCV}
              disabled={isAnalyzing || !cvData || !jobData}
            >
              {isAnalyzing ? "Analyse en cours..." : "Optimiser le CV"}
            </Button>
            {isAnalyzing && (
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300 ease-out rounded-full"
                    style={{ 
                      width: `${progress}%`,
                      transition: "all 300ms ease-out"
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{Math.round(progress)}%</span>
                  <span>
                    {progress < 90 
                      ? "Analyse et optimisation de votre CV en cours..." 
                      : progress === 100 
                        ? "Analyse terminée !"
                        : "Finalisation de l'analyse..."}
                  </span>
                </div>
              </div>
            )}
            {optimizedCV && (
              <Button
                onClick={() => setShowPDF(true)}
                variant="secondary"
              >
                Générer le PDF
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem('cvData')
                localStorage.removeItem('jobData')
                localStorage.removeItem('optimizedData')
                setCvData(null)
                setJobData(null)
                setOptimizedCV(null)
                setShowPDF(false)
              }}
            >
              Effacer les données
            </Button>
          </div>
        </>
      )}

      {showPDF && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setShowPDF(false)}
            >
              Retour aux données
            </Button>
          </div>
          <CVPDF data={optimizedCV} />
        </div>
      )}
    </div>
  )
}
