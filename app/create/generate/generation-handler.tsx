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
  const router = useRouter();

  useEffect(() => {
    if (!cvData || !jobData) {
      router.push('/create');
      return;
    }

    const generateCV = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Démarrer la génération
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

        if (!response.ok) {
          throw new Error('Erreur lors de l\'analyse du CV');
        }

        const { taskId } = await response.json();
        
        // Vérifier l'état toutes les 2 secondes
        const checkStatus = async () => {
          const statusResponse = await fetch(`/api/analyze?taskId=${taskId}`);
          
          if (!statusResponse.ok) {
            throw new Error('Erreur lors de la vérification');
          }

          const result = await statusResponse.json();

          if (result.error) {
            throw new Error(result.error);
          }

          if (result.status === 'processing') {
            // Continuer à vérifier
            setTimeout(checkStatus, 2000);
            return;
          }

          // La génération est terminée
          setOptimizedCV(result);
          setIsLoading(false);
        };

        // Démarrer la vérification
        checkStatus();

      } catch (err: any) {
        setError(err?.message || 'Une erreur est survenue');
        setIsLoading(false);
      }
    };

    generateCV();
  }, [cvData, jobData, router]);

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erreur</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
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
