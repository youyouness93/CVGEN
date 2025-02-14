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
      router.push('/create/upload');
      return;
    }

    const generateCV = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cvData, jobData }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'analyse du CV');
        }

        const data = await response.json();
        setOptimizedCV(data);
      } catch (err: any) {
        setError(err?.message || 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    generateCV();
  }, [cvData, jobData, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Génération du CV en cours...</p>
          <p className="text-sm text-gray-500">Cela peut prendre quelques instants</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push('/create/upload')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Réessayer
        </button>
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
