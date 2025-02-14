"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface CvGenerationProps {
  cvData: {
    title: string
    experiences: Array<{
      id: string
      role: string
      company: string
    }>
    skills: string[]
  }
  jobData: {
    title: string
    keyRequirements: string[]
  }
  onGenerate: () => Promise<void>
}

export function CvGeneration({ cvData, jobData, onGenerate }: CvGenerationProps) {
  const [status, setStatus] = useState<"idle" | "generating" | "error" | "success">("idle")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    try {
      setStatus("generating")
      setProgress(0)

      // Simuler la progression
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 15
        })
      }, 1000)

      await onGenerate()

      clearInterval(progressInterval)
      setProgress(100)
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    }
  }

  const generationSteps = [
    "Analyse de votre CV...",
    "Identification des compétences clés...",
    "Adaptation au poste...",
    "Optimisation du contenu...",
    "Finalisation du CV...",
  ]

  const currentStep = Math.min(Math.floor((progress / 100) * generationSteps.length), generationSteps.length - 1)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Votre CV actuel</CardTitle>
            <CardDescription>Informations extraites de votre CV</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Poste actuel</h4>
              <p className="font-medium">{cvData.title}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Expériences</h4>
              <ul className="space-y-2">
                {cvData.experiences.map((exp) => (
                  <li key={exp.id} className="text-sm">
                    <span className="font-medium">{exp.role}</span>
                    <span className="text-muted-foreground"> chez {exp.company}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Compétences clés</h4>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Poste visé</CardTitle>
            <CardDescription>Informations extraites de l&apos;offre d&apos;emploi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Titre du poste</h4>
              <p className="font-medium">{jobData.title}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Compétences requises</h4>
              <div className="flex flex-wrap gap-2">
                {jobData.keyRequirements.map((req) => (
                  <Badge key={req} variant="outline">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {status === "generating" && (
        <Card className="border-primary/50">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="absolute h-full w-full animate-ping rounded-full bg-primary/10" />
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
                <div>
                  <p className="font-medium">Génération de votre CV optimisé</p>
                  <p className="text-sm text-muted-foreground">{generationSteps[currentStep]}</p>
                </div>
              </div>

              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-sm text-muted-foreground">Cette opération peut prendre quelques secondes...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {status === "success" && (
        <Card className="border-success text-success">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-6 w-6" />
              <p className="font-medium">Votre CV a été généré avec succès !</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleGenerate}
          disabled={status === "generating"}
          className={cn("min-w-[200px]", status === "success" && "hidden")}
        >
          {status === "generating" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération...
            </>
          ) : (
            "Générer mon CV"
          )}
        </Button>
      </div>
    </div>
  )
}

