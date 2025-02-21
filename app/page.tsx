import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle, FileText, Star, Users, Briefcase, Clock, Award, ChevronRight, Sparkles, CheckCircle2, Quote, User2, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TemplatesCarousel } from "@/components/templates-carousel"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
          </div>

          <div className="container relative">
            <div className="flex flex-col lg:flex-row items-center gap-12 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
              {/* Left column - Text content */}
              <div className="flex flex-1 flex-col items-center lg:items-start text-center lg:text-left gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/50 rounded-full">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Propulsé par l'IA dernière génération
                  </span>
                </div>

                <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white leading-tight">
                  Un CV qui fait la<br />différence
                </h1>

                <p className="max-w-[42rem] text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ne laissez plus votre CV vous freiner. Notre IA analyse les offres d'emploi et optimise votre profil 
                  pour maximiser vos chances d'être sélectionné.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
                  <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200">
                    <Link href="/create">
                      Optimiser ma carrière
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="gap-2 border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <Link href="#how-it-works">
                      Découvrir comment
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50"></div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <strong className="block text-gray-900 dark:text-white">+1000 recruteurs</strong>
                      <span className="text-gray-600 dark:text-gray-400">nous font confiance</span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">4.9/5</strong> de satisfaction
                    </span>
                  </div>
                </div>
              </div>

              {/* Right column - Interactive CV Preview */}
              <div className="flex-1 w-full max-w-xl perspective-1000">
                <div className="relative transform-3d hover:rotate-y-10 transition-transform duration-500">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                          <User2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Développeur Full Stack</p>
                        </div>
                      </div>
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6 animate-pulse"></div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white mb-1">
                          <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Expérience
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3 mt-2"></div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white mb-1">
                          <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Compétences
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mt-2"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -right-4 -bottom-4 transform rotate-6 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">ATS Optimisé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Des résultats prouvés</h2>
              <p className="text-gray-600 dark:text-gray-400">Notre technologie d'IA a déjà aidé des milliers de candidats à décrocher leur emploi idéal</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                {
                  value: "25K+",
                  label: "CVs optimisés",
                  description: "Générés et personnalisés avec succès",
                  icon: <FileText className="h-8 w-8 text-blue-600" />
                },
                {
                  value: "92%",
                  label: "Taux de réponse",
                  description: "Des recruteurs contactent nos candidats",
                  icon: <Users className="h-8 w-8 text-blue-600" />
                },
                {
                  value: "4.9/5",
                  label: "Note moyenne",
                  description: "Basée sur 1000+ avis clients",
                  icon: <Star className="h-8 w-8 text-blue-600" />
                },
                {
                  value: "×3",
                  label: "Plus d'entretiens",
                  description: "Par rapport aux CV classiques",
                  icon: <Briefcase className="h-8 w-8 text-blue-600" />
                }
              ].map((stat, i) => (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform duration-200"></div>
                  <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg transform -rotate-1 group-hover:-rotate-2 transition-transform duration-200">
                    <div className="flex items-center justify-center mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">{stat.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Preview Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/50 px-4 py-1.5 mb-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Modèles professionnels
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
                Des templates adaptés à votre profil
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Choisissez parmi nos modèles soigneusement conçus pour mettre en valeur vos compétences selon votre secteur d'activité
              </p>
            </div>

            <TemplatesCarousel />

            <div className="mt-16 text-center">
              <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200">
                <Link href="/templates">
                  Voir tous les modèles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="container space-y-12 py-16 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Simple et efficace
              </span>
            </div>
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
              Comment ça marche ?
            </h2>
            <p className="max-w-[42rem] leading-normal text-gray-600 dark:text-gray-400 text-lg">
              Trois étapes simples pour obtenir votre CV parfaitement optimisé
            </p>
          </div>

          <div className="relative">
            {/* Ligne de connexion */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-600 to-blue-300 hidden md:block"></div>

            <div className="mx-auto grid gap-8 md:gap-12 md:grid-cols-3 relative max-w-5xl">
              {[
                {
                  title: "Importez votre CV",
                  description: "Téléversez votre CV actuel au format PDF ou DOCX. Notre système analyse automatiquement son contenu.",
                  icon: <FileText className="h-6 w-6" />,
                  features: ["Formats acceptés : PDF, DOCX", "Analyse instantanée", "Extraction intelligente"]
                },
                {
                  title: "Ajoutez l'offre d'emploi",
                  description: "Copiez-collez la description du poste qui vous intéresse. Notre IA identifie les compétences clés.",
                  icon: <CheckCircle className="h-6 w-6" />,
                  features: ["Analyse des mots-clés", "Identification des compétences", "Matching automatique"]
                },
                {
                  title: "Obtenez votre CV optimisé",
                  description: "Notre IA adapte votre CV en mettant en avant vos expériences les plus pertinentes pour le poste.",
                  icon: <ArrowRight className="h-6 w-6" />,
                  features: ["Mise en forme professionnelle", "Contenu personnalisé", "Format ATS-friendly"]
                }
              ].map((step, i) => (
                <div key={i} className="group relative">
                  {/* Numéro de l'étape */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold z-10">
                    {i + 1}
                  </div>

                  <div className="h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                      
                      {/* Liste des fonctionnalités */}
                      <ul className="mt-4 space-y-2">
                        {step.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200">
              <Link href="/create">
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/50 px-4 py-1.5 mb-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Avantages exclusifs
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
                Pourquoi choisir notre outil ?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Des fonctionnalités innovantes conçues pour maximiser vos chances de décrocher l'emploi de vos rêves
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Intelligence Artificielle Avancée",
                  description: "Notre IA de dernière génération analyse en profondeur les offres d'emploi pour adapter parfaitement votre CV.",
                  icon: <Award className="h-8 w-8" />,
                  features: [
                    "Analyse sémantique avancée",
                    "Adaptation contextuelle",
                    "Mise à jour en temps réel"
                  ]
                },
                {
                  title: "Gain de Temps Considérable",
                  description: "Créez un CV parfaitement adapté en quelques minutes, contre plusieurs heures traditionnellement.",
                  icon: <Clock className="h-8 w-8" />,
                  features: [
                    "Processus optimisé",
                    "Interface intuitive",
                    "Modifications instantanées"
                  ]
                },
                {
                  title: "Format Professionnel Garanti",
                  description: "Des modèles de CV modernes et professionnels, validés par des experts en recrutement.",
                  icon: <Briefcase className="h-8 w-8" />,
                  features: [
                    "Design moderne",
                    "Compatible ATS",
                    "Mise en page optimale"
                  ]
                }
              ].map((benefit, i) => (
                <div key={i} className="group relative">
                  <div className="absolute inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative h-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          {benefit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{benefit.description}</p>
                      
                      <div className="mt-auto">
                        <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                          <ul className="space-y-3">
                            {benefit.features.map((feature, j) => (
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
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200">
                <Link href="/create">
                  Découvrir tous les avantages
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ce que disent nos utilisateurs</h2>
              <p className="text-gray-600 dark:text-gray-400">Des centaines de professionnels ont déjà transformé leur carrière</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Marie L.",
                  role: "Marketing Manager",
                  content: "J'ai décroché mon poste de rêve après avoir optimisé mon CV. Le processus était simple et efficace.",
                  company: "Tech Solutions"
                },
                {
                  name: "Thomas B.",
                  role: "Développeur Senior",
                  content: "L'IA a su mettre en valeur mes compétences d'une manière que je n'aurais jamais imaginée. Impressionnant !",
                  company: "StartupFlow"
                },
                {
                  name: "Sophie M.",
                  role: "Consultante RH",
                  content: "En tant que professionnelle RH, je recommande cet outil. Il produit des CV parfaitement adaptés aux ATS.",
                  company: "Global Recruit"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <Quote className="h-8 w-8 text-blue-500 mb-4" />
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-medium">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role} - {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Gradient & Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-blue-950"></div>
          <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          
          {/* Decorative blurred circles */}
          <div className="absolute -top-24 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000"></div>
          
          <div className="relative container">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/50 px-4 py-1.5 mb-6">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Prêt à booster votre carrière ?
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
                Optimisez votre CV dès maintenant
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                Ne laissez pas passer l'opportunité de décrocher le job de vos rêves. Notre IA est là pour vous aider à créer un CV qui se démarque.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="min-w-[200px] gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200">
                  <Link href="/create">
                    Commencer gratuitement
                    <Sparkles className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[200px] gap-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/50 transform hover:scale-105 transition-all duration-200">
                  <Link href="#how-it-works">
                    En savoir plus
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-600 dark:text-gray-400">+10 000 utilisateurs satisfaits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-600 dark:text-gray-400">Note moyenne de 4.9/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-600 dark:text-gray-400">100% sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
