'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Steps } from "@/components/steps";
import { GenerationHandler } from "./generation-handler";
import { motion } from "framer-motion";
import { Bot, FileCheck, FileText, Gauge, Target, Zap } from "lucide-react";

export default function GeneratePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "IA Avancée",
      description: "Notre IA analyse en profondeur votre profil"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Ciblage Précis",
      description: "Adaptation parfaite au poste visé"
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Optimisation ATS",
      description: "Format optimisé pour les systèmes de recrutement"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_25%)] animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(59,130,246,0.05),transparent)] animate-[pulse_4s_ease-in-out_infinite]"></div>
        </div>

        <div className="container relative py-12 md:py-24">
          {/* Header Section with 3D-like depth */}
          <motion.div 
            className="text-center mb-16 relative"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <motion.div 
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full"></div>
                <div className="relative rounded-full bg-gradient-to-r from-blue-600/90 to-blue-800/90 px-6 py-2 shadow-xl">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Dernière étape
                  </span>
                </div>
              </div>
            </motion.div>

            <h1 className="mt-8 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
              Votre CV, Optimisé par l'IA
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Notre technologie de pointe va transformer votre CV en un outil puissant pour décrocher le poste de vos rêves.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Progress Steps with 3D effect */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                
                <div className="relative bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg">
                  <Steps
                    steps={[
                      { id: "upload", title: "Import du CV", status: "complete" },
                      { id: "description", title: "Description", status: "complete" },
                      { id: "generate", title: "Génération", status: "current" },
                    ]}
                  />
                </div>
              </div>
            </motion.div>

            {/* Features Grid with hover effects */}
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  
                  <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-xl border shadow-lg">
                    <div className="text-blue-600 dark:text-blue-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Generation Section with glassmorphism */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              
              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border  shadow-lg">
                <GenerationHandler/>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
