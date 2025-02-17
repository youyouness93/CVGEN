'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CVPDF } from '@/components/cv-pdf';

export default function DevPage() {
  const searchParams = useSearchParams();
  const [cvData, setCvData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) {
      setError('Veuillez fournir un ID de CV dans l\'URL (ex: /dev?id=...)');
      return;
    }

    const fetchCV = async () => {
      try {
        const response = await fetch(`/api/analyze?id=${id}`);
        const result = await response.json();

        if (!response.ok || result.error) {
          throw new Error(result.error || 'Erreur lors de la récupération du CV');
        }

        if (result.data) {
          setCvData(result.data);
        } else {
          throw new Error('CV non disponible');
        }
      } catch (error: any) {
        setError(error?.message || 'Erreur lors de la récupération du CV');
      }
    };

    fetchCV();
  }, [id]);

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erreur</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cvData) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3 mt-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return <CVPDF data={cvData} />;
}