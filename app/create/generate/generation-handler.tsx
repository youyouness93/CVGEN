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
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la génération du CV');
        }

        const result = await response.json();
        setOptimizedCV(result);
        setIsLoading(false);

      } catch (err: any) {
        console.error('Erreur lors de la génération:', err);
        setError(err?.message || 'Une erreur est survenue lors de la génération');
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
