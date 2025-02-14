"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { CVPDF } from "./cv-pdf"

export function DataViewer() {
  const [cvData, setCvData] = useState<any>(null)
  const [jobData, setJobData] = useState<any>(null)
  const [optimizedCV, setOptimizedCV] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showPDF, setShowPDF] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Charger les données du localStorage
    const loadData = () => {
      try {
        const savedCvData = localStorage.getItem('cvData')
        const savedJobData = localStorage.getItem('jobData')
        const savedOptimizedCV = localStorage.getItem('optimizedCV')
        
        if (savedCvData) {
          setCvData(JSON.parse(savedCvData))
        }
        if (savedJobData) {
          setJobData(JSON.parse(savedJobData))
        }
        if (savedOptimizedCV) {
          setOptimizedCV(JSON.parse(savedOptimizedCV))
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      }
    }

    loadData()
  }, [])

  const analyzeCV = async () => {
    try {
      setIsAnalyzing(true)
      setError(null)
      setShowPDF(false)

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData, jobData }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'analyse")
      }

      setOptimizedCV(data)
      localStorage.setItem('optimizedCV', JSON.stringify(data))
    } catch (error) {
      console.error('Erreur:', error)
      setError(error instanceof Error ? error.message : "Erreur lors de l'analyse")
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (!cvData && !jobData) {
    return <div>Aucune donnée disponible</div>
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
                localStorage.removeItem('optimizedCV')
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
