"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubmitHandler } from "./submit-handler"
import { Steps } from "@/components/steps"

export default function JobDescriptionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container py-12 md:py-24">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/50 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Étape 2/3
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
              Description du poste
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Décrivez le poste pour lequel vous souhaitez optimiser votre CV. Notre IA utilisera ces informations pour mettre en valeur vos compétences pertinentes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-16 px-4">
              <div className="relative">
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                  <Steps
                    steps={[
                      { id: "upload", title: "Import du CV", status: "complete" },
                      { id: "description", title: "Description", status: "current" },
                      { id: "generate", title: "Génération", status: "upcoming" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="relative px-4">
              <div className="relative">
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg">
                  <SubmitHandler />
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
