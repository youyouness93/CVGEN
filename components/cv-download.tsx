"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Home, RefreshCw, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

interface CvDownloadProps {
  pdfUrl: string
  onDownload: () => Promise<void>
}

export function CvDownload({ pdfUrl, onDownload }: CvDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      setError(null)
      await onDownload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors du téléchargement")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-[210/297] w-full bg-muted/10 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 text-primary rounded-full p-4 inline-flex">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Votre CV est prêt !</h3>
                  <p className="text-sm text-muted-foreground">
                    Cliquez sur le bouton ci-dessous pour télécharger votre CV optimisé
                  </p>
                </div>
              </div>
            </div>
            {/* Aperçu du PDF en arrière-plan */}
            <iframe src={pdfUrl} className="w-full h-full opacity-10 pointer-events-none" title="Aperçu du CV" />
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button onClick={handleDownload} disabled={isDownloading} size="lg" className="gap-2">
          {isDownloading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Téléchargement...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Télécharger le PDF
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Vous pouvez générer un nouveau CV à tout moment en cliquant sur &quot;Générer mon CV&quot; dans le menu
      </p>
    </div>
  )
}

