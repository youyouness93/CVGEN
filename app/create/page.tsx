"use client"

import { Button } from "@/components/ui/button"
import { FileText, Upload, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UploadHandler } from "./upload-handler"

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container py-12 md:py-24">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/50 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Étape 1/3
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
              Importez votre CV actuel
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Pour commencer, téléchargez votre CV existant. Notre IA analysera son contenu pour créer une version optimisée qui mettra en valeur vos compétences.
            </p>
          </div>

          {/* Upload Section */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <UploadHandler />

                {/* Features List */}
                <div className="mt-8 grid gap-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Ce que notre IA va faire pour vous :
                  </h4>
                  {[
                    "Analyser la structure et le contenu de votre CV",
                    "Identifier vos compétences clés et réalisations",
                    "Optimiser le contenu pour les systèmes ATS",
                    "Préparer les données pour la génération du nouveau CV"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skip Option */}
            <div className="mt-12 mx-auto max-w-3xl px-4 sm:px-0">
              <div className="relative">
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur opacity-10"></div>
                <div className="relative bg-white/50 dark:bg-gray-800/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
                    <div>
                      <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white mb-2 md:mb-0">
                        Pas encore de CV ?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Commencez de zéro avec notre assistant IA qui vous guidera étape par étape
                      </p>
                    </div>
                    <Button asChild size="lg" className="w-full md:w-auto min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200">
                      <Link href="/create/generate" className="flex items-center justify-center gap-2">
                        Créer un nouveau CV
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
