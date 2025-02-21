"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"

const templates = [
  {
    name: "Le Nord-Américain",
    description: "Design épuré et professionnel, parfait pour les entreprises nord-américaines. Met l'accent sur les résultats et les réalisations.",
    status: "Disponible",
    features: ["ATS-friendly", "Sections personnalisables", "Format US Letter"],
    popular: true
  },
  {
    name: "L'Européen",
    description: "Format classique adapté aux standards européens. Inclut photo et informations personnelles selon les normes EU.",
    status: "Bientôt disponible",
    features: ["Format A4", "Photo intégrée", "Sections traditionnelles"],
    popular: false
  },
  {
    name: "Le Créatif",
    description: "Mise en page dynamique pour les professionnels créatifs. Parfait pour les designers et artistes.",
    status: "Bientôt disponible",
    features: ["Design unique", "Sections créatives", "Personnalisation avancée"],
    popular: false
  },
  {
    name: "L'Artistique",
    description: "Template expressif pour les artistes et créatifs. Met en avant le portfolio et les réalisations visuelles.",
    status: "Bientôt disponible",
    features: ["Galerie portfolio", "Mise en page artistique", "Hautement personnalisable"],
    popular: false
  },
  {
    name: "L'Universel",
    description: "Design polyvalent adapté à tous les secteurs. Une valeur safegarde pour toute recherche d'emploi.",
    status: "Bientôt disponible",
    features: ["Compatible tous secteurs", "Structure claire", "Facile à personnaliser"],
    popular: false
  },
  {
    name: "Le Geek",
    description: "Template moderne pour les profils tech. Optimisé pour mettre en valeur les compétences techniques.",
    status: "Bientôt disponible",
    features: ["Section skills avancée", "GitHub integration", "Dark mode"],
    popular: false
  }
]

export function TemplatesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1
  })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8 py-4">
          {templates.map((template, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <div className="group relative h-full">
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative h-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
                  <div className="flex flex-col h-full">
                    {/* Template Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {template.name}
                        </h3>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.status === "Disponible" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400"
                        }`}>
                          {template.status}
                        </div>
                      </div>
                      {template.popular && (
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">
                          Populaire
                        </div>
                      )}
                    </div>

                    {/* Template Preview Placeholder */}
                    <div className="relative w-full h-48 mb-6 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-gray-400 dark:text-gray-500">
                        Aperçu à venir
                      </div>
                    </div>

                    {/* Template Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {template.description}
                    </p>

                    {/* Template Features */}
                    <div className="mt-auto">
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <ul className="space-y-3">
                          {template.features.map((feature, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={scrollPrev}
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={scrollNext}
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
