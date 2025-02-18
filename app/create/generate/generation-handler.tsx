'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CVPDF } from '@/components/cv-pdf';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import type { CVPDFProps } from '@/components/cv-pdf';

type OptimizedCV = CVPDFProps['data'];

const GENERATION_TIME = 35; // 35 secondes
const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '');

export default function GenerationHandler() {
  const [cvData] = useLocalStorage('cvData', null);
  const [jobData] = useLocalStorage('jobData', null);
  const [optimizedCV, setOptimizedCV] = useState<OptimizedCV | null>(null);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'processing' | 'completed' | 'error'>('processing');
  const router = useRouter();

  useEffect(() => {
    if (!cvData || !jobData) {
      router.push('/create');
      return;
    }
  }, [cvData, jobData, router]);

  const startGeneration = async () => {
    setStatus('processing');
    setError(null);
    setGenerationComplete(false);

    let animationFrame: number;
    let startTime: number;

    try {
      console.log('Envoi des données au backend:', {
        cvDataPresent: !!cvData,
        jobDataPresent: !!jobData,
        backendUrl: BACKEND_URL
      });

      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, jobData }),
      });

      const data = await response.json();

      if (!response.ok || !data.id) {
        throw new Error(data.error || 'Erreur lors de la génération du CV');
      }

      // Démarrer l'animation de progression
      startTime = Date.now();
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / (GENERATION_TIME * 1000)) * 100, 99);
        console.log(`Progression : ${newProgress}%`);

        if (newProgress < 99) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);

      // Polling pour vérifier le statut
      while (!generationComplete) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Attendre 2 secondes

        const statusResponse = await fetch(`${BACKEND_URL}/analyze?id=${data.id}`);
        const statusData = await statusResponse.json();

        if (!statusResponse.ok) {
          throw new Error(statusData.error || 'Erreur lors de la vérification du statut');
        }

        if (statusData.status === 'completed') {
          setOptimizedCV(statusData.data);
          setGenerationComplete(true);
          setStatus('completed');
          break;
        } else if (statusData.status === 'error') {
          throw new Error(statusData.error || 'Erreur lors de la génération');
        }
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
      setStatus('error');
    } finally {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    }
  };

  const handleRetry = () => {
    setError(null);
    setStatus('processing');
    setGenerationComplete(false);
  };

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold text-red-500">Erreur</h3>
        <p className="mb-6 text-muted-foreground">{error}</p>
        <button
          onClick={handleRetry}
          className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (generationComplete && optimizedCV) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Affichage du statut */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Votre CV est prêt !
          </h2>
        </div>

        {/* Affichage du CV */}
        <div className="space-y-6">
          {/* Aperçu mobile */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-[400px] mx-auto">
            <PDFViewer width="100%" height={600} className="rounded-lg">
              <CVPDF data={optimizedCV} />
            </PDFViewer>
          </div>

          {/* Bouton de téléchargement */}
          <div className="mt-6">
            <PDFDownloadLink
              document={<CVPDF data={optimizedCV} />}
              fileName={`CV-${optimizedCV.personalInfo.name.replace(/\s+/g, '-')}.pdf`}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-center block mx-auto w-fit shadow-lg transition-colors"
            >
              {({ loading }) =>
                loading ? 'Préparation du PDF...' : 'Télécharger le CV'
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-8">
      {status === 'processing' ? (
        <div className="space-y-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: '50%' }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Génération en cours...
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="mb-4 text-xl font-semibold">Prêt à générer votre CV ?</h3>
          <p className="mb-6 text-muted-foreground">
            Nous allons optimiser votre CV en fonction de la description du poste.
            Cette opération prendra environ {GENERATION_TIME} secondes.
          </p>
          <button
            onClick={startGeneration}
            className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Générer mon CV
          </button>
        </div>
      )}
    </div>
  );
}
