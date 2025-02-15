'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CVPDF } from '@/components/cv-pdf';
import type { CVPDFProps } from '@/components/cv-pdf';

type OptimizedCV = CVPDFProps['data'];

const GENERATION_TIME = 35; // 35 secondes

export function GenerationHandler() {
  const [cvData] = useLocalStorage('cvData', null);
  const [jobData] = useLocalStorage('jobData', null);
  const [optimizedCV, setOptimizedCV] = useState<OptimizedCV | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [cvId, setCvId] = useState<string | null>(null);
  const [generationStarted, setGenerationStarted] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!cvData || !jobData) {
      router.push('/create');
      return;
    }
  }, [cvData, jobData, router]);

  const startGeneration = async () => {
    setGenerationStarted(true);
    setError(null);
    setProgress(0);
    setGenerationComplete(false);

    let animationFrame: number;
    let startTime: number;

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, jobData }),
      });

      const data = await response.json();

      if (!response.ok || !data.id) {
        throw new Error(data.error || 'Erreur lors de la génération du CV');
      }

      setCvId(data.id);
      startTime = Date.now();

      const updateProgress = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const newProgress = Math.min((elapsed / GENERATION_TIME) * 100, 100);
        
        setProgress(newProgress);
        
        if (newProgress < 100) {
          animationFrame = requestAnimationFrame(updateProgress);
        } else {
          setGenerationComplete(true);
        }
      };

      animationFrame = requestAnimationFrame(updateProgress);

    } catch (error: any) {
      setError(error?.message || 'Une erreur est survenue');
      setGenerationStarted(false);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  };

  const fetchCV = async () => {
    if (!cvId) return;

    try {
      const response = await fetch(`/api/analyze?id=${cvId}`);
      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Erreur lors de la récupération du CV');
      }

      if (result.data) {
        setOptimizedCV(result.data);
      } else {
        throw new Error('CV non disponible');
      }
    } catch (error: any) {
      setError(error?.message || 'Erreur lors de la récupération du CV');
    }
  };

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erreur</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
            <div className="mt-4">
              <button
                onClick={() => {
                  setError(null);
                  setProgress(0);
                  setCvId(null);
                  setGenerationComplete(false);
                  setGenerationStarted(false);
                  router.refresh();
                }}
                className="text-sm font-medium text-red-800 hover:text-red-900"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!optimizedCV) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto">
        {!generationStarted ? (
          <button
            onClick={startGeneration}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Démarrer la génération
          </button>
        ) : (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-lg font-medium">
              {!generationComplete ? 'Génération du CV en cours...' : 'Génération terminée !'}
            </p>
            <p className="text-sm text-gray-500">
              {!generationComplete 
                ? `${Math.round(progress)}% - Optimisation de votre CV pour le poste...`
                : 'Votre CV a été optimisé avec succès.'
              }
            </p>
            {generationComplete && (
              <button
                onClick={fetchCV}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Afficher le CV
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <CVPDF data={optimizedCV} />
    </div>
  );
}
