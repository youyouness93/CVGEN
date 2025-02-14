"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Upload, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileAccepted: (file: File) => Promise<void>
}

export function FileUpload({ onFileAccepted }: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [currentFile, setCurrentFile] = useState<File | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      try {
        setCurrentFile(file)
        setUploadStatus("uploading")
        setUploadProgress(0)

        // Simuler la progression du téléversement
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 95) {
              clearInterval(progressInterval)
              return prev
            }
            return prev + 5
          })
        }, 100)

        await onFileAccepted(file)

        clearInterval(progressInterval)
        setUploadProgress(100)
        setUploadStatus("success")
      } catch (error) {
        setUploadStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue")
      }
    },
    [onFileAccepted],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    multiple: false,
  })

  const resetUpload = () => {
    setCurrentFile(null)
    setUploadStatus("idle")
    setUploadProgress(0)
    setErrorMessage("")
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {uploadStatus === "idle" && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload
              className={cn(
                "h-10 w-10 mb-2 transition-colors",
                isDragActive ? "text-primary" : "text-muted-foreground",
              )}
            />
            <p className="text-lg font-medium">
              {isDragActive ? "Déposez votre CV ici" : "Glissez-déposez votre CV ici"}
            </p>
            <p className="text-sm text-muted-foreground">ou cliquez pour parcourir</p>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">Formats acceptés : PDF, DOCX</div>
        </div>
      )}

      {uploadStatus === "uploading" && currentFile && (
        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentFile.name}</p>
              <p className="text-sm text-muted-foreground">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetUpload}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Annuler</span>
            </Button>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground">Téléversement en cours... {uploadProgress}%</p>
        </div>
      )}

      {uploadStatus === "success" && currentFile && (
        <Alert className="border-success text-success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Téléversement réussi</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{currentFile.name}</span>
            <Button variant="outline" size="sm" onClick={resetUpload}>
              Changer de fichier
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {uploadStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur de téléversement</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{errorMessage}</span>
            <Button variant="outline" size="sm" onClick={resetUpload}>
              Réessayer
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

