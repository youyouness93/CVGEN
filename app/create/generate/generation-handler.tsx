'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CVPDF } from '@/components/cv-pdf';
import type { CVPDFProps } from '@/components/cv-pdf';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Download, Loader2, Sparkles, Wand2, FileCheck, Bot } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

interface JobData {
  jobTitle: string;
  jobDescription: string;
}

type OptimizedCV = CVPDFProps['data'];

const GENERATION_TIME = 35; // 35 secondes
const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '');

const generateSteps = [
  "Analyse du CV initial",
  "Extraction des compétences clés",
  "Optimisation pour le poste",
  "Adaptation du format",
  "Vérification ATS",
  "Finalisation"
];

export function GenerationHandler() {
  const [cvData] = useLocalStorage('cvData', null);
  const [jobData] = useLocalStorage<JobData | null>('jobData', null);
  const [optimizedCV, setOptimizedCV] = useState<OptimizedCV | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [cvId, setCvId] = useState<string | null>(null);
  const [generationStarted, setGenerationStarted] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!cvData || !jobData) {
      router.push('/create');
      return;
    }
  }, [cvData, jobData, router]);

  useEffect(() => {
    if (generationStarted && !generationComplete) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % generateSteps.length);
      }, GENERATION_TIME * 1000 / generateSteps.length);
      return () => clearInterval(interval);
    }
  }, [generationStarted, generationComplete]);

  const startGeneration = async () => {
    setGenerationStarted(true);
    setError(null);
    setProgress(0);
    setGenerationComplete(false);
    setCurrentStep(0);

    let animationFrame: number;
    let startTime: number;

    try {
      if (!jobData) {
        throw new Error("Aucune donnée de poste n'a été trouvée");
      }

      if (!cvData) {
        throw new Error("Aucune donnée de CV n'a été trouvée");
      }

      console.log('Données envoyées au serveur:', {
        cvData,
        jobData
      });

      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvData,
          jobData
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération du CV");
      }

      const data = await response.json();
      setCvId(data.cvId);

      startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min((elapsed / (GENERATION_TIME * 1000)) * 100, 99);
        setProgress(progress);

        if (progress < 99) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);

      const optimizedResponse = await fetch(`${BACKEND_URL}/cv/${data.cvId}`);
      if (!optimizedResponse.ok) {
        throw new Error("Erreur lors de la récupération du CV optimisé");
      }

      const optimizedData = await optimizedResponse.json();
      setOptimizedCV(optimizedData);
      setProgress(100);
      setGenerationComplete(true);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    }
  };

  if (!cvData || !jobData) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-lg"></div>
            <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400 relative" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Assistant IA
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Poste ciblé : <span className="font-medium text-gray-900 dark:text-white">{jobData.jobTitle}</span>
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert variant="destructive" className="border-red-500/20 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {!generationStarted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Button
              onClick={startGeneration}
              size="lg"
              className="relative w-full md:w-auto min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
              <div className="relative flex items-center justify-center gap-2">
                <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
                Générer mon CV optimisé
              </div>
            </Button>
          </motion.div>
        )}

        {generationStarted && !generationComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-full blur-lg"></div>
              <Progress 
                value={progress} 
                className="h-2 w-full bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-lg" 
              />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-lg animate-pulse"></div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 rounded-xl border border-white/20">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {generateSteps[currentStep]}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(progress)}% terminé
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {generationComplete && optimizedCV && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg animate-pulse"></div>
                <FileCheck className="h-6 w-6 relative" />
              </div>
              <span className="font-medium">Génération terminée avec succès !</span>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial="initial"
              animate="animate"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
              >
                <Button
                  onClick={() => window.open(`${BACKEND_URL}/cv/${cvId}/download`, '_blank')}
                  size="lg"
                  className="relative w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <Download className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                    Télécharger le CV
                  </div>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CVPDF data={optimizedCV} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
