'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CVPDF } from '@/components/cv-pdf';
import type { CVPDFProps } from '@/components/cv-pdf';

type OptimizedCV = CVPDFProps['data'];

export function GenerationHandler() {
  const [cvData, setCvData] = useLocalStorage('cvData', null);
  const [jobData, setJobData] = useLocalStorage('jobData', null);
  const [optimizedCV, setOptimizedCV] = useState<OptimizedCV | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cvId, setCvId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!cvData || !jobData) {
      router.push('/create');
      return;
    }

    const startGeneration = async () => {
      if (isLoading) return; // Éviter les appels multiples
      
      setIsLoading(true);
      setError(null);

      try {
        console.log('Démarrage de la génération...');
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cvData,
            jobData,
          }),
        });

        const data = await response.json();
        console.log('Réponse initiale:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de la génération du CV');
        }

        if (!data.id) {
          throw new Error('ID manquant dans la réponse');
        }

        setCvId(data.id);

        // Vérifier l'état toutes les 2 secondes
        const checkStatus = async () => {
          try {
            console.log('Vérification du statut...');
            const statusResponse = await fetch(`/api/analyze?id=${data.id}`);
            const result = await statusResponse.json();
            console.log('Statut actuel:', result);

            if (!statusResponse.ok) {
              throw new Error(result.error || 'Erreur lors de la vérification');
            }

            if (result.error) {
              throw new Error(result.error);
            }

            if (result.status === 'error') {
              throw new Error(result.error || 'Une erreur est survenue pendant la génération');
            }

            if (result.status === 'processing') {
              // Continuer à vérifier
              setTimeout(checkStatus, 2000);
              return;
            }

            if (result.status === 'completed' && result.data) {
              console.log('Génération terminée avec succès');
              setOptimizedCV(result.data);
              setIsLoading(false);
            } else {
              throw new Error('Données manquantes dans la réponse');
            }
          } catch (err: any) {
            console.error('Erreur lors de la vérification:', err);
            setError(err?.message || 'Erreur lors de la vérification du statut');
            setIsLoading(false);
          }
        };

        // Démarrer la vérification
        await checkStatus();

      } catch (err: any) {
        console.error('Erreur lors de la génération:', err);
        setError(err?.message || 'Une erreur est survenue lors de la génération');
        setIsLoading(false);
      }
    };

    startGeneration();
  }, [cvData, jobData, router, isLoading]);

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
                  setIsLoading(false); // Reset isLoading avant de réessayer
                  setCvId(null); // Reset cvId
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="text-lg font-medium">Génération du CV en cours...</p>
        <p className="text-sm text-gray-500">Cela peut prendre quelques instants</p>
      </div>
    );
  }

  if (!optimizedCV) {
    return null;
  }

  return (
    <div className="w-full">
      <CVPDF data={optimizedCV} />
    </div>
  );
}
