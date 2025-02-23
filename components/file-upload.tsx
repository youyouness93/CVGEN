"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Upload, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"

interface FileUploadProps {
  onFileAccepted: (file: File) => Promise<void>
}

export function FileUpload({ onFileAccepted }: FileUploadProps) {
  const { language } = useLanguage()
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
        setErrorMessage(error instanceof Error ? error.message : (language === 'fr' ? "Une erreur est survenue" : "An error occurred"))
      }
    },
    [onFileAccepted, language]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10485760, // 10MB
    maxFiles: 1
  })

  const removeFile = () => {
    setCurrentFile(null)
    setUploadStatus("idle")
    setUploadProgress(0)
    setErrorMessage("")
  }

  return (
    <div className="w-full space-y-4">
      {uploadStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{language === 'fr' ? 'Erreur' : 'Error'}</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {uploadStatus === "success" ? (
        <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-900 dark:text-green-300">{currentFile?.name}</p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  {language === 'fr' ? 'Fichier téléversé avec succès' : 'File uploaded successfully'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center transition-colors duration-200",
            "hover:border-blue-500 dark:hover:border-blue-400",
            isDragActive && "border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
          )}
        >
          <input {...getInputProps()} />
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-blue-900/50 dark:via-gray-800 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
              <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
              {isDragActive 
                ? (language === 'fr' ? "Déposez votre CV ici" : "Drop your CV here")
                : (language === 'fr' ? "Glissez votre CV ici" : "Drag your CV here")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {language === 'fr' 
                ? "ou utilisez le bouton ci-dessous pour sélectionner un fichier"
                : "or use the button below to select a file"}
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200 min-w-[200px] group">
              <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              {language === 'fr' ? 'Parcourir les fichiers' : 'Browse files'}
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 px-4 rounded-full">
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> PDF
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> DOCX
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> DOC
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span>Max 10MB</span>
          </div>
        </div>
      )}

      {uploadStatus === "uploading" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              {language === 'fr' ? 'Téléversement en cours...' : 'Upload in progress...'}
            </span>
            <span className="text-gray-700 dark:text-gray-300">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  )
}
